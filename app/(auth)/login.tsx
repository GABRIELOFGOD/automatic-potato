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

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleLogin = async () => {
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setError('');
    setLoading(true);
    try {
      const { user, tokens } = await authService.login({ email, password });
      await setAuth(user, tokens);
      router.replace('/(tabs)/home');
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View style={styles.logoWrap}>
            <ARIALogo size={32} />
          </View>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue with ARIA</Text>
        </View>

        <View style={styles.form}>
          {error ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="you@example.com"
          />
          <InputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            isPassword
            placeholder="••••••••"
          />

          <Button label="Sign In" onPress={handleLogin} loading={loading} style={{ marginTop: 8 }} />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.googleBtn}>
            <Text style={styles.googleText}>🔐  Continue with Google</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.switchRow} onPress={() => router.push('/(auth)/register')}>
          <Text style={styles.switchText}>Don't have an account? </Text>
          <Text style={[styles.switchText, { color: COLORS.accent }]}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  content: { padding: 24, paddingTop: 80, flexGrow: 1 },
  header: { alignItems: 'center', marginBottom: 40 },
  logoWrap: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: `${COLORS.accent}15`,
    borderWidth: 1, borderColor: `${COLORS.accent}30`,
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  title: { color: COLORS.textPrimary, fontSize: 26, fontWeight: '700', marginBottom: 6 },
  subtitle: { color: COLORS.textSecondary, fontSize: 14 },
  form: { gap: 0 },
  errorBanner: {
    backgroundColor: `${COLORS.error}15`,
    borderRadius: 10, borderWidth: 1,
    borderColor: `${COLORS.error}30`,
    padding: 12, marginBottom: 16,
  },
  errorText: { color: COLORS.error, fontSize: 13 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 20 },
  dividerLine: { flex: 1, height: 0.5, backgroundColor: `${COLORS.accent}20` },
  dividerText: { color: COLORS.textSecondary, fontSize: 12 },
  googleBtn: {
    backgroundColor: COLORS.card,
    borderRadius: 14, padding: 15,
    alignItems: 'center',
    borderWidth: 1, borderColor: `${COLORS.accent}22`,
  },
  googleText: { color: COLORS.textPrimary, fontSize: 15, fontWeight: '500' },
  switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 32 },
  switchText: { color: COLORS.textSecondary, fontSize: 14 },
});
