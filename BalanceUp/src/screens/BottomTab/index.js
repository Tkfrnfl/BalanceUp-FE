import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import commonStyles from '../../css/commonStyles';
import {WithLocalSvg} from 'react-native-svg';
import onHome from '../../resource/image/BottomTab/home_on.svg';
import offHome from '../../resource/image/BottomTab/home_off.svg';
import onSet from '../../resource/image/BottomTab/setTodo_on.svg';
import offSet from '../../resource/image/BottomTab/setTodo_off.svg';
import onCheck from '../../resource/image/BottomTab/checkTodo_on.svg';
import offCheck from '../../resource/image/BottomTab/checkTodo_off.svg';
import onMy from '../../resource/image/BottomTab/my_on.svg';
import offMy from '../../resource/image/BottomTab/my_off.svg';

const bottomData = [
  {
    id: 1,
    title: '      홈',
    go: 'Main',
    onImg: onHome,
    offImg: offHome,
  },
  {
    id: 2,
    title: '루틴설정',
    go: 'Set',
    onImg: onSet,
    offImg: offSet,
  },
  {
    id: 3,
    title: '루틴확인',
    go: 'LookAll',
    onImg: onCheck,
    offImg: offCheck,
  },
  {
    id: 4,
    title: '    MY',
    go: 'MyPage',
    onImg: onMy,
    offImg: offMy,
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
          {data.id === 1 ? (
            <WithLocalSvg asset={data.onImg} style={commonStyles.tabSvg} />
          ) : (
            <WithLocalSvg asset={data.offImg} style={commonStyles.tabSvg} />
          )}
          <Text
            style={[
              commonStyles.commonText,
              {color: data.id === 1 ? '#585FFF' : null},
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
          {data.id === 2 ? (
            <WithLocalSvg asset={data.onImg} style={commonStyles.tabSvg} />
          ) : (
            <WithLocalSvg asset={data.offImg} style={commonStyles.tabSvg} />
          )}
          <Text
            style={[
              commonStyles.commonText,
              {color: data.id === 2 ? '#585FFF' : null},
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
    <View style={[commonStyles.bottomTabSheet, commonStyles.bottomTabSheet2]}>
      {bottomData.map(data => (
        <TouchableOpacity
          key={data.id}
          activeOpacity={1.0}
          onPress={() => navigate(data.go)}>
          {data.id === 3 ? (
            <WithLocalSvg asset={data.onImg} style={commonStyles.tabSvg} />
          ) : (
            <WithLocalSvg asset={data.offImg} style={commonStyles.tabSvg} />
          )}
          <Text
            style={[
              commonStyles.commonText,
              {color: data.id === 3 ? '#585FFF' : null},
              {marginLeft: 60},
              ,
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
          {data.id === 4 ? (
            <WithLocalSvg asset={data.onImg} style={commonStyles.tabSvg} />
          ) : (
            <WithLocalSvg asset={data.offImg} style={commonStyles.tabSvg} />
          )}
          <Text
            style={[
              commonStyles.commonText,
              {color: data.id === 4 ? '#585FFF' : null},
            ]}>
            {data.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export {HomeBottomTab, SetBottomTab, CheckBottomTab, MyBottomTab};
