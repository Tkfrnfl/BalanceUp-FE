import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {WithLocalSvg} from 'react-native-svg';

import checkOn from '../../resource/image/Agree/check_on.svg';
import checkOff from '../../resource/image/Agree/check_off.svg';
import backArrow from '../../resource/image/Common/backArrow.svg';

const Withdrawal = ({navigation: {navigate}}) => {
  const [useCheck, setUseCheck] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };

  useEffect(() => {
    setDisabled(!useCheck);
  }, [useCheck]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={() => navigate('MyPage')}
          activeOpacity={1.0}>
          <WithLocalSvg style={styles.arrowBtn} asset={backArrow} />
        </TouchableOpacity>
        <View style={styles.topSheet}>
          <Text style={styles.topTitle}>회원 탈퇴</Text>
          <Text style={styles.subText}>아래 유의사항을 확인해 주세요</Text>
        </View>
        <View style={styles.infoSheet}>
          <View style={{flexDirection: 'row', top: 8}}>
            <Text style={styles.info_Text}>1.</Text>
            <Text style={styles.infoText}>
              루틴 기록, 캐릭터 성장을 포함하여 회원님이
            </Text>
          </View>
          <Text style={[styles.infoText, {left: 19.5}]}>
            설정한 정보가 모두 삭제됩니다.
          </Text>
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <Text style={styles.info_Text}>2.</Text>
            <Text style={[styles.infoText, {right: 12}]}>
              삭제된 데이터는 복구되지 않습니다.
            </Text>
          </View>
        </View>
        <View style={styles.agreeSheet}>
          {useCheck ? (
            <WithLocalSvg
              style={styles.allCheckBox}
              asset={checkOn}
              onPress={useBtnEvent}
            />
          ) : (
            <WithLocalSvg
              style={styles.allCheckBox}
              asset={checkOff}
              onPress={useBtnEvent}
            />
          )}
          <Text style={styles.agreeText}>
            위 내용에 동의하고 탈퇴하겠습니다
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.Nextbutton,
          {backgroundColor: disabled ? '#CED6FF' : '#585FFF'},
        ]}
        onPress={() => navigate('Login')}
        activeOpacity={1.0}
        disabled={disabled}>
        <Text style={styles.NextbuttonText}>탈퇴하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  arrowBtn: {
    marginTop: 20,
    marginLeft: 20,
  },
  topSheet: {
    alignItems: 'center',
    marginTop: 10,
  },
  topTitle: {
    color: '#000',
    fontSize: 22,
    marginTop: 8,
    fontFamily: 'Pretendard-Bold',
  },
  subText: {
    color: '#232323',
    marginTop: 10,
    fontFamily: 'Pretendard-Medium',
  },
  infoSheet: {
    backgroundColor: '#F8F8F9',
    marginTop: 25,
    marginLeft: 20,
    width: 350,
    height: 111,
  },
  infoText: {
    color: '#232323',
    fontFamily: 'Pretendard-Regular',
    marginLeft: 20,
    marginTop: 8,
    right: 10,
  },
  info_Text: {
    color: '#232323',
    fontFamily: 'Pretendard-Regular',
    marginLeft: 20,
    marginTop: 8,
  },
  agreeSheet: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginLeft: 20,
  },
  agreeText: {
    marginTop: 3,
    marginLeft: 10,
    color: '#232323',
    fontFamily: 'Pretendard-Regular',
  },
  Nextbutton: {
    width: 400,
    alignItems: 'center',
    padding: 15,
  },
  NextbuttonText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: '#fff',
  },
});
export default Withdrawal;
