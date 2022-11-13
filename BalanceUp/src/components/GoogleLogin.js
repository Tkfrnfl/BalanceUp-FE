import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../Color';

import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Button } from 'react-native';

const SocialSign = styled.TouchableOpacity`
  flex-direction: row;
  width: 70%;
  height: 45px;
  margin: 10px 0px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;
const SocialText = styled.Text`
  color: white;
  font-size: 23px;
  font-family: 'SDChild';
  font-size: 20px;
  padding: 0px 10px;
`;

const GoogleLogin = () => {
  // 구글소셜로그인
  const onGoogleButtonPress = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <>
      <SocialSign
        style={{backgroundColor: colors.BLUE}}
        onPress={() => onGoogleButtonPress()}>
        <Button name="logo-google" size={22} />
        <SocialText>구글계정으로 시작하기</SocialText>
      </SocialSign>
    </>
  );
};
export default GoogleLogin;
