import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/theme';

const HEIGHTS = [8, 14, 20, 26, 20, 28, 14, 20, 26, 14, 20, 8, 14, 26, 20];

interface WaveformProps {
  active: boolean;
}

export function Waveform({ active }: WaveformProps) {
  const anims = useRef(HEIGHTS.map(() => new Animated.Value(0.3))).current;

  useEffect(() => {
    if (active) {
      const animations = anims.map((anim, i) =>
        Animated.loop(
          Animated.sequence([
            Animated.delay(i * 80),
            Animated.timing(anim, { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.timing(anim, { toValue: 0.3, duration: 400, useNativeDriver: true }),
          ])
        )
      );
      animations.forEach((a) => a.start());
      return () => animations.forEach((a) => a.stop());
    } else {
      anims.forEach((a) =>
        Animated.timing(a, { toValue: 0.3, duration: 300, useNativeDriver: true }).start()
      );
    }
  }, [active, anims]);

  return (
    <View style={styles.container}>
      {HEIGHTS.map((h, i) => (
        <Animated.View
          key={i}
          style={[
            styles.bar,
            { height: h, transform: [{ scaleY: anims[i] }] },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 3, height: 32 },
  bar: { width: 3, borderRadius: 2, backgroundColor: COLORS.accent, opacity: 0.7 },
});
