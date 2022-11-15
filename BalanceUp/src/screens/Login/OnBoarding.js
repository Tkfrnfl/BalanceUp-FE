import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Button,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';

import KeyumIcon from '../../resource/image/KeyumEmoticon.png';
import KeyumTypo from '../../resource/image/KeyumLOGOTYPO_1.png';
import testGif from '../../resource/image/testGif.gif';

export default function OnBoarding({navigation}) {
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        dot={
          <View
            style={{
              backgroundColor: '#a3a3a3',
              width: 15,
              height: 15,
              borderRadius: 10,
              marginLeft: 7,
              marginRight: 7,
              marginBottom: 80,
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: '#0a0a0a',
              width: 15,
              height: 15,
              borderRadius: 10,
              marginLeft: 7,
              marginRight: 7,
              marginBottom: 80,
            }}
          />
        }
        loop={false}>
        <View style={styles.slide}>
          <View style={styles.imgView}>
            <Image source={KeyumIcon} />
            <Image source={KeyumTypo} />
          </View>
          <FastImage // 임시 GIF
            style={{width: 250, height: 250}}
            source={testGif}
          />
          <Text style={styles.title}>성취감을 느끼며 루틴 형성</Text>
          <Text style={styles.subTitle}>
            소소한 성취감을 2주 간 느끼며 {'\n'} 자연스러운 루틴형성을
            도와드려요
          </Text>
        </View>
        <View style={styles.slide}>
          <View style={styles.imgView}>
            <Image source={KeyumIcon} />
            <Image source={KeyumTypo} />
          </View>
          <FastImage // 임시 GIF
            style={{width: 250, height: 250}}
            source={testGif}
          />
          <Text style={styles.title}>캐릭터와 같이 성장</Text>
          <Text style={styles.subTitle}>
            루틴 성공 시 설정 한 카테고리에 맞는 {'\n'} 캐릭터 능력치가
            성장해요!
          </Text>
        </View>
        <View style={styles.slide}>
          <View style={styles.imgView}>
            <Image source={KeyumIcon} />
            <Image source={KeyumTypo} />
          </View>
          <FastImage // 임시 GIF
            style={{width: 250, height: 250}}
            source={testGif}
          />
          <Text style={styles.title}>원하는 시간에 알림</Text>
          <Text style={styles.subTitle}>
            내가 원하는 시간에 알림을 보내 {'\n'} 루틴을 잊지 않을 수 있어요
          </Text>
          <TouchableOpacity
            onPress={() => navigation.push('Login')}
            style={styles.btnStart}>
            <Text style={styles.btnText}>시작하기</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
  },
  slide: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  imgView: {
    flexDirection: 'row',
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    width: '100%',
    color: '#0a0a0a',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 30,
  },
  subTitle: {
    width: '100%',
    color: '#0a0a0a',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
  },
  btnStart: {
    backgroundColor: '#00D1FF',
    fontWeight: 'bold',
    padding: 10,
    margin: 15,
    marginTop: 80,
    width: '60%',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
  },
});
