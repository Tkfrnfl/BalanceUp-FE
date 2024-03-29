import {
  atom,
  selector,
  selectorFamily,
  useRecoilState,
  useSetRecoilState,
} from 'recoil';
import {getAllRoutine} from '../actions/routineAPI';
import {routineStateNum} from './appState';

interface User {
  userId: String;
}

interface Routine {
  routineId: String;
  routineTitle: String;
  routineCategory: String;
  days: String;
  alarmTime: String;
  completed: Boolean;
  routineDays: {
    id: String,
    day: String,
    completed: Boolean,
  };
}

let userState = atom({
  key: 'userState',
  default: '',
});
let routineState = atom({
  key: 'routineState',
  default: [0, 0, 0, 0],
});
let routineStateComplete = atom({
  key: 'routineStateComplete',
  default: [0, 0, 0, 0],
});

let routineStateDays = atom({
  key: 'routineStateDays',
  default: [],
});

let alarmChanged = atom({
  key: 'alarmChanged',
  default: 0,
});

// const useRefreshRoutine = num => {
//   const setNum = useSetRecoilState(routineStateNum);
//   return () => setNum(id => id + 1);
// };

let routineStateDaysSet = selectorFamily({
  key: 'routineStateDaysSet',
  get:
    (token, num) =>
    async ({get}) => {
      get(routineStateNum);
      let res = await getAllRoutine(token).then(res => {
        return res;
      });
      if (res === undefined) {
        // 초기 생성시 body null err처리
        res = {};
        res.body = [];
      }
      res = res.body;
      let routineList = [];
      let dayList = [[], [], [], []];
      for (var i = 0; i < res.length; i++) {
        // 맨끝 날짜 구해서 end date 도 넣어주기
        for (var j = 0; j < res[i].routineDays.length; j++) {
          dayList[i].push(res[i].routineDays[j].day);
          let tmp = {
            routineId: res[i].routineId,
            // id: res[i].routineDays[j].id,
            routineTitle: res[i].routineTitle,
            routineCategory: res[i].routineCategory,
            days: res[i].days,
            alarmTime: res[i].alarmTime,
            day: res[i].routineDays[j].day,
            completed: res[i].routineDays[j].completed,
            endDate: dayList[i],
          };
          routineList.push(tmp);
        }
      }
      // 맨 마지막에 전체 res.body 담아보내기
      routineList.push(res);
      return routineList;
    },
});
export {
  userState,
  routineState,
  routineStateComplete,
  routineStateDays,
  routineStateDaysSet,
  alarmChanged,
};
