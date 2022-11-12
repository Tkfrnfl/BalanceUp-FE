import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import * as Progress from 'react-native-progress';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const AgreeScreen = ({navigation}) => {
  const [disabled, setDisabled] = useState(false);
  const [allCheck, setAllCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [serviceCheck, setServiceCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);

  const allBtnEvent = () => {
    console.log('allCheck : ', allCheck);
    // console.log('useCheck : ', useCheck);
    // console.log('serviceCheck : ', serviceCheck);
    // console.log('ageCheck : ', ageCheck);
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>약관 동의</Text>
        <BouncyCheckbox
          fillColor="#99d5ff"
          unfillColor="#99d5ff"
          text="모두 동의합니다"
          textStyle={{textDecorationLine: 'none'}}
          onPress={allBtnEvent}
        />
        <View style={styles.buttonGo}>
          <BouncyCheckbox
            style={{marginTop: 10}}
            fillColor="#99d5ff"
            unfillColor="#99d5ff"
            text="[필수] 개인정보 처리 방침"
            textStyle={{textDecorationLine: 'none'}}
            onPress={useBtnEvent}
          />
          <TouchableOpacity onPress={useInfo}>
            <Text style={styles.agreeText}> [더보기]</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonGo}>
          <BouncyCheckbox
            style={{marginTop: 10}}
            fillColor="#99d5ff"
            unfillColor="#99d5ff"
            text="[필수] 서비스 이용 약관"
            textStyle={{textDecorationLine: 'none'}}
            onPress={serviceBtnEvent}
          />
          <TouchableOpacity onPress={serviceInfo}>
            <Text style={styles.agreeText}> [더보기]</Text>
          </TouchableOpacity>
        </View>
        <BouncyCheckbox
          style={{marginTop: 10}}
          fillColor="#99d5ff"
          unfillColor="#99d5ff"
          text="[필수] 만 14세 이상입니다"
          textStyle={{textDecorationLine: 'none'}}
          onPress={ageBtnEvent}
        />
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
          {backgroundColor: disabled ? '#d3eaf2' : '#9ce4ff'},
        ]}
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
    width: '100%',
    height: '15%',
    fontSize: 35,
    justifyContent: 'center',
    color: 'black',
    fontWeight: 'bold',
    marginTop: 20,
  },
  agreeText: {
    fontSize: 15,
    marginTop: 10,
    color: 'black',
  },
  form: {
    flex: 4,
    width: '100%',
    alignItems: 'flex-start',
  },
  buttonGo: {
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
