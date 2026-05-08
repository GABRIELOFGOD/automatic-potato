import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Switch
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useTaskStore } from '@/store/taskStore';
import { Button } from '@/components/ui/Button';
import { COLORS } from '@/constants/theme';
import { Priority, TaskCategory } from '@/types';

const PRIORITIES: Priority[] = ['HIGH', 'MEDIUM', 'LOW'];
const CATEGORIES: Array<{ key: TaskCategory; icon: string }> = [
  { key: 'WORK', icon: '💼' },
  { key: 'PERSONAL', icon: '👤' },
  { key: 'HEALTH', icon: '❤️' },
  { key: 'COMMUNICATION', icon: '💬' },
];
const REMINDERS = [5, 10, 30, 60];

export default function TaskDetailScreen() {
  const { taskId } = useLocalSearchParams<{ taskId: string }>();
  const { pendingTasks, updatePendingTask } = useTaskStore();
  const task = pendingTasks.find((t) => t.id === taskId);

  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [priority, setPriority] = useState<Priority>(task?.priority ?? 'MEDIUM');
  const [category, setCategory] = useState<TaskCategory>(task?.category ?? 'WORK');
  const [calendarBlock, setCalendarBlock] = useState(task?.requiresCalendarBlock ?? false);
  const [reminders, setReminders] = useState<number[]>(task?.reminderMinutesBefore ?? [10, 30]);

  if (!task) { router.back(); return null; }

  const toggleReminder = (min: number) => {
    setReminders((prev) =>
      prev.includes(min) ? prev.filter((r) => r !== min) : [...prev, min]
    );
  };

  const save = () => {
    updatePendingTask(task.id, {
      title,
      description,
      priority,
      category,
      requiresCalendarBlock: calendarBlock,
      reminderMinutesBefore: reminders,
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>Edit Task</Text>
        <View style={{ width: 55 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.fieldLabel}>TITLE</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.titleInput}
          placeholderTextColor={COLORS.textMuted}
          placeholder="Task title"
        />

        <Text style={styles.fieldLabel}>DESCRIPTION</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          style={[styles.titleInput, { minHeight: 80, textAlignVertical: 'top' }]}
          placeholderTextColor={COLORS.textMuted}
          placeholder="Optional details"
          multiline
        />

        <Text style={styles.fieldLabel}>PRIORITY</Text>
        <View style={styles.chips}>
          {PRIORITIES.map((p) => (
            <TouchableOpacity
              key={p}
              onPress={() => setPriority(p)}
              style={[
                styles.chip,
                priority === p && { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
              ]}
            >
              <Text style={[styles.chipText, priority === p && { color: COLORS.primary }]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.fieldLabel}>CATEGORY</Text>
        <View style={styles.categoryGrid}>
          {CATEGORIES.map((c) => (
            <TouchableOpacity
              key={c.key}
              onPress={() => setCategory(c.key)}
              style={[styles.categoryItem, category === c.key && styles.categoryItemActive]}
            >
              <Text style={styles.categoryIcon}>{c.icon}</Text>
              <Text style={[styles.categoryLabel, category === c.key && { color: COLORS.accent }]}>
                {c.key}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.fieldLabel}>REMINDERS</Text>
        <View style={styles.chips}>
          {REMINDERS.map((min) => (
            <TouchableOpacity
              key={min}
              onPress={() => toggleReminder(min)}
              style={[
                styles.chip,
                reminders.includes(min) && { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
              ]}
            >
              <Text style={[styles.chipText, reminders.includes(min) && { color: COLORS.primary }]}>
                {min}min
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.calendarRow}>
          <View>
            <Text style={styles.calendarLabel}>Add to Google Calendar</Text>
            <Text style={styles.calendarHint}>Block time on your calendar for this task</Text>
          </View>
          <Switch
            value={calendarBlock}
            onValueChange={setCalendarBlock}
            trackColor={{ false: COLORS.card, true: `${COLORS.accent}60` }}
            thumbColor={calendarBlock ? COLORS.accent : COLORS.textSecondary}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Save Changes" onPress={save} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  topBar: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14,
    borderBottomWidth: 0.5, borderBottomColor: `${COLORS.accent}15`,
  },
  cancel: { color: COLORS.accent, fontSize: 15 },
  topTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700' },
  scroll: { flex: 1 },
  content: { padding: 20, gap: 0 },
  fieldLabel: {
    color: COLORS.textMuted, fontSize: 11,
    fontWeight: '700', letterSpacing: 1.5,
    marginBottom: 8, marginTop: 20,
  },
  titleInput: {
    backgroundColor: COLORS.card,
    borderRadius: 12, padding: 14,
    color: COLORS.textPrimary, fontSize: 15,
    borderWidth: 1, borderColor: `${COLORS.accent}22`,
  },
  chips: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: 16, paddingVertical: 9,
    borderRadius: 10, borderWidth: 1,
    borderColor: `${COLORS.accent}25`,
    backgroundColor: COLORS.card,
  },
  chipText: { color: COLORS.textSecondary, fontSize: 13, fontWeight: '600' },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  categoryItem: {
    flex: 1, minWidth: '45%',
    backgroundColor: COLORS.card,
    borderRadius: 12, padding: 14,
    alignItems: 'center', gap: 6,
    borderWidth: 1, borderColor: `${COLORS.accent}15`,
  },
  categoryItemActive: { borderColor: COLORS.accent, backgroundColor: `${COLORS.accent}10` },
  categoryIcon: { fontSize: 22 },
  categoryLabel: { color: COLORS.textSecondary, fontSize: 12, fontWeight: '600' },
  calendarRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    borderRadius: 14, padding: 16, marginTop: 20,
    borderWidth: 1, borderColor: `${COLORS.accent}15`,
  },
  calendarLabel: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '600' },
  calendarHint: { color: COLORS.textSecondary, fontSize: 12, marginTop: 2 },
  footer: { padding: 20, borderTopWidth: 0.5, borderTopColor: `${COLORS.accent}15` },
});
