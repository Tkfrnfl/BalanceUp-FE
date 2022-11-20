// 중복 확인 부분 임시  API

const duplicationCheckAPI = async userName => {
  let return_value;
  await axios
    .post('전송할 주소', {
      userName: userName,
    })
    .then(response => {
      return_value = response.data;
    })
    .catch(function (error) {
      console.log(error);
      return_value = true;
    });
  return return_value;
};

// response가 존재하면, return_value = response
// response가 존재하지 않으면, return value = true
// (기본값: false)

export default duplicationCheckAPI;