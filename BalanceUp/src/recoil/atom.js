// atom.js
import {atom} from 'recoil';

let nickNameState = atom({
  key: 'nickName',
  default: '',
});

let userNameState = atom({
  key: 'userName',
  default: '',
});

let jwtState = atom({
  key: 'jwt',
  default: '',
});

let jwtRefreshState = atom({
  key: 'jwtRefresh',
  default: '',
});

let userRpState = atom({
  key: 'userRp',
  default: 0,
});

let dailyState = atom({
  key: 'daily',
  default: 0,
});

let exerciseState = atom({
  key: 'exercise',
  default: 0,
});

let learningState = atom({
  key: 'learning',
  default: 0,
});

let mindCareState = atom({
  key: 'mindCare',
  default: 0,
});

let userLogin = atom({
  key: 'userLogin',
  default: '',
});

let show = atom({
  key: 'show',
  default: true,
});

export {
  dailyState,
  exerciseState,
  learningState,
  mindCareState,
  userRpState,
  nickNameState,
  userNameState,
  jwtState,
  jwtRefreshState,
  userLogin,
  show,
};
