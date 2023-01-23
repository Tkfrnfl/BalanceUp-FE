import {atom} from 'recoil';

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
export {userState, routineState, routineStateComplete, routineStateDays};
