import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
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
import Progress from './Progress';
import Complete from './Complete';
import {CheckBottomTab} from '../BottomTab';

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
    {key: 'first', title: '진행'},
    {key: 'second', title: '완료'},
  ]);

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const posts = [
    {
      id: 1,
      title: '제목입니다.',
      contents: '내용입니다.',
      date: '2022-02-26',
    },
    {
      id: 2,
      title: '제목입니다.',
      contents: '내용입니다.',
      date: '2022-02-27',
    },
  ];
  const markedDates = posts.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
    acc[formattedDate] = {marked: true};
    return acc;
  }, {});
  const markedSelectedDates = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    },
  };
  const fomatToday =
    year.toString() + '-' + month.toString() + '-' + date.toString();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <ScrollView style={styles.scrollview}>
          <View style={styles.titleWrapper}>
            <View style={commonStyles.spacing} />
            <Text style={styles.title2}>루틴</Text>
          </View>
          <View style={commonStyles.spacing2} />

          <Calendar
            date={fomatToday}
            monthFormat={'yyyy년 MM월'}
            leftArrowImageSource=""
            rightArrowImageSource=""
            allowShadow={false}
            markedDates={markedSelectedDates}
            theme={{
              selectedDayBackgroundColor: '#626262',
              dotColor: '#626262',
              todayTextColor: '#009688',
            }}
            onDayPress={day => {
              setSelectedDate(day.dateString);
            }}
            // onDayPress={day => this.setState({selected_date: day.dateString})}
          />
          <View style={commonStyles.spacing2} />
          <TabView
            style={styles.tabview}
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
            renderTabBar={props => (
              <TabBar
                {...props}
                activeColor="black"
                inactiveColor="gray"
                indicatorStyle={{
                  backgroundColor: 'black',
                  width: 70,
                  alignItems: 'center',
                  marginHorizontal: 65,
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },
  titleWrapper: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginLeft: 20,
    width: 390,
  },
  mainText: {
    fontSize: 20,
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
  tabview: {
    height: 500,
  },
});

export default LookAll;
