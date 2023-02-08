import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Image,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import {
  dailyState,
  exerciseState,
  learningState,
  mindCareState,
  nickNameState,
  userRpState,
} from '../../recoil/atom';
import {DeviceEventEmitter} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import commonStyles from '../../css/commonStyles';
import modalInnerStyles from '../../css/modalStyles';
import Svg, {Text as SvgText, Rect} from 'react-native-svg';
import life from '../../resource/image/SetTodo/life.png';
import education from '../../resource/image/SetTodo/education.png';
import mental from '../../resource/image/SetTodo/mental.png';
import health from '../../resource/image/SetTodo/health.png';
import lifeGray from '../../resource/image/SetTodo/life_gray.png';
import educationGray from '../../resource/image/SetTodo/education_gray.png';
import mentalGray from '../../resource/image/SetTodo/mental_gray.png';
import healthGray from '../../resource/image/SetTodo/health_gray.png';
import oneDay from '../../resource/image/Modal/Crystal.png';
import twoWeeks from '../../resource/image/Modal/10routine.png';
import {jwtState} from '../../recoil/atom';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  deleteRoutine,
  progressOneRoutine,
  progressAllRoutine,
  cancelOneRoutine,
} from '../../actions/routineAPI';
import Edit from '../../resource/image/Main/edit.svg';
import Delete from '../../resource/image/Main/delete.svg';
import {routineStateDaysSet} from '../../recoil/userState';
import OverSvg from '../../resource/image/Common/overRoutine.svg';
import {dateState, routineStateNum} from '../../recoil/appState';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import axios from '../../utils/Client';
import Toast from 'react-native-easy-toast';

const Progress = () => {
  const route = useRoute();
  const [nickName, setNickName] = useRecoilState(nickNameState);
  const [daily, setDaily] = useRecoilState(dailyState);
  const [exercise, setExercise] = useRecoilState(exerciseState);
  const [learning, setLearning] = useRecoilState(learningState);
  const [mindCare, setMindCare] = useRecoilState(mindCareState);
  const [userRp, setUserRp] = useRecoilState(userRpState);
  const [routines, setRoutines] = useState([]);
  const [routineId, setRoutineId] = useState();
  const [routineCategory, setroutineCategory] = useState();
  const [dateSelected, setDateState] = useRecoilState(dateState);
  const [token, setToken] = useRecoilState(jwtState);
  const selectTodo = useRecoilValue(routineStateDaysSet(token, 0));
  const [routineRefresh, setRoutineStateNum] = useRecoilState(routineStateNum);

  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const [completeDay, setCompleteDayNum] = useState(0);
  const [completeChangeModalVisible, setCompleteChangeModalVisible] =
    useState(false);
  const [overRoutineModalVisible, setOverRoutineModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const navigation = useNavigation();

  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  let tmpMonth = ('0' + month).slice(-2); // 오늘 제외
  let tmpDate = ('0' + date).slice(-2);
  let tmpToday = year + '-' + tmpMonth + '-' + tmpDate;

  // 유저 정보 업데이트
  const fetchUserData = async () => {
    const request = await axios.get('/user');
    setNickName(request.data.body.nickname);
    setUserRp(request.data.body.rp);
    setDaily(request.data.body.daily);
    setExercise(request.data.body.exercise);
    setLearning(request.data.body.learning);
    setMindCare(request.data.body.mindCare);
  };

  // 날짜 선택시 루틴리스트 생성
  const setRoutinesByDate = () => {
    let tmp = [];
    for (var i = 0; i < selectTodo.length; i++) {
      if (selectTodo[i].day === dateSelected) {
        let tmpSelected = JSON.parse(JSON.stringify(selectTodo[i]));
        if (
          selectTodo[i].routineCategory == '일상' &&
          selectTodo[i].completed == true
        ) {
          tmpSelected.categoryImg = lifeGray;
        } else if (
          selectTodo[i].routineCategory == '일상' &&
          selectTodo[i].completed == false
        ) {
          tmpSelected.categoryImg = life;
        } else if (
          selectTodo[i].routineCategory == '학습' &&
          selectTodo[i].completed == true
        ) {
          tmpSelected.categoryImg = educationGray;
        } else if (
          selectTodo[i].routineCategory == '학습' &&
          selectTodo[i].completed == false
        ) {
          tmpSelected.categoryImg = education;
        } else if (
          selectTodo[i].routineCategory == '마음관리' &&
          selectTodo[i].completed == true
        ) {
          tmpSelected.categoryImg = mentalGray;
        } else if (
          selectTodo[i].routineCategory == '마음관리' &&
          selectTodo[i].completed == false
        ) {
          tmpSelected.categoryImg = mental;
        } else if (
          selectTodo[i].routineCategory == '운동' &&
          selectTodo[i].completed == true
        ) {
          tmpSelected.categoryImg = healthGray;
        } else if (
          selectTodo[i].routineCategory == '운동' &&
          selectTodo[i].completed == false
        ) {
          tmpSelected.categoryImg = health;
        }
        tmp.push(tmpSelected);
      }
    }
    setRoutines(tmp);
  };

  // 루틴 4개 초과시 초과 모달
  useEffect(() => {
    if (route.params != null) {
      setOverRoutineModalVisible(!overRoutineModalVisible);
      route.params = null;
    }
  }, [route.params]);

  // 루틴 생성, 수정 후 리프레쉬 ->
  // 생성은 문제 없음.
  // 최초 1번만 수정이 바로 스크린에 반영됨.
  // 2번, 3번 or 이어서 다른 루틴 수정시에는 api만 정상 작동, 스크린 반영 안됨
  useEffect(() => {
    DeviceEventEmitter.addListener('refresh', () => {
      console.log('refresh 실행');
      let tmpNum = JSON.parse(JSON.stringify(routineRefresh));
      setRoutineStateNum(tmpNum + 1);
    });
  }, []);

  useEffect(() => {
    setRoutinesByDate();
    // setUserRp(1003);
    fetchUserData();
    console.log('nickname: ', nickName, 'user RP : ', userRp);
    // console.log(selectTodo);
    // let tmpNum = JSON.parse(JSON.stringify(routineRefresh));
    // setRoutineStateNum(tmpNum + 1);
  }, [dateSelected, selectTodo]);

  const [chosenIndex, setChosenIndex] = useState(0);

  // 모달 기능 구현
  const screenHeight = Dimensions.get('screen').height;

  const panY = useRef(new Animated.Value(screenHeight)).current;

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 10,
    useNativeDriver: true,
  });

  useEffect(() => {
    if (
      completeModalVisible ||
      completeChangeModalVisible ||
      deleteModalVisible ||
      overRoutineModalVisible
    ) {
      resetBottomSheet.start();
    }
  }, [
    completeModalVisible,
    completeChangeModalVisible,
    deleteModalVisible,
    overRoutineModalVisible,
  ]);

  const setOpacity = value => {
    if (value) {
      return 0.5;
    } else {
      return 1;
    }
  };

  // 토스트 메세지
  const toastRef = useRef();

  const showCopyToast = useCallback(() => {
    toastRef.current.show('루틴은 당일 완료만 가능해요!');
  }, []);

  const checkComplete = async index => {
    setChosenIndex(index);
    if (dateSelected == tmpToday) {
      // 오늘날짜인지 체크
      if (routines[index].completed) {
        // 완료된 루틴 클릭시 완료 취소
        setCompleteChangeModalVisible(true);
      } else {
        // 아닐시 완료
        // 2주 루틴, 하루루틴 구별
        let checkEveyday = 0;

        for (var i = 0; i < selectTodo.length; i++) {
          if (
            selectTodo[i].routineId === routines[index].routineId &&
            selectTodo[i].completed == false
          ) {
            checkEveyday += 1;
          }
        }
        if (checkEveyday === 1) {
          // 하루만 체크 안된거므로 오늘하면 2주
          let res = await progressAllRoutine(routines[index].routineId);

          // seloctor 업데이트를 위해+1
          let tmpNum = JSON.parse(JSON.stringify(routineRefresh));
          setRoutineStateNum(tmpNum + 1);
          setCompleteModalVisible(true);
          setCompleteDayNum(2);
        } else {
          // 아닌경우 하루
          let res = await progressOneRoutine(routines[index].routineId);

          // seloctor 업데이트를 위해+1
          let tmpNum = JSON.parse(JSON.stringify(routineRefresh));
          setRoutineStateNum(tmpNum + 1);
          setCompleteModalVisible(true);
          setCompleteDayNum(1);
        }
      }
    } else {
      showCopyToast();
    }
  };

  // 완료 체크 취소 기능
  const handleCompleteChange = async index => {
    let res = await cancelOneRoutine(
      routines[index].routineId,
      routines[index].day,
    );

    // seloctor 업데이트를 위해+1
    let tmpNum = JSON.parse(JSON.stringify(routineRefresh));
    setRoutineStateNum(tmpNum + 1);
    setCompleteChangeModalVisible(false);
  };

  // 삭제 기능
  const handleDelete = async () => {
    await deleteRoutine(routines[chosenIndex].routineId).then(
      setDeleteModalVisible(!deleteModalVisible),
    );
    // seloctor 업데이트를 위해+1
    let tmpNum = JSON.parse(JSON.stringify(routineRefresh));
    setRoutineStateNum(tmpNum + 1);
  };
  const handleRemove = index => {
    setDeleteModalVisible(!deleteModalVisible);
    setChosenIndex(index);
  };

  // 수정 기능 구현
  const handleEdit = (
    routineId,
    routineCategory,
    routineTitle,
    alarmTime,
    days,
  ) => {
    setRoutineId(routineId);
    setroutineCategory(routineCategory);
    navigation.navigate('Plan', {
      routineId: routineId,
      planText: routineCategory,
      routineTitle: routineTitle,
      days: days,
      alarm: alarmTime,
    });
  };

  return (
    <View>
      <Toast
        ref={toastRef}
        position="top"
        positionValue={10}
        fadeInDuration={300}
        fadeOutDuration={1500}
        style={styles.toastView}
        textStyle={styles.toastText}
      />
      {routines.map((data, index) => (
        <ScrollView
          key={data.routineId}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.routineSheet}>
          <Image source={data.categoryImg} style={styles.img2_gray} />
          <View style={aimText1(setOpacity(data.completed)).bar}>
            <Text style={commonStyles.boldText}>{data.routineTitle}</Text>
            <Text style={commonStyles.lightText}>
              {data.routineCategory} | {data.days} {data.alarmTime}
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={() => checkComplete(index)}>
            <Svg height={80} style={svg2(setOpacity(data.completed)).bar}>
              <Rect
                x={15}
                y={20}
                width="60"
                height="34"
                rx="18"
                fill="#585FFF"
              />
              <SvgText x={34} y={42} style={styles.completeText} fill="white">
                완료
              </SvgText>
            </Svg>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() =>
              handleEdit(
                data.routineId,
                data.routineCategory,
                data.routineTitle,
                data.alarmTime,
                data.days,
              )
            }>
            <Edit />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => handleRemove(index)}>
            <Delete />
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
                onPress={() => setCompleteModalVisible(!completeModalVisible)}>
                <TouchableWithoutFeedback>
                  <Animated.View
                    style={{
                      ...modalInnerStyles.centerSheetContainer,
                    }}>
                    <Text style={modalInnerStyles.completeText1}>+1 RP</Text>
                    <Text style={modalInnerStyles.completeText2}>
                      오늘의 루틴을 완료했습니다!
                    </Text>
                    <View style={modalInnerStyles.completeImg1}>
                      <Image
                        source={oneDay}
                        style={modalInnerStyles.completeImg1_1}
                      />
                    </View>
                  </Animated.View>
                </TouchableWithoutFeedback>
              </Pressable>
            ) : (
              <Pressable
                style={modalInnerStyles.complteModalOverlay}
                onPress={() => setCompleteModalVisible(!completeModalVisible)}>
                <TouchableWithoutFeedback>
                  <Animated.View
                    style={[
                      {
                        ...modalInnerStyles.centerSheetContainer,
                      },
                      {height: 270},
                    ]}>
                    <Text style={modalInnerStyles.completeText1}>+10 RP</Text>
                    <Text style={modalInnerStyles.completeText2}>
                      2주간 완벽하게 루틴을 완료했어요
                    </Text>
                    <Text style={modalInnerStyles.completeImg1}>
                      앞으로도 꾸준한 루틴 기대할게요!
                    </Text>
                    <View style={modalInnerStyles.completeImg1}>
                      <Image
                        source={twoWeeks}
                        style={{width: 270, height: 140, bottom: 15}}
                      />
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
              style={modalInnerStyles.complteChangeModalOverlay}
              onPress={() =>
                setCompleteChangeModalVisible(!completeChangeModalVisible)
              }>
              <TouchableWithoutFeedback>
                <Animated.View
                  style={{
                    ...modalInnerStyles.complteChangeSheetContainer,
                  }}>
                  <Text style={modalInnerStyles.modalTitle}>
                    이미 완료한 루틴입니다!
                  </Text>
                  <Text style={modalInnerStyles.deletModalText}>
                    루틴 완료를 취소하시겠습니까?
                  </Text>
                  <Text style={modalInnerStyles.deletModalText_}>
                    루틴 완료 기록과 획득 RP가 사라집니다
                  </Text>
                  <View style={modalInnerStyles.modalFlex}>
                    <TouchableOpacity
                      activeOpacity={1.0}
                      style={modalInnerStyles.noBtn}
                      onPress={() => setCompleteChangeModalVisible(false)}>
                      <Text style={modalInnerStyles.noText}>아니요</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={modalInnerStyles.yesBtn}
                      activeOpacity={1.0}
                      onPress={() => {
                        handleCompleteChange(chosenIndex);
                        // console.log('complete change id : ', data.id);
                      }}>
                      <Text style={modalInnerStyles.nextText}>취소할래요!</Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              </TouchableWithoutFeedback>
            </Pressable>
          </Modal>

          {/* 4개 루틴 생성 초과 모달 */}
          <Modal
            visible={overRoutineModalVisible}
            animationType={'fade'}
            transparent={true}
            statusBarTranslucent={true}>
            <Pressable style={modalInnerStyles.complteModalOverlay}>
              <TouchableWithoutFeedback>
                <Animated.View
                  style={[
                    {
                      ...modalInnerStyles.centerSheetContainer,
                    },
                    {height: 270},
                  ]}>
                  <View style={{alignItems: 'center'}}>
                    <OverSvg style={{bottom: 30}} />
                    <Text style={modalInnerStyles.overText}>
                      아쉽지만 진행 중인 루틴이
                    </Text>
                    <Text style={modalInnerStyles.overText}>
                      4개를 초과할 수 없어요!
                    </Text>
                    <Text style={modalInnerStyles.overSubText}>
                      많은 루틴보단 현재의 루틴에 집중해서
                    </Text>
                    <Text style={[modalInnerStyles.overSubText, {top: -2}]}>
                      나만의 루틴을 만들어가는 건 어떨까요?
                    </Text>
                    <TouchableOpacity
                      activeOpacity={1.0}
                      style={modalInnerStyles.bntStyle}
                      onPress={() => setOverRoutineModalVisible(false)}>
                      <Text style={modalInnerStyles.btnText}>확인</Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              </TouchableWithoutFeedback>
            </Pressable>
          </Modal>
        </ScrollView>
      ))}

      {/* 삭제 모달 구현 코드 */}
      <Modal
        visible={deleteModalVisible}
        animationType={'fade'}
        transparent={true}
        statusBarTranslucent={true}>
        <Pressable
          style={modalInnerStyles.complteChangeModalOverlay}
          onPress={() => setDeleteModalVisible(!deleteModalVisible)}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={{
                ...modalInnerStyles.deleteSheetContainer,
              }}>
              <Text style={modalInnerStyles.modalTitle}>
                진행중인 루틴입니다!
              </Text>
              <Text style={modalInnerStyles.deletModalText}>
                루틴을 삭제하시겠습니까?
              </Text>
              <Text style={modalInnerStyles.deletModalText_}>
                해당 루틴에 대한 모든 기록이 사라집니다
              </Text>
              <Text style={modalInnerStyles.deletModalText__}>
                *루틴 완료 기록, 획득 RP
              </Text>
              <View style={modalInnerStyles.modalFlex}>
                <TouchableOpacity
                  style={modalInnerStyles.noBtn}
                  activeOpacity={1.0}
                  onPress={() => setDeleteModalVisible(false)}>
                  <Text style={modalInnerStyles.noText}>아니요</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={modalInnerStyles.yesBtn}
                  activeOpacity={1.0}
                  onPress={() => handleDelete()}>
                  <Text style={modalInnerStyles.nextText}>삭제할래요!</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
    </View>
  );
};
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
      paddingTop: 15,
      opacity: x,
      width: 200,
    },
  });

const svg2 = x =>
  StyleSheet.create({
    bar: {
      width: 120,
      height: 200,
      opacity: x,
      marginLeft: -40,
    },
  });

const styles = StyleSheet.create({
  mainText1: {
    fontSize: 12,
    color: 'black',
    zIndex: 30,
    fontWeight: 600,
  },
  mainText2: {
    fontSize: 15,
    color: 'black',
    zIndex: 30,
  },
  svg1: {
    zIndex: 10,
  },
  svg2: {
    width: 100,
    zIndex: 10,
  },
  svg3: {
    width: 50,
    zIndex: 10,
  },
  aimText1: {
    paddingLeft: 50,
    paddingRight: 100,
  },
  completeText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 13,
  },
  progressBar: {
    paddingLeft: 50,
    paddingTop: 35,
  },
  modalImg: {
    width: 170,
    height: 110,
  },
  routineSheet: {
    width: responsiveWidth(87),
    backgroundColor: '#FFFFFF',
    shadowColor: '#c5c5c5',
    elevation: 15,
    borderRadius: 5,
    marginTop: 20,
    marginLeft: responsiveWidth(6),
  },
  img2_gray: {
    resizeMode: 'stretch',
    marginLeft: 10,
    height: 70,
    width: 70,
    // tintColor: 'gray',
  },
  toastView: {
    bottom: responsiveHeight(18),
    width: 230,
    height: 47,
    borderRadius: 35,
    justifyContent: 'center',
    backgroundColor: '#444444',
  },
  toastText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
  },
});

export {Progress};
