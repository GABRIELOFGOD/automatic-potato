import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, View, Animated, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/theme';

interface MicButtonProps {
  isRecording: boolean;
  isProcessing: boolean;
  onPress: () => void;
}

export function MicButton({ isRecording, isProcessing, onPress }: MicButtonProps) {
  const pulse1 = useRef(new Animated.Value(1)).current;
  const pulse2 = useRef(new Animated.Value(1)).current;
  const pulse3 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isRecording) {
      const animate = (anim: Animated.Value, delay: number) =>
        Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(anim, { toValue: 1.4, duration: 900, useNativeDriver: true }),
            Animated.timing(anim, { toValue: 1, duration: 900, useNativeDriver: true }),
          ])
        ).start();
      animate(pulse1, 0);
      animate(pulse2, 300);
      animate(pulse3, 600);
    } else {
      [pulse1, pulse2, pulse3].forEach((p) => {
        p.stopAnimation();
        Animated.timing(p, { toValue: 1, duration: 300, useNativeDriver: true }).start();
      });
    }
  }, [isRecording, pulse1, pulse2, pulse3]);

  const bgColor = isRecording ? '#EF4444' : isProcessing ? COLORS.accentDim : COLORS.accent;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.ring, styles.ring3, { transform: [{ scale: pulse3 }], opacity: 0.08 }]}
      />
      <Animated.View
        style={[styles.ring, styles.ring2, { transform: [{ scale: pulse2 }], opacity: 0.14 }]}
      />
      <Animated.View
        style={[styles.ring, styles.ring1, { transform: [{ scale: pulse1 }], opacity: 0.2 }]}
      />
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        disabled={isProcessing}
        style={[styles.button, { backgroundColor: bgColor }]}
      >
        <View style={styles.micIcon}>
          {isProcessing ? (
            <View style={styles.processingDots}>
              {[0, 1, 2].map((i) => (
                <View key={i} style={styles.dot} />
              ))}
            </View>
          ) : (
            <>
              <View style={[styles.micBody, { borderColor: COLORS.primary }]} />
              <View style={[styles.micStand, { backgroundColor: COLORS.primary }]} />
              <View style={[styles.micBase, { backgroundColor: COLORS.primary }]} />
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const BTN = 84;
const styles = StyleSheet.create({
  container: { width: BTN + 80, height: BTN + 80, alignItems: 'center', justifyContent: 'center' },
  ring: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: COLORS.accent,
  },
  ring1: { width: BTN + 24, height: BTN + 24 },
  ring2: { width: BTN + 48, height: BTN + 48 },
  ring3: { width: BTN + 72, height: BTN + 72 },
  button: {
    width: BTN,
    height: BTN,
    borderRadius: BTN / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  micIcon: { alignItems: 'center' },
  micBody: {
    width: 16,
    height: 24,
    borderRadius: 8,
    borderWidth: 2.5,
    backgroundColor: 'transparent',
  },
  micStand: { width: 2, height: 8, marginTop: 2 },
  micBase: { width: 14, height: 2, borderRadius: 1 },
  processingDots: { flexDirection: 'row', gap: 5 },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: COLORS.primary,
  },
});
