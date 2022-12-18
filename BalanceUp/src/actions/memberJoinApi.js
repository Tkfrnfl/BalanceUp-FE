import axios from 'axios';
import {response} from 'express';
import React, {useState, useEffect} from 'react';

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
    .get(
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
      console.log(error);
    });
  return res;
};

export {loginKakao, loginGoogle, joinKakao};
