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
  Image,
  Platform,
} from 'react-native';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import FastImage from 'react-native-fast-image';
import auth from '@react-native-firebase/auth';
import {loginKakao} from '../../actions/memberJoinApi';
import {userNameState} from '../../recoil/atom';
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from 'recoil';

import KeyumTypo from '../../resource/image/KeyumLOGOTYPO_1.png';
import testGif from '../../resource/image/testGif.gif';
import {response} from 'express/lib/express';

// const naverLogin = async (): Promise<void> => {
//   console.log('dd');
//   const token: NaverLoginResponse = await NaverLogin.login(info);
//   console.log(token);
// };
const googleSigninConfigure = () => {
  GoogleSignin.configure({
    webClientId:
      '702679288927-s3riqhj1pv7uvc4vlnhp5o8823mqjpkh.apps.googleusercontent.com',
  });
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

const androidKeys = {
  kConsumerKey: 'emLJacIpqC1VGarFjLHx',
  kConsumerSecret: 'z_Q_8LbpiI',
  kServiceAppName: 'keyum',
}; // 추후에 process.env로 빼기

export default function Login({navigation}) {
  React.useEffect(() => {
    googleSigninConfigure();
  });
 // const [login, setLoginState] = React.useState(0);
 const [userName, setUserName] = useRecoilState(userNameState);

  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await loginWithKakaoAccount();

    console.log(token.accessToken);
    let res;
    await loginKakao(token.accessToken).then(response => {
      res = response;
      console.log(res.body);
      if (res.body.login === 'sign-up') {
        setUserName(res.body.username);
        navigation.push('NickName');
      } else if (res.body.login === 'sign-in') {
        navigation.push('Main');
      }
    });

  };

  const onGoogleButtonPress = async (): Promise<void> => {
    const {idToken} = await GoogleSignin.signIn();
    const code = await GoogleSignin.getTokens();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log(code);
  
    return auth().signInWithCredential(googleCredential);
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.imgView}>
        <Image source={KeyumTypo} />
      </View>
      <FastImage // 임시 GIF
        style={{width: 250, height: 250}}
        source={testGif}
      />

      <TouchableOpacity onPress={signInWithKakao} style={styles.btnKakao}>
        <Text style={styles.btnText}>카카오로 시작하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnGoogle}
        onPress={() => onGoogleButtonPress()}>
        <Text style={styles.btnText}>구글로 시작하기</Text>
      </TouchableOpacity>
      <Button
        title="닉네임 설정 (임시 구현)"
        onPress={() => navigation.push('NickName')}
      />
      <Button
        title="홈 화면으로 가기 (임시 구현)"
        onPress={() => navigation.push('Main')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    width: '100%',
    fontSize: 70,
    textAlign: 'center',
  },
  imgView: {
    flexDirection: 'row',
    marginTop: 60,
    marginBottom: 40,
  },
  btnKakao: {
    backgroundColor: '#FFF62B',
    fontWeight: 'bold',
    padding: 10,
    margin: 15,
    marginTop: 50,
    width: '60%',
    borderRadius: 10,
  },
  btnGoogle: {
    backgroundColor: '#E4E4E4',
    fontWeight: 'bold',
    padding: 10,
    margin: 15,
    marginTop: 30,
    width: '60%',
    borderRadius: 10,
  },
  btnText: {
    color: '#000',
    fontSize: 15,
    textAlign: 'center',
  },
});
