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
} from 'react-native';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';

import {validateText} from '../../utils/regex';
import duplicationCheckAPI from '../../actions/duplicationCheckAPI';
import testGif from '../../resource/image/testGif.gif';

const NameScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [checkTextError, setCheckTextError] = useState('');
  const [checkTextPass, setCheckTextPass] = useState('');
  const [checkDisabled, setCheckDisabled] = useState(true);
  const [disabled, setDisabled] = useState(true);

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

  // 중복 확인 구현
  const duplicationCheck = () => {
    duplicationCheckAPI(userName).then(response => {
      if (response === true) {
        setCheckTextPass('사용 가능한 닉네임입니다');
      } else {
        setCheckTextError('이미 존재하는 닉네임입니다');
      }
    });
  };

  const handleRemove = () => {
    setUserName('');
    setCheckTextError('');
    setCheckTextPass('');
  };

  const goAgree = () => {
    navigation.navigate('Agree');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>내 캐릭터의</Text>
          <Text style={styles.titleText}>닉네임을 입력해주세요</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <TextInput
              value={userName}
              onChangeText={handleTextChange}
              style={styles.textInput}
              // maxLength={11} : 코드로 제한해도 input으로 글자가 계속 입력되는 버그 확인
              autoCapitalize="none"
              fontSize={17}
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
              activeOpacity={0.8}
              onPress={duplicationCheck}
              disabled={checkDisabled}>
              <Text style={styles.inputBtnText}>중복확인</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.errorText}>{checkTextError}</Text>
          <Text style={styles.passText}>{checkTextPass}</Text>
        </View>
        <View style={styles.gifView}>
          <FastImage // 캐릭터 GIF 예정
            style={{width: 250, height: 300}}
            source={testGif}
          />
        </View>
        <Progress.Bar
          progress={0.5}
          width={350}
          height={10}
          unfilledColor={'#8f8f89'}
          borderWidth={0}
          color={'#181817'}
          style={styles.barWrap}
        />
        <TouchableOpacity
          style={[
            styles.Nextbutton,
            {backgroundColor: disabled ? '#D9D9D9' : '#272727'},
          ]}
          onPress={goAgree}
          disabled={disabled}>
          <Text
            style={[
              styles.NextbuttonText,
              {color: disabled ? '#000000' : '#FFFFFF'},
            ]}>
            다음
          </Text>
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
    fontSize: 30,
    color: 'black',
  },
  form: {
    flex: 4,
  },
  inputWrapper: {
    width: '130%',
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
    width: '60%',
    height: 40,
    borderBottomWidth: 1.5,
  },
  buttons: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: '30%',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
  Nextbutton: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
  NextbuttonText: {
    fontSize: 25,
  },
  barWrap: {
    width: '100%',
    marginBottom: 20,
  },
  inputBtn: {
    marginLeft: 10,
  },
  gifView: {
    alignItems: 'center',
    width: '100%',
    flex: 13,
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
    marginLeft: -10,
    marginRight: -40,
    height: 33,
    marginTop: 6.5,
    borderBottomWidth: 1.5,
    fontSize: 16,
  },
});

export default NameScreen;
