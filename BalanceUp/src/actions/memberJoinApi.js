import axios from 'axios';
import {api} from '../utils/Api';
import axiosInstance from '../utils/Client';

const loginKakao = async params => {
  let res;
  console.log(params);
  await axios
    .get('https://api.keyum.co.kr/login/kakao', {
      params: {accessToken: String(params)},
      withCredentials: true,
    })
    .then(response => {
      console.log(response);
      res = response.data;
    })
    .catch(function (error) {
      console.log(error.message);
    });
  return res;
};
// const loginKakao = async params => {
//   let tmp = 'accessToken' + '=' + String(params);

//   fetch('https://api.keyum.co.kr/login/kakao?' + tmp, {
//     method: 'GET',
//     credentials: 'include',
//   })
//     .then(res => console.log(res))
//     .catch(err => console.log(err));
// };

const loginGoogle = async params => {
  let res;
  await axios
    .get('https://api.keyum.co.kr/login/google', {
      params: {accessToken: params},
    })
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
    .post('https://api.keyum.co.kr/auth/sign-up/kakao', {
      username: userName,
      provider: 'kakao',
      nickname: nickName,
    })
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
