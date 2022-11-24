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
import modalInnerStyles from '../../css/modalStyles';

const SetPlanScreen = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  return (
    <View style={styles.container}>
      <View style={styles.topSheet}>
        <TouchableOpacity>
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
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  topTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  arrowBtn: {
    marginRight: 100,
    marginBottom: 25,
    fontSize: 60,
    fontWeight: 'bold',
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
});

export default SetPlanScreen;
