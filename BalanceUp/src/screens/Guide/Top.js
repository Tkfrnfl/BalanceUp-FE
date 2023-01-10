import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {WithLocalSvg} from 'react-native-svg';
import backArrow from '../../resource/image/Common/backArrow.svg';

export default function Top({navigate}) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigate('Main')} activeOpacity={1.0}>
        <WithLocalSvg style={styles.arrowBtn} asset={backArrow} />
      </TouchableOpacity>
      <View style={styles.topSheet}>
        <Text style={styles.topTitle}>키움만의 성장 포인트</Text>
        <Text style={styles.topText}>
          <Text style={styles.point}>R</Text>
          OUTINE<Text> </Text>
          <Text style={styles.point}>P</Text>
          OINT
        </Text>
        <Text style={styles.subText}>
          내 캐릭터가 성장하는 방법을 알려드릴게요!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  arrowBtn: {
    marginTop: 20,
    marginLeft: 20,
  },
  arrowBtnStyle: {
    marginLeft: 380,
    bottom: 20,
  },
  topSheet: {
    alignItems: 'center',
  },
  topTitle: {
    color: '#232323',
    fontSize: 26,
    fontFamily: 'Pretendard-Bold',
    marginTop: 20,
  },
  point: {
    color: '#585FFF',
    fontFamily: 'Pretendard-Bold',
  },
  topText: {
    color: '#232323',
    fontSize: 26,
    fontFamily: 'Pretendard-Medium',
    marginTop: -3,
  },
  subText: {
    color: '#888888',
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    marginTop: 5,
  },
});
