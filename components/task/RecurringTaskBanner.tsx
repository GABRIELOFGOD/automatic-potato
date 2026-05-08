import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/theme';

interface RecurringTaskBannerProps {
  question: string;
  onAccept: () => void;
  onSkip: () => void;
}

export function RecurringTaskBanner({ question, onAccept, onSkip }: RecurringTaskBannerProps) {
  return (
    <View
      style={{
        backgroundColor: `${COLORS.accent}11`,
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: `${COLORS.accent}33`,
        marginBottom: 12,
      }}
    >
      <Text style={{ fontSize: 14 }}>🔁</Text>
      <Text style={{ color: COLORS.textPrimary, fontSize: 14, marginTop: 6, marginBottom: 12 }}>
        {question}
      </Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity
          onPress={onAccept}
          style={{
            flex: 1,
            backgroundColor: COLORS.accent,
            borderRadius: 10,
            paddingVertical: 10,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: COLORS.primary, fontWeight: '700', fontSize: 13 }}>Yes, add them</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSkip}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: `${COLORS.accent}33`,
            borderRadius: 10,
            paddingVertical: 10,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: COLORS.textSecondary, fontSize: 13 }}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
