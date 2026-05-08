import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { COLORS } from '@/constants/theme';

interface SettingRowProps {
  icon: string;
  label: string;
  value?: string;
  onPress: () => void;
  danger?: boolean;
}

function SettingRow({ icon, label, value, onPress, danger = false }: SettingRowProps) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.rowIcon}>{icon}</Text>
      <Text style={[styles.rowLabel, danger && { color: COLORS.error }]}>{label}</Text>
      <View style={styles.rowRight}>
        {value && <Text style={styles.rowValue}>{value}</Text>}
        <Text style={styles.chevron}>›</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const { user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: async () => {
        await clearAuth();
        router.replace('/(auth)/login');
      }},
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </Text>
          </View>
          <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <View style={styles.planRow}>
            <View style={styles.planBadge}>
              <Text style={styles.planText}>{user?.plan ?? 'FREE'} PLAN</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <View style={styles.card}>
            <SettingRow icon="✏️" label="Edit Profile" onPress={() => {}} />
            <SettingRow icon="🔒" label="Change Password" onPress={() => {}} />
            <SettingRow icon="🌍" label="Timezone" value={user?.timezone ?? 'UTC'} onPress={() => {}} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INTEGRATIONS</Text>
          <View style={styles.card}>
            <SettingRow
              icon="📅"
              label="Google Calendar"
              value={user?.googleConnected ? '✓ Connected' : 'Connect'}
              onPress={() => {}}
            />
            <SettingRow icon="📧" label="Gmail" value="Pro only" onPress={() => {}} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUBSCRIPTION</Text>
          <View style={styles.card}>
            <SettingRow icon="⭐" label="Upgrade Plan" onPress={() => {}} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DANGER ZONE</Text>
          <View style={styles.card}>
            <SettingRow icon="🚪" label="Sign Out" onPress={handleLogout} danger />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  header: { alignItems: 'center', padding: 24, paddingBottom: 32 },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: `${COLORS.accent}20`,
    borderWidth: 2, borderColor: COLORS.accent,
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  avatarText: { color: COLORS.accent, fontSize: 26, fontWeight: '700' },
  name: { color: COLORS.textPrimary, fontSize: 20, fontWeight: '700' },
  email: { color: COLORS.textSecondary, fontSize: 13, marginTop: 4 },
  planRow: { marginTop: 12 },
  planBadge: {
    backgroundColor: `${COLORS.accent}15`,
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 6,
    borderWidth: 1, borderColor: `${COLORS.accent}30`,
  },
  planText: { color: COLORS.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { color: COLORS.textMuted, fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 8 },
  card: { backgroundColor: COLORS.card, borderRadius: 14, overflow: 'hidden', borderWidth: 0.5, borderColor: `${COLORS.accent}15` },
  row: {
    flexDirection: 'row', alignItems: 'center',
    padding: 16, borderBottomWidth: 0.5,
    borderBottomColor: `${COLORS.accent}10`,
  },
  rowIcon: { fontSize: 18, marginRight: 12 },
  rowLabel: { flex: 1, color: COLORS.textPrimary, fontSize: 15 },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rowValue: { color: COLORS.textSecondary, fontSize: 13 },
  chevron: { color: COLORS.textSecondary, fontSize: 18 },
});
