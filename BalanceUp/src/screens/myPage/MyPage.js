import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
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
import {WithLocalSvg} from 'react-native-svg';
import moreInfoArrow from '../../resource/image/Agree/moreInfoArrow.svg';
import modalInnerStyles from '../../css/modalStyles';
import {validateText} from '../../utils/regex';
import commonStyles from '../../css/commonStyles';
import {ChangeNameAPI} from '../../actions/checkNameAPI';

const MyPage = ({navigation: {navigate}}) => {
  const [userName, setUserName] = useState('');
  const [checkTextError, setCheckTextError] = useState('');
  const [checkTextPass, setCheckTextPass] = useState('');
  const [checkDisabled, setCheckDisabled] = useState(true);
  const [disabled, setDisabled] = useState(true);

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
    setDisabled(!checkTextPass);
  }, [checkTextPass]);

  useEffect(() => {
    setCheckDisabled(!(userName && !checkTextError));
  }, [userName, checkTextError]);

  const handleTextChange = userName => {
    setUserName(userName);
    setCheckTextError(
      validateText(userName)
        ? ''
        : '닉네임에 특수문자 및 공백을 포함 할 수 없어요',
    );
    setCheckTextPass(validateText(userName) ? '' : null);

    // 글자수 제한
    if (userName.length >= 11) {
      setCheckTextError('11글자 이하 사용 불가능합니다');
    } else if (userName.length === 0) {
      setUserName('');
      setCheckTextError('');
      setCheckTextPass('');
    }
  };

  // 닉네임 변경 구현
  const handleChangeName = () => {
    ChangeNameAPI(userName).then(response => {
      if (response === true) {
        setCheckTextPass('사용 가능한 닉네임입니다');
      } else {
        setCheckTextError('이미 존재하는 닉네임입니다');
      }
    });
  };

  // 네이게이션 구현
  const goLogout = () => {
    setLogoutModalVisible(false);
    navigate('Login');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.topSheet}>
            <Text style={styles.topTitle}>김루틴님</Text>
            <TouchableOpacity
              onPress={() => navigate('Withdrawal')}
              activeOpacity={1.0}>
              <Text style={styles.withdrawalText}>회원 탈퇴</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menuSheet}>
            <Text style={styles.menuText}>닉네임 설정</Text>
            <TouchableOpacity
              onPress={() => setIsModalVisible(!isModalVisible)}
              activeOpacity={1.0}>
              <WithLocalSvg
                asset={moreInfoArrow}
                style={[styles.arrowBtnStyle, {right: 18}]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.menuSheet}>
            <Text style={styles.menuText}>공지사항</Text>
            <TouchableOpacity
              onPress={() => navigate('Notice')}
              activeOpacity={1.0}>
              <WithLocalSvg
                asset={moreInfoArrow}
                style={styles.arrowBtnStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.menuSheet}>
            <Text style={styles.menuText}>로그아웃</Text>
            <TouchableOpacity
              onPress={() => setLogoutModalVisible(!logoutModalVisible)}
              activeOpacity={1.0}>
              <WithLocalSvg
                asset={moreInfoArrow}
                style={styles.arrowBtnStyle}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.verText}>Ver 1.0.0</Text>
        </View>
        {/* 하단 탭바 */}
        <View style={commonStyles.bottomTabSheet}>
          <TouchableOpacity onPress={() => navigate('Home')}>
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
          <TouchableOpacity onPress={() => navigate('Set')}>
            <Text style={commonStyles.commonText}>작성</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('LookAll')}>
            <Text style={commonStyles.commonText}>루틴</Text>
          </TouchableOpacity>
          <Text style={commonStyles.selectText}>마이페이지</Text>
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
                        onPress={handleChangeName}
                        activeOpacity={0.8}
                        disabled={checkDisabled}>
                        <Text style={styles.inputBtnText}>중복확인</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.errorText}>{checkTextError}</Text>
                    <Text style={styles.passText}>{checkTextPass}</Text>
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
    backgroundColor: '#F8F8F9',
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  topSheet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topTitle: {
    fontSize: 22,
    fontFamily: 'Pretendard-Bold',
    marginTop: 40,
    marginLeft: 20,
    marginBottom: 30,
    color: '#000',
  },
  withdrawalText: {
    top: 43,
    right: 20,
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#888888',
    fontFamily: 'Pretendard-Medium',
    color: '#888888',
  },
  menuSheet: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginTop: 2,
    width: 400,
    height: 55,
  },
  menuText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    marginLeft: 20,
    marginTop: 16,
  },
  arrowBtnStyle: {
    marginLeft: 290,
    marginTop: 20,
  },
  blank: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 200,
    marginTop: 15,
  },
  verText: {
    color: '#888888',
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    marginLeft: 330,
    marginTop: 20,
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
  passText: {
    color: 'green',
    marginTop: -20,
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
