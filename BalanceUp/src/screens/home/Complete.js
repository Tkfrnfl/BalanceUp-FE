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
import ProgressCircle from 'react-native-progress-circle';
import * as Progress from 'react-native-progress';
import CircleCustom from '../../components/CircleCustom';
import {Shadow} from 'react-native-shadow-2';

const circleSize = 80;
const percent = 0.25;
const Complete = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={commonStyles.spacing3} />
      <CircleCustom
        size={circleSize}
        percent={0.15}
        percent2={0.2}
        percent3={0.3}
        percent4={0.35}
      />

      <View style={styles.view1}>
        <View style={styles.view2}>
          <Text style={styles.mainText}>일상</Text>
          <Text style={styles.mainText6}>35%</Text>
        </View>
      </View>
      <View style={commonStyles.spacing2} />
      <View style={commonStyles.spacing2} />
      <View style={commonStyles.spacing2} />
      <View style={commonStyles.spacing3} />

      <View style={[commonStyles.row, styles.view3]}>
        <Svg width={20} height={20}>
          <Circle x={10} y={10} r={8} fill="#585FFF" />
        </Svg>
        <Text style={styles.mainText2}>&nbsp;&nbsp;일상 35% </Text>
        <Text style={{marginLeft: 55}}> 21회</Text>

        <View style={commonStyles.row}>
          <Svg width={20} height={20} style={styles.mainText3}>
            <Circle x={10} y={10} r={8} fill="#8397FF" />
          </Svg>
          <Text style={styles.mainText2}>&nbsp;&nbsp;일상 35% </Text>
          <Text style={styles.mainText3}> 21회</Text>
        </View>
      </View>
      <View style={commonStyles.spacing3} />
      <View style={[commonStyles.row, styles.view3]}>
        <Svg width={20} height={20}>
          <Circle x={10} y={10} r={8} fill="#B9C8FF" />
        </Svg>
        <Text style={styles.mainText2}>&nbsp;&nbsp;마음관리 35% </Text>
        <Text style={styles.mainText3}> 21회</Text>

        <Svg width={20} height={20} style={styles.mainText3}>
          <Circle x={10} y={10} r={8} fill="#D7E0FF" />
        </Svg>
        <Text style={styles.mainText2}>&nbsp;&nbsp;학습 35% </Text>
        <Text style={styles.mainText3}> 21회</Text>
      </View>
    </View>
  );
};

export default Complete;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FAFBFF',
    flex: 1,
  },
  mainText: {
    fontSize: 15,
    color: '#232323',
    fontWeight: '600',
  },
  mainText2: {
    fontSize: 13,
    color: '#232323',
    fontWeight: '600',
  },
  mainText3: {
    marginLeft: 30,
  },
  mainText6: {
    fontSize: 15,
    color: '#585FFF',
    fontWeight: '600',
  },
  view1: {
    width: 90,
    height: 90,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3, // changed to a greater value
    borderRadius: 150 / 2,
    borderColor: 'black',
    zIndex: 99, // added zIndex
    backgroundColor: 'white', // added a background color
    marginTop: -230,
    marginLeft: -180,
  },
  view2: {
    marginTop: 25,
    marginLeft: 30,
  },
  view3: {
    marginTop: -15,
    position: 'relative',
  },
});
