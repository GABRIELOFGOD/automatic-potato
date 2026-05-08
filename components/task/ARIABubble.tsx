import React from 'react';
import { View, Text } from 'react-native';
import { ARIALogo } from '@/components/ui/ARIALogo';
import { COLORS } from '@/constants/theme';

interface ARIABubbleProps {
  message: string;
  type?: 'greeting' | 'question' | 'insight';
}

export function ARIABubble({ message, type = 'greeting' }: ARIABubbleProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        backgroundColor: `${COLORS.accent}0D`,
        borderRadius: 14,
        borderLeftWidth: 2,
        borderLeftColor: COLORS.accent,
        padding: 14,
        marginBottom: 12,
      }}
    >
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: `${COLORS.accent}1A`,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ARIALogo size={16} />
      </View>
      <View style={{ flex: 1 }}>
        {type === 'question' && (
          <Text style={{ color: COLORS.accent, fontSize: 11, fontWeight: '700', marginBottom: 4, letterSpacing: 0.5 }}>
            ARIA ASKS
          </Text>
        )}
        {type === 'insight' && (
          <Text style={{ color: COLORS.medium, fontSize: 11, fontWeight: '700', marginBottom: 4, letterSpacing: 0.5 }}>
            💡 INSIGHT
          </Text>
        )}
        <Text style={{ color: COLORS.textPrimary, fontSize: 14, lineHeight: 20 }}>{message}</Text>
      </View>
    </View>
  );
}
