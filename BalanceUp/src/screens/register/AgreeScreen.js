import React, {useState} from 'react';
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>약관 동의</Text>
        <BouncyCheckbox
          fillColor="black"
          unfillColor="#FFFFFF"
          text="모두 동의합니다"
        />
        <BouncyCheckbox
          style={{marginTop: 10}}
          fillColor="black"
          unfillColor="#FFFFFF"
          text="[필수] 개인정보 처리 방침"
        />
        <BouncyCheckbox
          style={{marginTop: 10}}
          fillColor="black"
          unfillColor="#FFFFFF"
          text="[필수] 서비스 이용약관"
        />
        <BouncyCheckbox
          style={{marginTop: 10}}
          fillColor="black"
          unfillColor="#FFFFFF"
          text="[필수] 만 14세 이상입니다"
        />
      </View>
      <Progress.Bar progress={1.0} width={350} style={styles.barWrap} />
      <TouchableOpacity style={styles.Nextbutton}>
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
  },
  titleText: {
    fontSize: 30,
  },
  form: {
    flex: 4,
    width: '100%',
    alignItems: 'flex-start',
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

export default AgreeScreen;
