// import React from 'react';
// import Svg, { Path, Circle } from 'react-native-svg';
import { Text, View } from 'react-native';
// import { COLORS } from '@/constants/theme';

interface ARIALogoProps {
  size?: number;
}

export function ARIALogo({ size = 36 }: ARIALogoProps) {
  // return (
  //   <View style={{ width: size, height: size }}>
  //     <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
  //       <Path
  //         d="M18 4 L28 28 L18 22 L8 28 Z"
  //         stroke={COLORS.accent}
  //         strokeWidth={1.5}
  //         strokeLinejoin="round"
  //         fill="none"
  //       />
  //       <Path
  //         d="M12 20 L24 20"
  //         stroke={COLORS.accent}
  //         strokeWidth={1.5}
  //         strokeLinecap="round"
  //         opacity={0.5}
  //       />
  //       <Circle cx={18} cy={18} r={2} fill={COLORS.accent} opacity={0.8} />
  //     </Svg>
  //   </View>
  // );
  return (
    <View>
      <Text>Aria Logo</Text>
    </View>
  )
}
