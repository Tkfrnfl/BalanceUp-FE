import axios from 'axios';
import {api} from '../utils/Api';
import axiosInstance from '../utils/Client';

const loginKakao = async params => {
  let res;
  await axios
    .get(
      'http://ec2-15-165-88-42.ap-northeast-2.compute.amazonaws.com:8080/login/kakao',
      {
        params: {accessToken: params},
      },
    )
    .then(response => {
      console.log(response.data);
      res = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return res;
};

const loginGoogle = async params => {
  let res;
  await axios
    .get(
      'http://ec2-15-165-88-42.ap-northeast-2.compute.amazonaws.com:8080/login/google',
      {
        params: {accessToken: params},
      },
    )
    .then(response => {
      console.log(response.data);
      res = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return res;
};

const joinKakao = async (userName, nickName) => {
  console.log(userName);
  console.log(nickName);
  let res;
  await axios
    .post(
      'http://ec2-15-165-88-42.ap-northeast-2.compute.amazonaws.com:8080/auth/sign-up/kakao',
      {
        username: userName,
        provider: 'kakao',
        nickname: nickName,
      },
    )
    .then(response => {
      console.log(response.data);
      res = response.data;
    })
    .catch(function (error) {
      console.log(error.response);
    });
  return res;
};

const SignInKakao = async userName => {
  console.log(userName);
  let res;
  await axios
    .post(api + '/auth/sign-in/kakao', {
      username: userName,
      provider: 'kakao',
    })
    .then(response => {
      console.log(response.data);
      res = response.data;
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
  return res;
};

const getRefreshToken = async (userName, token, refreshToken) => {
  let res;
  console.log(userName);
  await axios
    .post(api + '/auth/refresh', {
      username: userName,
      accessToken: token,
      refreshToken: refreshToken,
    })
    .then(response => {
      console.log(response.data);
      res = response.data;
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
  return res;
};

const userWithdraw = async () => {
  await axiosInstance
    .delete('/withdraw')
    .then(response => {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
};

export {
  loginKakao,
  loginGoogle,
  joinKakao,
  SignInKakao,
  getRefreshToken,
  userWithdraw,
};
