import axios from 'axios';
import {api} from '../utils/Api';

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

const ChangeNameAPI = async (userName, token) => {
  let return_value;
  await axios
    .put(
      api + '/user/nickname',
      {
        nickname: userName,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    )
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
