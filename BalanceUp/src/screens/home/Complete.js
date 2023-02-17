import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Icon from '../../resource/image/Common/icon.svg';
import CircleCustom from '../../components/CircleCustom';
import {useRecoilState} from 'recoil';
import {
  dailyState,
  exerciseState,
  learningState,
  mindCareState,
} from '../../recoil/atom';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const circleSize = 80;
const Complete = () => {
  const [topTitle, setTopTitle] = useState('');

  const [daily, setDaily] = useRecoilState(dailyState);
  const [exercise, setExercise] = useRecoilState(exerciseState);
  const [learning, setLearning] = useRecoilState(learningState);
  const [mindCare, setMindCare] = useRecoilState(mindCareState);

  const allClear = daily + exercise + learning + mindCare;
  const topRoutine = Math.max(daily, exercise, learning, mindCare);

  useEffect(() => {
    let titleArr = ['일상', '운동', '마음관리', '학습'];
    let engArr = [daily, exercise, mindCare, learning];

    for (let i = 0; i < titleArr.length; i++) {
      if (topRoutine === engArr[i]) {
        setTopTitle(titleArr[i]);
        break;
      }
    }
  }, [daily, exercise, mindCare, learning]);

  const routineData = [
    {
      id: 1,
      title: '일상',
      count: daily,
      color: '#585FFF',
    },
    {
      id: 2,
      title: '운동',
      count: exercise,
      color: '#8397FF',
    },
    {
      id: 3,
      title: '마음관리',
      count: mindCare,
      color: '#B9C8FF',
    },
    {
      id: 4,
      title: '학습',
      count: learning,
      color: '#D7E0FF',
    },
  ];

  return allClear > 0 ? (
    <View style={styles.container}>
      <View style={{height: 35}} />
      <CircleCustom
        size={circleSize}
        percent={learning / allClear.toFixed(2)} //학습 - 학습 루틴 완료 횟수 / 전체 루틴 완료 횟수 = 결과값.toFixed(2)
        percent2={mindCare / allClear.toFixed(2)} // 마음관리 - 마음관리 루틴 완료 횟수 / 전체 루틴 완료 횟수 = 결과값.toFixed(2)
        percent3={exercise / allClear.toFixed(2)} //운동 - 운동 루틴 완료 횟수 / 전체 루틴 완료 횟수 = 결과값.toFixed(2)
        percent4={daily / allClear.toFixed(2)} // 일상 - 일상 루틴 완료 횟수 / 전체 루틴 완료 횟수 = 결과값.toFixed(2)
      />
      <View
        style={[
          styles.dailyView,
          {top: topTitle === '운동' ? responsiveHeight(20) : null},
          {left: topTitle === '마음관리' ? responsiveWidth(45) : null},
          {bottom: topTitle === '마음관리' ? responsiveHeight(-19) : null},
          {right: topTitle === '학습' ? responsiveHeight(-21) : null},
        ]}>
        <View style={styles.categotySheet}>
          {/* 가장 퍼센트 높은 카테고리 */}
          <Text
            style={[
              styles.topRoutineText,
              {right: topTitle === '마음관리' ? responsiveWidth(2.5) : -2},
            ]}>
            {topTitle}
          </Text>
          <Text
            style={[
              styles.percentText,
              {left: topTitle === '학습' ? responsiveWidth(0) : null},
            ]}>
            {Math.round((topRoutine / allClear).toFixed(2) * 100)}%
          </Text>
        </View>
      </View>
      <View style={styles.sheetContainer}>
        {routineData.map(data => (
          <View key={data.id} style={styles.routineSheet}>
            <Svg width={20} height={20}>
              <Circle x={10} y={10} r={8} fill={data.color} />
            </Svg>
            <Text style={styles.tilteText}>
              {data.title} {/* // 공백 */}
              {Math.round((data.count / allClear).toFixed(2) * 100)}%
            </Text>
            <Text style={styles.numText}>{data.count}회</Text>
          </View>
        ))}
      </View>
    </View>
  ) : (
    <View style={{alignItems: 'center'}}>
      <Icon style={{marginTop: responsiveHeight(10)}} />
      <Text style={styles.noneText}>통계 내역이 없습니다</Text>
    </View>
  );
};

export default Complete;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
  },
  sheetContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginRight: -30,
    marginLeft: 15,
    marginTop: responsiveHeight(25),
  },
  routineSheet: {
    flexDirection: 'row',
    width: '50%',
    marginTop: 15,
  },
  topRoutineText: {
    fontSize: 16,
    color: '#232323',
    fontFamily: 'Pretendard-Bold',
  },
  tilteText: {
    fontSize: 14,
    color: '#232323',
    fontFamily: 'Pretendard-Medium',
    left: responsiveWidth(2),
    fontVariant: ['tabular-nums'],
  },
  numText: {
    color: '#888888',
    position: 'absolute',
    right: 43,
    fontSize: 14,
    fontFamily: 'Pretendard-Light',
  },
  percentText: {
    right: 2,
    fontSize: 16,
    color: '#585FFF',
    fontFamily: 'Pretendard-Bold',
  },
  dailyView: {
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
    marginTop: -260,
    marginLeft: -150,
  },
  categotySheet: {
    marginTop: 25,
    marginLeft: 30,
  },
  noneText: {
    marginTop: responsiveHeight(2),
    fontSize: 14,
    color: '#B9B9B9',
    fontFamily: 'Pretendard-Medium',
  },
});
