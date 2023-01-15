import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  ViewStyle,
  Button,
} from 'react-native';
import Svg, {
  Circle,
  Ellipse,
  G,
  Line,
  Text as SvgText,
  Rect,
} from 'react-native-svg';

function CircleCustom({size, percent, percent2, percent3, percent4}) {
  return (
    <Svg
      width={250}
      height={250}
      style={[{transform: [{rotateZ: '270deg'}]}, styles.circle]}>
      <Circle
        x={50}
        y={50}
        cx={size}
        cy={size}
        r={size}
        stroke="#585FFF"
        strokeWidth="60"
        strokeDasharray={3.14 * 2 * size * 2}
        strokeDashoffset={
          3.14 *
          2 *
          size *
          2 *
          (1 - (percent + percent2 + percent3 + percent4) / 2)
        }
      />
      <Circle
        x={50}
        y={50}
        cx={size}
        cy={size}
        r={size}
        stroke="#8397FF"
        strokeWidth="60"
        strokeDasharray={3.14 * 2 * size * 2}
        strokeDashoffset={
          3.14 * 2 * size * 2 * (1 - (percent + percent2 + percent3) / 2)
        }
      />
      <Circle
        x={50}
        y={50}
        cx={size}
        cy={size}
        r={size}
        stroke="#B9C8FF"
        strokeWidth="60"
        strokeDasharray={3.14 * 2 * size * 2}
        strokeDashoffset={3.14 * 2 * size * 2 * (1 - (percent + percent2) / 2)}
      />

      <Circle
        x={50}
        y={50}
        cx={size}
        cy={size}
        r={size}
        stroke="#D7E0FF"
        strokeWidth="60"
        strokeDasharray={3.14 * 2 * size * 2}
        strokeDashoffset={3.14 * 2 * size * 2 * (1 - percent / 2)}
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  text1: {
    transform: [{rotate: '90deg'}],
    fontSize: 30,
    paddingLeft: 60,
    paddingTop: 30,
    color: 'black',
  },
});

export default CircleCustom;
