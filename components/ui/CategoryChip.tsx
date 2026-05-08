import React from 'react';
import { View, Text } from 'react-native';
import { TaskCategory } from '@/types';
import { COLORS } from '@/constants/theme';

const CATEGORY_CONFIG: Record<TaskCategory, { icon: string; color: string }> = {
  WORK: { icon: '💼', color: '#7C3AED' },
  PERSONAL: { icon: '👤', color: COLORS.accent },
  HEALTH: { icon: '❤️', color: COLORS.low },
  COMMUNICATION: { icon: '💬', color: COLORS.medium },
};

export function CategoryChip({ category }: { category: TaskCategory }) {
  const { icon, color } = CATEGORY_CONFIG[category];
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <Text style={{ fontSize: 11 }}>{icon}</Text>
      <Text style={{ color, fontSize: 11, fontWeight: '500' }}>{category}</Text>
    </View>
  );
}
