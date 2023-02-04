import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import commonStyles from '../../css/commonStyles';
import OnHome from '../../resource/image/BottomTab/home_on.svg';
import OffHome from '../../resource/image/BottomTab/home_off.svg';
import OnSet from '../../resource/image/BottomTab/setTodo_on.svg';
import OffSet from '../../resource/image/BottomTab/setTodo_off.svg';
import OnCheck from '../../resource/image/BottomTab/checkTodo_on.svg';
import OffCheck from '../../resource/image/BottomTab/checkTodo_off.svg';
import OnMy from '../../resource/image/BottomTab/my_on.svg';
import OffMy from '../../resource/image/BottomTab/my_off.svg';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';

const bottomData = [
  {
    id: 1,
    title: '홈',
    go: 'Main',
    onImg: OnHome,
    offImg: OffHome,
  },
  {
    id: 2,
    title: '루틴설정',
    go: 'Set',
    onImg: OnSet,
    offImg: OffSet,
  },
  {
    id: 3,
    title: '루틴확인',
    go: 'LookAll',
    onImg: OnCheck,
    offImg: OffCheck,
  },
  {
    id: 4,
    title: 'MY',
    go: 'MyPage',
    onImg: OnMy,
    offImg: OffMy,
  },
];
function HomeBottomTab({navigate}) {
  return (
    <View style={commonStyles.bottomTabSheet}>
      {bottomData.map(data => (
        <TouchableOpacity
          key={data.id}
          activeOpacity={1.0}
          onPress={() => navigate(data.go)}>
          {data.id === 1 ? <data.onImg /> : <data.offImg />}
          <Text
            style={[
              commonStyles.commonText,
              {color: data.id === 1 ? '#585FFF' : '#888888'},
              {left: data.id === 1 ? responsiveScreenWidth(3) : null},
              {right: data.id === 4 ? responsiveScreenWidth(-1.9) : 2},
            ]}>
            {data.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
function SetBottomTab({navigate}) {
  return (
    <View style={commonStyles.bottomTabSheet}>
      {bottomData.map(data => (
        <TouchableOpacity
          key={data.id}
          activeOpacity={1.0}
          onPress={() => navigate(data.go)}>
          {data.id === 2 ? <data.onImg /> : <data.offImg />}
          <Text
            style={[
              commonStyles.commonText,
              {color: data.id === 2 ? '#585FFF' : '#888888'},
              {left: data.id === 1 ? responsiveScreenWidth(3) : null},
              {right: data.id === 4 ? responsiveScreenWidth(-1.9) : 3},
            ]}>
            {data.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
function CheckBottomTab({navigate}) {
  return (
    <View style={commonStyles.bottomTabSheet}>
      {bottomData.map(data => (
        <TouchableOpacity
          key={data.id}
          activeOpacity={1.0}
          onPress={() => navigate(data.go)}
          style={{marginLeft: 2}}>
          {data.id === 3 ? <data.onImg /> : <data.offImg />}
          <Text
            style={[
              commonStyles.commonText,
              {color: data.id === 3 ? '#585FFF' : '#888888'},
              {left: data.id === 1 ? responsiveScreenWidth(3) : null},
              {right: data.id === 4 ? responsiveScreenWidth(-1.9) : 3},
            ]}>
            {data.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function MyBottomTab({navigate}) {
  return (
    <View style={commonStyles.bottomTabSheet}>
      {bottomData.map(data => (
        <TouchableOpacity
          key={data.id}
          activeOpacity={1.0}
          onPress={() => navigate(data.go)}>
          {data.id === 4 ? <data.onImg /> : <data.offImg />}
          <Text
            style={[
              commonStyles.commonText,
              {color: data.id === 4 ? '#585FFF' : '#888888'},
              {left: data.id === 1 ? responsiveScreenWidth(3) : null},
              {right: data.id === 4 ? responsiveScreenWidth(-1.9) : 3},
            ]}>
            {data.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export {HomeBottomTab, SetBottomTab, CheckBottomTab, MyBottomTab};
