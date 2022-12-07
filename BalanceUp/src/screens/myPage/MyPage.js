import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TextInput,
  Pressable,
  StyleSheet,
  Keyboard,
  Dimensions,
  Animated,
  PanResponder,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import KeyumTypo from '../../resource/image/KeyumLOGOTYPO_1.png';
import modalInnerStyles from '../../css/modalStyles';
import duplicationCheckAPI from '../../actions/duplicationCheckAPI';
import {validateText} from '../../utils/regex';
import commonStyles from '../../css/commonStyles';

const MyPage = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [checkTextError, setCheckTextError] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [usableId, setUsableId] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

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
    closeBottomSheet.start(() => setLogoutModalVisible(false));
  };

  useEffect(() => {
    if (isModalVisible) {
      resetBottomSheet.start();
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (logoutModalVisible) {
      resetBottomSheet.start();
    }
  }, [logoutModalVisible]);

  // Text Input 기능
  useEffect(() => {
    setDisabled(!(userName && !checkTextError));
  }, [userName, checkTextError]);

  const handleTextChange = userName => {
    // const changedText = removeWhitespace(userName); // 이 코드 사용할경우 공백 제거 가능(아예 막는거)
    const changedText = validateText(userName);
    setUserName(changedText);
    setCheckTextError(
      validateText(userName)
        ? ''
        : '닉네임에 특수문자 및 공백을 포함 할 수 없어요',
    );

    // 글자수 제한
    if (userName.length >= 11) {
      setCheckTextError('11글자 이하 사용 불가능합니다.');
    } else if (userName.length === 0) {
      setUserName('');
      setCheckTextError('');
    }
  };

  // 중복 확인 부분 임시 구현
  const duplicationCheck = () => {
    duplicationCheckAPI(userName).then(response => {
      console.log(response);
      if (response === false) {
        // [response = false] -> 아이디가 중복되지 않음
        alert('사용 가능한 아이디입니다.');
        setUsableId(response);
      } else {
        alert('중복된 아이디입니다. 다시 시도하세요.');
        setUsableId(response);
      }
    });
  };

  const handleRemove = () => {
    setUserName('');
    setCheckTextError('');
  };

  // 네이게이션 구현
  const goBack = () => {
    navigation.navigate('Main');
  };

  const goWithdrawal = () => {
    navigation.navigate('Withdrawal');
  };

  const goLogout = () => {
    setLogoutModalVisible(false);
    navigation.navigate('Login');
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.topSheet}>
          <TouchableOpacity onPress={goBack}>
            {/* 임시 디자인 버튼 */}
            <Text style={styles.arrowBtn}>⬅</Text>
          </TouchableOpacity>
          <Text style={styles.topTitle}>마이페이지</Text>
        </View>
        <Shadow distance={5}>
          <View style={styles.nameSheet}>
            <Text style={styles.nameText}>닉네임</Text>
            <Text style={styles.userNameText}>김루틴</Text>
            <TouchableOpacity
              onPress={() => setIsModalVisible(!isModalVisible)}>
              <Text style={styles.btnStyle}>➡️</Text>
            </TouchableOpacity>
          </View>
        </Shadow>
        <View style={{marginTop: 10}}>
          <Shadow distance={5}>
            <View style={styles.nameSheet}>
              <Text style={styles.nameText}>로그아웃</Text>
              <TouchableOpacity
                onPress={() => setLogoutModalVisible(!logoutModalVisible)}>
                <Text style={styles.logoutBtnStyle}>➡️</Text>
              </TouchableOpacity>
            </View>
          </Shadow>
        </View>
        <Text style={styles.verText}>Ver 1.0.0</Text>
        <View style={styles.typoSheet}>
          <Image source={KeyumTypo} />
          <TouchableOpacity onPress={goWithdrawal}>
            <Text style={styles.withdrawalText}>회원탈퇴</Text>
          </TouchableOpacity>
        </View>

        {/* 하단 탭바 */}
        <View style={{flex: 1, marginTop: 20}}>
          <Shadow distance={3}>
            <View style={commonStyles.bottomTabSheet}>
              <TouchableOpacity onPress={goHome}>
                <Text style={commonStyles.commonText}>홈</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={goSet}>
                <Text style={commonStyles.commonText}>작성</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={goLookAll}>
                <Text style={commonStyles.commonText}>루틴</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={goMyPage}>
                <Text style={commonStyles.selectText}>마이페이지</Text>
              </TouchableOpacity>
            </View>
          </Shadow>
        </View>

        {/* 닉네임 구현 코드 */}
        <Modal
          visible={isModalVisible}
          animationType={'fade'}
          transparent={true}
          statusBarTranslucent={true}>
          <KeyboardAvoidingView
            style={styles.rootContainer}
            behavior={'padding'}>
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
                  <Text style={modalInnerStyles.nameText}>
                    닉네임을 입력해주세요
                  </Text>
                  <View style={styles.form}>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        value={userName}
                        onChangeText={handleTextChange}
                        style={styles.textInput}
                        // maxLength={11} : 코드로 제한해도 input으로 글자가 계속 입력되는 버그 확인
                        autoCapitalize="none"
                        fontSize={15}
                        placeholder={'11자 내 작성 (공백, 특수문자 불가)'}
                        placeholderTextColor={'D0D0D0'}
                      />
                      <TouchableOpacity
                        style={styles.inputBtn}
                        activeOpacity={0.8}
                        onPress={handleRemove}>
                        <Text style={styles.inputBtnText}>X</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.inputBtn}
                        onPress={duplicationCheck}
                        activeOpacity={0.8}
                        disabled={disabled}>
                        <Text style={styles.inputBtnText}>중복확인</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.errorText}>{checkTextError}</Text>
                  </View>
                  <View style={modalInnerStyles.modalFlex}>
                    <TouchableOpacity
                      disabled={disabled}
                      style={[
                        modalInnerStyles.saveBtn,
                        {backgroundColor: disabled ? '#979797' : '#6D81FA'},
                      ]}>
                      <Text style={modalInnerStyles.saveText}>저장</Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              </TouchableWithoutFeedback>
            </Pressable>
          </KeyboardAvoidingView>
        </Modal>

        {/* 로그아웃 모달 구현 코드 */}
        <Modal
          visible={logoutModalVisible}
          animationType={'fade'}
          transparent={true}
          statusBarTranslucent={true}>
          <Pressable
            style={modalInnerStyles.modalOverlay}
            onPress={() => setLogoutModalVisible(!logoutModalVisible)}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={{
                  ...modalInnerStyles.bottomSheetContainer,
                  transform: [{translateY: translateY}],
                }}
                {...panResponder.panHandlers}>
                {/* 모달에 들어갈 내용을 아래에 작성 */}
                <Text style={modalInnerStyles.logoutModalTitle}>로그아웃</Text>
                <Text style={modalInnerStyles.logoutModalText}>
                  로그아웃 하시겠습니까?
                </Text>
                <View style={modalInnerStyles.modalFlex}>
                  <TouchableOpacity
                    style={modalInnerStyles.noBtn}
                    onPress={() => setLogoutModalVisible(false)}>
                    <Text style={modalInnerStyles.noText}>아니요</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={goLogout}
                    style={modalInnerStyles.yesBtn}>
                    <Text style={modalInnerStyles.nextText}>네</Text>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  topSheet: {
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
  nameSheet: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    width: 400,
    height: 50,
  },
  nameText: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 50,
    marginTop: 15,
  },
  userNameText: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 200,
    marginTop: 15,
  },
  btnStyle: {
    marginLeft: 5,
    marginTop: 15,
  },
  logoutBtnStyle: {
    marginLeft: 230,
    marginTop: 15,
  },
  withdrawalText: {
    borderBottomWidth: 1,
    borderBottomColor: '#606060',
    marginTop: 50,
    color: '#606060',
  },
  verText: {
    color: '#000',
    marginLeft: 300,
    marginTop: 20,
  },
  typoSheet: {
    marginTop: 230,
    alignItems: 'center',
  },
  inputWrapper: {
    width: '130%',
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInput: {
    width: '60%',
    height: 40,
    borderBottomWidth: 1.5,
  },
  errorText: {
    color: '#FF0000',
    marginTop: -10,
  },
  inputBtnText: {
    color: '#000',
    width: 60,
    marginLeft: -5,
    marginRight: -40,
    height: 30,
    marginTop: 9.5,
    borderBottomWidth: 1.5,
  },
  rootContainer: {
    flex: 1,
  },
});

export default MyPage;
