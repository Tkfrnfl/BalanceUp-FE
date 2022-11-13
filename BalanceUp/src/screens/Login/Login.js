import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  Platform,
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
// import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";
import NaverLogin, {
  NaverLoginResponse,
  GetProfileResponse,
  NaverLoginRequest,
} from '@react-native-seoul/naver-login';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const signInWithKakao = async (): Promise<void> => {
  const token: KakaoOAuthToken = await login();

  console.log(JSON.stringify(token));
};

const naverLogin = async (): Promise<void> => {
  console.log('dd');
  const token: NaverLoginResponse = await NaverLogin.login(info);
  console.log(token);
};
const googleSigninConfigure = () => {
  GoogleSignin.configure({
    webClientId:
      '702679288927-s3riqhj1pv7uvc4vlnhp5o8823mqjpkh.apps.googleusercontent.com',
  });
};

const onGoogleButtonPress = async () => {
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
};

const signOutWithKakao = async (): Promise<void> => {
  const message = await logout();

  // setResult(message);
};

//   const getKakaoProfile = async (): Promise<void> => {
//     const profile: KakaoProfile = await getProfile();

//     setResult(JSON.stringify(profile));
//   };

const unlinkKakao = async (): Promise<void> => {
  const message = await unlink();

  // setResult(message);
};

const info: NaverLoginRequest = {
  appName: 'keyum',
  consumerKey: 'emLJacIpqC1VGarFjLHx',
  consumerSecret: 'z_Q_8LbpiI',
};

const androidKeys = {
  kConsumerKey: 'emLJacIpqC1VGarFjLHx',
  kConsumerSecret: 'z_Q_8LbpiI',
  kServiceAppName: 'keyum',
};
const appName = 'keyum';
const consumerSecret = 'z_Q_8LbpiI';
const consumerKey = 'emLJacIpqC1VGarFjLHx';
const serviceUrlScheme = 'navertest';
const initials = Platform.OS === 'ios' ? '' : androidKeys;

export default function Login({navigation}) {
  const [success, setSuccessResponse] = React.useState(null);

  // const [failure, setFailureResponse] =
  //   useState<NaverLoginResponse['failureResponse']>();
  const [naverToken, setNaverToken] = React.useState(null);

  React.useEffect(() => {
    googleSigninConfigure();
  });
  // const getNaverUserProfile = async () => {
  //   const profileResult = await getProfile(naverToken.accessToken);
  //   if (profileResult.resultcode === "024") {
  //     Alert.alert("로그인 실패", profileResult.message);
  //     return;
  //   }
  //   console.log("profileResult", profileResult);
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>test555</Text>
      <Button title="네이버 로그인" onPress={naverLogin} />
      <Button title="카카오 로그인" onPress={signInWithKakao} />
      <GoogleSigninButton onPress={() => onGoogleButtonPress()} />
      <Button title="닉네임 설정" onPress={()=>navigation.push('NickName')} />
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
