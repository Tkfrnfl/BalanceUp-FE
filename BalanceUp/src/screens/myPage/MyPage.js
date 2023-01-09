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
import {validateText} from '../../utils/regex';
import {ChangeNameAPI} from '../../actions/checkNameAPI';
import {MyBottomTab} from '../../screens/BottomTab/index';

import moreInfoArrow from '../../resource/image/Agree/moreInfoArrow.svg';
import modalInnerStyles from '../../css/modalStyles';
import errorSvg from '../../resource/image/Name/name_error.svg';

const MyPage = ({navigation: {navigate}}) => {
  const [userName, setUserName] = useState('');
  const [checkTextError, setCheckTextError] = useState('');
  const [checkTextPass, setCheckTextPass] = useState('');
  const [checkDisabled, setCheckDisabled] = useState(true);
  const [disabled, setDisabled] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const sheetData = [
    {
      id: 1,
      title: '닉네임 설정',
    },
    {
      id: 2,
      title: '공지사항',
      func: 'Notice',
    },
    {
      id: 3,
      title: '로그아웃',
    },
  ];

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

  const onClick = (id, func) => {
    if (id === 1) {
      setIsModalVisible(!isModalVisible);
    } else if (id === 2) {
      navigate(func);
    } else if (id === 3) {
      setLogoutModalVisible(!logoutModalVisible);
    }
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
          {sheetData.map(data => (
            <View key={data.id} style={styles.menuSheet}>
              <Text style={styles.menuText}>{data.title}</Text>
              <TouchableOpacity
                onPress={() => {
                  onClick(data.id, data.func);
                }}
                activeOpacity={1.0}>
                <WithLocalSvg
                  asset={moreInfoArrow}
                  style={[
                    styles.arrowBtnStyle,
                    {right: data.id === 1 ? 18 : null},
                  ]}
                />
              </TouchableOpacity>
            </View>
          ))}
          <Text style={styles.verText}>Ver 1.0.0</Text>
        </View>
        <MyBottomTab navigate={navigate} />
        {/* 닉네임 변경 모달 코드 */}
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
                    ...modalInnerStyles.nameSheetContainer,
                    transform: [{translateY: translateY}],
                  }}
                  {...panResponder.panHandlers}>
                  <Text style={modalInnerStyles.modalTitle}>
                    닉네임을 설정해 주세요
                  </Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      value={userName}
                      onChangeText={handleTextChange}
                      style={[
                        styles.textInput,
                        {borderColor: checkTextError ? '#F05D5D' : '#AFAFAF'},
                      ]}
                      autoCapitalize="none"
                      fontSize={15}
                      placeholder="닉네임 입력"
                      placeholderTextColor="#AFAFAF"
                    />
                    {checkTextError ? (
                      <WithLocalSvg style={styles.errorImg} asset={errorSvg} />
                    ) : null}
                    <TouchableOpacity
                      style={[
                        styles.duplicationBtn,
                        {borderColor: checkTextPass ? '#CED6FF' : '#585FFF'},
                      ]}
                      activeOpacity={1.0}
                      onPress={handleChangeName}
                      disabled={checkDisabled}>
                      <Text
                        style={[
                          styles.duplicationText,
                          {color: checkTextPass ? '#CED6FF' : '#585FFF'},
                        ]}>
                        중복확인
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {!checkTextError && !checkTextPass ? (
                    <Text style={styles.inputText}>
                      11자 내로 작성해 주세요 (공백, 특수문자 불가)
                    </Text>
                  ) : null}
                  <Text style={styles.errorText}>{checkTextError}</Text>
                  <Text style={styles.passText}>{checkTextPass}</Text>
                  <View style={modalInnerStyles.modalFlex}>
                    <TouchableOpacity
                      disabled={disabled}
                      style={[
                        modalInnerStyles.saveBtn,
                        {backgroundColor: disabled ? '#CED6FF' : '#585FFF'},
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
                <Text style={modalInnerStyles.modalTitle}>로그아웃</Text>
                <Text style={modalInnerStyles.logoutModalText}>
                  로그아웃 하시겠습니까?
                </Text>
                <View style={modalInnerStyles.modalFlex}>
                  <TouchableOpacity
                    style={modalInnerStyles.noBtn}
                    activeOpacity={1.0}
                    onPress={() => setLogoutModalVisible(false)}>
                    <Text style={modalInnerStyles.noText}>아니요</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={goLogout}
                    activeOpacity={1.0}
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
  rootContainer: {
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
    marginTop: 20,
    position: 'relative',
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInput: {
    width: 235,
    height: 48,
    marginLeft: -8,
    borderWidth: 1,
    borderColor: '#AFAFAF',
    borderRadius: 5,
    paddingLeft: 20,
    fontFamily: 'Pretendard-Bold',
  },
  duplicationBtn: {
    width: 93,
    height: 48,
    borderWidth: 1,
    borderColor: '#585FFF',
    borderRadius: 5,
    marginLeft: 20,
  },
  duplicationText: {
    color: '#585FFF',
    fontFamily: 'Pretendard-Medium',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 11,
  },
  inputText: {
    color: '#AFAFAF',
    marginTop: -10,
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
  },
  errorText: {
    color: '#F05D5D',
    marginTop: -10,
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
  },
  passText: {
    color: '#00B528',
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    marginTop: -20,
  },
  errorImg: {
    width: 18,
    height: 18,
    position: 'absolute',
    left: 180,
    top: 15,
  },
});

export default MyPage;
