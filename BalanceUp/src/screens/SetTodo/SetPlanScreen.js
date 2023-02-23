import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Switch,
  FlatList,
  // Platform,
  // PermissionsAndroid,
} from 'react-native';
import {DeviceEventEmitter} from 'react-native';
import Toast from 'react-native-easy-toast';
import DatePicker from 'react-native-date-picker';
import modalInnerStyles from '../../css/modalStyles';
import styles from '../../css/SetPlanScreenStyles';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';
import BackArrow from '../../resource/image/Common/backArrow.svg';
import {createRoutine, modifyRoutine} from '../../actions/routineAPI';
import {useRecoilState, useRecoilValue} from 'recoil';
import {nickNameState, jwtState} from '../../recoil/atom';
import {dateState, routineStateNum} from '../../recoil/appState';
import {routineStateDaysSet, alarmChanged} from '../../recoil/userState';

const SetPlanScreen = ({navigation: {navigate}, route}) => {
  const {planText} = route.params;
  const {routineId} = route.params;
  const {routineTitle} = route.params;
  const {days} = route.params;
  const {alarm} = route.params;

  const [nickName, setNickName] = useRecoilState(nickNameState);
  const [alarmChange, setAlarmChanged] = useRecoilState(alarmChanged);
  const [isEditing, setIsEditing] = useState(false);
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

  const [clearModalVisible, setClearModalVisible] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);

  const [alertHour, setAlertHour] = useState('');
  const [alertMin, setAlertMin] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false); // 알림 기본 설정 = false
  const [shouldShow, setShouldShow] = useState(false); // 알림 기본 설정 = false
  const [disabled, setDisabled] = useState(false);
  const [token, setToken] = useRecoilState(jwtState);
  const selectTodo = useRecoilValue(routineStateDaysSet(token, 0));
  const [routineRefresh, setRoutineStateNum] = useRecoilState(routineStateNum);
  // const selectTodo = useRecoilValue(routineStateDaysSet(token,0));
  // const [routineRefresh, setRoutineStateNum] = useRecoilState(routineStateNum);

  // 모달 기능 구현
  const screenHeight = Dimensions.get('screen').height;

  const panY = useRef(new Animated.Value(screenHeight)).current;

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 20,
    useNativeDriver: true,
  });

  useEffect(() => {
    return () => {
      DeviceEventEmitter.emit('refresh');
    };
  }, []);

  useEffect(() => {
    PushNotification.setApplicationIconBadgeNumber(0);
  }, []);

  useEffect(() => {
    if (clearModalVisible) {
      resetBottomSheet.start();
    }
  }, [clearModalVisible]);

  useEffect(() => {
    if (routineId != null) {
      setIsEditing(true), setTodoText(routineTitle), setTime(alarm);
    }
    if (alarm === null) {
      setIsEnabled(false);
      setShouldShow(false);
    } else if (alarm != null) {
      setIsEnabled(true);
      setShouldShow(true);
    }
  }, []);

  // 팝업 알림 설정 구현
  const notify = (routineId, days, alarmTime) => {
    let activeDays = [dayText];

    PushNotification.channelExists('channel-id', function (exists) {
      console.log(exists); // true/false
    });
    console.log(activeDays);
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
          message: `${nickName}님, 오늘의 루틴을 완료해보세요!`,
          date: calculateDateByDay(index),
          repeatType: 'week',
        });
      }
    });
  };

  // 팝업 알람 날짜 계산
  const calculateDateByDay = index => {
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
    isEnabled ? setTime('') : setTime('09:00');
  };

  // 루틴 설정 완료 버튼 구현
  const handleCheck = () => {
    setClearModalVisible(!clearModalVisible);
    console.log(days);
    setDayText(
      [...dayText].sort((a, b) => dayBy.indexOf(a) - dayBy.indexOf(b)),
    );
  };

  // 루틴 생성
  const handleCreate = async () => {
    //let beforeArray = JSON.parse(JSON.stringify(selectTodo));
    await createRoutine(todoText, planText, dayText, time).then(res => {
      if (res === '루틴 갯수는 4개를 초과할 수 없습니다.') {
        setClearModalVisible(false);
        navigate('Home', {overRoutine: 'over'});
      } else {
        setClearModalVisible(false);
        navigate('Home');
        // 알림 설정
        let tmp = JSON.parse(JSON.stringify(alarmChanged));
        setAlarmChanged(tmp + 1);
        // seloctor 업데이트를 위해+1
        let tmpNum = JSON.parse(JSON.stringify(routineRefresh));
        setRoutineStateNum(tmpNum + 1);
      }
    });
  };

  // 루틴 수정
  const handleEdit = () => {
    modifyRoutine(routineId, todoText, days, time).then(
      setClearModalVisible(false),
      navigate('Home'),
    );
    let tmpArray = [];
    let tmpId = routineId;

    PushNotification.getScheduledLocalNotifications(callback => {
      for (var i = 0; i < callback.length; i++) {
        if (callback[i].id.slice(0, 4) === String(tmpId).slice(0, 4)) {
          // id 만자리수 대비
          tmpArray.push(callback[i]);
        }
      }
      for (var j = 0; j < tmpArray.length; j++) {
        let beforeDate = tmpArray[j].date;
        console.log(beforeDate);
        PushNotification.deleteChannel(`${tmpId}${beforeDate}`); // 이전채널 삭제
        let m = moment(beforeDate);

        m.set({hour: time.split(':')[0], minute: time.split(':')[1]}); // 시간만 바꿈
        m.toDate();
        var tmpM = new Date(m);
        PushNotification.createChannel(
          {
            channelId: `${tmpId}${tmpM}`,
            channelName: tmpArray[j].title,
            channelDescription: 'A channel to categorise your notifications',
            playSound: false,
            soundName: 'default',
            vibrate: true,
          },
          // created => console.log(`createChannel returned '${created}'`),
        );
        PushNotification.localNotificationSchedule({
          channelId: `${tmpId}${tmpM}`,
          id: `${tmpId}${tmpM}`,
          title: tmpArray[j].title,
          message: `${nickName}님, 오늘의 루틴을 완료해보세요!`,
          date: tmpM,
          // repeatType: 'week',
          // date: new Date(Date.now() + 20 * 1000), //시간대 에러날시 서버시간 체크후 보정
        });
      }
      PushNotification.getScheduledLocalNotifications(callback2 => {
        console.log(callback2); // ['channel_id_1']
      });
    });
  };

  // 토스트 메세지
  const toastRef = useRef();

  const showCopyToast = useCallback(() => {
    toastRef.current.show('진행 요일은 수정할 수 없어요.');
  }, []);

  const Item = ({id, title, selected, onSelect}) => {
    return (
      <TouchableOpacity
        style={[
          styles.daySelectBtn,
          {backgroundColor: selected ? '#585FFF' : '#CED6FF'},
        ]}
        activeOpacity={1.0}
        onPress={() => (isEditing ? showCopyToast() : onSelect(id, title))}>
        <Text style={styles.btnText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  // 알림 권한 확인 => 안드로이드 13버전부터 가능, 우리 코드는 안드로이드 12버전 <확인 필요>
  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     const requestCameraPermission = async () => {
  //       try {
  //         const granted = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.CAMERA,
  //           {
  //             title: 'Camera Permission',
  //             message: 'App needs permission for camera access',
  //             buttonPositive: 'OK',
  //           },
  //         );
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           console.log('success');
  //         } else {
  //           console.log('Please camera permission');
  //         }
  //       } catch (err) {
  //         console.log('Camera permission err');
  //       }
  //     };
  //     requestCameraPermission();
  //   }
  // }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Toast
          ref={toastRef}
          position="top"
          positionValue={10}
          fadeInDuration={300}
          fadeOutDuration={1500}
          style={styles.toastView}
          textStyle={styles.toastText}
        />
        {isEditing ? (
          <TouchableOpacity
            activeOpacity={1.0}
            onPress={() => navigate('Home')}>
            <BackArrow style={styles.arrowBtn} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={1.0} onPress={() => navigate('Set')}>
            <BackArrow style={styles.arrowBtn} />
          </TouchableOpacity>
        )}
        <Text style={styles.topTitle}>
          나를 키울 루틴은 {'\n'}어떻게 진행되나요?
        </Text>
        {isEditing ? (
          <View style={styles.inputSheet}>
            <Text style={styles.inputText}>루틴명</Text>
            <Text style={styles.count}>{todoText.length}/10</Text>
            <TextInput
              style={styles.inputStyle}
              fontSize={16}
              maxLength={10}
              autoCapitalize="none"
              value={todoText}
              onChangeText={handleTextChange}
            />
          </View>
        ) : (
          <View style={styles.inputSheet}>
            <Text style={styles.inputText}>루틴명</Text>
            <Text style={styles.count}>{lengthTodo}/10</Text>
            <TextInput
              style={styles.inputStyle}
              fontSize={16}
              maxLength={10}
              autoCapitalize="none"
              placeholderTextColor="#AFAFAF"
              placeholder="ex) 물💧 마시기!"
              onChangeText={handleTextChange}
            />
          </View>
        )}
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
              <Text style={styles.timeText}>{time}</Text>
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
              setTime(
                ('0' + date.getHours()).slice(-2) +
                  ':' +
                  ('0' + date.getMinutes()).slice(-2),
              );
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        {isEditing ? (
          <View style={styles.nextBtnSheet}>
            <TouchableOpacity
              style={styles.nextBtn}
              activeOpacity={1.0}
              onPress={handleCheck}>
              <Text style={styles.nextBtnText}>완료</Text>
            </TouchableOpacity>
          </View>
        ) : (
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
        )}

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
                }}>
                <Text style={modalInnerStyles.clearModalTitle}>
                  설정한 루틴이 맞나요?
                </Text>
                <View style={styles.checkView}>
                  <View style={styles.boxView}>
                    <Text style={modalInnerStyles.planText}>[{planText}]</Text>
                    <Text style={modalInnerStyles.todoText}>{todoText}</Text>
                  </View>
                  <View style={styles.boxView}>
                    {isEditing ? (
                      <Text style={modalInnerStyles.dayText}>{days}</Text>
                    ) : (
                      <Text style={modalInnerStyles.dayText}>{dayText}</Text>
                    )}
                    {shouldShow ? (
                      <Text style={modalInnerStyles.timeText}>
                        {time}에 알림
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
                  {isEditing ? (
                    <TouchableOpacity
                      activeOpacity={1.0}
                      onPress={handleEdit}
                      style={modalInnerStyles.yesBtn}>
                      <Text style={modalInnerStyles.nextText}>맞습니다!</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={1.0}
                      onPress={handleCreate}
                      style={modalInnerStyles.yesBtn}>
                      <Text style={modalInnerStyles.nextText}>맞습니다!</Text>
                    </TouchableOpacity>
                  )}
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
