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
      console.log(response.data);
      return_value = true;
    })
    .catch(function (error) {
      console.log(error);
      return_value = false;
    });
  return return_value;
};

// response가 존재하면, return_value = response
// response가 존재하지 않으면, return value = true
// (기본값: false)

export default duplicationCheckAPI;
