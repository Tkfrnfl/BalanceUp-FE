import React, {useState, useRef, useEffect, useCallback} from 'react';
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
  FlatList,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import modalInnerStyles from '../../css/modalStyles';
import styles from '../../css/SetPlanScreenStyles';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';
import BackArrow from '../../resource/image/Common/backArrow.svg';
import {jwtState} from '../../recoil/atom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createRoutine} from '../../actions/routineAPI';

const SetPlanScreen = ({navigation, route}) => {
  const {planText} = route.params;

  const [token, setToken] = useState(jwtState);
  AsyncStorage.getItem('jwt', (err, result) => {
    setToken(JSON.parse(result));
  });
  const [selected, setSelected] = useState(new Map());
  const [lengthTodo, setLengthTodo] = useState(0);
  const [todoText, setTodoText] = useState('');
  const dayData = [
    {
      id: 1,
      title: '월',
    },
    {
      id: 2,
      title: '화',
    },
    {
      id: 3,
      title: '수',
    },
    {
      id: 4,
      title: '목',
    },
    {
      id: 5,
      title: '금',
    },
    {
      id: 6,
      title: '토',
    },
    {
      id: 7,
      title: '일',
    },
  ];

  const [dayText, setDayText] = useState('');
  const dayBy = ['월', '화', '수', '목', '금', '토', '일'];

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
    duration: 20,
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

  // 버튼 활성화/비활성화
  useEffect(() => {
    setDisabled(!(lengthTodo && dayText));
  }, [lengthTodo, dayText]);

  useEffect(() => {
    if (dayText.length === 0) {
      setDayText('');
    }
  }, [dayText]);

  // input 기능 구현
  const handleTextChange = toDo => {
    setLengthTodo(toDo.length);
    setTodoText(toDo);
  };

  // 요일 선택 기능 구현
  const onSelect = useCallback(
    (id, title) => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      setSelected(newSelected);
      !selected.get(id)
        ? setDayText([...dayText, title])
        : setDayText(dayText.filter(str => str !== title));
    },
    [selected],
  );

  // 시간 토글 스위치 구현
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const handleSwitchOn = () => {
    setShouldShow(!shouldShow);
    isEnabled ? setAlertHour('') : setAlertHour('09');
    isEnabled ? setAlertMin('') : setAlertMin('00');
  };

  // 루틴 설정 완료 버튼 구현
  const handleCheck = () => {
    setClearModalVisible(!clearModalVisible);
    setDayText(
      [...dayText].sort((a, b) => dayBy.indexOf(a) - dayBy.indexOf(b)),
    );
  };

  const handleCreate = () => {
    createRoutine(token, todoText, planText, dayText, alertHour, alertMin).then(
      navigation.navigate('LookAll'),
    );
    // notify();
    setClearModalVisible(false);
  };

  const Item = ({id, title, selected, onSelect}) => {
    return (
      <TouchableOpacity
        style={[
          styles.daySelectBtn,
          {backgroundColor: selected ? '#585FFF' : '#CED6FF'},
        ]}
        activeOpacity={1.0}
        onPress={() => onSelect(id, title)}>
        <Text style={styles.btnText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1.0}
          onPress={() => navigation.navigate('Set')}>
          <BackArrow style={styles.arrowBtn} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>
          나를 키울 루틴은 {'\n'}어떻게 진행되나요?
        </Text>
        <View style={styles.inputSheet}>
          <Text style={styles.inputText}>루틴명</Text>
          <Text style={styles.count}>{lengthTodo}/20</Text>
          <TextInput
            style={styles.inputStyle}
            fontSize={16}
            maxLength={20}
            autoCapitalize="none"
            placeholder="ex) 물💧 마시기!"
            onChangeText={handleTextChange}
          />
        </View>
        <View style={styles.daySelect}>
          <Text style={styles.daySelectText}>진행 요일</Text>
          <Text style={styles.recText}>주 2일 이상 루틴을 실천해 보세요</Text>
        </View>
        <View style={styles.daySelectBtnView}>
          <FlatList
            data={dayData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <Item
                id={item.id}
                title={item.title}
                selected={!!selected.get(item.id)}
                onSelect={onSelect}
              />
            )}
            keyExtractor={item => item.id}
            extraData={selected}
          />
        </View>
        <View style={styles.alertView}>
          <Text style={styles.alertText}>루틴 알림</Text>
          <Switch
            trackColor={{false: '#CED6FF', true: '#585FFF'}}
            thumbColor={isEnabled ? '#FFFFFF' : '#FFFFFF'}
            onValueChange={toggleSwitch}
            value={isEnabled}
            onChange={handleSwitchOn}
            style={[
              styles.switchStyle,
              {transform: [{scaleX: 1.1}, {scaleY: 1.1}]},
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
        <View style={styles.nextBtnSheet}>
          <TouchableOpacity
            style={[
              styles.nextBtn,
              {backgroundColor: disabled ? '#CED6FF' : '#585FFF'},
            ]}
            activeOpacity={1.0}
            disabled={disabled}
            onPress={handleCheck}>
            <Text style={styles.nextBtnText}>완료</Text>
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
                <Text style={modalInnerStyles.clearModalTitle}>
                  설정한 루틴이 맞나요?
                </Text>
                <View style={styles.checkView}>
                  <View style={styles.boxView}>
                    <Text style={modalInnerStyles.planText}>[{planText}]</Text>
                    <Text style={modalInnerStyles.todoText}>{todoText}</Text>
                  </View>
                  <View style={styles.boxView}>
                    <Text style={modalInnerStyles.dayText}>{dayText}</Text>
                    {shouldShow ? (
                      <Text style={modalInnerStyles.timeText}>
                        {alertHour}:{alertMin}에 알림
                      </Text>
                    ) : null}
                  </View>
                </View>
                <View style={modalInnerStyles.modalFlex}>
                  <TouchableOpacity
                    style={modalInnerStyles.noBtn}
                    activeOpacity={1.0}
                    onPress={() => setClearModalVisible(false)}>
                    <Text style={modalInnerStyles.noText}>아니요</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={handleCreate}
                    style={modalInnerStyles.yesBtn}>
                    <Text style={modalInnerStyles.nextText}>맞습니다!</Text>
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
