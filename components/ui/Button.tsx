import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle } from 'react-native';
import { COLORS } from '@/constants/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isDanger = variant === 'danger';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        {
          borderRadius: 14,
          paddingVertical: 15,
          paddingHorizontal: 24,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isPrimary
            ? COLORS.accent
            : isDanger
            ? COLORS.error
            : 'transparent',
          borderWidth: isPrimary ? 0 : 1,
          borderColor: isDanger ? COLORS.error : `${COLORS.accent}33`,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? COLORS.primary : COLORS.accent} />
      ) : (
        <Text
          style={{
            color: isPrimary ? COLORS.primary : isDanger ? COLORS.error : COLORS.textPrimary,
            fontSize: 15,
            fontWeight: '700',
            letterSpacing: 0.3,
          }}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
