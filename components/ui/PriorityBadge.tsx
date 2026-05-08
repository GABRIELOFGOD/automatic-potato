import React from 'react';
import { View, Text } from 'react-native';
import { Priority } from '@/types';
import { COLORS } from '@/constants/theme';

interface PriorityBadgeProps {
  priority: Priority;
}

const config: Record<Priority, { label: string; color: string }> = {
  HIGH: { label: 'HIGH', color: COLORS.high },
  MEDIUM: { label: 'MED', color: COLORS.medium },
  LOW: { label: 'LOW', color: COLORS.low },
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const { label, color } = config[priority];
  return (
    <View
      style={{
        backgroundColor: `${color}22`,
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderWidth: 1,
        borderColor: `${color}44`,
      }}
    >
      <Text style={{ color, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 }}>{label}</Text>
    </View>
  );
}
