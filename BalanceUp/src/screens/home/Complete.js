import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import commonStyles from '../../css/commonStyles';
import CircleCustom from '../../components/CircleCustom';

const circleSize = 80;
const Complete = () => {
  return (
    <View style={styles.container}>
      <View style={{height: 35}} />
      <CircleCustom
        size={circleSize}
        percent={0.3} //학습 - 학습 루틴 완료 횟수 / 전체 루틴 완료 횟수 = 결과값.toFixed(2)
        percent2={0.09} // 마음관리 - 마음관리 루틴 완료 횟수 / 전체 루틴 완료 횟수 = 결과값.toFixed(2)
        percent3={0.35} //운동 - 운동 루틴 완료 횟수 / 전체 루틴 완료 횟수 = 결과값.toFixed(2)
        percent4={0.35} // 일상 - 일상 루틴 완료 횟수 / 전체 루틴 완료 횟수 = 결과값.toFixed(2)
      />
      <View style={styles.view1}>
        <View style={styles.view2}>
          <Text style={styles.mainText}>일상</Text>
          <Text style={styles.percentText}>35%</Text>
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
        <Text style={styles.tilteText}> &nbsp;&nbsp;일상 35%</Text>
        {/* 일상 루틴 완료 횟수 / 전체 루틴 완료 횟수 = 결과값.toFixed(2) * 100 */}
        <Text style={[styles.numText, {marginLeft: 55}]}>21회</Text>
        {/* 일상 루틴 완료 횟수 받아서 설정 */}
        <View style={commonStyles.row}>
          <Svg width={20} height={20} style={styles.numText}>
            <Circle x={10} y={10} r={8} fill="#8397FF" />
          </Svg>
          <Text style={styles.tilteText}> &nbsp;&nbsp;운동 3%</Text>
          {/* 운동 루틴 완료 횟수 / 전체 루틴 완료 횟수 = 결과값.toFixed(2) * 100 */}
          <Text style={styles.numText}>5회</Text>
          {/* 운동 루틴 완료 횟수 받아서 설정 */}
        </View>
      </View>
      <View style={commonStyles.spacing3} />
      <View style={[commonStyles.row, styles.view3]}>
        <Svg width={20} height={20}>
          <Circle x={10} y={10} r={8} fill="#B9C8FF" />
        </Svg>
        <Text style={styles.tilteText}> &nbsp;&nbsp;마음관리 9%</Text>
        {/* 마음관리 루틴 완료 횟수 / 전체 루틴 완료 횟수 = 결과값.toFixed(2) * 100 */}
        <Text style={styles.numText}>18회</Text>
        {/* 마음관리 루틴 완료 횟수 받아서 설정 */}
        <Svg width={20} height={20} style={styles.numText}>
          <Circle x={10} y={10} r={8} fill="#D7E0FF" />
        </Svg>
        <Text style={styles.tilteText}> &nbsp;&nbsp;학습 35%</Text>
        {/* 학습 루틴 완료 횟수 / 전체 루틴 완료 횟수 = 결과값.toFixed(2) * 100 */}
        <Text style={styles.numText}>21회</Text>
        {/* 학습 루틴 완료 횟수 받아서 설정 */}
      </View>
    </View>
  );
};

export default Complete;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderTopColor: 'red',
    backgroundColor: '#ffffff',
    flex: 1,
  },
  mainText: {
    fontSize: 16,
    color: '#232323',
    fontFamily: 'Pretendard-Bold',
  },
  tilteText: {
    fontSize: 14,
    color: '#232323',
    fontFamily: 'Pretendard-Medium',
  },
  numText: {
    color: '#888888',
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    marginLeft: 30,
  },
  percentText: {
    bottom: 1,
    right: 3,
    fontSize: 16,
    color: '#585FFF',
    fontFamily: 'Pretendard-Bold',
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
