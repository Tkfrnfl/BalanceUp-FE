import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView, Image} from 'react-native';
import {format} from 'date-fns';
import commonStyles from '../../css/commonStyles';
import Svg, {Text as SvgText} from 'react-native-svg';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Progress} from './Progress';
import Complete from './Complete';
import {CheckBottomTab} from '../BottomTab';
import {Shadow} from 'react-native-shadow-2';
import * as ProgressLib from 'react-native-progress';

import arrow2 from '../../resource/image/Main/arrow2.png';
import arrow3 from '../../resource/image/Main/arrow3.png';

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

const LookAll = ({navigation: {navigate}}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: '루틴'},
    {key: 'second', title: '통계'},
  ]);

  const [selectedDate, setSelectedDate] = useState();
  // format(new Date(), 'yyyy-MM-dd'),
  const posts = [
    {
      id: 1,
      title: '제목입니다.',
      contents: '내용입니다.',
      date: '2023-01-14',
    },
  ];
  const markedDates = posts.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
    acc[selectedDate] = {marked: true};
    return acc;
  }, {});

  const markedSelectedDates = {
    // ...markedDates,
    [selectedDate]: {
      selected: true,
      // marked: markedDates[selectedDate]?.marked,
    },
  };

  const onclick = () => {
    console.log(markedDates);
  };

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
                  return <Image source={arrow2} />;
                } else {
                  return <Image source={arrow3} />;
                }
              }}
              style={styles.calView}
              allowShadow={false}
              markedDates={markedSelectedDates}
              theme={{
                agendaTodayColor: '#FF7391',
                arrowColor: 'black',
                textMonthFontWeight: '800',
                selectedDayBackgroundColor: '#585FFF',
                // dotColor: '#585FFF',
                todayTextColor: '#009688',
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
                onclick();
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
                y="30"
                text-anchor="middle"
                fill="#585FFF"
                style={styles.percentageText}>
                50%
              </SvgText>
              <View style={styles.progressBar}>
                <ProgressLib.Bar
                  progress={0.5}
                  // 진행 루틴 Null = 0% 표시
                  // 루틴 완료 횟수 총합 / 전체 루틴 갯수의 진행 총합 * 100
                  width={300}
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
      <CheckBottomTab navigate={navigate} />
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
    height: 570,
    width: '100%',
  },
  labelText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    top: 18,
  },
  indicatorStyle: {
    borderColor: '#585FFF',
    width: 160,
    alignItems: 'center',
    marginHorizontal: 20,
    borderWidth: 1.5,
  },
  tabBar: {
    backgroundColor: '#ffffff',
    shadowColor: 'transparent',
    shadowOpacity: 0,
  },
  calView: {
    width: 350,
  },
});

export default LookAll;
