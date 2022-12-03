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

function CircleCustom({size, percent}) {
  return (
    <Svg style={[{transform: [{rotateZ: '270deg'}]}, styles.circle]}>
      <Circle
        x={10}
        y={10}
        cx={size}
        cy={size}
        r={size}
        stroke="gray"
        strokeWidth="2.5"
      />
      <Circle
        x={10}
        y={10}
        cx={size}
        cy={size}
        r={size}
        stroke="black"
        strokeWidth="5"
        strokeDasharray={3.14 * 2 * size * 2}
        strokeDashoffset={3.14 * 2 * size * 2 * (1 - percent / 2)}
      />
      <Text style={styles.text1}>{percent}</Text>
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
