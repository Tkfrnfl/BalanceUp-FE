import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  nickNameState,
  userNameState,
  jwtState,
  jwtRefreshState,
  userLogin,
} from '../../recoil/atom';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil';
import {joinKakao, joinGoogle} from '../../actions/memberJoinApi';

import CheckOn from '../../resource/image/Agree/check_on.svg';
import CheckOff from '../../resource/image/Agree/check_off.svg';
import MoreInfoArrow from '../../resource/image/Agree/moreInfoArrow.svg';

const AgreeScreen = ({navigation}) => {
  const [disabled, setDisabled] = useState(false);
  const [allCheck, setAllCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [serviceCheck, setServiceCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [nickName, setNickName] = useRecoilState(nickNameState);
  const [userName, setUserName] = useRecoilState(userNameState);
  const [jwt, setjwt] = useRecoilState(jwtState);
  const [KorG, setKorG] = useRecoilState(userLogin);
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
    useCheck ? setUseCheck(false) : setUseCheck(true);
  };

  const serviceBtnEvent = () => {
    serviceCheck ? setServiceCheck(false) : setServiceCheck(true);
  };

  const ageBtnEvent = () => {
    ageCheck ? setAgeCheck(false) : setAgeCheck(true);
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

  const goJoin = async (): Promise<void> => {
    let res;
    if (KorG === 'K') {
      await joinKakao(userName, nickName).then(response => {
        res = response;
        if (res.resultCode === 'success') {
          // jwt 로컬 스토리지 저장후 메인화면 보내기
          setjwt(res.body.token);
          setJwtRefresh(res.body.refreshToken);
          AsyncStorage.setItem('nickName', nickName);
          AsyncStorage.setItem('jwt', JSON.stringify(res.body.token));
          AsyncStorage.setItem(
            'jwtRefresh',
            JSON.stringify(res.body.refreshToken),
          );
          navigation.push('Main');
        }
      });
    } else {
      await joinGoogle(userName, nickName).then(response => {
        res = response;
        if (res.resultCode === 'success') {
          // jwt 로컬 스토리지 저장후 메인화면 보내기
          setjwt(res.body.token);
          setJwtRefresh(res.body.refreshToken);
          AsyncStorage.setItem('nickName', nickName);
          AsyncStorage.setItem('jwt', JSON.stringify(res.body.token));
          AsyncStorage.setItem(
            'jwtRefresh',
            JSON.stringify(res.body.refreshToken),
          );
          navigation.push('Main');
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Progress.Bar
        progress={0.5}
        width={responsiveWidth(90)}
        height={6}
        unfilledColor={'#CED6FF'}
        borderWidth={0}
        color={'#585FFF'}
        style={styles.barWrap}
      />
      <View style={styles.sheet}>
        <Text style={styles.title}>약관 동의</Text>
        <View style={styles.allBtnWrap}>
          {allCheck ? (
            <CheckOn style={styles.allCheckBox} onPress={allBtnEvent} />
          ) : (
            <CheckOff style={styles.allCheckBox} onPress={allBtnEvent} />
          )}
          <Text style={styles.allAgreeText}>모두 동의합니다</Text>
        </View>
        <View style={styles.boderLine} />
        <View style={styles.btnWrap}>
          {useCheck ? (
            <CheckOn
              width={22}
              height={22}
              style={styles.checkBox}
              onPress={useBtnEvent}
            />
          ) : (
            <CheckOff
              width={22}
              height={22}
              style={styles.checkBox}
              onPress={useBtnEvent}
            />
          )}
          <Text style={styles.agreeText}>
            [필수] 서비스 이용약관에 동의합니다.
          </Text>
          <MoreInfoArrow
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            onPress={() =>
              Linking.openURL(
                'https://keyum.notion.site/KEYUM-dd9853b3ffa74f34951a57cfb7d195ce',
              )
            }
            style={styles.arrowBtnStyle}
          />
        </View>
        <View style={styles.btnWrap}>
          {serviceCheck ? (
            <CheckOn
              width={22}
              height={22}
              style={styles.checkBox}
              onPress={serviceBtnEvent}
            />
          ) : (
            <CheckOff
              width={22}
              height={22}
              style={styles.checkBox}
              onPress={serviceBtnEvent}
            />
          )}
          <Text style={styles.agreeText}>
            [필수] 개인정보 수집 / 이용에 동의합니다.
          </Text>
          <MoreInfoArrow
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            onPress={() =>
              Linking.openURL(
                'https://keyum.notion.site/KEYUM-ef4e1a7f198d4cec8d4642c3bf7cc0a4',
              )
            }
            style={styles.arrowBtnStyle}
          />
        </View>
        <View style={styles.btnWrap}>
          {ageCheck ? (
            <CheckOn
              width={22}
              height={22}
              style={styles.checkBox}
              onPress={ageBtnEvent}
            />
          ) : (
            <CheckOff
              width={22}
              height={22}
              style={styles.checkBox}
              onPress={ageBtnEvent}
            />
          )}
          <Text style={styles.agreeText}>[필수] 만 14세 이상입니다.</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.nextButton,
          {backgroundColor: disabled ? '#CED6FF' : '#585FFF'},
        ]}
        onPress={goJoin}
        activeOpacity={1.0}
        disabled={disabled}>
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Pretendard-Bold',
    color: '#232323',
    marginTop: 40,
    marginBottom: 30,
  },
  allAgreeText: {
    fontSize: 18,
    fontFamily: 'Pretendard-Medium',
    color: '#232323',
  },
  agreeText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Light',
    color: '#232323',
  },
  sheet: {
    flex: 1,
    marginLeft: 20,
  },
  btnWrap: {
    flexDirection: 'row',
    marginTop: 18,
  },
  allBtnWrap: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  nextButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(100),
    height: 58,
  },
  nextButtonText: {
    fontSize: responsiveFontSize(1.98),
    fontFamily: 'Pretendard-Medium',
    color: '#ffffff',
  },
  barWrap: {
    marginLeft: 20,
    marginTop: 70,
    marginBottom: 10,
    transform: [{rotate: '180deg'}],
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
  arrowBtnStyle: {
    alignSelf: 'center',
    position: 'absolute',
    right: responsiveWidth(5),
  },
});

export default AgreeScreen;
