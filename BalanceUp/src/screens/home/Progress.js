import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  PanResponder,
  Image,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
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
import edit from '../../resource/image/Main/edit.png';
import delete2 from '../../resource/image/Main/delete.png';
import {useRecoilState, useRecoilValue} from 'recoil';
import {deleteRoutine} from '../../actions/routineAPI';
import {
  routineState,
  routineStateComplete,
  routineStateDays,
  routineStateDaysSet,
} from '../../recoil/userState';
import OverSvg from '../../resource/image/Common/overRoutine.svg';
import {dateState} from '../../recoil/appState';

const Progress = () => {
  const route = useRoute();
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [routineId, setRoutineId] = useState();
  const [routineCategory, setroutineCategory] = useState();
  const [todoDays, setTodoDays] = useRecoilState(routineStateDays);
  const [dateSelected, setDateState] = useRecoilState(dateState);
  const [todoList, setTodoList] = useState([]);
  const selectTodo = useRecoilValue(routineStateDaysSet());

  // const [nowdata, setNowdata] = useState();
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const [completeDay, setCompleteDayModalVisible] = useState(0);
  const [completeChangeModalVisible, setCompleteChangeModalVisible] =
    useState(false);
  const [overRoutineModalVisible, setOverRoutineModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const navigation = useNavigation();

  //날짜 선택시 루틴리스트 생성
  const setRoutinesByDate = () => {
    let tmp = [];
    for (var i = 0; i < selectTodo.length; i++) {
      if (selectTodo[i].day === dateSelected) {
        let tmpSelected = JSON.parse(JSON.stringify(selectTodo[i]));
        if (
          selectTodo[i].category == '일상' &&
          selectTodo[i].completed == true
        ) {
          tmpSelected.categoryImg = lifeGray;
        } else if (
          selectTodo[i].category == '일상' &&
          selectTodo[i].completed == false
        ) {
          tmpSelected.categoryImg = life;
        } else if (
          selectTodo[i].category == '학습' &&
          selectTodo[i].completed == true
        ) {
          tmpSelected.categoryImg = educationGray;
        } else if (
          selectTodo[i].category == '학습' &&
          selectTodo[i].completed == false
        ) {
          tmpSelected.categoryImg = education;
        } else if (
          selectTodo[i].category == '마음관리' &&
          selectTodo[i].completed == true
        ) {
          tmpSelected.categoryImg = mentalGray;
        } else if (
          selectTodo[i].category == '마음관리' &&
          selectTodo[i].completed == false
        ) {
          tmpSelected.categoryImg = mental;
        } else if (
          selectTodo[i].category == '운동' &&
          selectTodo[i].completed == true
        ) {
          tmpSelected.categoryImg = healthGray;
        } else if (
          selectTodo[i].category == '운동' &&
          selectTodo[i].completed == false
        ) {
          tmpSelected.categoryImg = health;
        }
        tmp.push(tmpSelected);
      }
    }
    setRoutines(tmp);
  };

  useEffect(() => {
    setRoutinesByDate();
    console.log(routines);
  }, []);

  useEffect(() => {
    if (route.params != null) {
      setOverRoutineModalVisible(!overRoutineModalVisible);
      route.params = null;
    }
  }, [route]);

  useEffect(() => {
    setRoutinesByDate();
  }, [dateSelected]);

  const [completeChangeIndex, setCompleteChangeIndex] = useState(0);
  const [todoComplete, setTodoComplete] = useState([0.5, 1, 0.5, 1]);

  // 모달 기능 구현
  const screenHeight = Dimensions.get('screen').height;

  const panY = useRef(new Animated.Value(screenHeight)).current;

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 10,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const todoImg = [life, education, mental, health];
  // const todoComplete = [0.5, 1, 0.5, 1];
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: gestureState => panY.setValue(gestureState.dy),
      onPanResponderRelease: gestureState => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  const closeModal = () => {
    closeBottomSheet.start(() => setCompleteModalVisible(false));
    closeBottomSheet.start(() => setCompleteChangeModalVisible(false));
    closeBottomSheet.start(() => setDeleteModalVisible(false));
    closeBottomSheet.start(() => setOverRoutineModalVisible(false));
  };

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
      return 1;
    } else {
      return 0.5;
    }
  };
  const checkComplete = index => {
    if (todoComplete[index] === 1) {
      setCompleteModalVisible(true);
      let tmp = todoComplete;
      tmp[index] = 0.5;
      console.log(tmp);
      setTodoComplete(tmp);
      setCompleteDayModalVisible(2); // 1일시 하루, 아닐시 2주 모달 띄움
    } else {
      setCompleteChangeModalVisible(true);
      setCompleteChangeIndex(index);
    }
  };

  // 완료 체크 기능 구현
  // const handleComplete = id => {
  //   todoTmp.map(data => {
  //     if (data.id === id && data.completed === false) {
  //       let copy = [...todoTmp];
  //       copy[parseInt(data.id) - 1] = {
  //         id: data.id,
  //         title: data.title,
  //         completed: !data.completed,
  //       };
  //       setTodoTmp(copy);
  //       setCompleteModalVisible(!completeModalVisible);
  //     } else if (data.id === id && data.completed === true) {
  //       setNowdata(data);
  //       setCompleteChangeModalVisible(!completeChangeModalVisible);
  //     }
  //     return data;
  //   });
  // };

  // 완료 체크 취소 기능 구현(미완성)
  const handleCompleteChange = index => {
    // console.log(nowdata);
    // todoTmp.map(data => {
    //   if (data.id === id) {
    //     let copy = [...todoTmp];
    //     copy[parseInt(nowdata.id) - 1] = {
    //       id: nowdata.id,
    //       title: nowdata.title,
    //       completed: !nowdata.completed,
    //     };
    //     setTodoTmp(copy);
    //     setCompleteChangeModalVisible(!completeChangeModalVisible);
    //   }
    //   return data;
    // });
    if (todoComplete[index] === 0.5) {
      let tmp = todoComplete;
      tmp[index] = 1;
      setCompleteChangeModalVisible(false);
      setTodoComplete(tmp);
    } else {
    }
  };

  // 수정 기능 구현
  const handleEdit = (
    routineId,
    routineCategory,
    routineTitle,
    alarm,
    days,
  ) => {
    setRoutineId(routineId);
    setroutineCategory(routineCategory);
    navigation.navigate('Plan', {
      routineId: routineId,
      planText: routineCategory,
      routineTitle: routineTitle,
      days: days,
      alarm: alarm,
    });
  };

  // 삭제 기능 구현
  const handleRemove = routineId => {
    setDeleteModalVisible(!deleteModalVisible);
    setRoutineId(routineId);
    console.log(routineId);
  };

  return (
    <View>
      {routines.map((data, index) => (
        <ScrollView
          key={data.routineId}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.view2}>
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
            <Image source={edit} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => handleRemove(data.routineId)}>
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
                onPress={() => setCompleteModalVisible(!completeModalVisible)}>
                <TouchableWithoutFeedback>
                  <Animated.View
                    style={{
                      ...modalInnerStyles.centerSheetContainer,
                    }}
                    // {...panResponder.panHandlers}
                  >
                    {/* 모달에 들어갈 내용을 아래에 작성 */}
                    <Text style={modalInnerStyles.completeText1}>+1 RP</Text>
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
                onPress={() => setCompleteModalVisible(!completeModalVisible)}>
                <TouchableWithoutFeedback>
                  <Animated.View
                    style={[
                      {
                        ...modalInnerStyles.centerSheetContainer,
                      },
                      {height: 270},
                    ]}
                    // {...panResponder.panHandlers}
                  >
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
                  }}
                  // {...panResponder.panHandlers}
                >
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
                        handleCompleteChange(completeChangeIndex);
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
                // transform: [{translateY: translateY}],
              }}
              // {...panResponder.panHandlers}
            >
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
                  onPress={() =>
                    deleteRoutine(routineId).then(
                      setDeleteModalVisible(!deleteModalVisible),
                      setLoading(true),
                      console.log(routineId),
                    )
                  }>
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
      paddingRight: 100,
      paddingTop: 10,
      opacity: 0.5,
      width: 200,
    },
  });

const svg2 = x =>
  StyleSheet.create({
    bar: {
      width: 150,
      zIndex: 10,
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
  progressBar: {
    paddingLeft: 50,
    paddingTop: 35,
  },
  modalImg: {
    width: 170,
    height: 110,
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
  img2_gray: {
    resizeMode: 'stretch',
    height: 70,
    width: 70,
    tintColor: 'gray',
  },
});

export {Progress};
