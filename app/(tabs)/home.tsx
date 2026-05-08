import React, { useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { useAuthStore } from '@/store/authStore';
import { useTaskStore } from '@/store/taskStore';
import { voiceService } from '@/services/voiceService';
import { taskService } from '@/services/taskService';
import { MicButton } from '@/components/voice/MicButton';
import { Waveform } from '@/components/voice/Waveform';
import { TaskCard } from '@/components/task/TaskCard';
import { COLORS } from '@/constants/theme';

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const { todayTasks, isProcessing, setIsProcessing, setAriaResponse, setTodayTasks, setTranscript } =
    useTaskStore();

  const [recording, setRecording] = React.useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = React.useState(false);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const loadTodayTasks = useCallback(async () => {
    try {
      const tasks = await taskService.getTodayTasks();
      setTodayTasks(tasks);
    } catch { /* silent */ }
  }, [setTodayTasks]);

  useEffect(() => { void loadTodayTasks(); }, [loadTodayTasks]);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Microphone access is required for ARIA to hear you.');
        return;
      }
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording: rec } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(rec);
      setIsRecording(true);
    } catch {
      Alert.alert('Error', 'Could not start recording');
    }
  };

  const stopAndProcess = async () => {
    if (!recording) return;
    setIsRecording(false);
    setIsProcessing(true);
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      if (!uri) throw new Error('No audio URI');
      setRecording(null);
      const response = await voiceService.processAudio(uri);
      setAriaResponse(response);
      if (response.transcript) setTranscript(response.transcript);
      router.push('/response');
    } catch {
      Alert.alert('Error', 'Could not process your voice. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMicPress = () => {
    if (isRecording) { void stopAndProcess(); }
    else { void startRecording(); }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.greeting}>{greeting()}, {user?.firstName ?? 'there'} 👋</Text>
            <Text style={styles.date}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </Text>
          </View>
          <View style={styles.planBadge}>
            <Text style={styles.planText}>{user?.plan ?? 'FREE'}</Text>
          </View>
        </View>

        <View style={styles.micSection}>
          <MicButton isRecording={isRecording} isProcessing={isProcessing} onPress={handleMicPress} />
          <Text style={styles.micLabel}>
            {isRecording ? 'Listening... tap to finish' : isProcessing ? 'ARIA is thinking...' : 'Tap to brief ARIA'}
          </Text>
          <Waveform active={isRecording} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/tasks')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          {todayTasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🎙️</Text>
              <Text style={styles.emptyText}>No tasks yet. Brief ARIA to get started.</Text>
            </View>
          ) : (
            todayTasks.slice(0, 4).map((task) => (
              <TaskCard key={task.id} task={task} showActions={false} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  scroll: { padding: 20, paddingBottom: 40 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36 },
  greeting: { color: COLORS.textPrimary, fontSize: 22, fontWeight: '700' },
  date: { color: COLORS.textSecondary, fontSize: 13, marginTop: 3 },
  planBadge: {
    backgroundColor: `${COLORS.accent}15`,
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5,
    borderWidth: 1, borderColor: `${COLORS.accent}30`,
  },
  planText: { color: COLORS.accent, fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  micSection: { alignItems: 'center', marginBottom: 40, gap: 16 },
  micLabel: { color: COLORS.textSecondary, fontSize: 13, letterSpacing: 0.3 },
  section: { gap: 0 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { color: COLORS.textPrimary, fontSize: 18, fontWeight: '700' },
  seeAll: { color: COLORS.accent, fontSize: 13 },
  emptyState: { alignItems: 'center', paddingVertical: 40, gap: 12 },
  emptyIcon: { fontSize: 36 },
  emptyText: { color: COLORS.textSecondary, fontSize: 14, textAlign: 'center' },
});
