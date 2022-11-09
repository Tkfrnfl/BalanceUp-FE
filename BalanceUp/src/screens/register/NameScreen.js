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

const NameScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [checkTextError, setCheckTextError] = useState('');
  const [disabled, setDisabled] = useState(false);
  // const [userList, setUserList] = useState([]);

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

  const handleCheck = () => {
    // list에 inputText 값 넣어주기
    // const newList = [...userList];
    // newList.push(userName);
    // setUserList(newList);

    // if (userName === 'asd') {
    //   setCheckError('중복입니다.');
    // } else {
    //   setCheckError('사용가능한 닉네임입니다.');
    // }
    if (userName === /[^a-z|A-Z|0-9|ㄱ-ㅎ|가-힣]/g) {
      alert('사용 가능합니다');
    } else {
      alert('초성과 특수문자는 사용 불가능합니다');
    }
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
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>닉네임</Text>
            <TextInput
              value={userName}
              onChangeText={handleTextChange}
              style={styles.textInput}
              maxLength={11}
            />
            <Text>11글자 이하 / 글자, 특수문자 사용 불가</Text>
            <Text style={{color: 'red'}}>{checkTextError}</Text>
          </View>
          <TouchableOpacity onPress={handleCheck}>
            <Text>중복확인</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRemove}>
            <Text>X</Text>
          </TouchableOpacity>
        </View>
        <Progress.Bar progress={0.5} width={350} style={styles.barWrap} />
        <TouchableOpacity
          style={[
            styles.Nextbutton,
            {backgroundColor: disabled ? '#d3eaf2' : '#66b6d2'},
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
    width: '100%',
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    paddingBottom: 20,
  },
  label: {
    fontSize: 20,
    paddingBottom: 6,
  },
  textInput: {
    width: '100%',
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
  },
  NextbuttonText: {
    fontSize: 25,
  },
  barWrap: {
    width: '100%',
    marginBottom: 20,
  },
});

export default NameScreen;
