import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, TextInputProps } from 'react-native';
import { COLORS } from '@/constants/theme';

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
  isPassword?: boolean;
}

export function InputField({ label, error, isPassword = false, ...props }: InputFieldProps) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(isPassword);

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ color: COLORS.textSecondary, fontSize: 12, marginBottom: 6, letterSpacing: 0.5 }}>
        {label.toUpperCase()}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: COLORS.card,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: focused ? COLORS.accent : `${COLORS.accent}22`,
          paddingHorizontal: 16,
        }}
      >
        <TextInput
          {...props}
          secureTextEntry={hidden}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            color: COLORS.textPrimary,
            fontSize: 15,
            paddingVertical: 14,
          }}
          placeholderTextColor={COLORS.textMuted}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setHidden(!hidden)}>
            <Text style={{ color: COLORS.accent, fontSize: 12 }}>{hidden ? 'SHOW' : 'HIDE'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error ? (
        <Text style={{ color: COLORS.error, fontSize: 12, marginTop: 4 }}>{error}</Text>
      ) : null}
    </View>
  );
}
