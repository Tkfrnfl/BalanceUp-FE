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
import {response} from 'express';
import {WithLocalSvg} from 'react-native-svg';

import checkOn from '../../resource/image/Agree/check_on.svg';
import checkOff from '../../resource/image/Agree/check_off.svg';
import moreInfoArrow from '../../resource/image/Agree/moreInfoArrow.svg';

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
      <Progress.Bar
        progress={0.5}
        width={350}
        height={10}
        unfilledColor={'#CED6FF'}
        borderWidth={0}
        color={'#585FFF'}
        style={styles.barWrap}
      />
      <View style={styles.sheet}>
        <Text style={styles.title}>약관 동의</Text>
        <View style={styles.allBtnWrap}>
          {allCheck ? (
            <WithLocalSvg
              style={styles.allCheckBox}
              asset={checkOn}
              onPress={allBtnEvent}
            />
          ) : (
            <WithLocalSvg
              style={styles.allCheckBox}
              asset={checkOff}
              onPress={allBtnEvent}
            />
          )}
          <Text style={styles.allAgreeText}>모두 동의합니다</Text>
        </View>
        <View style={styles.boderLine} />
        <View style={styles.btnWrap}>
          {useCheck ? (
            <WithLocalSvg
              width={22}
              height={22}
              style={styles.checkBox}
              asset={checkOn}
              onPress={useBtnEvent}
            />
          ) : (
            <WithLocalSvg
              width={22}
              height={22}
              style={styles.checkBox}
              asset={checkOff}
              onPress={useBtnEvent}
            />
          )}
          <Text style={styles.agreeText}>개인정보 처리 방침 (필수)</Text>
          <TouchableOpacity onPress={useInfo} activeOpacity={1.0}>
            <WithLocalSvg asset={moreInfoArrow} style={styles.arrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.btnWrap}>
          {serviceCheck ? (
            <WithLocalSvg
              width={22}
              height={22}
              style={styles.checkBox}
              asset={checkOn}
              onPress={serviceBtnEvent}
            />
          ) : (
            <WithLocalSvg
              width={22}
              height={22}
              style={styles.checkBox}
              asset={checkOff}
              onPress={serviceBtnEvent}
            />
          )}
          <Text style={styles.agreeText}>서비스 이용약관 (필수)</Text>
          <TouchableOpacity onPress={serviceInfo} activeOpacity={1.0}>
            <WithLocalSvg asset={moreInfoArrow} style={styles.arrow1} />
          </TouchableOpacity>
        </View>
        <View style={styles.btnWrap}>
          {ageCheck ? (
            <WithLocalSvg
              width={22}
              height={22}
              style={styles.checkBox}
              asset={checkOn}
              onPress={ageBtnEvent}
            />
          ) : (
            <WithLocalSvg
              width={22}
              height={22}
              style={styles.checkBox}
              asset={checkOff}
              onPress={ageBtnEvent}
            />
          )}
          <Text style={styles.agreeText}>14세 이상입니다 (필수)</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.Nextbutton,
          {backgroundColor: disabled ? '#CED6FF' : '#585FFF'},
        ]}
        onPress={goJoin}
        activeOpacity={1.0}
        disabled={disabled}>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#232323',
    marginTop: 30,
    marginBottom: 20,
  },
  allAgreeText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#232323',
  },
  agreeText: {
    fontSize: 14,
    color: '#232323',
  },
  sheet: {
    flex: 4,
    width: '100%',
    alignItems: 'flex-start',
  },
  btnWrap: {
    flexDirection: 'row',
    marginTop: 18,
  },
  allBtnWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
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
    transform: [{rotateY: '180deg'}],
  },
  boderLine: {
    borderTopWidth: 1,
    borderTopColor: '#dbdbdb',
    width: 450,
    right: 20,
  },
  allCheckBox: {
    marginRight: 10,
  },
  checkBox: {
    marginRight: 10,
  },
  arrow: {
    left: 160,
    top: 1,
  },
  arrow1: {
    left: 177,
    top: 1,
  },
});

export default AgreeScreen;
