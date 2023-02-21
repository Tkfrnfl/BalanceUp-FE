import React, {useState, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
// import WeekCalendar from '../../components/WeekCalendar';
// import WeekCalendar from 'react-native-calendars';
import commonStyles from '../../css/commonStyles';
import {useIsFocused} from '@react-navigation/native';

import {useRecoilState, useRecoilValue} from 'recoil';
import {jwtState} from '../../recoil/atom';
import {dateState, routineStateNum} from '../../recoil/appState';
import {routineStateDaysSet} from '../../recoil/userState';
// import * as Progress from 'react-native-progress';
import Svg, {Text as SvgText} from 'react-native-svg';
import {Calendar, LocaleConfig} from 'react-native-calendars';

import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Progress} from './Progress';
import Complete from './Complete';
import {Shadow} from 'react-native-shadow-2';
import * as ProgressLib from 'react-native-progress';

import LettArrow from '../../resource/image/Main/left.svg';
import RightArrow from '../../resource/image/Main/right.svg';
import {responsiveWidth} from 'react-native-responsive-dimensions';

LocaleConfig.locales.fr = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.defaultLocale = 'fr';

let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); // 날짜

const renderScene = SceneMap({
  first: Progress,
  second: Complete,
});

const LookAll = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: '루틴'},
    {key: 'second', title: '통계'},
  ]);

  const [selectedDate, setSelectedDate] = useState();
  const [token, setToken] = useRecoilState(jwtState);
  const selectTodo = useRecoilValue(routineStateDaysSet(token, 0));
  const [routineProgress, setRoutineProgress] = useState(0);
  const [checkedDateColor, setCheckedDateColor] = useState('#FFFFFF');
  const [checkedDate, setCheckedDate] = useState();
  const [routineDays, setRoutineDays] = useState({});
  const [dateSelected, setDateState] = useRecoilState(dateState);
  const [routineRefresh, setRoutineStateNum] = useRecoilState(routineStateNum);

  const isFocused = useIsFocused();

  // 루틴 날짜 객체 생성
  let tmpObj = {};
  let tmpMonth = ('0' + month).slice(-2); // 오늘 제외
  let tmpDate = ('0' + date).slice(-2);
  let tmpToday = year + '-' + tmpMonth + '-' + tmpDate;

  const setCheckValue = () => {
    for (var i = 0; i < selectTodo.length - 1; i++) {
      if (selectTodo[i].day != tmpToday) {
        tmpObj[selectTodo[i].day] = {
          selected: true,
          selectedColor: '#F4F7FF',
          selectedTextColor: '#000000',
        };
      } else if (selectTodo[i].day === tmpToday) {
        setCheckedDateColor('#F4F7FF');
        tmpObj[selectTodo[i].day] = {
          selected: true,
          selectedColor: '#585FFF',
          selectedTextColor: '#FFFFFF',
        };
      }
    }
    setRoutineDays(tmpObj);
  };

  // 날짜 누를시 선택날짜 색변화
  const checkSelectedDate = date => {
    setDateState(date);
    tmpObj = JSON.parse(JSON.stringify(routineDays));
    let tmpColor;
    if (tmpObj[date] === undefined) {
      tmpColor = '#FFFFFF';

      tmpObj[date] = {
        selected: true,
        selectedColor: '#585FFF',
        selectedTextColor: '#FFFFFF',
      };
    } else {
      tmpColor = tmpObj[date].selectedColor;
    }

    tmpObj[date].selected = true;
    tmpObj[date].selectedColor = '#585FFF';
    tmpObj[date].selectedTextColor = '#FFFFFF';

    tmpObj[checkedDate] = {
      selected: true,
      selectedColor: checkedDateColor,
      selectedTextColor: '#000000',
    };

    // tmpObj[checkedDate].selected = true;
    // tmpObj[checkedDate].selectedColor = checkedDateColor;
    // tmpObj[checkedDate].selectedTextColor = '#000000';

    setRoutineDays(tmpObj);
    setCheckedDate(date);
    setCheckedDateColor(tmpColor);
  };

  useEffect(() => {
    setCheckValue();
    setCheckedDate(tmpToday);

    // 루틴 진행률 구현
    let completeArr = [];
    for (let i = 0; i < selectTodo.length - 1; i++) {
      completeArr.push(selectTodo[i].completed);
    }
    console.log(
      '완료 횟수: ',
      completeArr.filter(prev => prev === true).length,
    );
    console.log('루틴 전체 갯수 : ', completeArr.length);
    setRoutineProgress(
      Number(
        (
          completeArr.filter(prev => prev === true).length / completeArr.length
        ).toFixed(2),
      ),
    );
  }, [selectTodo, token]);

  // * selectTodo - 1 해줘야함, 최초의 selectTodo.length = 1

  useEffect(() => {
    // seloctor 업데이트를 위해+1
    let tmpNum = JSON.parse(JSON.stringify(routineRefresh));
    setRoutineStateNum(tmpNum + 1);
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.titleWrapper}>
          <View style={commonStyles.spacing2} />
          <Shadow distance={5} startColor={'#f4f4f4'}>
            <Calendar
              // date={fomatToday}
              monthFormat={'MM월'}
              renderArrow={direction => {
                if (direction === 'left') {
                  return <LettArrow style={{right: 25}} />;
                } else {
                  return <RightArrow style={{left: 25}} />;
                }
              }}
              style={styles.calView}
              allowShadow={false}
              markedDates={routineDays}
              theme={{
                agendaTodayColor: '#FF7391',
                textMonthFontWeight: '800',
                selectedDayBackgroundColor: '#585FFF',
                todayTextColor: '#009688',
                textMonthFontFamily: 'Pretendard-Bold',
                textDayFontFamily: 'Pretendard-Medium',
                textDayHeaderFontFamily: 'Pretendard-Medium',
                textDayHeaderFontSize: 14,
                textDayFontSize: 14,
                textMonthFontSize: 16,
                'stylesheet.calendar.header': {
                  header: {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingLeft: 50,
                    paddingRight: 50,
                    marginTop: 6,
                    alignItems: 'center',
                  },
                },
              }}
              onDayPress={day => {
                setSelectedDate(day.dateString);
                checkSelectedDate(day.dateString);
              }}
              // onDayPress={day => this.setState({selected_date: day.dateString})}
            />
          </Shadow>
          <View style={commonStyles.spacing3} />
          <Shadow distance={5} startColor={'#f4f4f4'}>
            <Svg style={styles.progressSheet}>
              <SvgText
                x="25"
                y="30"
                text-anchor="middle"
                fill="#232323"
                style={styles.routineBarText}>
                루틴 진행률
              </SvgText>

              <SvgText
                x="295"
                y="28"
                text-anchor="middle"
                fill="#585FFF"
                style={styles.percentageText}>
                {selectTodo.length === 1
                  ? '0%'
                  : `${Math.floor(routineProgress * 100)}%`}
              </SvgText>

              <View style={styles.progressBar}>
                <ProgressLib.Bar
                  progress={selectTodo.length === 1 ? 0 : routineProgress}
                  // 진행 루틴 Null = 0% 표시
                  // completed true 총합 / selectTodo.length(루틴 총합) = 결과값.toFixed(2)
                  width={responsiveWidth(76)}
                  height={12}
                  color="#585FFF"
                  unfilledColor="#CED6FF"
                  borderWidth={0}
                  borderRadius={50}
                />
              </View>
            </Svg>
          </Shadow>
          <View style={[commonStyles.spacing3, {height: 45}]} />
        </View>
        <TabView
          style={styles.tabview}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={props => (
            <TabBar
              {...props}
              gap={-3}
              contentContainerStyle={{height: 80}}
              swipeEnabled={true}
              pressColor="#ffffff"
              activeColor="#585FFF"
              inactiveColor="#888888"
              labelStyle={styles.labelText}
              indicatorStyle={styles.indicatorStyle}
              style={styles.tabBar}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFBFF',
    flex: 1,
  },
  titleWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  scrollview: {
    width: '100%',
  },
  routineBarText: {
    fontSize: 14,
    color: '#232323',
    zIndex: 30,
    fontFamily: 'Pretendard-Bold',
  },
  percentageText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    color: '#585FFF',
  },
  progressBar: {
    paddingLeft: 25,
    paddingTop: 45,
  },
  progressSheet: {
    height: 77,
    width: 350,
    backgroundColor: '#ffffff',
  },
  tabview: {
    backgroundColor: '#ffffff',
    height: 570,
    width: '100%',
  },
  labelText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    top: 18,
    left: 3,
  },
  indicatorStyle: {
    borderColor: '#585FFF',
    width: 160,
    alignItems: 'center',
    marginVertical: -3,
    marginHorizontal: 20,
    borderWidth: 1.5,
    zIndex: 10,
  },
  tabBar: {
    backgroundColor: '#ffffff',
    shadowColor: 'transparent',
    borderBottomColor: '#F8F8F9',
    borderBottomWidth: 3,
    zIndex: 1,
    shadowOpacity: 0,
    marginBottom: 10,
  },
  calView: {
    width: 350,
  },
});

export default LookAll;
