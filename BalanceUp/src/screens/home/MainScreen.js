import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';
import commonStyles from '../../css/commonStyles';
import {format} from 'date-fns';
import * as Progress from 'react-native-progress';
import LevelArrow from '../../resource/image/Main/levelArrow.svg';
import LevelBox from '../../resource/image/Main/levelBox.svg';
import LevelBox999 from '../../resource/image/Main/levelBox999.svg';
import LeftArrow from '../../resource/image/Main/left.svg';
import RightArrow from '../../resource/image/Main/right.svg';
import Iconx from '../../resource/image/Main/back.svg';
import life from '../../resource/image/SetTodo/life.png';
import education from '../../resource/image/SetTodo/education.png';
import mental from '../../resource/image/SetTodo/mental.png';
import health from '../../resource/image/SetTodo/health.png';
import LifeGray from '../../resource/image/Main/lifeGray.svg';
import EducationGray from '../../resource/image/Main/studyGray.svg';
import HealthGray from '../../resource/image/Main/healthGray.svg';
import MentalGray from '../../resource/image/Main/mindGray.svg';
import lv1 from '../../resource/image/Main/1lv.gif';
import lv2 from '../../resource/image/Main/2lv.gif';
import lv3 from '../../resource/image/Main/3lv.gif';
import lv2Modal from '../../resource/image/Main/secondLevelModal.png';
import lv3Modal from '../../resource/image/Main/lastLevelModal.png';
import {
  LocaleConfig,
  ExpandableCalendar,
  CalendarProvider,
} from 'react-native-calendars';
import {Shadow} from 'react-native-shadow-2';
import {Progress as ProgressComponent} from './Progress';
import {useRecoilState, useRecoilValue} from 'recoil';
import {jwtState} from '../../recoil/atom';
import {dateState} from '../../recoil/appState';
import {nickNameState, userRpState} from '../../recoil/atom';
import {routineStateDaysSet} from '../../recoil/userState';
import {getAllRoutine} from '../../actions/routineAPI';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

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
  const todo = ['일상', '학습', '마음관리', '운동'];
  const todoImg = [life, education, mental, health];
  const todoImgGray = [
    <LifeGray />,
    <EducationGray />,
    <MentalGray />,
    <HealthGray />,
  ];
  const [nickName, setNickName] = useRecoilState(nickNameState);
  // const [daily, setDaily] = useRecoilState(dailyState);
  // const [exercise, setExercise] = useRecoilState(exerciseState);
  // const [learning, setLearning] = useRecoilState(learningState);
  // const [mindCare, setMindCare] = useRecoilState(mindCareState);
  const [userRp, setUserRp] = useRecoilState(userRpState);
  const [token, setToken] = useRecoilState(jwtState);
  const [userLevel, setUserLevel] = useState(1);
  const [upRp, setUpRp] = useState(20);
  const [nextLevel, setNextLevel] = useState(2);
  const [tmp, setTmp] = useState(0);
  const [todoTotal, setTodoTotal] = useState([0, 0, 0, 0]);
  const [todoCompleted, setTodoCompleted] = useState([0, 0, 0, 0]);
  const [dateSelected, setDateState] = useRecoilState(dateState);
  const [routineDays, setRoutineDays] = useState({});
  const [checkedDateColor, setCheckedDateColor] = useState('#FFFFFF');
  const [checkedDate, setCheckedDate] = useState();
  const selectTodo = useRecoilValue(routineStateDaysSet(token, 0));
  const upRpState = [
    40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300,
  ];
  const levelRpState = [
    20, 39, 59, 79, 99, 119, 139, 159, 179, 199, 219, 239, 259, 279, 299,
  ];
  const levelState = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const fomatToday =
    year.toString() + '-' + month.toString() + '-' + date.toString();
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const [levelUpModalVisible, setLevelUpModalVisible] = useState(false);
  const [levelUp_ModalVisible, setLevelUp_ModalVisible] = useState(false);
  const [showUpModal, setShowUpModal] = useState(false);
  const [gif, setGif] = useState(lv1);

  // RP 레벨 처리
  useEffect(() => {
    for (let i = 0; i < 14; i++) {
      setUserLevel(1);
      setUpRp(20);
      setNextLevel(2);
      if (userRp >= levelRpState[i] && userRp <= levelRpState[i + 1]) {
        setUserLevel(levelState[i]);
        setNextLevel(levelState[i + 1]);
        setUpRp(upRpState[i]);
        break;
      }
    }
    // 만렙 처리
    if (userRp >= 300) {
      setUserLevel(16);
    }

    // 레벨 진화 이펙트 (Modal State)
    // RP 85 ~ 99가 되면 modal 상태를 true로
    if (userRp >= 85 && userRp < 100) {
      setShowUpModal(true);
    } else if (userRp >= 285 && userRp < 300) {
      setShowUpModal(true);
    }

    // 6레벨 달성시 레벨업 Modal
    if (userLevel === 6 && showUpModal === true) {
      setLevelUpModalVisible(true);
      setTimeout(() => setGif(lv2), 3000);
      // 레벨업시 한번만 실행을 위해 다시 false
      setShowUpModal(false);
    } else if (userLevel === 16 && showUpModal == true) {
      setLevelUp_ModalVisible(true);
      setTimeout(() => setGif(lv3), 2000);
      setShowUpModal(false);
    }

    // 레벨에 알맞는 캐릭터 구현
    if (userLevel < 6) {
      setGif(lv1);
    } else if (userLevel >= 6 && userLevel <= 15) {
      setGif(lv2);
    }
  }, [userRp, userLevel]);
  console.log('state', showUpModal);

  // 루틴 날짜 객체 생성
  let tmpObj = {};
  let tmpMonth = ('0' + month).slice(-2); // 오늘 제외
  let tmpDate = ('0' + date).slice(-2);
  let tmpToday = year + '-' + tmpMonth + '-' + tmpDate;

  const setCheckValue = () => {
    for (var i = 0; i < selectTodo.length; i++) {
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

    setRoutineDays(tmpObj);
    setCheckedDate(date);
    setCheckedDateColor(tmpColor);
  };

  // 모달 기능 구현
  const screenHeight = Dimensions.get('screen').height;

  const panY = useRef(new Animated.Value(screenHeight)).current;

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 10,
    useNativeDriver: true,
  });

  useEffect(() => {
    if (levelUpModalVisible || levelUp_ModalVisible) {
      resetBottomSheet.start();
    }
  }, [levelUpModalVisible, levelUp_ModalVisible]);

  const asyncGetAll = async () => {
    let res;

    res = await getAllRoutine();
    res = res.body;

    for (var i = 0; i < res.length; i++) {
      // 루틴 전체 불러오기
      if (res[i].routineCategory === '일상') {
        if (res[i].completed === true) {
          let completedTmp, totalTmp;
          completedTmp = todoCompleted;
          totalTmp = todoTotal;
          completedTmp[0] += 1;
          totalTmp[0] += 1;
          setTodoCompleted(completedTmp);
          setTodoTotal(totalTmp);
        } else {
          let totalTmp;
          totalTmp = todoTotal;
          totalTmp[0] += 1;
          setTodoTotal(totalTmp);
        }
      } else if (res[i].routineCategory === '학습') {
        if (res[i].completed === true) {
          let completedTmp, totalTmp;
          completedTmp = todoCompleted;
          totalTmp = todoTotal;
          completedTmp[1] += 1;
          totalTmp[1] += 1;
          setTodoCompleted(completedTmp);
          setTodoTotal(totalTmp);
        } else {
          let totalTmp;
          totalTmp = todoTotal;
          totalTmp[1] += 1;
          setTodoTotal(totalTmp);
        }
      } else if (res[i].routineCategory === '마음관리') {
        if (res[i].completed === true) {
          let completedTmp, totalTmp;
          completedTmp = todoCompleted;
          totalTmp = todoTotal;
          completedTmp[2] += 1;
          totalTmp[2] += 1;
          setTodoCompleted(completedTmp);
          setTodoTotal(totalTmp);
        } else {
          let totalTmp;
          totalTmp = todoTotal;
          totalTmp[2] += 1;
          setTodoTotal(totalTmp);
        }
      } else if (res[i].routineCategory === '운동') {
        if (res[i].completed === true) {
          let completedTmp, totalTmp;
          completedTmp = todoCompleted;
          totalTmp = todoTotal;
          completedTmp[3] += 1;
          totalTmp[3] += 1;
          setTodoCompleted(completedTmp);
          setTodoTotal(totalTmp);
        } else {
          let totalTmp;
          totalTmp = todoTotal;
          totalTmp[3] += 1;
          setTodoTotal(totalTmp);
        }
      }
    }
    // 루틴 날짜별 정리
  };

  useEffect(() => {
    asyncGetAll();
    setCheckValue();
    setTimeout(() => {
      setTmp(5);
    }, 1000);
    setCheckedDate(tmpToday);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.titleWrapper}>
          <View style={commonStyles.spacing2} />
          <Text style={styles.nameText}>{nickName}님은</Text>
          {userRp >= 300 ? (
            <Text style={styles.nameText}>성장을 완료 했어요</Text>
          ) : (
            <View style={commonStyles.row}>
              <Text style={styles.nextLevelText}>레벨 {userLevel}</Text>
              <Text style={styles.nameText}> 만큼 성장했어요</Text>
            </View>
          )}
          {userRp >= 300 ? (
            <Text style={styles.upText}>만렙 성공!</Text>
          ) : (
            <Text style={styles.upText}>
              {upRp}RP 달성시, Lv.{nextLevel} 레벨 업!
            </Text>
          )}

          <Image source={gif} style={styles.gifImg} />

          {/* 가이드 페이지 */}
          <TouchableOpacity
            onPress={() => navigate('Guide')}
            activeOpacity={1.0}>
            <Text style={styles.guideText}>키움 성장 가이드</Text>
          </TouchableOpacity>

          {/* 레벨 progressBar */}
          <Shadow distance={5} startColor={'#f4f4f4'}>
            <View style={styles.levelContainer}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={styles.levelSheet}>
                  <Text
                    style={[
                      styles.progressLevelText,
                      {fontSize: userLevel > 10 ? 11 : 12},
                    ]}>
                    Lv.{userLevel}
                  </Text>

                  {/* 상단 Lv, RP 부분 */}
                </View>
                {userRp >= 300 ? (
                  <Text
                    style={[
                      styles.progressLevelText,
                      {color: '#888888', top: 5, marginRight: 18},
                    ]}>
                    {userRp} RP
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.progressLevelText,
                      {color: '#888888', top: 5, marginRight: 18},
                    ]}>
                    {userRp}/{upRp} RP
                  </Text>
                )}
              </View>

              {/* 프로그레스바 부분 */}
              {userRp >= 300 ? (
                <View>
                  <Progress.Bar
                    progress={userRp / 999}
                    width={300}
                    height={7}
                    color={'#585FFF'}
                    borderColor={'#FFFFFF'}
                    unfilledColor={'#CED6FF'}
                    style={[styles.progress, {bottom: 30}]}
                  />
                  <LevelArrow
                    style={[
                      userRp > 999
                        ? dstyleText(0.985 * 300).bar
                        : dstyleText((userRp / 999) * 300).bar,
                      {bottom: 28, left: userRp === 0 ? 7 : null},
                    ]}
                  />
                  <View
                    style={{
                      left: userRp === 0 ? 7 : null,
                      alignItems: 'center',
                    }}>
                    {userRp > 999 ? (
                      <LevelBox999
                        style={[
                          userRp > 999
                            ? dstyleText(1.0 * 300).bar
                            : dstyleText((userRp / 999) * 300).bar,
                          {bottom: 1, left: responsiveWidth(-4.4)},
                        ]}
                      />
                    ) : (
                      <LevelBox
                        style={[
                          userRp > 999
                            ? dstyleText(1.0 * 300).bar
                            : dstyleText((userRp / 999) * 300).bar,
                          {bottom: 1, left: -7},
                        ]}
                      />
                    )}
                    {userRp > 999 ? (
                      <Text
                        style={[
                          styles.progressRpText,
                          dstyleText(1.0 * 300).bar,
                          {
                            left: -8,
                            bottom: 3,
                            fontSize: responsiveFontSize(1.08),
                          },
                          ,
                        ]}>
                        999+
                      </Text>
                    ) : (
                      <Text
                        style={[
                          styles.progressRpText,
                          dstyleText((userRp / 999) * 300).bar,
                          {
                            left: responsiveWidth(-0.5),
                            bottom: 1,
                            fontSize:
                              userRp > 999 ? 8.5 : responsiveFontSize(1.2),
                          },
                          ,
                        ]}>
                        {userRp}
                      </Text>
                    )}
                  </View>
                </View>
              ) : (
                <View>
                  <Progress.Bar
                    progress={userRp / upRp}
                    width={300}
                    height={7}
                    color={'#585FFF'}
                    borderColor={'#FFFFFF'}
                    unfilledColor={'#CED6FF'}
                    style={[styles.progress, {bottom: 30}]}
                  />
                  <LevelArrow
                    style={[
                      dstyleText((userRp / upRp) * 300).bar,
                      {bottom: 28, left: userRp === 0 ? 7 : null},
                    ]}
                  />
                  <View style={{left: userRp === 0 ? 7 : null}}>
                    <LevelBox
                      style={[
                        dstyleText((userRp / upRp) * 300).bar,
                        {bottom: 1, left: -7},
                      ]}
                    />
                    {userRp < 10 ? (
                      <Text
                        style={[
                          styles.progressRpText,
                          dstyleText((userRp / upRp) * 300).bar,
                          {
                            left: 3,
                          },
                          ,
                        ]}>
                        {userRp}
                      </Text>
                    ) : (
                      <Text
                        style={[
                          styles.progressRpText,
                          dstyleText((userRp / upRp) * 300).bar,
                          {
                            left: userRp >= 100 ? -3 : 0,
                          },
                          ,
                        ]}>
                        {userRp}
                      </Text>
                    )}
                  </View>
                </View>
              )}
            </View>
          </Shadow>
          <View style={commonStyles.spacing2} />
        </View>
        <View style={commonStyles.spacing2} />
        <View>
          <Text style={[commonStyles.boldText_, styles.centering]}>
            완료하지 않은 루틴이 있어요!
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {todo.map((value, index) => (
              <View key={index}>
                <View style={styles.view1}>
                  {todoCompleted[index] === todoTotal[index] ? (
                    <View style={styles.grayImg}>{todoImgGray[index]}</View>
                  ) : (
                    <View>
                      <Image source={todoImg[index]} style={styles.img4} />
                    </View>
                  )}
                </View>
                {todoCompleted[index] === todoTotal[index] ? (
                  <View>
                    <Text style={styles.categoryText}>{todo[index]}</Text>
                    <Text style={styles.categoryBlackText}>
                      {todoCompleted[index]}/{todoTotal[index]}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.categoryText}>{todo[index]}</Text>
                    <Text style={styles.categoryColorText}>
                      {todoCompleted[index]}/{todoTotal[index]}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={commonStyles.spacing2} />
        <View style={[commonStyles.row]}>
          <Text
            style={[
              commonStyles.boldText_,
              styles.centering,
              styles.mainText4,
            ]}>
            이번 주 루틴 기록이에요
          </Text>
          <TouchableOpacity
            style={styles.showAllBtn}
            activeOpacity={1.0}
            onPress={() => navigate('LookAll')}>
            <Text style={styles.btnText}> &nbsp; 전체보기 &nbsp;</Text>
          </TouchableOpacity>
        </View>
        <CalendarProvider date={fomatToday}>
          <ExpandableCalendar
            monthFormat={'MM월'}
            renderArrow={direction => {
              if (direction === 'left') {
                return <LeftArrow style={{right: 25}} />;
              } else {
                return <RightArrow style={{left: 25}} />;
              }
            }}
            allowShadow={false}
            markedDates={routineDays}
            theme={{
              textMonthFontWeight: '800',
              selectedDayBackgroundColor: '#585FFF',
              dotColor: '#585FFF',
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
        </CalendarProvider>
        <ProgressComponent />
        <View style={commonStyles.spacing2} />

        {/* 6레벨 진화 모달 */}
        <Modal
          visible={levelUpModalVisible}
          animationType={'fade'}
          transparent={true}
          statusBarTranslucent={true}>
          <TouchableWithoutFeedback>
            <Animated.View style={{alignItems: 'center'}}>
              <TouchableOpacity
                activeOpacity={1.0}
                onPress={() => setLevelUpModalVisible(!levelUpModalVisible)}
                style={styles.levelUpModalBtn}>
                <Iconx />
              </TouchableOpacity>
              <Text style={styles.levelUpModalText}>축하합니다!</Text>
              <Text style={[styles.levelUpModalText]}>
                캐릭터가 첫 번째 성장했어요
              </Text>
              <Text style={styles.levelUpModalText_}>
                루틴을 열심히 진행하셨군요
              </Text>
              <Text style={[styles.levelUpModalText_]}>
                앞으로도 꾸준히 루틴을 실천해 주세요!
              </Text>
              <Image source={lv2Modal} style={styles.levelUpModalImg} />
            </Animated.View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* 최종 진화 모달 */}
        <Modal
          visible={levelUp_ModalVisible}
          animationType={'fade'}
          transparent={true}
          statusBarTranslucent={true}>
          <TouchableWithoutFeedback>
            <Animated.View style={{alignItems: 'center'}}>
              <TouchableOpacity
                activeOpacity={1.0}
                onPress={() => setLevelUp_ModalVisible(!levelUp_ModalVisible)}
                style={styles.levelUpModalBtn}>
                <Iconx />
              </TouchableOpacity>
              <Text style={styles.levelUpModalText}>축하합니다!</Text>
              <Text style={[styles.levelUpModalText]}>
                캐릭터가 최종 성장했어요
              </Text>
              <Text style={styles.levelUpModalText_}>
                루틴이 이제 익숙해지셨나요?
              </Text>
              <Text style={[styles.levelUpModalText_]}>
                앞으로도 꾸준히 루틴을 실천해 주세요!
              </Text>
              <Image source={lv3Modal} style={styles.levelUpModalImg} />
            </Animated.View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const dstyleText = x =>
  StyleSheet.create({
    bar: {
      marginLeft: x + 17,
      marginTop: 70,
      position: 'absolute',
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
  showAllBtn: {
    left: 35,
    width: 65,
    paddingTop: 3,
    borderColor: '#EBEBEB',
    borderWidth: 1,
    borderRadius: 5,
    height: 25,
  },
  btnText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888888',
    fontFamily: 'Pretendard-Medium',
  },
  scrollview: {
    width: '100%',
  },
  aimText1: {
    paddingLeft: 20,
    paddingRight: 100,
    paddingTop: 10,
  },
  nameText: {
    fontSize: 22,
    color: '#232323',
    fontFamily: 'Pretendard-Bold',
  },
  levelContainer: {
    width: 340,
    height: 110,
    paddingTop: 15,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  levelSheet: {
    width: 36,
    height: 18,
    top: 5,
    marginLeft: 25,
    backgroundColor: '#585FFF',
    borderRadius: 30,
    alignItems: 'center',
  },
  progressLevelText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Bold',
    color: '#FFFFFF',
  },
  progressRpText: {
    color: '#FFFFFF',
    bottom: 0.5,
    fontSize: 12,
    fontFamily: 'Pretendard-Bold',
  },
  progresPointText: {
    fontSize: 12,
    top: 5,
    color: '#BCBCBC',
    fontFamily: 'Pretendard-Medium',
  },
  nextLevelText: {
    fontSize: 22,
    color: '#585FFF',
    fontFamily: 'Pretendard-Bold',
  },
  upText: {
    fontSize: 12,
    color: '#232323',
    fontFamily: 'Pretendard-Medium',
    marginTop: 8,
  },
  guideText: {
    fontSize: 12,
    color: '#888888',
    fontFamily: 'Pretendard-Medium',
    textDecorationLine: 'underline',
    marginLeft: responsiveWidth(65),
    marginBottom: 20,
  },
  mainText4: {
    paddingRight: 60,
  },
  categoryText: {
    marginTop: 10,
    marginLeft: 15,
    color: '#232323',
    fontFamily: 'Pretendard-Medium',
    alignSelf: 'center',
    fontSize: 15,
  },
  categoryColorText: {
    marginTop: 6,
    marginLeft: 15,
    color: '#585FFF',
    fontFamily: 'Pretendard-Bold',
    alignSelf: 'center',
    fontSize: 15,
  },
  categoryBlackText: {
    marginTop: 6,
    marginLeft: 15,
    color: '#888888',
    fontFamily: 'Pretendard-Bold',
    alignSelf: 'center',
    fontSize: 15,
  },
  centering: {
    alignItems: 'center',
    paddingLeft: 20,
    color: '#232323',
  },
  gifImg: {
    marginTop: -25,
    marginBottom: -30,
    resizeMode: 'stretch',
    height: 360,
    width: 350,
  },
  progress: {
    marginTop: 50,
    marginLeft: 25,
    borderRadius: 10,
  },
  img4: {
    width: 90,
    height: 90,
    borderRadius: 150 / 2,
    overflow: 'hidden',
  },
  grayImg: {
    width: 60,
    height: 60,
    borderRadius: 150 / 2,
    overflow: 'hidden',
    marginLeft: 15,
    marginTop: 15,
  },
  view1: {
    width: responsiveWidth(23),
    height: responsiveHeight(12),
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5, // changed to a greater value
    borderRadius: 150 / 2,
    borderColor: '#000000',
    zIndex: 99, // added zIndex
    backgroundColor: '#FFFFFF', // added a background color
    marginTop: responsiveHeight(3),
    marginLeft: responsiveWidth(5),
    marginRight: 5,
  },
  levelUpModalText: {
    top: responsiveHeight(14.5),
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Pretendard-Bold',
    zIndex: 10,
  },
  levelUpModalText_: {
    top: responsiveHeight(17.5),
    color: '#888888',
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    zIndex: 10,
  },
  levelUpModalBtn: {
    left: responsiveWidth(38),
    top: responsiveHeight(7),
    zIndex: 10,
  },
  levelUpModalImg: {
    marginTop: responsiveHeight(-17),
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
});

export default MainScreen;
