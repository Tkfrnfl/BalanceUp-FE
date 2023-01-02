import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {nickNameState} from '../../recoil/atom';
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from 'recoil';
import {WithLocalSvg} from 'react-native-svg';

import {validateText} from '../../utils/regex';
import {duplicationCheckAPI} from '../../actions/checkNameAPI';
import NameOnboarding from '../../resource/image/Name/NameOnboarding.png';
import errorSvg from '../../resource/image/Name/name_error.svg';

const NameScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [checkTextError, setCheckTextError] = useState('');
  const [checkTextPass, setCheckTextPass] = useState('');
  const [checkDisabled, setCheckDisabled] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [nickName, setNickName] = useRecoilState(nickNameState);

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
        : '닉네임에 특수문자 및 공백을 포함할 수 없어요',
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

  // 중복 확인 구현
  const duplicationCheck = () => {
    duplicationCheckAPI(userName).then(response => {
      console.log(response);
      if (response === response) {
        setCheckTextPass('사용 가능한 닉네임이에요!');
      } else {
        setCheckTextError('이미 존재하는 닉네임이에요');
      }
    });
  };

  const goAgree = () => {
    setNickName(userName);
    console.log(nickName);
    navigation.navigate('Agree');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Progress.Bar
          progress={0.5}
          width={350}
          height={10}
          unfilledColor={'#CED6FF'}
          borderWidth={0}
          color={'#585FFF'}
          style={styles.barWrap}
        />
        <View style={styles.title}>
          <Text style={styles.titleText}>
            내 캐릭터의 {'\n'}닉네임을 입력해주세요
          </Text>
        </View>
        <View style={styles.form}>
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
              onPress={duplicationCheck}
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
        </View>
        <View style={styles.gifView}>
          <Image style={styles.onboardingImg} source={NameOnboarding} />
        </View>
        <TouchableOpacity
          style={[
            styles.Nextbutton,
            {backgroundColor: disabled ? '#CED6FF' : '#585FFF'},
          ]}
          onPress={goAgree}
          activeOpacity={1.0}
          disabled={disabled}>
          <Text style={styles.NextbuttonText}>다음</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    width: '100%',
    height: '15%',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  form: {
    flex: 4,
  },
  inputWrapper: {
    width: '130%',
    position: 'relative',
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    paddingBottom: 6,
    marginTop: 15,
  },
  textInput: {
    width: 238,
    height: 48,
    borderWidth: 1,
    borderColor: '#AFAFAF',
    borderRadius: 5,
    paddingLeft: 20,
    fontWeight: 'bold',
  },
  Nextbutton: {
    width: 400,
    alignItems: 'center',
    padding: 15,
    marginLeft: -25,
  },
  NextbuttonText: {
    fontSize: 16,
    color: '#fff',
  },
  barWrap: {
    width: '100%',
    height: 6,
    marginTop: 50,
    marginBottom: 10,
  },
  duplicationBtn: {
    width: 102,
    height: 48,
    borderWidth: 1,
    borderColor: '#585FFF',
    borderRadius: 5,
    marginLeft: 5,
  },
  duplicationText: {
    color: '#585FFF',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 11,
  },
  gifView: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 100,
  },
  inputText: {
    color: '#AFAFAF',
    marginTop: -10,
    fontSize: 12,
    fontWeight: '500',
  },
  errorText: {
    color: '#F05D5D',
    marginTop: -10,
    fontSize: 12,
    fontWeight: '500',
  },
  passText: {
    color: '#00B528',
    fontSize: 12,
    fontWeight: '500',
    marginTop: -20,
  },
  onboardingImg: {
    width: 400,
    height: 269,
  },
  errorImg: {
    width: 18,
    height: 18,
    position: 'absolute',
    left: 200,
    top: 15,
  },
});

export default NameScreen;
