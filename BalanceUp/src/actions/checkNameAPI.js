import axios from 'axios';
import {api} from '../utils/Api';

const duplicationCheckAPI = async userName => {
  let return_value;
  await axios
    .post(api + '/user/nickname', {
      nickname: userName,
    })
    .then(response => {
      console.log(response.data);
      return_value = response.data;
    })
    .catch(function (error) {
      console.log(error);
      return_value = false;
    });
  return return_value;
};

const ChangeNameAPI = async (userName, token) => {
  let return_value;
  await axios
    .put(api + '/user/nickname', {
      nickname: userName,
      token: token,
    })
    .then(response => {
      console.log(response.data);
      return_value = response.data;
    })
    .catch(function (error) {
      console.log(error);
      return_value = false;
    });
  return return_value;
};

export {duplicationCheckAPI, ChangeNameAPI};
