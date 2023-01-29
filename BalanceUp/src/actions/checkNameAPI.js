import axios from 'axios';
import {api} from '../utils/Api';
import axiosInstance from '../utils/Client';

const duplicationCheckAPI = async userName => {
  let return_value;
  await axios
    .get(api + '/nicknames', {
      params: {
        nickname: userName,
      },
    })
    .then(response => {
      console.log(response.data);
      return_value = true;
    })
    .catch(function (error) {
      console.log(error.response.data);
      return_value = false;
    });
  console.log(return_value);
  return return_value;
};

const ChangeNameAPI = async userName => {
  let return_value;
  await axiosInstance
    .put('/user/nickname', {
      nickname: userName,
    })
    .then(response => {
      console.log(response.data);
      return_value = true;
    })
    .catch(function (error) {
      console.log(error.response.data);
      return_value = false;
    });
  console.log(return_value);
  return return_value;
};

export {duplicationCheckAPI, ChangeNameAPI};
