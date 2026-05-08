import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { taskService } from '@/services/taskService';
import { TaskCard } from '@/components/task/TaskCard';
import { COLORS } from '@/constants/theme';
import { Priority, Task } from '@/types';

const FILTERS: Array<Priority | 'ALL'> = ['ALL', 'HIGH', 'MEDIUM', 'LOW'];

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Priority | 'ALL'>('ALL');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await taskService.getTodayTasks();
      setTasks(data);
    } catch { /* silent */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const filtered = filter === 'ALL' ? tasks : tasks.filter((t) => t.priority === filter);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <Text style={styles.subtitle}>{tasks.length} tasks today</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {loading ? (
          <Text style={styles.loading}>Loading tasks...</Text>
        ) : filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>✅</Text>
            <Text style={styles.emptyText}>No tasks found</Text>
          </View>
        ) : (
          filtered.map((task) => <TaskCard key={task.id} task={task} showActions={false} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  header: { padding: 20, paddingBottom: 12 },
  title: { color: COLORS.textPrimary, fontSize: 26, fontWeight: '700' },
  subtitle: { color: COLORS.textSecondary, fontSize: 13, marginTop: 3 },
  filterScroll: { maxHeight: 52 },
  filterRow: { paddingHorizontal: 20, gap: 8, alignItems: 'center' },
  filterChip: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20, borderWidth: 1,
    borderColor: `${COLORS.accent}25`,
    backgroundColor: COLORS.card,
  },
  filterChipActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  filterText: { color: COLORS.textSecondary, fontSize: 13, fontWeight: '500' },
  filterTextActive: { color: COLORS.primary, fontWeight: '700' },
  list: { flex: 1 },
  listContent: { padding: 20 },
  loading: { color: COLORS.textSecondary, textAlign: 'center', marginTop: 40 },
  empty: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyIcon: { fontSize: 40 },
  emptyText: { color: COLORS.textSecondary, fontSize: 14 },
});
