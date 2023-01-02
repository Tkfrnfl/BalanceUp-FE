import axios from 'axios';

const duplicationCheckAPI = async userName => {
  let return_value;
  await axios
    .post(
      'http://ec2-15-165-88-42.ap-northeast-2.compute.amazonaws.com:8080/user/nickname',
      {
        nickname: userName,
      },
    )
    .then(response => {
      return_value = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return return_value;
};

const ChangeNameAPI = async userName => {
  let return_value;
  await axios
    .put(
      'http://ec2-15-165-88-42.ap-northeast-2.compute.amazonaws.com:8080/user/nickname',
      {
        nickname: userName,
        token: token, // 임시
      },
    )
    .then(response => {
      return_value = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return return_value;
};

export {duplicationCheckAPI, ChangeNameAPI};
