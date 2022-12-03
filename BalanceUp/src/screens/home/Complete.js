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
import commonStyles from '../../css/commonStyles';
import KeyumIcon from '../../resource/image/KeyumEmoticon.png';
import ProgressCircle from 'react-native-progress-circle';
import * as Progress from 'react-native-progress';
import CircleCustom from '../../components/CircleCustom';

const circleSize = 50;
const percent = 0.25;
const Complete = ({navigation}) => {
  return (
    <View style={styles.text}>
      <View style={[commonStyles.row, styles.row]}>
        <CircleCustom size={circleSize} percent={percent} />
        <CircleCustom size={circleSize} percent={percent} />
      </View>
      <View style={[commonStyles.row, styles.text]}>
        <Text>운동</Text>
        <View style={commonStyles.rowSpacing} />
        <Text>학습</Text>
      </View>
      <View style={[commonStyles.row, styles.row]}>
        <CircleCustom size={circleSize} percent={percent} />
        <CircleCustom size={circleSize} percent={percent} />
      </View>
      <View style={[commonStyles.row, styles.text]}>
        <Text>운동</Text>
        <View style={commonStyles.rowSpacing} />
        <Text>학습</Text>
      </View>
    </View>
  );
};

export default Complete;

const styles = StyleSheet.create({
  row: {
    height: 150,
    width: 150,
  },
  text:{
    marginLeft:50,
  },
  // circle: {
  //   marginLeft: 20,
  //   marginBottom: 10,
  // },
});
