import axios from 'axios';
import {api} from '../utils/Api';

const createRoutine = async (
  token,
  todoText,
  planText,
  dayText,
  alertHour,
  alertMin,
) => {
  let res;
  await axios
    .post(
      api + '/routine',
      {
        routineTitle: todoText,
        routineCategory: planText,
        days: dayText.join(''),
        alarmTime: `${alertHour}:${alertMin}`,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    )
    .then(response => {
      console.log(response.data);
      res = response.data;
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
  return res;
};

const deleteRoutine = async (token, routineId) => {
  let res;
  await axios
    .delete(
      api + '/routine',
      {
        routineId: routineId,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    )
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
  token,
  routineId,
  routineTitle,
  days,
  alarmTime,
) => {
  let res;
  await axios
    .put(
      api + '/routine',
      {
        routineId: routineId,
        routineTitle: routineTitle,
        days: days,
        alarmTime: alarmTime,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    )
    .then(response => {
      console.log(response.data);
      res = response.data;
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
  return res;
};

export {createRoutine, deleteRoutine, modifyRoutine};
