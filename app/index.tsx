import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { ARIALogo } from '@/components/ui/ARIALogo';
import { COLORS } from '@/constants/theme';
import { Waveform } from '@/components/voice/Waveform';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);

  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const waveOpacity = useRef(new Animated.Value(0)).current;
  const btnOpacity = useRef(new Animated.Value(0)).current;
  const ring1Scale = useRef(new Animated.Value(1)).current;
  const ring2Scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(ring1Scale, { toValue: 1.08, duration: 1800, useNativeDriver: true }),
        Animated.timing(ring1Scale, { toValue: 1, duration: 1800, useNativeDriver: true }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.delay(400),
        Animated.timing(ring2Scale, { toValue: 1.12, duration: 1800, useNativeDriver: true }),
        Animated.timing(ring2Scale, { toValue: 1, duration: 1800, useNativeDriver: true }),
      ])
    ).start();

    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
      Animated.timing(textOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(waveOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.delay(600),
      Animated.timing(btnOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        router.replace(isAuthenticated ? '/(tabs)/home' : '/(auth)/login');
      }, 2800);
    }
  }, [isLoading, isAuthenticated]);

  return (
    <View style={styles.container}>
      <View style={styles.particlesBg} />
      <View style={styles.center}>
        <Animated.View style={{ transform: [{ scale: logoScale }], opacity: logoOpacity }}>
          <Animated.View style={[styles.ring3, { transform: [{ scale: ring2Scale }] }]} />
          <Animated.View style={[styles.ring2, { transform: [{ scale: ring1Scale }] }]} />
          <View style={styles.ring1}>
            <View style={styles.logoInner}>
              <ARIALogo size={40} />
            </View>
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: textOpacity, alignItems: 'center', marginTop: 32 }}>
          <Text style={styles.appName}>ARIA</Text>
          <Text style={styles.tagline}>Your intelligent executive assistant</Text>
        </Animated.View>

        <Animated.View style={{ opacity: waveOpacity, marginTop: 40 }}>
          <Waveform active={true} />
        </Animated.View>
      </View>
    </View>
  );
}

const RING = 100;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  particlesBg: { position: 'absolute', width, height, backgroundColor: COLORS.primary },
  center: { alignItems: 'center' },
  ring3: {
    position: 'absolute',
    width: RING + 60,
    height: RING + 60,
    borderRadius: (RING + 60) / 2,
    borderWidth: 0.5,
    borderColor: `${COLORS.accent}10`,
    alignSelf: 'center',
    top: -(30),
    left: -(30),
  },
  ring2: {
    position: 'absolute',
    width: RING + 30,
    height: RING + 30,
    borderRadius: (RING + 30) / 2,
    borderWidth: 1,
    borderColor: `${COLORS.accent}20`,
    alignSelf: 'center',
    top: -15,
    left: -15,
  },
  ring1: {
    width: RING,
    height: RING,
    borderRadius: RING / 2,
    borderWidth: 1.5,
    borderColor: `${COLORS.accent}40`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: `${COLORS.accent}15`,
    borderWidth: 1,
    borderColor: `${COLORS.accent}40`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    color: COLORS.textPrimary,
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: 14,
  },
  tagline: {
    color: `${COLORS.textSecondary}99`,
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 8,
  },
});
