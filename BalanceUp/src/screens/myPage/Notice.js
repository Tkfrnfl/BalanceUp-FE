import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {WithLocalSvg} from 'react-native-svg';

import backArrow from '../../resource/image/Common/backArrow.svg';
import moreInfoArrow from '../../resource/image/Agree/moreInfoArrow.svg';

const Notice = ({navigation: {navigate}}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSheet}>
        <TouchableOpacity
          onPress={() => navigate('MyPage')}
          activeOpacity={1.0}>
          <WithLocalSvg style={styles.arrowBtn} asset={backArrow} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>공지사항</Text>
      </View>
      <View style={styles.noticeSheet}>
        <Text style={styles.noticeText}>새해가 밝았습니다!</Text>
        <WithLocalSvg
          asset={moreInfoArrow}
          style={[styles.arrowBtnStyle, {right: 18}]}
        />
        <Text style={styles.infoText}>2023. 01. 01</Text>
      </View>
      <View style={[styles.noticeSheet, {borderBottomWidth: 0}]}>
        <Text style={styles.noticeText}>안녕하세요, KEYUM 입니다.</Text>
        <WithLocalSvg
          asset={moreInfoArrow}
          style={[styles.arrowBtnStyle, {right: 18}]}
        />
        <Text style={styles.infoText}>2022. 12. 31</Text>
      </View>
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
    fontFamily: 'Pretendard-Regular',
    marginLeft: 30,
    marginTop: -5,
  },
});
export default Notice;
