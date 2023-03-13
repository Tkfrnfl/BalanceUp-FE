import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil';
import FastImage from 'react-native-fast-image';
import {getRefreshToken} from '../../actions/memberJoinApi';
import {deleteExpiredRoutine} from '../../actions/routineAPI';
import {jwtState, jwtRefreshState} from '../../recoil/atom';

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
        await deleteExpiredRoutine();
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

  const [btnDisabled, setBtnDisabled] = useState(true);
  const TextData = [
    {
      id: 1,
      img: OnBoarding_1,
      title: '성취감을 느끼며 루틴 형성',
      text1: '소소한 성취감을 2주 간 느끼며',
      text2: '자연스러운 루틴형성을 도와드려요',
    },
    {
      id: 2,
      img: OnBoarding_2,
      title: '나만의 루틴으로 캐릭터 성장',
      text1: '루틴을 성공할 때마다 얻는',
      text2: 'RP(Routine Point)로 내 캐릭터를 성장시켜요',
    },
    {
      id: 3,
      img: OnBoarding_3,
      title: '원하는 시간에 알림',
      text1: '내가 원하는 시간에 알림을 설정하여',
      text2: '루틴을 잊지 않을 수 있어요',
    },
  ];

  const goLogin = () => {
    navigation.navigate('Login');
  };

  const handleChange = index => {
    if (index === 2) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.typoView}>
        <Image source={KeyumTypo} style={styles.typoStyle} />
      </View>
      <Swiper
        dot={<View style={styles.dotStyle} />}
        activeDot={<View style={styles.activeDotStyle} />}
        loop={false}
        removeClippedSubviews={false}
        onIndexChanged={handleChange}
        nextButton={<NextBtn style={styles.svgStyle} />}
        prevButton={<PrevBtn style={styles.svgStyle} />}
        showsButtons={true}>
        {TextData.map(data => (
          <View style={styles.slide} key={data.id}>
            <FastImage
              style={[
                styles.onBoardingIMG,
                {marginRight: data.id === 3 ? responsiveWidth(2) : null},
              ]}
              source={data.img}
            />
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.subTitle}>{data.text1}</Text>
            <Text style={styles.subTitle}>{data.text2}</Text>
          </View>
        ))}
      </Swiper>
      <TouchableOpacity
        style={[
          styles.btnStart,
          {backgroundColor: btnDisabled ? '#CED6FF' : '#585FFF'},
        ]}
        onPress={goLogin}
        disabled={btnDisabled}
        activeOpacity={1.0}>
        <Text style={styles.btnText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  slide: {
    alignItems: 'center',
  },
  typoView: {
    alignItems: 'center',
    marginTop: responsiveHeight(13),
    marginBottom: responsiveHeight(3),
  },
  typoStyle: {
    width: responsiveWidth(58),
    height: responsiveHeight(5),
    marginLeft: 4,
  },
  onBoardingIMG: {
    width: responsiveWidth(58),
    height: responsiveHeight(36),
    marginLeft: 12,
    marginBottom: responsiveHeight(3),
  },
  title: {
    color: '#232323',
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
    marginTop: responsiveHeight(10),
    marginBottom: responsiveHeight(0.8),
    fontSize: responsiveFontSize(2.75),
  },
  subTitle: {
    fontSize: responsiveFontSize(1.75),
    fontFamily: 'Pretendard-Medium',
    color: '#888888',
    marginTop: 3,
  },
  btnStart: {
    fontWeight: 'bold',
    padding: 15,
  },
  btnText: {
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'Pretendard-Medium',
    fontSize: responsiveFontSize(1.98),
  },
  dotStyle: {
    backgroundColor: '#888888',
    width: 10,
    height: 10,
    borderRadius: 10,
    marginLeft: 4,
    marginRight: 4,
    marginBottom: responsiveHeight(24),
  },
  activeDotStyle: {
    backgroundColor: '#232323',
    width: 25,
    height: 10,
    borderRadius: 10,
    marginLeft: 4,
    marginRight: 4,
    marginBottom: responsiveHeight(24),
  },
  svgStyle: {
    marginBottom: responsiveHeight(33),
  },
});
