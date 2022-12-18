import axios from 'axios';

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
      console.log(response.data);
      // 테스트를 위해 임의로 true로 설정해둔 코드
      return_value = true;
    })
    .catch(function (error) {
      console.log(error);
      return_value = true;
    });
  return return_value;
};

export default ChangeNameAPI;
