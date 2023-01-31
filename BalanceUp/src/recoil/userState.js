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
      res = res.body;
      let routineList = [];
      for (var i = 0; i < res.length; i++) {
        // 맨끝 날짜 구해서 end date 도 넣어주기
        for (var j = 0; j < res[i].routineDays.length; j++) {
          let tmp = {
            id: res[i].routineId,
            // id: res[i].routineDays[j].id,
            title: res[i].routineTitle,
            category: res[i].routineCategory,
            days: res[i].days,
            alarm: res[i].alarmTime,
            day: res[i].routineDays[j].day,
            completed: res[i].routineDays[j].completed,
          };
          routineList.push(tmp);
        }
      }
      return routineList;
    },
});
export {
  userState,
  routineState,
  routineStateComplete,
  routineStateDays,
  routineStateDaysSet,
};
