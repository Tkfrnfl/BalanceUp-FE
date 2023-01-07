import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import * as Progress from 'react-native-progress';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  nickNameState,
  userNameState,
  jwtState,
  jwtRefreshState,
} from '../../recoil/atom';
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from 'recoil';
import {joinKakao} from '../../actions/memberJoinApi';

const AgreeScreen = ({navigation}) => {
  const [disabled, setDisabled] = useState(false);
  const [allCheck, setAllCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [serviceCheck, setServiceCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [nickName, setNickName] = useRecoilState(nickNameState);
  const [userName, setUserName] = useRecoilState(userNameState);
  const [jwt, setjwt] = useRecoilState(jwtState);
  const [jwtRefresh, setJwtRefresh] = useRecoilState(jwtRefreshState);

  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setUseCheck(true);
      setServiceCheck(true);
      setAgeCheck(true);
    } else {
      setAllCheck(false);
      setUseCheck(false);
      setServiceCheck(false);
      setAgeCheck(false);
    }
  };

  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };

  const serviceBtnEvent = () => {
    if (serviceCheck === false) {
      setServiceCheck(true);
    } else {
      setServiceCheck(false);
    }
  };

  const ageBtnEvent = () => {
    if (ageCheck === false) {
      setAgeCheck(true);
    } else {
      setAgeCheck(false);
    }
  };

  useEffect(() => {
    if (ageCheck === true && useCheck === true && serviceCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [ageCheck, useCheck, serviceCheck, allCheck]);

  useEffect(() => {
    setDisabled(!allCheck);
  }, [allCheck]);

  const useInfo = () => {
    navigation.navigate('UseInfo');
  };

  const serviceInfo = () => {
    navigation.navigate('ServiceInfo');
  };

  const goJoin = async (): Promise<void> => {
    let res;
    await joinKakao(userName, nickName).then(response => {
      res = response;

      if (res.resultCode === 'success') {
        // jwt 로컬 스토리지 저장후 메인화면 보내기
        setjwt(res.body.token);
        setJwtRefresh(res.body.refreshToken);
        AsyncStorage.setItem('jwt', res.body.token);
        AsyncStorage.setItem('jwtRefresh', res.body.refreshToken);
        navigation.push('Main');
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>약관 동의</Text>
        <View style={styles.btnWrap}>
          <CheckBox
            disabled={false}
            value={allCheck}
            onValueChange={allBtnEvent}
            tintColors={{true: '#525151'}}
          />
          <Text style={styles.agreeText}>모두 동의합니다</Text>
        </View>
        <View style={styles.btnWrap}>
          <CheckBox
            disabled={false}
            value={useCheck}
            onValueChange={useBtnEvent}
            tintColors={{true: '#525151'}}
          />
          <Text style={styles.agreeText}>[필수] 개인정보 처리 방침</Text>
          <TouchableOpacity onPress={useInfo}>
            <Text style={(styles.agreeText, {fontWeight: 'bold'})}> ➡️ </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnWrap}>
          <CheckBox
            disabled={false}
            value={serviceCheck}
            onValueChange={serviceBtnEvent}
            tintColors={{true: '#525151'}}
          />
          <Text style={styles.agreeText}>[필수] 서비스 이용 약관</Text>
          <TouchableOpacity onPress={serviceInfo}>
            <Text style={(styles.agreeText, {fontWeight: 'bold'})}> ➡️ </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnWrap}>
          <CheckBox
            disabled={false}
            value={ageCheck}
            onValueChange={ageBtnEvent}
            tintColors={{true: '#525151'}}
          />
          <Text style={styles.agreeText}>[필수] 만 14세 이상입니다</Text>
        </View>
      </View>
      <Progress.Bar
        progress={1.0}
        borderWidth={0}
        color={'#444441'}
        width={350}
        height={10}
        style={styles.barWrap}
      />
      <TouchableOpacity
        style={[
          styles.Nextbutton,
          {backgroundColor: disabled ? '#D9D9D9' : '#272727'},
        ]}
        disabled={disabled}
        onPress={goJoin}>
        <Text
          style={[
            styles.NextbuttonText,
            {color: disabled ? '#000000' : '#FFFFFF'},
          ]}>
          다음
        </Text>
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
    fontSize: 30,
    justifyContent: 'center',
    color: '#000000',
    marginTop: 30,
  },
  agreeText: {
    fontSize: 15,
    color: '#000000',
  },
  form: {
    flex: 4,
    width: '100%',
    alignItems: 'flex-start',
  },
  btnWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
});

export default AgreeScreen;
