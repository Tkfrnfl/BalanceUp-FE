import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  Dimensions,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Switch,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import modalInnerStyles from '../../css/modalStyles';
import styles from '../../css/SetPlanScreenStyles';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';
const SetPlanScreen = ({navigation, route}) => {
  // const {planText} = route.params;

  const [lengthTodo, setLengthTodo] = useState(0);
  const [todoText, setTodoText] = useState('');

  const [sunActive, setSunActive] = useState(0, false);
  const [monActive, setMonActive] = useState(1, true);
  const [tueActive, setTueActive] = useState(1, true);
  const [wenActive, setWenActive] = useState(1, true);
  const [thurActive, setThurActive] = useState(1, true);
  const [friActive, setFriActive] = useState(1, true);
  const [satActive, setSatActive] = useState(0, false);
  const [dayText, setDayText] = useState(['월', '화', '수', '목', '금']);
  const dayBy = ['일', '월', '화', '수', '목', '금', '토'];

  console.log(dayText);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clearModalVisible, setClearModalVisible] = useState(false);

  const [isEnabled, setIsEnabled] = useState(true);

  const [alertHour, setAlertHour] = useState('09');
  const [alertMin, setAlertMin] = useState('00');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [shouldShow, setShouldShow] = useState(true);

  const [disabled, setDisabled] = useState(false);

  // 모달 기능 구현
  const screenHeight = Dimensions.get('screen').height;

  const panY = useRef(new Animated.Value(screenHeight)).current;

  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-1, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

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
    closeBottomSheet.start(() => setIsModalVisible(false));
    closeBottomSheet.start(() => setClearModalVisible(false));
  };
  React.useEffect(() => {
    PushNotification.setApplicationIconBadgeNumber(0);
  }, []);
  useEffect(() => {
    if (isModalVisible) {
      resetBottomSheet.start();
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (clearModalVisible) {
      resetBottomSheet.start();
    }
  }, [clearModalVisible]);

  // 팝업 알림 설정 구현
  const notify = () => {
    let activeDays = [
      sunActive,
      monActive,
      tueActive,
      wenActive,
      thurActive,
      friActive,
      satActive,
    ];

    activeDays.map((day, index) => {
      if (day === 1) {
        PushNotification.createChannel(
          {
            channelId: `${todoText}${index}`,
            channelName: 'My channel',
            channelDescription: 'A channel to categorise your notifications',
            playSound: false,
            soundName: 'default',
            vibrate: true,
          },
          created => console.log(`createChannel returned '${created}'`),
        );

        PushNotification.localNotificationSchedule({
          channelId: `${todoText}${index}`,
          title: todoText,
          message: '김루틴님, 오늘의 루틴을 완료해보세요!',
          date: calculateDateByDay(index),
          repeatType: 'week',
        });
      }
    });
  };
  // 팝업 알람 날짜 계산
  const calculateDateByDay = (index: any) => {
    let now = new Date();
    let m = moment().utcOffset(0);
    m.set({hour: alertHour, minute: alertMin, second: 0, millisecond: 0});
    console.log(now.getDay());

    const daysFromNow = index - now.getDay();
    if (daysFromNow <= 0) {
      // 요일 초과시 다음주로
      m = moment(m).add(daysFromNow + 7, 'day');
    } else {
      m = moment(m).add(daysFromNow, 'day');
    }
    m.toDate();

    var retrunTime = new Date(m);

    console.log(retrunTime);
    return retrunTime;
  };
  // input 기능 구현
  const handleTextChange = toDo => {
    setLengthTodo(toDo.length);
    setTodoText(toDo);
    console.log(todoText);
  };

  // 요일 선택 기능 구현
  const handelSunActive = () => {
    setSunActive(sunActive + 1);
    sunActive % 2 === 0 ? setSunActive(true) : setSunActive(false);
    sunActive
      ? setDayText(dayText.filter(str => str !== '일'))
      : setDayText([...dayText, '일']);
  };
  const handelMonActive = () => {
    setMonActive(monActive + 1);
    monActive % 2 === 0 ? setMonActive(true) : setMonActive(false);
    monActive
      ? setDayText(dayText.filter(str => str !== '월'))
      : setDayText([...dayText, '월']);
  };
  const handelTueActive = () => {
    setTueActive(tueActive + 1);
    tueActive % 2 === 0 ? setTueActive(true) : setTueActive(false);
    tueActive
      ? setDayText(dayText.filter(str => str !== '화'))
      : setDayText([...dayText, '화']);
  };
  const handelWenActive = () => {
    setWenActive(wenActive + 1);
    wenActive % 2 === 0 ? setWenActive(true) : setWenActive(false);
    wenActive
      ? setDayText(dayText.filter(str => str !== '수'))
      : setDayText([...dayText, '수']);
  };
  const handelThurActive = () => {
    setThurActive(thurActive + 1);
    thurActive % 2 === 0 ? setThurActive(true) : setThurActive(false);
    thurActive
      ? setDayText(dayText.filter(str => str !== '목'))
      : setDayText([...dayText, '목']);
  };
  const handelFriActive = () => {
    setFriActive(friActive + 1);
    friActive % 2 === 0 ? setFriActive(true) : setFriActive(false);
    friActive
      ? setDayText(dayText.filter(str => str !== '금'))
      : setDayText([...dayText, '금']);
  };
  const handelSatActive = () => {
    setSatActive(satActive + 1);
    satActive % 2 === 0 ? setSatActive(true) : setSatActive(false);
    satActive
      ? setDayText(dayText.filter(str => str !== '토'))
      : setDayText([...dayText, '토']);
  };

  // 토글 스위치 구현
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleSwitchOn = () => {
    setShouldShow(!shouldShow);
    isEnabled ? setAlertHour('') : setAlertHour('09');
    isEnabled ? setAlertMin('') : setAlertMin('00');
  };

  // 완료 버튼 구현
  const handleCheck = () => {
    setClearModalVisible(!clearModalVisible);
    setDayText(
      [...dayText].sort((a, b) => dayBy.indexOf(a) - dayBy.indexOf(b)),
    );
  };

  // 버튼 활성화/비활성화
  useEffect(() => {
    setDisabled(
      !(
        lengthTodo &&
        (sunActive ||
          monActive ||
          tueActive ||
          wenActive ||
          thurActive ||
          friActive ||
          satActive)
      ),
    );
  }, [
    lengthTodo,
    sunActive,
    monActive,
    tueActive,
    wenActive,
    thurActive,
    friActive,
    satActive,
  ]);

  // 네비게이션 구현
  const goNext = () => {
    navigation.navigate('Main');
    setIsModalVisible(false);
  };

  const goBack = () => {
    navigation.navigate('Set');
  };

  const goClear = () => {
    // state props 값 잘 넘어가는지 check
    navigation.navigate('Main', {
      // planText: planText,
      dayText: dayText,
      todoText: todoText,
      time: alertHour + alertMin,
    });
    notify();
    setClearModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.topSheet}>
          <TouchableOpacity onPress={goBack}>
            {/* 임시 디자인 버튼 */}
            <Text style={styles.arrowBtn}>⬅</Text>
          </TouchableOpacity>
          <Text style={styles.topTitle}>루틴 설정</Text>
          <TouchableOpacity onPress={() => setIsModalVisible(!isModalVisible)}>
            {/* 임시 디자인 버튼 */}
            <Text style={styles.xBtn}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subTitle}>
          <Text style={styles.subText}>
            나를 키울 루틴은 {'\n'}어떻게 진행되나요?
          </Text>
        </View>

        {/* input 구현 코드*/}
        <View style={styles.inputSheet}>
          <Text style={styles.inputText}>루틴명</Text>
          <TextInput
            style={styles.inputStyle}
            fontSize={18}
            maxLength={20}
            autoCapitalize="none"
            placeholder="예) 물💧 마시기!"
            onChangeText={handleTextChange}
          />
          <Text style={styles.count}>{lengthTodo}/20</Text>
        </View>

        {/* 요일 선택 구현 코드 */}
        <View style={styles.daySelect}>
          <Text style={styles.daySelectText}>진행 요일</Text>
          <Text style={styles.recText}>*주2일 이상 루틴을 실천해보세요!</Text>
        </View>
        <View style={styles.daySelectBtnView}>
          <TouchableOpacity
            style={[
              styles.daySelectBtn,
              {backgroundColor: sunActive ? '#6D81FA' : '#D9D9D9'},
            ]}
            onPress={handelSunActive}>
            <Text
              style={[styles.btnText, {color: sunActive ? '#fff' : '#000'}]}>
              일
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.daySelectBtn,
              {backgroundColor: monActive ? '#6D81FA' : '#D9D9D9'},
            ]}
            onPress={handelMonActive}>
            <Text
              style={[styles.btnText, {color: monActive ? '#fff' : '#000'}]}>
              월
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.daySelectBtn,
              {backgroundColor: tueActive ? '#6D81FA' : '#D9D9D9'},
            ]}
            onPress={handelTueActive}>
            <Text
              style={[styles.btnText, {color: tueActive ? '#fff' : '#000'}]}>
              화
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.daySelectBtn,
              {backgroundColor: wenActive ? '#6D81FA' : '#D9D9D9'},
            ]}
            onPress={handelWenActive}>
            <Text
              style={[styles.btnText, {color: wenActive ? '#fff' : '#000'}]}>
              수
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.daySelectBtn,
              {backgroundColor: thurActive ? '#6D81FA' : '#D9D9D9'},
            ]}
            onPress={handelThurActive}>
            <Text
              style={[styles.btnText, {color: thurActive ? '#fff' : '#000'}]}>
              목
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.daySelectBtn,
              {backgroundColor: friActive ? '#6D81FA' : '#D9D9D9'},
            ]}
            onPress={handelFriActive}>
            <Text
              style={[styles.btnText, {color: friActive ? '#fff' : '#000'}]}>
              금
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.daySelectBtn,
              {backgroundColor: satActive ? '#6D81FA' : '#D9D9D9'},
            ]}
            onPress={handelSatActive}>
            <Text
              style={[styles.btnText, {color: satActive ? '#fff' : '#000'}]}>
              토
            </Text>
          </TouchableOpacity>
        </View>

        {/* 시간 알림 코드 */}
        <View style={styles.alertView}>
          <Text style={styles.alertText}>루틴 알림</Text>
          <Switch
            trackColor={{false: '#767577', true: '#6D81FA'}}
            thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
            onValueChange={toggleSwitch}
            value={isEnabled}
            onChange={handleSwitchOn}
            style={[
              styles.switchStyle,
              {transform: [{scaleX: 1.3}, {scaleY: 1.3}]},
            ]}
          />
        </View>

        {/* 시간 설정 모달 코드 */}
        <View>
          {shouldShow ? (
            <View style={styles.timeView}>
              <Text style={styles.timeText}>
                {alertHour}:{alertMin}
              </Text>
              <TouchableWithoutFeedback onPress={() => setOpen(true)}>
                <Text style={styles.timeModalText}>시간변경</Text>
              </TouchableWithoutFeedback>
            </View>
          ) : null}
          <DatePicker
            modal
            mode="time"
            open={open}
            date={date}
            locale={'en_GB'}
            is24hourSource="locale"
            minuteInterval={5}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              setAlertHour(('0' + date.getHours()).slice(-2));
              setAlertMin(('0' + date.getMinutes()).slice(-2));
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={[
              styles.Nextbutton,
              {backgroundColor: disabled ? '#ADADAD' : '#6D81FA'},
            ]}
            disabled={disabled}
            onPress={handleCheck}>
            <Text style={styles.NextbuttonText}>완료</Text>
          </TouchableOpacity>
        </View>

        {/* 완료 모달 구현 코드 */}
        <Modal
          visible={clearModalVisible}
          animationType={'fade'}
          transparent={true}
          statusBarTranslucent={true}>
          <Pressable
            style={modalInnerStyles.modalOverlay}
            onPress={() => setClearModalVisible(!clearModalVisible)}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={{
                  ...modalInnerStyles.clearSheetContainer,
                  transform: [{translateY: translateY}],
                }}
                {...panResponder.panHandlers}>
                {/* 모달에 들어갈 내용을 아래에 작성 */}
                <Text style={modalInnerStyles.clearModalTitle}>
                  설정 루틴이 맞나요?
                </Text>
                <View style={styles.checkView}>
                  <Text style={{color: '#000', fontWeight: 'bold'}}>
                    {/* [{planText}] */}
                  </Text>
                  <Text style={modalInnerStyles.todoText}>{todoText}</Text>
                  <Text style={modalInnerStyles.dayText}>{dayText}</Text>
                  {shouldShow ? (
                    <Text style={modalInnerStyles.timeText}>
                      {alertHour}:{alertMin}에 알림
                    </Text>
                  ) : null}
                </View>
                <View style={modalInnerStyles.modalFlex}>
                  <TouchableOpacity
                    style={modalInnerStyles.noCheckBtn}
                    onPress={() => setClearModalVisible(false)}>
                    <Text style={modalInnerStyles.noText}>아니요</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={modalInnerStyles.yesBtn}
                    onPress={goClear}>
                    <Text style={modalInnerStyles.nextText}>맞습니다!</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Pressable>
        </Modal>

        {/* close 모달 구현 코드 */}
        <Modal
          visible={isModalVisible}
          animationType={'fade'}
          transparent={true}
          statusBarTranslucent={true}>
          <Pressable
            style={modalInnerStyles.modalOverlay}
            onPress={() => setIsModalVisible(!isModalVisible)}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={{
                  ...modalInnerStyles.bottomSheetContainer,
                  transform: [{translateY: translateY}],
                }}
                {...panResponder.panHandlers}>
                {/* 모달에 들어갈 내용을 아래에 작성 */}
                <Text style={modalInnerStyles.modalTitle}>
                  루틴 설정을 종료하시겠어요?
                </Text>
                <View style={modalInnerStyles.modalFlex}>
                  <TouchableOpacity
                    style={modalInnerStyles.noBtn}
                    onPress={() => setIsModalVisible(false)}>
                    <Text style={modalInnerStyles.noText}>아니요</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={modalInnerStyles.nextBtn}
                    onPress={goNext}>
                    <Text style={modalInnerStyles.nextText}>
                      다음에 정할래요!
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Pressable>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetPlanScreen;
