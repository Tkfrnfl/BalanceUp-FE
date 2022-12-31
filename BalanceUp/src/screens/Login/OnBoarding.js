import React, {useState} from 'react';
import {WithLocalSvg} from 'react-native-svg';
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
import testGif from '../../resource/image/testGif.gif';
import jwt_decode from 'jwt-decode';
import KeyumTypo from '../../resource/image/KeyumLOGOTYPO.png';
import OnBoarding_1 from '../../resource/image/Onboarding/onboarding-1.png';
import OnBoarding_2 from '../../resource/image/Onboarding/onboarding-2.png';
import OnBoarding_3 from '../../resource/image/Onboarding/onboarding-3.png';
import NextBtn from '../../resource/image/Onboarding/NextBtn.svg';
import PrevBtn from '../../resource/image/Onboarding/PrevBtn.svg';

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
      img: OnBoarding_1,
      title: '성취감을 느끼며 루틴 형성',
      text: '소소한 성취감을 2주 간 느끼며 \n 자연스러운 루틴형성을 도와드려요',
    },
    {
      id: 2,
      img: OnBoarding_2,
      title: '나만의 루틴으로 캐릭터 성장',
      text: '루틴을 성공할 때마다 얻는 \n RP(Routine Point)로 내 캐릭터를 성장시켜요',
    },
    {
      id: 3,
      img: OnBoarding_3,
      title: '원하는 시간에 알림',
      text: '내가 원하는 시간에 알림을 설정하여 \n 루틴을 잊지 않을 수 있어요',
    },
  ];

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);

  const goLogin = () => {
    navigation.navigate('Login');
  };

  const handleChange = index => {
    if (index === 2) {
      setBtnDisabled(false);
    } else if (index === 0 || 1) {
      setBtnDisabled(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgView}>
        <Image source={KeyumTypo} style={styles.typoStyle} />
      </View>
      <Swiper
        dot={<View style={styles.dotStyle} />}
        activeDot={<View style={styles.activeDotStyle} />}
        loop={false}
        onIndexChanged={index => handleChange(index)}
        nextButton={<WithLocalSvg style={styles.svgStyle} asset={NextBtn} />}
        prevButton={<WithLocalSvg style={styles.svgStyle} asset={PrevBtn} />}
        showsButtons={true}>
        {TextData.map(data => (
          <View style={styles.slide} key={data.id}>
            <FastImage style={styles.onBoardingIMG} source={data.img} />
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.subTitle}>{data.text}</Text>
          </View>
        ))}
      </Swiper>
      <TouchableOpacity
        style={[
          styles.btnStart,
          {backgroundColor: btnDisabled ? '#CED6FF' : '#585FFF'},
        ]}
        onPress={goLogin}
        disabled={btnDisabled}>
        <Text style={styles.btnText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  slide: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imgView: {
    alignItems: 'center',
    marginTop: 90,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  onBoardingIMG: {
    width: 270,
    height: 270,
    marginLeft: 12,
  },
  title: {
    width: '100%',
    color: '#232323',
    textAlign: 'center',
    marginTop: 90,
    fontSize: 22,
    fontWeight: 'bold',
  },
  subTitle: {
    width: '100%',
    color: '#888888',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
  typoStyle: {
    width: 210,
    height: 34,
    marginLeft: 4,
  },
  btnStart: {
    fontWeight: 'bold',
    padding: 15,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  dotStyle: {
    backgroundColor: '#888888',
    width: 9,
    height: 9,
    borderRadius: 10,
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 190,
  },
  activeDotStyle: {
    backgroundColor: '#232323',
    width: 25,
    height: 9,
    borderRadius: 10,
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 190,
  },
  svgStyle: {
    width: 48,
    height: 48,
    marginBottom: 270,
  },
});
