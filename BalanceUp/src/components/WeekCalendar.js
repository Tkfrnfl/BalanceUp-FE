import * as React from 'react';
import {Text, View} from 'react-native';

const WeekCalendar = () => {
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  let day = today.getDay(); // 요일
  return (
    <View>
      <Text>
        {/* {year}년 {month}월 */}dd
      </Text>
    </View>
  );
};

export default WeekCalendar;
