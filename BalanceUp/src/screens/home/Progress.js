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
import commonStyles from '../../css/commonStyles';
import modalInnerStyles from '../../css/modalStyles';
import KeyumIcon from '../../resource/image/KeyumEmoticon.png';
import Svg, {Circle, Text as SvgText, Rect} from 'react-native-svg';
import * as ProgressLib from 'react-native-progress';

const todoTmpSub = ['itemSub1', 'itemSub2', 'itemSub3'];

const Progress = () => {
  const [todoTmp, setTodoTmp] = useState([
    {
      id: '1',
      title: '공부하기',
      completed: false,
    },
    {
      id: '2',
      title: '청소하기',
      completed: false,
    },
    {
      id: '3',
      title: '운동하기',
      completed: false,
    },
  ]);

  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const [completeChangeModalVisible, setCompleteChangeModalVisible] =
    useState(false);

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
    closeBottomSheet.start(() => setCompleteModalVisible(false));
    closeBottomSheet.start(() => setCompleteChangeModalVisible(false));
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

  // 완료 체크 기능 구현
  const handleComplete = id => {
    let newTodoTmp = todoTmp.map(data => {
      if (data.id === id && data.completed === false) {
        data.completed = !data.completed;
        setCompleteModalVisible(!completeModalVisible);
      } else if (data.id === id && data.completed === true) {
        console.log('data id :', data.id, 'id :', id);
        setCompleteChangeModalVisible(!completeChangeModalVisible);
      }
      return data;
    });
    setTodoTmp(newTodoTmp);
  };

  const handleCompleteChange = id => {
    todoTmp.map(data => {
      console.log(id, data.id);
    });
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
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={commonStyles.row}>
            <View style={styles.img1}>
              <Image source={KeyumIcon} style={styles.img2} />
            </View>
            <View style={styles.aimText1}>
              <Text style={commonStyles.boldText}>{data.title}</Text>
              <Text>{todoTmpSub[index]}</Text>
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
            <TouchableWithoutFeedback>
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
                  {/* 모달에 들어갈 내용을 아래에 작성 */}
                  <Text style={modalInnerStyles.logoutModalTitle}>
                    오늘의 루틴을 완료했습니다! (그래픽 예정)
                  </Text>
                  <Text style={modalInnerStyles.logoutModalTitle}>+1 RP</Text>
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
              style={modalInnerStyles.modalOverlay}
              onPress={() =>
                setCompleteChangeModalVisible(!completeChangeModalVisible)
              }>
              <TouchableWithoutFeedback>
                <Animated.View
                  style={{
                    ...modalInnerStyles.bottomSheetContainer,
                    transform: [{translateY: translateY}],
                  }}
                  {...panResponder.panHandlers}>
                  {/* 모달에 들어갈 내용을 아래에 작성 */}
                  <Text style={modalInnerStyles.logoutModalTitle}>
                    루틴을 이미 완료했습니다!
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
                      onPress={() => handleCompleteChange(data.id)}>
                      <Text style={modalInnerStyles.nextText}>취소할래요!</Text>
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
});

export default Progress;
