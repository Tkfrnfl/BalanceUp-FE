// Text 형식 확인
// 한글 - (초성 불가능)
// 숫자 - 가능
// 영어 - 가능
// 특수문자 - 불가능
export const validateText = text => {
  const regex = /^[|가-힣|a-z|A-Z|0-9|]*$/;
  return regex.test(text);
};

// 공백 제거
export const removeWhitespace = text => {
  const regex = /\s/g;
  return text.replace(regex, '');
};
