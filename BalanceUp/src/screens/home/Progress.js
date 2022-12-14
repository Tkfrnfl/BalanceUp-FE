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
import FastImage from 'react-native-fast-image';
import commonStyles from '../../css/commonStyles';
import modalInnerStyles from '../../css/modalStyles';
import KeyumIcon from '../../resource/image/KeyumEmoticon.png';
import Svg, {Circle, Text as SvgText, Rect} from 'react-native-svg';
import * as ProgressLib from 'react-native-progress';
import Crystal from '../../resource/image/Modal/Crystal.png';

const todoTmpSub = ['운동하기', '청소하기', '공부하기'];

const Progress = () => {
  const [todoTmp, setTodoTmp] = useState([
    {
      id: '1',
      title: '운동하기',
      completed: false,
    },
    {
      id: '2',
      title: '청소하기',
      completed: false,
    },
    {
      id: '3',
      title: '공부하기',
      completed: false,
    },
  ]);
  const [nowdata, setNowdata] = useState();
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const [completeChangeModalVisible, setCompleteChangeModalVisible] =
    useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // 모달 기능 구현
  const screenHeight = Dimensions.get('screen').height;

  const panY = useRef(new Animated.Value(screenHeight)).current;

  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-1, 0, 1],
  });

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
  };

  useEffect(() => {
    if (completeModalVisible) {
      resetBottomSheet.start();
    }
  }, [completeModalVisible]);

  useEffect(() => {
    if (completeChangeModalVisible) {
      resetBottomSheet.start();
    }
  }, [completeChangeModalVisible]);

  useEffect(() => {
    if (deleteModalVisible) {
      resetBottomSheet.start();
    }
  }, [deleteModalVisible]);

  // 완료 체크 기능 구현
  const handleComplete = id => {
    todoTmp.map(data => {
      if (data.id === id && data.completed === false) {
        let copy = [...todoTmp];
        copy[parseInt(data.id) - 1] = {
          id: data.id,
          title: data.title,
          completed: !data.completed,
        };
        setTodoTmp(copy);
        setCompleteModalVisible(!completeModalVisible);
      } else if (data.id === id && data.completed === true) {
        setNowdata(data);
        setCompleteChangeModalVisible(!completeChangeModalVisible);
      }
      return data;
    });
  };

  // 완료 체크 취소 기능 구현(미완성)
  const handleCompleteChange = id => {
    // console.log(nowdata);
    todoTmp.map(data => {
      if (data.id === id) {
        let copy = [...todoTmp];
        copy[parseInt(nowdata.id) - 1] = {
          id: nowdata.id,
          title: nowdata.title,
          completed: !nowdata.completed,
        };
        setTodoTmp(copy);
        setCompleteChangeModalVisible(!completeChangeModalVisible);
      }
      return data;
    });
  };

  // 삭제 기능 구현
  const handleRemove = id => {
    let newTodoTmp = todoTmp.filter(data => data.id !== id);
    setDeleteModalVisible(!deleteModalVisible);
    setTodoTmp(newTodoTmp);
  };

  return (
    <View>
      <View style={commonStyles.spacing2} />
      <Svg height={80} style={styles.svg1}>
        <Rect
          x={40}
          y={0}
          width={300}
          height={60}
          style={styles.svg1}
          strokeWidth="2"
          stroke="#D9D9D9"
          fill="none"
        />
        <SvgText
          x="55"
          y="20"
          text-anchor="middle"
          fill="black"
          style={styles.mainText1}>
          진행도
        </SvgText>
        <SvgText
          x="295"
          y="20"
          text-anchor="middle"
          fill="black"
          style={styles.mainText1}>
          50%
        </SvgText>
        <View style={styles.progressBar}>
          <ProgressLib.Bar
            progress={0.3}
            width={270}
            height={12}
            color="black"
            unfilledColor="#D9D9D9"
            borderWidth={0}
            borderRadius={50}
          />
        </View>
      </Svg>
      <View style={commonStyles.spacing2} />
      {todoTmp.map((data, index) => (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          key={data.id}>
          <View style={commonStyles.row}>
            <View style={styles.img1}>
              <Image source={KeyumIcon} style={styles.img2} />
            </View>
            <View style={styles.aimText1}>
              <Text style={commonStyles.mainText}>{data.title}</Text>
              <Text style={commonStyles.subText}>{todoTmpSub[index]}</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => handleComplete(data.id)}>
              <Svg height={80} style={styles.svg2}>
                <Circle
                  cx="30"
                  cy="30"
                  r="25"
                  fill={data.completed ? '#D9D9D9' : null}
                />
                <SvgText
                  x="15"
                  y="35"
                  text-anchor="middle"
                  fill="black"
                  style={styles.mainText2}>
                  완료
                </SvgText>
              </Svg>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              {/* onPress={() => navigate('Plan')} */}
              <Svg height={80} style={styles.svg3}>
                <Rect width={50} height={60} fill="#F2F2F2" />
                <SvgText
                  x="15"
                  y="35"
                  text-anchor="middle"
                  fill="black"
                  style={styles.mainText2}>
                  수정
                </SvgText>
              </Svg>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => setDeleteModalVisible(!deleteModalVisible)}>
              <Svg height={80} style={styles.svg3}>
                <Rect width={50} height={60} fill="#D9D9D9" />
                <SvgText
                  x="15"
                  y="35"
                  text-anchor="middle"
                  fill="black"
                  style={styles.mainText2}>
                  삭제
                </SvgText>
              </Svg>
            </TouchableWithoutFeedback>
          </View>

          {/* 완료 모달 구현 코드 */}
          <Modal
            visible={completeModalVisible}
            animationType={'fade'}
            transparent={true}
            statusBarTranslucent={true}>
            <Pressable
              style={modalInnerStyles.complteModalOverlay}
              onPress={() => setCompleteModalVisible(!completeModalVisible)}>
              <TouchableWithoutFeedback>
                <Animated.View
                  style={{
                    ...modalInnerStyles.centerSheetContainer,
                    transform: [{translateY: translateY}],
                  }}
                  {...panResponder.panHandlers}>
                  <Text style={modalInnerStyles.completeTitle}>+1RP</Text>
                  <Text style={modalInnerStyles.modalTitle}>
                    오늘의 루틴을 완료했습니다!
                  </Text>
                  <View style={{alignItems: 'center', marginTop: 10}}>
                    <FastImage style={styles.modalImg} source={Crystal} />
                  </View>
                </Animated.View>
              </TouchableWithoutFeedback>
            </Pressable>
          </Modal>

          {/* 완료 취소 모달 구현 코드 */}
          <Modal
            visible={completeChangeModalVisible}
            animationType={'fade'}
            transparent={true}
            statusBarTranslucent={true}>
            <Pressable
              style={modalInnerStyles.progressModalOverlay}
              onPress={() =>
                setCompleteChangeModalVisible(!completeChangeModalVisible)
              }>
              <TouchableWithoutFeedback>
                <Animated.View
                  style={{
                    ...modalInnerStyles.complteBottomSheetContainer,
                    transform: [{translateY: translateY}],
                  }}
                  {...panResponder.panHandlers}>
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
                      style={modalInnerStyles.noBtn}
                      activeOpacity={1.0}
                      onPress={() => setCompleteChangeModalVisible(false)}>
                      <Text style={modalInnerStyles.noText}>아니요</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={modalInnerStyles.yesBtn}
                      activeOpacity={1.0}
                      onPress={() => {
                        handleCompleteChange(data.id);
                        // console.log('complete change id : ', data.id);
                      }}>
                      <Text style={modalInnerStyles.nextText}>취소할래요!</Text>
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
              style={modalInnerStyles.progressModalOverlay}
              onPress={() => setDeleteModalVisible(!deleteModalVisible)}>
              <TouchableWithoutFeedback>
                <Animated.View
                  style={{
                    ...modalInnerStyles.deleteSheetContainer,
                    transform: [{translateY: translateY}],
                  }}
                  {...panResponder.panHandlers}>
                  <Text style={modalInnerStyles.modalTitle}>
                    진행 중인 루틴입니다!
                  </Text>
                  <Text style={modalInnerStyles.deletModalText}>
                    루틴을 삭제하시겠습니까?
                  </Text>
                  <Text style={modalInnerStyles.deletModalText_}>
                    해당 루틴에 대한 모든 기록이 사라집니다
                  </Text>
                  <Text style={modalInnerStyles.deletModalText__}>
                    * 루틴 완료 기록, 획득 RP
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
                      onPress={() => handleRemove(data.id)}>
                      <Text style={modalInnerStyles.nextText}>삭제할래요!</Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              </TouchableWithoutFeedback>
            </Pressable>
          </Modal>
        </ScrollView>
      ))}
    </View>
  );
};

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
});

export default Progress;
