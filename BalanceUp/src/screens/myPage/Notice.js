import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import BackArrow from '../../resource/image/Common/backArrow.svg';

const Notice = ({navigation: {navigate}}) => {
  const noticeData = [
    {
      id: 1,
      title: '새해가 밝았습니다!',
      date: '2023. 01. 01',
    },
    {
      id: 2,
      title: '안녕하세요, KEYUM 입니다.',
      date: '2022. 12. 31',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.topSheet}>
        <TouchableOpacity
          onPress={() => navigate('MyPage')}
          activeOpacity={1.0}>
          <BackArrow style={styles.arrowBtn} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>공지사항</Text>
      </View>
      {noticeData.map(data => (
        <TouchableOpacity key={data.id} activeOpacity={0.5}>
          <View
            style={[
              styles.noticeSheet,
              {borderBottomWidth: data.id === 1 ? 1 : null},
            ]}>
            <Text style={styles.noticeText}>{data.title}</Text>
            <Text style={styles.infoText}>{data.date}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  topSheet: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  topTitle: {
    color: '#232323',
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    marginTop: 20,
    marginLeft: 100,
  },
  arrowBtn: {
    marginTop: 20,
    marginLeft: 20,
  },
  arrowBtnStyle: {
    marginLeft: 380,
    bottom: 20,
  },
  noticeSheet: {
    width: 400,
    height: 110,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  noticeText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    marginLeft: 30,
    marginTop: 35,
  },
  infoText: {
    color: '#888888',
    fontSize: 12,
    fontFamily: 'Pretendard-Light',
    marginLeft: 30,
    marginTop: 10,
  },
});
export default Notice;
