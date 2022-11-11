import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Button,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {
    KakaoOAuthToken,
    KakaoProfile,
    getProfile as getKakaoProfile,
    login,
    logout,
    unlink,
  } from '@react-native-seoul/kakao-login';


  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();

    setResult(JSON.stringify(token));
  };

  const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();

    setResult(message);
  };

//   const getKakaoProfile = async (): Promise<void> => {
//     const profile: KakaoProfile = await getProfile();

//     setResult(JSON.stringify(profile));
//   };

  const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();

    setResult(message);
  };

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>test555</Text>
      <Button title="로그인" onPress={signInWithKakao} />
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: '#f00'
  },
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
});
