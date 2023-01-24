import {atom} from 'recoil';

let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); // 날짜
let tmpMonth = ('0' + month).slice(-2); // 오늘 제외
let tmpDate = ('0' + date).slice(-2);
let tmpToday = year + '-' + tmpMonth + '-' + tmpDate;

let dateState = atom({
  key: 'dateState',
  default: tmpToday,
});
export {dateState};
