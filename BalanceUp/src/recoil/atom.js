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

export {nickNameState, userNameState, jwtState, jwtRefreshState};
