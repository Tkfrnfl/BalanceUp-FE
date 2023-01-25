import axios from '../utils/Client';

const createRoutine = async (
  todoText,
  planText,
  dayText,
  alertHour,
  alertMin,
) => {
  let res;
  await axios
    .post('/routine', {
      routineTitle: todoText,
      routineCategory: planText,
      days: dayText.join(''),
      alarmTime: `${alertHour}:${alertMin}`,
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

const deleteRoutine = async routineId => {
  let res;
  await axios
    .delete('/routine', {
      data: {
        routineId: routineId,
      },
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

const modifyRoutine = async (
  routineId,
  todoText,
  dayText,
  alertHour,
  alertMin,
) => {
  let res;
  await axios
    .put('/routine', {
      routineId: routineId,
      routineTitle: todoText,
      days: dayText.join(''),
      alarmTime: `${alertHour}:${alertMin}`,
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

const getAllRoutine = async () => {
  let res;
  await axios
    .get('/routines')
    .then(response => {
      console.log(response.data);
      res = response.data;
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
  return res;
};

export {createRoutine, deleteRoutine, modifyRoutine, getAllRoutine};
