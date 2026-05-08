import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/theme';

export default function CalendarScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar</Text>
        <Text style={styles.subtitle}>Your schedule at a glance</Text>
      </View>
      <View style={styles.placeholder}>
        <Text style={styles.icon}>📅</Text>
        <Text style={styles.label}>Calendar view coming soon</Text>
        <Text style={styles.hint}>Events from Google Calendar will appear here</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  header: { padding: 20 },
  title: { color: COLORS.textPrimary, fontSize: 26, fontWeight: '700' },
  subtitle: { color: COLORS.textSecondary, fontSize: 13, marginTop: 3 },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  icon: { fontSize: 48 },
  label: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '600' },
  hint: { color: COLORS.textSecondary, fontSize: 13, textAlign: 'center', paddingHorizontal: 40 },
});
