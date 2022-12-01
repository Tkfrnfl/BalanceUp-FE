import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import CheckBox from '@react-native-community/checkbox';

const Withdrawal = ({navigation}) => {
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

  const goBack = () => {
    navigation.navigate('MyPage');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSheet}>
        <TouchableOpacity onPress={goBack}>
          {/* 임시 디자인 버튼 */}
          <Text style={styles.arrowBtn}>⬅</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>회원탈퇴</Text>
      </View>
      <Shadow distance={7}>
        <View style={styles.nameSheet}>
          <Text style={styles.nameText}>
            회원탈퇴 유의사항을 확인해 주세요.
          </Text>
          <View style={styles.infoSheet}>
            <Text style={styles.infoText}>
              ☑️ 루틴기록, 캐릭터 성장을 포함하여
            </Text>
            <Text style={styles.info_Text}>
              회원님이 설정한 정보가 모두 삭제됩니다.
            </Text>
            <Text style={styles.infoText}>
              ☑️ 삭제된 데이터는 복구되지 않습니다.
            </Text>
          </View>
        </View>
      </Shadow>
      <View style={styles.agreeSheet}>
        <CheckBox
          value={useCheck}
          onValueChange={useBtnEvent}
          tintColors={{true: '#525151'}}
        />
        <Text style={styles.agreeText}>위 내용에 동의하고 탈퇴하겠습니다.</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.Nextbutton,
          {backgroundColor: disabled ? '#979797' : '#CB0707'},
        ]}
        disabled={disabled}>
        <Text style={styles.NextbuttonText}>탈퇴하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  topSheet: {
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  topTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  arrowBtn: {
    marginRight: 100,
    marginBottom: 25,
    fontSize: 60,
    fontWeight: 'bold',
    color: '#000',
  },
  nameSheet: {
    backgroundColor: '#FAFAFA',
    width: 400,
    height: 250,
  },
  nameText: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 50,
    marginTop: 45,
  },
  infoText: {
    color: '#000',
    fontWeight: '300',
    marginLeft: 50,
    marginTop: 25,
  },
  info_Text: {
    color: '#000',
    fontWeight: '300',
    marginLeft: 70,
  },
  agreeSheet: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  agreeText: {
    marginTop: 5,
    color: '#000',
    fontWeight: '500',
  },
  Nextbutton: {
    width: '50%',
    alignItems: 'center',
    borderRadius: 15,
    padding: 10,
    marginTop: 30,
    marginLeft: 100,
  },
  NextbuttonText: {
    fontSize: 20,
    color: '#fff',
  },
});
export default Withdrawal;
