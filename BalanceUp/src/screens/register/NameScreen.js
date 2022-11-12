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

import {validateText, removeWhitespace} from '../../utils/regex';
import duplicationCheckAPI from '../../actions/duplicationCheckAPI';
import FastImage from 'react-native-fast-image';

const NameScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [checkTextError, setCheckTextError] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [usableId, setUsableId] = useState(false);

  useEffect(() => {
    setDisabled(!(userName && !checkTextError));
  }, [userName, checkTextError]);

  const handleTextChange = userName => {
    const changedText = removeWhitespace(userName);
    setUserName(changedText);
    setCheckTextError(
      validateText(userName) ? '' : '글자, 특수문자, 공백은 사용 불가능합니다.',
    );
    // console.log(userName, validateText(userName), setCheckTextError);
  };

  // 중복 확인 부분은 아직 미완성
  const duplicationCheck = () => {
    duplicationCheckAPI(userName).then(response => {
      console.log(response);
      if (response === false) {
        alert('사용 가능한 아이디입니다.');
        setUsableId(response);
      } else {
        alert('중복된 아이디입니다. 다시 시도하세요.');
        setUsableId(response);
        setUserid('');
      }
    });
  };

  const handleRemove = () => {
    setUserName('');
    setCheckTextError('');
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
          <Text style={styles.label}>닉네임</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={userName}
              onChangeText={handleTextChange}
              style={styles.textInput}
              maxLength={11}
              autoCapitalize="none"
              fontSize={15}
            />
            <TouchableOpacity style={styles.inputBtn} onPress={handleRemove}>
              <Text>X</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.inputBtn}
              onPress={duplicationCheck}>
              <Text>중복확인</Text>
            </TouchableOpacity>
          </View>
          <Text style={{marginTop: -15}}>
            11글자 이하 / 글자, 특수문자 사용 불가
          </Text>
          <Text style={{color: 'red', marginTop: 2}}>{checkTextError}</Text>
        </View>
        <View style={styles.gifView}>
          <FastImage // 캐릭터 GIF 예정
            style={{width: 300, height: 300}}
            source={{uri: 'https://unsplash.it/400/400?image=1'}}
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
            {backgroundColor: disabled ? '#d3eaf2' : '#9ce4ff'},
          ]}
          onPress={goAgree}
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
    fontSize: 30,
    fontWeight: 'bold',
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
    flex: 8,
  },
});

export default NameScreen;
