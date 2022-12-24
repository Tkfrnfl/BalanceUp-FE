import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import commonStyles from '../../css/commonStyles';

import modalInnerStyles from '../../css/modalStyles';

const SetTodoScreen = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [plan, setPlan] = useState({
    sportPlan: '운동',
    studyPlan: '학습',
    dailyPlan: '일상',
    carePlan: '마음관리',
  });

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
  };

  useEffect(() => {
    if (isModalVisible) {
      resetBottomSheet.start();
    }
  }, [isModalVisible]);

  const goNext = () => {
    navigation.navigate('Main');
    setIsModalVisible(false);
  };

  const goSportPlan = () => {
    navigation.navigate('Plan', {planText: plan.sportPlan});
  };
  const goStudyPlan = () => {
    navigation.navigate('Plan', {planText: plan.studyPlan});
  };
  const goDailyPlan = () => {
    navigation.navigate('Plan', {planText: plan.dailyPlan});
  };
  const goCarePlan = () => {
    navigation.navigate('Plan', {planText: plan.carePlan});
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

  const TodoData = [
    {
      id: 1,
      title: '운동',
      subTitle: '체력을 기를래요!',
    },
    {
      id: 2,
      title: '학습',
      subTitle: '습득력이 높아져요!',
    },
    {
      id: 3,
      title: '일상',
      subTitle: '지구력이 상승해요!',
    },
    {
      id: 4,
      title: '마음관리',
      subTitle: '회복력이 좋아져요!',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topSheet}>
        <Text style={styles.topTitle}>루틴 설정</Text>
        <TouchableOpacity onPress={() => setIsModalVisible(!isModalVisible)}>
          {/* 임시 디자인 버튼 */}
          <Text style={styles.xBtn}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.subTitle}>
        <Text style={styles.subText}>
          내가 키울 루틴의 {'\n'}카테고리가 무엇인가요?
        </Text>
      </View>
      {/* 루틴 설정 */}
      <View style={styles.bntSheet}>
        <TouchableOpacity style={styles.todoBtn} onPress={goSportPlan}>
          <Text style={styles.todoText}>{TodoData[0].title}</Text>
          <Text style={styles.todoSubText}>{TodoData[0].subTitle}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.todoBtn} onPress={goStudyPlan}>
          <Text style={styles.todoText}>{TodoData[1].title}</Text>
          <Text style={styles.todoSubText}>{TodoData[1].subTitle}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bntSheet}>
        <TouchableOpacity style={styles.todoBtn} onPress={goDailyPlan}>
          <Text style={styles.todoText}>{TodoData[2].title}</Text>
          <Text style={styles.todoSubText}>{TodoData[2].subTitle}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.todoBtn} onPress={goCarePlan}>
          <Text style={styles.todoText}>{TodoData[3].title}</Text>
          <Text style={styles.todoSubText}>{TodoData[3].subTitle}</Text>
        </TouchableOpacity>
      </View>
      {/* 모달 구현 코드 */}
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

      {/* 하단 탭바 */}
      <View style={{flex: 1, marginTop: 95}}>
        <Shadow distance={3}>
          <View style={commonStyles.bottomTabSheet}>
            <TouchableOpacity onPress={goHome}>
              <Text
                style={[
                  commonStyles.commonText,
                  {
                    marginTop: 15,
                    marginLeft: 15,
                  },
                ]}>
                홈
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goSet}>
              <Text style={commonStyles.selectText}>작성</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goLookAll}>
              <Text style={commonStyles.commonText}>루틴</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goMyPage}>
              <Text style={commonStyles.commonText}>마이페이지</Text>
            </TouchableOpacity>
          </View>
        </Shadow>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  topSheet: {
    alignItems: 'center',
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  topTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  xBtn: {
    marginLeft: 120,
    marginRight: 20,
    fontSize: 30,
    fontWeight: '400',
    color: '#000',
  },
  subTitle: {
    marginTop: 30,
    marginLeft: 30,
    marginBottom: 20,
  },
  subText: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  todoBtn: {
    backgroundColor: '#E8EBFD',
    width: '40%',
    marginRight: 8,
    marginTop: 10,
  },
  todoText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  todoSubText: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 80,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  bntSheet: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default SetTodoScreen;
