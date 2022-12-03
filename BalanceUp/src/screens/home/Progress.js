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
import commonStyles from '../../css/commonStyles';
import KeyumIcon from '../../resource/image/KeyumEmoticon.png';
import Svg, {
  Circle,
  Ellipse,
  G,
  Line,
  Text as SvgText,
  Rect,
} from 'react-native-svg';
import * as ProgressLib from 'react-native-progress';

const todoTmp = ['item1', 'item2', 'item3'];
const todoTmpSub = ['itemSub1', 'itemSub2', 'itemSub3'];

const Progress = ({navigation}) => {
  return (
    <View>
      <View style={commonStyles.spacing2} />
      <Svg height={80} style={styles.svg1}>
        <Rect
          x={40}
          y={0}
          width={300}
          height={60}
          style={styles.svg1}
          strokeWidth="2"
          stroke="#D9D9D9"
          fill="none"
        />
        <SvgText
          x="55"
          y="20"
          text-anchor="middle"
          fill="black"
          style={styles.mainText1}>
          진행도
        </SvgText>
        <SvgText
          x="295"
          y="20"
          text-anchor="middle"
          fill="black"
          style={styles.mainText1}>
          50%
        </SvgText>
        <View style={styles.progressBar}>
          <ProgressLib.Bar
            progress={0.3}
            width={270}
            height={12}
            color="black"
            unfilledColor="#D9D9D9"
            borderWidth={0}
            borderRadius={50}
          />
        </View>
      </Svg>
      <View style={commonStyles.spacing2} />
      {todoTmp.map((value, index) => (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={commonStyles.row}>
            <View style={styles.img1}>
              <Image source={KeyumIcon} style={styles.img2} />
            </View>
            <View style={styles.aimText1}>
              <Text style={commonStyles.boldText}>item1</Text>
              <Text>{todoTmpSub[index]}</Text>
            </View>

            <Svg height={80} style={styles.svg2}>
              <Circle cx="30" cy="30" r="25" fill="#626262" />
              <SvgText
                x="15"
                y="35"
                text-anchor="middle"
                fill="black"
                style={styles.mainText2}>
                완료
              </SvgText>
            </Svg>
            <Svg height={80} style={styles.svg3}>
              <Rect width={50} height={60} fill="#626262" />
              <SvgText
                x="15"
                y="35"
                text-anchor="middle"
                fill="black"
                style={styles.mainText2}>
                수정
              </SvgText>
            </Svg>
            <Svg height={80} style={styles.svg3}>
              <Rect width={50} height={60} fill="#626262" />
              <SvgText
                x="15"
                y="35"
                text-anchor="middle"
                fill="black"
                style={styles.mainText2}>
                삭제
              </SvgText>
            </Svg>
          </View>
        </ScrollView>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mainText1: {
    fontSize: 12,
    color: 'black',
    zIndex: 30,
    fontWeight: 600,
  },
  mainText2: {
    fontSize: 15,
    color: 'black',
    zIndex: 30,
  },
  svg1: {
    zIndex: 10,
  },
  svg2: {
    width: 100,
    zIndex: 10,
  },
  svg3: {
    width: 50,
    zIndex: 10,
  },
  aimText1: {
    paddingLeft: 50,
    paddingRight: 100,
  },
  progressBar: {
    paddingLeft: 50,
    paddingTop: 35,
  },
});

export default Progress;
