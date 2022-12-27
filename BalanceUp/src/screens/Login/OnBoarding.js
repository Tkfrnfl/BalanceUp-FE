import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from 'recoil';

import {getRefreshToken} from '../../actions/memberJoinApi';
import {
  nickNameState,
  userNameState,
  jwtState,
  jwtRefreshState,
} from '../../recoil/atom';

import KeyumIcon from '../../resource/image/KeyumEmoticon.png';
import KeyumTypo from '../../resource/image/KeyumLOGOTYPO_1.png';
import testGif from '../../resource/image/testGif.gif';
import jwt_decode from 'jwt-decode';

export default function OnBoarding({navigation}) {
  const [jwt, setjwt] = useRecoilState(jwtState);
  const [jwtRefresh, setJwtRefresh] = useRecoilState(jwtRefreshState);

  React.useEffect(() => {
    checkJwt('jwt');
  }, []);
  const getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        const data = JSON.parse(value);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkJwt = async (key: string) => {
    try {
      const dataToken = await getData('jwt');
      const dataRefreshToekn = await getData('jwtRefresh');

      // jwt 체크후 있으면 main화면으로 이동하며 토큰 재발급
      if (dataToken !== null) {
        const decodeUserName = jwt_decode(dataToken);
        let res;

        await getRefreshToken(
          decodeUserName.username,
          dataToken,
          dataRefreshToekn,
        ).then(response => {
          res = response;

          if (res.resultCode === 'success') {
            // jwt 로컬 스토리지 저장후 메인화면 보내기
            console.log(res.body.refreshToken);
            setjwt(res.body.token);
            setJwtRefresh(res.body.refreshToken);

            AsyncStorage.setItem('jwt', JSON.stringify(res.body.token));
            AsyncStorage.setItem(
              'jwtRefresh',
              JSON.stringify(res.body.refreshToken),
            );
            navigation.push('Main');
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const TextData = [
    {
      id: 1,
      title: '성취감을 느끼며 루틴 형성',
      text: '소소한 성취감을 2주 간 느끼며 \n 자연스러운 루틴형성을 도와드려요',
    },
    {
      id: 2,
      title: '캐릭터와 같이 성장',
      text: '루틴 성공 시 설정 한 카테고리에 맞는 \n 캐릭터 능력치가 성장해요!',
    },
    {
      id: 3,
      title: '원하는 시간에 알림',
      text: '내가 원하는 시간에 알림을 보내 \n 루틴을 잊지 않을 수 있어요',
    },
  ];

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        dot={<View style={styles.dotStyle} />}
        activeDot={<View style={styles.activeDotStyle} />}
        loop={false}
        showsButtons={true}>
        <View style={styles.slide}>
          <View style={styles.imgView}>
            <Image source={KeyumIcon} />
            <Image source={KeyumTypo} />
          </View>
          <FastImage // 임시 GIF
            style={{width: 250, height: 250}}
            source={testGif}
          />
          <Text style={styles.title}>{TextData[0].title}</Text>
          <Text style={styles.subTitle}>{TextData[0].text}</Text>
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
          <Text style={styles.title}>{TextData[1].title}</Text>
          <Text style={styles.subTitle}>{TextData[1].text}</Text>
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
          <Text style={styles.title}>{TextData[2].title}</Text>
          <Text style={styles.subTitle}>{TextData[2].text}</Text>
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
    width: '60%',
    marginTop: 70,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
  },
  dotStyle: {
    backgroundColor: '#c9eeff',
    width: 15,
    height: 15,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 80,
  },
  activeDotStyle: {
    backgroundColor: '#5dccff',
    width: 30,
    height: 15,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 80,
  },
});
