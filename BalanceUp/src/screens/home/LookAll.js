import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  Image,
} from 'react-native';
// import WeekCalendar from '../../components/WeekCalendar';
// import WeekCalendar from 'react-native-calendars';
import {MarkingProps} from '../../utils/MarkingProps';
import moment from 'moment';
import {WithLocalSvg} from 'react-native-svg';
import {format} from 'date-fns';
import commonStyles from '../../css/commonStyles';
// import * as Progress from 'react-native-progress';
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Text as SvgText,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
  ExpandableCalendar,
  CalendarProvider,
} from 'react-native-calendars';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Progress} from './Progress';
import Complete from './Complete';
import {CheckBottomTab, HomeBottomTab} from '../BottomTab';
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

const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

const renderScene = SceneMap({
  first: Progress,
  second: Complete,
});

const LookAll = ({navigation: {navigate}}) => {
  const todo = ['할일1', '할일2', '할일3', '할일4'];
  const todoTmp = ['item1', 'item2', 'item3'];
  const todoTmpSub = ['itemSub1', 'itemSub2', 'itemSub3'];

  const layout = useWindowDimensions();
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
  const fomatToday =
    year.toString() + '-' + month.toString() + '-' + date.toString();
  const onclick = () => {
    console.log(markedDates);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.titleWrapper}>
          <View style={commonStyles.spacing2} />
          <Shadow distance={10} startColor={'#F1F1F1'} style={styles.calView2}>
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
          <Shadow distance={10} startColor={'#F1F1F1'}>
            <Svg height={70} width={350}>
              <Rect x={0} y={0} width={350} height={70} fill="none" />
              <SvgText
                x="25"
                y="20"
                text-anchor="middle"
                fill="black"
                style={styles.mainText1}>
                루틴 진행률
              </SvgText>
              <SvgText
                x="295"
                y="20"
                text-anchor="middle"
                fill="#585FFF"
                style={styles.mainText1}>
                50%
              </SvgText>
              <View style={styles.progressBar}>
                <ProgressLib.Bar
                  progress={0.5}
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

          <View style={commonStyles.spacing3} />
        </View>
        <TabView
          style={styles.tabview}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={props => (
            <TabBar
              {...props}
              activeColor="#585FFF"
              inactiveColor="gray"
              labelStyle={{fontWeight: '600'}}
              indicatorStyle={{
                borderColor: '#585FFF',
                width: 180,
                alignItems: 'center',
                marginHorizontal: 15,
                borderWidth: 2,
              }}
              style={{
                backgroundColor: 'white',
                shadowColor: 'transparent',
                shadowOpacity: 0,
              }}
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
  title1: {
    fontSize: 65,
  },
  title2: {
    fontSize: 40,
  },
  button: {
    width: '70%',
    height: 50,
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 2,
    padding: 10,
  },
  button2: {
    paddingTop: 5,
  },
  buttonText: {
    fontSize: 25,
  },
  scrollview: {
    width: '100%',
  },
  mainText: {
    fontSize: 20,
  },
  mainText1: {
    fontSize: 12,
    color: 'black',
    zIndex: 30,
    fontWeight: 600,
  },
  mainText2: {
    fontSize: 20,
    color: 'black',
    zIndex: 30,
  },
  mainText3: {
    paddingLeft: 80,
    paddingTop: 5,
  },
  mainText4: {
    paddingRight: 60,
  },
  centering: {
    alignItems: 'center',
    paddingLeft: 20,
  },
  img1: {
    marginBottom: -30,
    paddingLeft: 35,
    zIndex: 10,
  },
  img2: {
    resizeMode: 'stretch',
    height: 30,
    width: 30,
  },
  svg1: {
    width: 100,
  },
  svg2: {
    width: 150,
    zIndex: 10,
  },
  progressBar: {
    paddingLeft: 25,
    paddingTop: 35,
  },
  tabview: {
    height: 500,
  },
  calView: {
    width: 350,
  },
  view1: {
    width: 300,
    paddingLeft: 180,
  },
});

export default LookAll;
