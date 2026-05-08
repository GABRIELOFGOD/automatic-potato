import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ARIATask, Priority } from '@/types';
import { PriorityBadge } from '@/components/ui/PriorityBadge';
import { CategoryChip } from '@/components/ui/CategoryChip';
import { COLORS } from '@/constants/theme';

const PRIORITY_BORDER: Record<Priority, string> = {
  HIGH: COLORS.high,
  MEDIUM: COLORS.medium,
  LOW: COLORS.low,
};

interface TaskCardProps {
  task: ARIATask;
  onEdit?: () => void;
  onRemove?: () => void;
  onToggleCalendar?: () => void;
  showActions?: boolean;
}

export function TaskCard({
  task,
  onEdit,
  onRemove,
  onToggleCalendar,
  showActions = true,
}: TaskCardProps) {
  return (
    <View
      style={{
        backgroundColor: COLORS.card,
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
        borderLeftWidth: 3,
        borderLeftColor: PRIORITY_BORDER[task.priority],
        borderWidth: 1,
        borderColor: `${COLORS.accent}11`,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text style={{ color: COLORS.textPrimary, fontSize: 15, fontWeight: '600', marginBottom: 6 }}>
            {task.title}
          </Text>
          {task.description ? (
            <Text style={{ color: COLORS.textSecondary, fontSize: 12, marginBottom: 6 }} numberOfLines={2}>
              {task.description}
            </Text>
          ) : null}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <PriorityBadge priority={task.priority} />
            <CategoryChip category={task.category} />
            {task.suggestedTime ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                <Text style={{ fontSize: 10 }}>🕐</Text>
                <Text style={{ color: COLORS.accent, fontSize: 11 }}>{task.suggestedTime}</Text>
              </View>
            ) : null}
            {task.estimatedDuration ? (
              <Text style={{ color: COLORS.textSecondary, fontSize: 11 }}>
                ~{task.estimatedDuration}min
              </Text>
            ) : null}
          </View>
        </View>
        {showActions && (
          <View style={{ gap: 8, alignItems: 'flex-end' }}>
            {onToggleCalendar && (
              <TouchableOpacity onPress={onToggleCalendar}>
                <Text style={{ fontSize: 18 }}>{task.requiresCalendarBlock ? '📅' : '📋'}</Text>
              </TouchableOpacity>
            )}
            {onEdit && (
              <TouchableOpacity onPress={onEdit}>
                <Text style={{ color: COLORS.accent, fontSize: 12 }}>Edit</Text>
              </TouchableOpacity>
            )}
            {onRemove && (
              <TouchableOpacity onPress={onRemove}>
                <Text style={{ color: COLORS.error, fontSize: 12 }}>Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
