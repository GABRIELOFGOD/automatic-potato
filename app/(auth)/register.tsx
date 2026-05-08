import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform
} from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { ARIALogo } from '@/components/ui/ARIALogo';
import { COLORS } from '@/constants/theme';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all fields'); return;
    }
    setError('');
    setLoading(true);
    try {
      const { user, tokens } = await authService.register({ firstName, lastName, email, password });
      await setAuth(user, tokens);
      router.replace('/(tabs)/home');
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View style={styles.logoWrap}><ARIALogo size={32} /></View>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>Meet ARIA — your new executive assistant</Text>
        </View>

        {error ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <InputField label="First Name" value={firstName} onChangeText={setFirstName} placeholder="Gabriel" />
        <InputField label="Last Name" value={lastName} onChangeText={setLastName} placeholder="Ayodele" />
        <InputField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="you@example.com" />
        <InputField label="Password" value={password} onChangeText={setPassword} isPassword placeholder="Min 8 characters" />

        <Button label="Create Account" onPress={handleRegister} loading={loading} style={{ marginTop: 8 }} />

        <TouchableOpacity style={styles.switchRow} onPress={() => router.back()}>
          <Text style={styles.switchText}>Already have an account? </Text>
          <Text style={[styles.switchText, { color: COLORS.accent }]}>Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  content: { padding: 24, paddingTop: 80, flexGrow: 1 },
  header: { alignItems: 'center', marginBottom: 36 },
  logoWrap: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: `${COLORS.accent}15`,
    borderWidth: 1, borderColor: `${COLORS.accent}30`,
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  title: { color: COLORS.textPrimary, fontSize: 26, fontWeight: '700', marginBottom: 6 },
  subtitle: { color: COLORS.textSecondary, fontSize: 14 },
  errorBanner: {
    backgroundColor: `${COLORS.error}15`,
    borderRadius: 10, borderWidth: 1,
    borderColor: `${COLORS.error}30`,
    padding: 12, marginBottom: 16,
  },
  errorText: { color: COLORS.error, fontSize: 13 },
  switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 32 },
  switchText: { color: COLORS.textSecondary, fontSize: 14 },
});
