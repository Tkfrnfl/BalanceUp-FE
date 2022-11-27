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
import ProgressCircle from 'react-native-progress-circle';
// import WeekCalendar from '../../components/WeekCalendar';
// import WeekCalendar from 'react-native-calendars';
import {Theme} from '../../utils/theme';
import {MarkingProps} from '../../utils/MarkingProps';
import moment from 'moment';
import {format} from 'date-fns';
import * as Progress from 'react-native-progress';
import KeyumIcon from '../../resource/image/KeyumEmoticon.png';
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

const MainScreen = ({navigation}) => {
  const todo = ['할일1', '할일2', '할일3', '할일4'];
  const todoTmp = ['item1', 'item2', 'item3'];
  const todoTmpSub = ['itemSub1', 'itemSub2', 'itemSub3'];
  // const buttonStyle: ViewStyle = {
  //   backgroundColor: '#626262',
  //   borderColr: '#626262',
  // };
  // const theme: Theme = {
  //   todayBackgroundColor: '#626262',
  //   todayDotColor: '#626262',
  //   dotColor: 'black',
  //   indicatorColor: 'black',
  //   selectedDayBackgroundColor: 'black',
  // };
  // const MarkingProps: MarkingProps = {
  //   color: 'black',
  //   dotColor: 'black',
  //   selectedColor: 'black',
  //   textColor: 'red',
  //   dots: {selectedDotColor: 'black', color: 'black'},
  // };

  const fomatToday =
    year.toString() + '-' + month.toString() + '-' + date.toString();

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
  const onSet = () => {
    navigation.navigate('Set');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.titleWrapper}>
          <View style={commonStyles.spacing} />
          <Text style={styles.title1}>KEYUM</Text>
          <Text style={styles.mainText}>Lv.2</Text>
          <Progress.Bar
            progress={0.3}
            width={200}
            height={10}
            color={'#626262'}
          />
          <View style={commonStyles.spacing2} />
          {/* <MainCarousel> 캐러셀 임시 구현</MainCarousel> */}
        </View>
        <View style={commonStyles.spacing} />
        <View style={commonStyles.spacing} />
        <View style={commonStyles.spacing} />
        <View>
          <Text style={[commonStyles.boldText, styles.centering]}>
            아직 완료하지 않은 루틴이 있어요!
          </Text>
          <View style={commonStyles.row}>
            {todo.map((value, index) => (
              <View style={styles.svg1}>
                <View style={styles.img1}>
                  <Image source={KeyumIcon} style={styles.img2} />
                </View>
                <Svg height={100}>
                  <Circle cx="48" cy="50" r="43" fill="#626262" />
                  <SvgText
                    x="28"
                    y="55"
                    text-anchor="middle"
                    fill="white"
                    style={styles.mainText2}
                    key={index}>
                    {value}
                  </SvgText>
                </Svg>
              </View>
            ))}
          </View>
        </View>
        <View style={commonStyles.spacing2} />
        <View style={[commonStyles.row]}>
          <Text
            style={[commonStyles.boldText, styles.centering, styles.mainText4]}>
            이번 주 루틴 기록이에요
          </Text>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => navigation.push('LookAll')}>
            <Text>전체보기 ></Text>
          </TouchableOpacity>
        </View>
        <CalendarProvider
          // todayButtonStyle={buttonStyle}
          // style={styles.button2}
          // theme={theme}
          date={fomatToday}>
          <ExpandableCalendar
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
        </CalendarProvider>

        <View style={commonStyles.spacing2} />
        <View>
          {todoTmp.map((value, index) => (
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
                  fill="white"
                  style={styles.mainText2}>
                  test
                </SvgText>
              </Svg>

              {/* <ProgressCircle
            percent={30}
            radius={50}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff">
            <Text style={{fontSize: 18}}>{'30%'}</Text>
          </ProgressCircle> */}
            </View>
          ))}
        </View>
        <View style={commonStyles.spacing}>
          <Text> </Text>
        </View>

        {/* 루틴 설정 이동 버튼 **임시** */}
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              width: '70%',
              alignItems: 'center',
              backgroundColor: '#b779ed',
            }}
            onPress={onSet}>
            <Text style={{color: '#fff', fontSize: 20}}>
              루틴 설정하기(임시 구현)
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    width: '100%',
  },
  aimText1: {
    paddingLeft: 50,
    paddingRight: 100,
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
  // button2: {
  //   color: '#626262',
  // },
});

export default MainScreen;
