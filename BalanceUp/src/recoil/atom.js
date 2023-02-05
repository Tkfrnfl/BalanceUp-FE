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
  key: 'userRp',
  default: 0,
});

let exerciseState = atom({
  key: 'userRp',
  default: 0,
});

let learningState = atom({
  key: 'userRp',
  default: 0,
});

let mindCareState = atom({
  key: 'userRp',
  default: 0,
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
};
