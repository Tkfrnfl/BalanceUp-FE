import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
  Animated,
  Modal,
  Platform,
  ImageBackground,
} from 'react-native';
import commonStyles from '../../css/commonStyles';
import ProgressCircle from 'react-native-progress-circle';
// import WeekCalendar from '../../components/WeekCalendar';
// import WeekCalendar from 'react-native-calendars';
import {MarkingProps} from '../../utils/MarkingProps';
import moment from 'moment';
import {format} from 'date-fns';
import * as Progress from 'react-native-progress';
import KeyumIcon from '../../resource/image/KeyumEmoticon.png';
import arrow from '../../resource/image/Main/arrow.png';
import arrow2 from '../../resource/image/Main/arrow2.png';
import arrow3 from '../../resource/image/Main/arrow3.png';
import life from '../../resource/image/SetTodo/life.png';
import education from '../../resource/image/SetTodo/education.png';
import mental from '../../resource/image/SetTodo/mental.png';
import health from '../../resource/image/SetTodo/health.png';
import lv1 from '../../resource/image/Main/1lv.gif';
import edit from '../../resource/image/Main/edit.png';
import delete2 from '../../resource/image/Main/delete.png';
import oneDay from '../../resource/image/Main/oneDay.png';
import twoWeeks from '../../resource/image/Main/twoWeeks.png';
import exMark from '../../resource/image/Main/exMark.png';

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
import modalInnerStyles from '../../css/modalStyles';
import {Shadow} from 'react-native-shadow-2';
import {HomeBottomTab} from '../BottomTab';

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

const MainScreen = ({navigation: {navigate}}) => {
  // React.useEffect(() => {
  //   const value = AsyncStorage.getItem('jwt');
  //   const valueRefresh = AsyncStorage.getItem('jwtRefresh');
  //   const dataToken = JSON.parse(value);
  //   console.log(dataToken);
  // }, []);


  const todo = ['일상', '학습', '마음관리', '운동'];
  const todoImg = [life, education, mental, health];
  const todoTmp = ['item1', 'item2', 'item3'];
  const todoTmpSub = ['itemSub1', 'itemSub2', 'itemSub3'];
  const todoComplete = [0.5, 1, 0.5, 1];

  const fomatToday =
    year.toString() + '-' + month.toString() + '-' + date.toString();

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const [completeDay, setCompleteDayModalVisible] = useState(0);
  const [completeChangeModalVisible, setCompleteChangeModalVisible] =
    useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

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

  // 하단 탭바 네이게이션
  const goHome = () => {
    navigation.navigate('Main');
  };
  const goSet = () => {
    navigation.navigate('Set');
  };
  const goLookAll = () => {
    navigation.navigate('LookAll');
  };
  const goMyPage = () => {
    navigation.navigate('MyPage');
  };

  const checkComplete = index => {
    if (todoComplete[index] === 1) {
      setCompleteModalVisible(true);
      setCompleteDayModalVisible(2); // 1일시 하루, 아닐시 2주 모달 띄움
    } else {
      setCompleteChangeModalVisible(true);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.titleWrapper}>
          <View style={commonStyles.spacing2} />
          <Text style={styles.mainText}>??님은</Text>
          <View style={commonStyles.row}>
            <Text style={styles.mainText6}>?</Text>
            <Text style={styles.mainText}>만큼 성장했어요</Text>
          </View>
          <Text style={styles.mainText7}>?RP 달성시, LV.? 레벨 업!</Text>

          <Image source={lv1} style={styles.img3} />
          <TouchableOpacity
            onPress={() => {
              navigate('HomeNoti');
            }}>
            <Text style={styles.mainText8}>키움 성장 가이드</Text>
          </TouchableOpacity>

          <Shadow distance={10} startColor={'#F1F1F1'}>
            <Svg height={100} width={350} styles={[]}>
              <Rect
                x={0}
                y={0}
                width={350}
                height={100}
                style={[]}
                strokeWidth="0"
                fill="#FFFFFF"
              />
              <Rect
                x={25}
                y={20}
                width="36"
                height="18"
                rx="9"
                fill="#585FFF"
              />
              <SvgText
                x={33}
                y={33}
                style={styles.mainText9}
                fill="white"
                fontWeight={600}>
                Lv.
              </SvgText>
              <SvgText
                x={285}
                y={33}
                style={styles.mainText9}
                fill="gray"
                fontWeight={600}>
                ?/? RP
              </SvgText>
              <SvgText
                x={30}
                y={83}
                style={styles.mainText9}
                fill="#BCBCBC"
                fontWeight={600}>
                0
              </SvgText>
              <SvgText
                x={305}
                y={83}
                style={styles.mainText9}
                fill="#BCBCBC"
                fontWeight={600}>
                20
              </SvgText>

              <Progress.Bar
                progress={0.3}
                width={300}
                height={8}
                color={'#585FFF'}
                borderColor={'#FFFFFF'}
                unfilledColor={'#CED6FF'}
                style={styles.bar1}
              />
              <Image source={arrow} style={dstyle(0.3 * 300).bar} />
              <View style={dstyleText(0.3 * 300).bar}>
                <Text style={styles.mainText9}>10</Text>
              </View>
            </Svg>
          </Shadow>

          <View style={commonStyles.spacing2} />
        </View>
        <View style={commonStyles.spacing2} />
        <View>
          {/* <TouchableOpacity
            activeOpacity={1.0}
            onPress={() => navigate('Guide')}>
            <Text style={styles.guideText}>키움 성장 가이드</Text>
          </TouchableOpacity> */}
          <Text style={[commonStyles.boldText, styles.centering]}>
            완료하지 않은 루틴이 있어요!
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {todo.map((value, index) => (
              <View>
                <View style={styles.view1}>
                  <Image source={todoImg[index]} style={styles.img4} />
                </View>
                <Text style={styles.mainText10}>{todo[index]}</Text>
                <Text style={styles.mainText11}>0/1</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={commonStyles.spacing2} />
        <View style={[commonStyles.row]}>
          <Text
            style={[commonStyles.boldText, styles.centering, styles.mainText4]}>
            이번 주 루틴 기록이에요
          </Text>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => navigate('LookAll')}>
            <Text> &nbsp; 전체보기 &nbsp;</Text>
          </TouchableOpacity>
        </View>
        <CalendarProvider
          // todayButtonStyle={buttonStyle}
          // style={styles.button2}
          date={fomatToday}>
          <ExpandableCalendar
            monthFormat={'MM월'}
            leftArrowImageSource={arrow2}
            rightArrowImageSource={arrow3}
            allowShadow={false}
            markedDates={markedSelectedDates}
            theme={{
              arrowColor: 'black',
              textMonthFontWeight: '800',
              selectedDayBackgroundColor: '#585FFF',
              dotColor: '#585FFF',
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
            }}
            // onDayPress={day => this.setState({selected_date: day.dateString})}
          />
        </CalendarProvider>

        <View>
          {todoTmp.map((value, index) => (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.view2}>
              <Image source={todoImg[index]} style={styles.img2_gray} />
              <Image
                source={todoImg[index]}
                style={img2(todoComplete[index]).bar}
              />
              <View style={aimText1(todoComplete[index]).bar}>
                <Text style={commonStyles.boldText}>item1</Text>
                <Text>{todoTmpSub[index]}</Text>
              </View>
              <TouchableWithoutFeedback onPress={() => checkComplete(index)}>
                <Svg height={80} style={svg2(todoComplete[index]).bar}>
                  <Rect
                    x={20}
                    y={20}
                    width="60"
                    height="34"
                    rx="18"
                    fill="#585FFF"
                  />
                  <SvgText
                    x={37}
                    y={40}
                    style={styles.mainText12}
                    fill="white"
                    fontWeight={600}>
                    완료
                  </SvgText>
                </Svg>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => console.log()}>
                <Image source={edit} />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => setDeleteModalVisible(true)}>
                <Image source={delete2} />
              </TouchableWithoutFeedback>
              {/* 완료 모달 구현 코드 (one Day)*/}
              <Modal
                visible={completeModalVisible}
                animationType={'fade'}
                transparent={true}
                statusBarTranslucent={true}>
                {completeDay === 1 ? (
                  <Pressable
                    style={modalInnerStyles.complteModalOverlay}
                    onPress={() =>
                      setCompleteModalVisible(!completeModalVisible)
                    }>
                    <TouchableWithoutFeedback>
                      <Animated.View
                        style={{
                          ...modalInnerStyles.centerSheetContainer,
                          // transform: [{translateY: translateY}],
                        }}
                        // {...panResponder.panHandlers}
                      >
                        {/* 모달에 들어갈 내용을 아래에 작성 */}
                        <Text style={modalInnerStyles.completeText1}>
                          +1 RP
                        </Text>
                        <Text style={modalInnerStyles.completeText2}>
                          오늘의 루틴을 완료했습니다!
                        </Text>
                        <View style={modalInnerStyles.completeImg1}>
                          <Image source={oneDay} />
                        </View>
                      </Animated.View>
                    </TouchableWithoutFeedback>
                  </Pressable>
                ) : (
                  <Pressable
                    style={modalInnerStyles.complteModalOverlay}
                    onPress={() =>
                      setCompleteModalVisible(!completeModalVisible)
                    }>
                    <TouchableWithoutFeedback>
                      <Animated.View
                        style={{
                          ...modalInnerStyles.centerSheetContainer,
                          // transform: [{translateY: translateY}],
                        }}
                        // {...panResponder.panHandlers}
                      >
                        {/* 모달에 들어갈 내용을 아래에 작성 */}
                        <Text style={modalInnerStyles.completeText1}>
                          +10 RP
                        </Text>
                        <Text style={modalInnerStyles.completeText2}>
                          2주간 완벽하게 루틴을 완료했어요
                        </Text>
                        <Text style={modalInnerStyles.completeImg1}>
                          앞으로도 꾸준한 루틴 기대할게요!
                        </Text>
                        <View style={modalInnerStyles.completeImg1}>
                          <Image source={twoWeeks} />
                        </View>
                      </Animated.View>
                    </TouchableWithoutFeedback>
                  </Pressable>
                )}
              </Modal>
              {/* 완료 취소 모달 구현 코드 */}
              <Modal
                visible={completeChangeModalVisible}
                animationType={'fade'}
                transparent={true}
                statusBarTranslucent={true}>
                <Pressable
                  style={modalInnerStyles.modalOverlay}
                  onPress={() =>
                    setCompleteChangeModalVisible(!completeChangeModalVisible)
                  }>
                  <TouchableWithoutFeedback>
                    <Animated.View
                      style={{
                        ...modalInnerStyles.bottomSheetContainer,
                        // transform: [{translateY: translateY}],
                      }}
                      // {...panResponder.panHandlers}
                    >
                      {/* 모달에 들어갈 내용을 아래에 작성 */}
                      <Text style={modalInnerStyles.logoutModalTitle}>
                        이미 완료한 루틴입니다!
                      </Text>
                      <Text style={modalInnerStyles.logoutModalText}>
                        루틴 완료를 취소하시겠습니까? {'\n'}
                        루틴 완료 기록과 획득 RP가 사라집니다
                      </Text>
                      <View style={modalInnerStyles.modalFlex}>
                        <TouchableOpacity
                          style={modalInnerStyles.noBtn}
                          onPress={() => setCompleteChangeModalVisible(false)}>
                          <Text style={modalInnerStyles.noText}>아니요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={modalInnerStyles.yesBtn}
                          onPress={() => {
                            // handleCompleteChange(data.id);
                            // console.log('complete change id : ', data.id);
                          }}>
                          <Text style={modalInnerStyles.nextText}>
                            취소할래요!
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </Animated.View>
                  </TouchableWithoutFeedback>
                </Pressable>
              </Modal>
              {/* 삭제 모달 구현 코드 */}
              <Modal
                visible={deleteModalVisible}
                animationType={'fade'}
                transparent={true}
                statusBarTranslucent={true}>
                <Pressable
                  style={modalInnerStyles.modalOverlay}
                  onPress={() => setDeleteModalVisible(!deleteModalVisible)}>
                  <TouchableWithoutFeedback>
                    <Animated.View
                      style={{
                        ...modalInnerStyles.deleteSheetContainer,
                        // transform: [{translateY: translateY}],
                      }}
                      // {...panResponder.panHandlers}
                    >
                      {/* 모달에 들어갈 내용을 아래에 작성 */}
                      <Text style={modalInnerStyles.logoutModalTitle}>
                        진행중인 루틴입니다!
                      </Text>
                      <Text style={modalInnerStyles.logoutModalText}>
                        루틴을 삭제하시겠습니까? {'\n'}
                        해당 루틴에 대한 모든 기록이 사라집니다{'\n'}
                        *루틴 완료 기록, 획득 RP
                      </Text>
                      <View style={modalInnerStyles.modalFlex}>
                        <TouchableOpacity
                          style={modalInnerStyles.noBtn}
                          onPress={() => setDeleteModalVisible(false)}>
                          <Text style={modalInnerStyles.noText}>아니요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={modalInnerStyles.yesBtn}
                          onPress={() => console.log()}>
                          <Text style={modalInnerStyles.nextText}>
                            삭제할래요!
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </Animated.View>
                  </TouchableWithoutFeedback>
                </Pressable>
              </Modal>
            </ScrollView>
          ))}
        </View>
      </ScrollView>
      <HomeBottomTab navigate={navigate} />
    </SafeAreaView>
  );
};

const dstyle = x =>
  StyleSheet.create({
    bar: {
      marginLeft: x + 12,
      marginTop: -12,
    },
  });
const dstyleText = x =>
  StyleSheet.create({
    bar: {
      marginLeft: x + 17,
      marginTop: 70,
      position: 'absolute',
    },
  });

const img2 = x =>
  StyleSheet.create({
    bar: {
      resizeMode: 'stretch',
      height: 70,
      width: 70,
      opacity: x,
    },
  });

const aimText1 = x =>
  StyleSheet.create({
    bar: {
      paddingLeft: 20,
      paddingRight: 100,
      paddingTop: 10,
      opacity: x,
    },
  });

const svg2 = x =>
  StyleSheet.create({
    bar: {
      width: 150,
      zIndex: 10,
      opacity: x,
    },
  });

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  titleWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFBFF',
  },
  title1: {
    fontSize: 65,
  },
  title2: {
    fontSize: 40,
  },
  guideText: {
    width: 81,
    fontSize: 12,
    color: '#888888',
    marginLeft: 295,
    borderBottomWidth: 1,
    borderBottomColor: '#888888',
    fontFamily: 'Pretendard-Medium',
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
    borderColor: '#EBEBEB',
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
  },
  buttonText: {
    fontSize: 25,
  },
  scrollview: {
    width: '100%',
  },
  aimText1: {
    paddingLeft: 20,
    paddingRight: 100,
    paddingTop: 10,
  },
  mainText: {
    fontSize: 25,
    color: '#232323',
    fontWeight: '600',
  },
  mainText6: {
    fontSize: 25,
    color: '#585FFF',
    fontWeight: '600',
  },
  mainText7: {
    fontSize: 12,
    color: '#232323',
    fontWeight: '600',
    marginTop: 10,
  },
  mainText8: {
    fontSize: 12,
    color: '#888888',
    fontWeight: '600',
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
    marginRight: -170,
    marginBottom: 20,
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
  mainText9: {
    color: 'white',
    fontWeight: '600',
  },
  mainText12: {
    color: 'white',
    fontWeight: '600',
  },
  mainText10: {
    marginTop: 10,
    marginLeft: 20,
    color: '#232323',
    fontWeight: '600',
    alignSelf: 'center',
    fontSize: 15,
  },
  mainText11: {
    marginTop: 10,
    marginLeft: 20,
    color: '#585FFF',
    fontWeight: '600',
    alignSelf: 'center',
    fontSize: 15,
  },
  centering: {
    alignItems: 'center',
    paddingLeft: 20,
    color: '#232323',
  },
  img1: {
    marginBottom: -30,
    paddingLeft: 15,
    zIndex: 10,
  },
  img2_gray: {
    resizeMode: 'stretch',
    height: 70,
    width: 70,
    tintColor: 'gray',
    position: 'absolute',
  },
  img3: {
    resizeMode: 'stretch',
    height: 350,
    width: 350,
  },
  svg1: {
    width: 100,
  },
  svg2: {
    width: 150,
    zIndex: 10,
  },
  svg3: {
    marginLeft: 50,
  },
  bar1: {
    marginTop: 50,
    marginLeft: 25,
  },
  bar2: {
    marginLeft: 25,
    marginTop: -10,
  },
  img4: {
    width: 90,
    height: 90,
    borderRadius: 150 / 2,
    overflow: 'hidden',
  },
  view1: {
    width: 90,
    height: 90,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5, // changed to a greater value
    borderRadius: 150 / 2,
    borderColor: 'black',
    zIndex: 99, // added zIndex
    backgroundColor: 'white', // added a background color
    marginTop: 20,
    marginLeft: 20,
  },
  view2: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 20},
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 7, // changed to a greater value
    borderColor: 'black',
    zIndex: 99, // added zIndex
    backgroundColor: 'white', // added a background color
    marginTop: 20,
    paddingTop: 10,
    marginLeft: 15,
  },
});

export default MainScreen;
