import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TextInput, Alert, TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTaskStore } from '@/store/taskStore';
import { taskService } from '@/services/taskService';
import { TaskCard } from '@/components/task/TaskCard';
import { ARIABubble } from '@/components/task/ARIABubble';
import { RecurringTaskBanner } from '@/components/task/RecurringTaskBanner';
import { Button } from '@/components/ui/Button';
import { COLORS } from '@/constants/theme';
import { ApprovedTask, ARIATask } from '@/types';

export default function ResponseScreen() {
  const {
    ariaResponse,
    pendingTasks,
    transcript,
    updatePendingTask,
    removePendingTask,
    clearPending,
  } = useTaskStore();

  const [approving, setApproving] = useState(false);
  const [clarification, setClarification] = useState('');
  const [clarifying, setClarifying] = useState(false);

  if (!ariaResponse) {
    router.back();
    return null;
  }

  const handleApprove = async () => {
    setApproving(true);
    try {
      await taskService.approveTasks(pendingTasks as ApprovedTask[]);
      clearPending();
      Alert.alert('All set! 🎯', 'Your tasks have been saved and reminders scheduled.', [
        { text: 'Great!', onPress: () => router.replace('/(tabs)/home') },
      ]);
    } catch {
      Alert.alert('Error', 'Could not save tasks. Please try again.');
    } finally {
      setApproving(false);
    }
  };

  const handleClarify = async () => {
    if (!clarification.trim()) return;
    setClarifying(true);
    try {
      const response = await taskService.clarify(
        transcript,
        clarification,
        pendingTasks as ApprovedTask[]
      );
      useTaskStore.getState().setAriaResponse(response);
      setClarification('');
    } catch {
      Alert.alert('Error', 'Could not process clarification.');
    } finally {
      setClarifying(false);
    }
  };

  const handleToggleCalendar = (task: ARIATask) => {
    updatePendingTask(task.id, { requiresCalendarBlock: !task.requiresCalendarBlock });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => { clearPending(); router.back(); }}>
          <Text style={styles.backBtn}>✕ Discard</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Review Tasks</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {transcript ? (
          <View style={styles.transcriptPill}>
            <Text style={styles.transcriptText} numberOfLines={2}>🎙 "{transcript}"</Text>
          </View>
        ) : null}

        {ariaResponse.greeting ? (
          <ARIABubble message={ariaResponse.greeting} type="greeting" />
        ) : null}

        {ariaResponse.insights ? (
          <ARIABubble message={ariaResponse.insights} type="insight" />
        ) : null}

        {ariaResponse.recurringTaskSuggestion?.shouldAsk ? (
          <RecurringTaskBanner
            question={ariaResponse.recurringTaskSuggestion.question}
            onAccept={() => {}}
            onSkip={() => {}}
          />
        ) : null}

        {ariaResponse.conflicts?.map((c, i) => (
          <View key={i} style={styles.conflictBanner}>
            <Text style={styles.conflictTitle}>⚠️ Conflict detected</Text>
            <Text style={styles.conflictText}>{c.taskTitle} conflicts with {c.conflictsWith}</Text>
            <Text style={styles.conflictSuggestion}>{c.suggestion}</Text>
          </View>
        ))}

        <Text style={styles.sectionLabel}>TASKS ({pendingTasks.length})</Text>

        {pendingTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onRemove={() => removePendingTask(task.id)}
            onToggleCalendar={() => handleToggleCalendar(task)}
            showActions
          />
        ))}

        {ariaResponse.clarifyingQuestion ? (
          <View style={styles.clarifySection}>
            <ARIABubble message={ariaResponse.clarifyingQuestion} type="question" />
            <TextInput
              value={clarification}
              onChangeText={setClarification}
              placeholder="Type your answer..."
              placeholderTextColor={COLORS.textMuted}
              style={styles.clarifyInput}
              multiline
            />
            <Button
              label={clarifying ? 'Sending...' : 'Send Answer'}
              onPress={handleClarify}
              loading={clarifying}
              style={{ marginTop: 10 }}
            />
          </View>
        ) : null}
      </ScrollView>

      {!ariaResponse.clarifyingQuestion && (
        <View style={styles.footer}>
          <Button
            label={approving ? 'Saving...' : `Approve & Schedule (${pendingTasks.length})`}
            onPress={handleApprove}
            loading={approving}
            disabled={pendingTasks.length === 0}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  topBar: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: `${COLORS.accent}15`,
  },
  backBtn: { color: COLORS.error, fontSize: 14 },
  topBarTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 20 },
  transcriptPill: {
    backgroundColor: COLORS.card,
    borderRadius: 10, padding: 12, marginBottom: 14,
    borderWidth: 0.5, borderColor: `${COLORS.accent}20`,
  },
  transcriptText: { color: COLORS.textSecondary, fontSize: 13, fontStyle: 'italic' },
  sectionLabel: {
    color: COLORS.textMuted, fontSize: 11,
    fontWeight: '700', letterSpacing: 1.5,
    marginBottom: 12, marginTop: 4,
  },
  conflictBanner: {
    backgroundColor: `${COLORS.medium}11`,
    borderRadius: 12, padding: 14,
    borderWidth: 1, borderColor: `${COLORS.medium}30`,
    marginBottom: 12,
  },
  conflictTitle: { color: COLORS.medium, fontSize: 12, fontWeight: '700', marginBottom: 4 },
  conflictText: { color: COLORS.textPrimary, fontSize: 13 },
  conflictSuggestion: { color: COLORS.textSecondary, fontSize: 12, marginTop: 4 },
  clarifySection: { marginTop: 8 },
  clarifyInput: {
    backgroundColor: COLORS.card,
    borderRadius: 12, padding: 14,
    color: COLORS.textPrimary, fontSize: 14,
    borderWidth: 1, borderColor: `${COLORS.accent}22`,
    minHeight: 80, textAlignVertical: 'top',
  },
  footer: { padding: 20, borderTopWidth: 0.5, borderTopColor: `${COLORS.accent}15` },
});
