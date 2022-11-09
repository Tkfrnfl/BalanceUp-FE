import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import * as Progress from 'react-native-progress';

const NameScreen = ({navigation}) => {
  // useState
  const [userName, setUserName] = useState('');
  const [checkError, setCheckError] = useState(''); // 중복 확인 State
  // const [userList, setUserList] = useState([]);

  const handleCheck = () => {
    // list에 inputText 값 넣어주기
    // const newList = [...userList];
    // newList.push(userName);
    // setUserList(newList);

    if (userName === 'asd') {
      setCheckError('중복입니다.');
    } else {
      setCheckError('사용가능한 닉네임입니다.');
    }
  };

  const handleRemove = () => {
    setUserName('');
    setCheckError('');
  };

  const goAgree = () => {
    navigation.navigate('Agree');
  };

  return (
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
            onChangeText={userText => setUserName(userText)}
            style={styles.textInput}
          />
          <Text>{checkError}</Text>
        </View>
        <TouchableOpacity onPress={handleCheck}>
          <Text>중복확인</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRemove}>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
      <Progress.Bar progress={0.5} width={350} style={styles.barWrap} />
      <TouchableOpacity style={styles.Nextbutton} onPress={goAgree}>
        <Text style={styles.NextbuttonText}>다음</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    height: 35,
    backgroundColor: '#d9d9d9',
    borderRadius: 5,
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
    borderWidth: 2,
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
