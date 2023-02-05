import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import commonStyles from '../../css/commonStyles';
import CircleCustom from '../../components/CircleCustom';
import {useRecoilState} from 'recoil';
import {
  dailyState,
  exerciseState,
  learningState,
  mindCareState,
} from '../../recoil/atom';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const circleSize = 80;
const Complete = () => {
  const [daily, setDaily] = useRecoilState(dailyState);
  const [exercise, setExercise] = useRecoilState(exerciseState);
  const [learning, setLearning] = useRecoilState(learningState);
  const [mindCare, setMindCare] = useRecoilState(mindCareState);
  const allClear = daily + exercise + learning + mindCare;

  return (
    <View style={styles.container}>
      <View style={{height: 35}} />
      <CircleCustom
        size={circleSize}
        percent={learning / allClear.toFixed(2)} //학습 - 학습 루틴 완료 횟수 / 전체 루틴 완료 횟수 = 결과값.toFixed(2)
        percent2={mindCare / allClear.toFixed(2)} // 마음관리 - 마음관리 루틴 완료 횟수 / 전체 루틴 완료 횟수 = 결과값.toFixed(2)
        percent3={exercise / allClear.toFixed(2)} //운동 - 운동 루틴 완료 횟수 / 전체 루틴 완료 횟수 = 결과값.toFixed(2)
        percent4={daily / allClear.toFixed(2)} // 일상 - 일상 루틴 완료 횟수 / 전체 루틴 완료 횟수 = 결과값.toFixed(2)
      />
      <View style={styles.view1}>
        <View style={styles.view2}>
          {/* 가장 퍼센트 높은 카테고리 */}
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
        <Text style={styles.tilteText}>
          일상 {(daily / allClear.toFixed(2)) * 100}%
        </Text>
        {/* 일상 루틴 완료 횟수 / 전체 루틴 완료 횟수 = 결과값.toFixed(2) * 100 */}
        <Text style={[styles.numText, {marginLeft: 55}]}>{daily}회</Text>
        {/* 일상 루틴 완료 횟수 받아서 설정 */}
        <View style={commonStyles.row}>
          <Svg width={20} height={20} style={styles.numText}>
            <Circle x={10} y={10} r={8} fill="#8397FF" />
          </Svg>
          <Text style={styles.tilteText}>
            운동 {(exercise / allClear.toFixed(2)) * 100}%
          </Text>
          {/* 운동 루틴 완료 횟수 / 전체 루틴 완료 횟수 = 결과값.toFixed(2) * 100 */}
          <Text style={styles.numText}>{exercise}회</Text>
          {/* 운동 루틴 완료 횟수 받아서 설정 */}
        </View>
      </View>
      <View style={commonStyles.spacing3} />
      <View style={[commonStyles.row, styles.view3]}>
        <Svg width={20} height={20}>
          <Circle x={10} y={10} r={8} fill="#B9C8FF" />
        </Svg>
        <Text style={styles.tilteText}>
          마음관리 {(mindCare / allClear.toFixed(2)) * 100}%
        </Text>
        {/* 마음관리 루틴 완료 횟수 / 전체 루틴 완료 횟수 = 결과값.toFixed(2) * 100 */}
        <Text style={styles.numText}>{mindCare}회</Text>
        {/* 마음관리 루틴 완료 횟수 받아서 설정 */}
        <Svg width={20} height={20} style={styles.numText}>
          <Circle x={10} y={10} r={8} fill="#D7E0FF" />
        </Svg>
        <Text style={styles.tilteText}>
          학습 {(learning / allClear.toFixed(2)) * 100}%
        </Text>
        {/* 학습 루틴 완료 횟수 / 전체 루틴 완료 횟수 = 결과값.toFixed(2) * 100 */}
        <Text style={styles.numText}>{learning}회</Text>
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
    marginLeft: responsiveWidth(3),
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
