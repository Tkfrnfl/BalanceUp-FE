import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
  Animated,
  Modal,
  Platform,
  ImageBackground,
} from 'react-native';
import commonStyles from '../../css/commonStyles';
import {Shadow} from 'react-native-shadow-2';
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Text as SvgText,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
import oneDay from '../../resource/image/Main/oneDay.png';
import twoWeeks from '../../resource/image/Main/twoWeeks.png';
import lv1 from '../../resource/image/Main/lv1.png';
import lv2 from '../../resource/image/Main/lv2.png';
import lv3 from '../../resource/image/Main/lv3.png';
import backIcon from '../../resource/image/Main/backIcon.png';

const HomeNoti = ({navigation, route}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.background}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.img2}>
            <Image source={backIcon} />
          </TouchableOpacity>

          <Text style={styles.text1}>키움만의 성장 포인트</Text>
          <Text style={styles.text1}>
            <Text style={styles.text2}>R</Text>OUTINE{' '}
            <Text style={styles.text2}>P</Text>OINT
          </Text>
          <Text style={styles.text3}>
            내 캐릭터가 성장하는 방법을 알려드릴게요!
          </Text>
          <Shadow distance={10} startColor={'#F1F1F1'}>
            <View style={styles.view1}>
              <View style={commonStyles.spacing3} />
              <Text style={[styles.text1, styles.text4]}>
                설정한 루틴을 완료하면
              </Text>
              <Text style={[styles.text1, styles.text4]}>
                <Text style={styles.text2}>RP</Text>를 얻을 수 있어요!
              </Text>
              <View style={commonStyles.spacing3} />
              <View style={commonStyles.row}>
                <Image source={oneDay} style={styles.img1} />
                <Image source={oneDay} style={styles.img1} />
              </View>
              <View style={[commonStyles.row]}>
                <View style={styles.view2}>
                  <Text style={[styles.text1, styles.text5]}>
                    오늘의 루틴 완료
                  </Text>
                  <Text style={[styles.text1, styles.text5, styles.text2]}>
                    +1RP
                  </Text>
                </View>
                <View style={styles.view3}>
                  <Text style={[styles.text1, styles.text5]}>
                    2주 루틴 100% 완료
                  </Text>
                  <Text style={[styles.text1, styles.text5, styles.text2]}>
                    +10RP
                  </Text>
                </View>
              </View>
              <View />
              <Svg height={60} width={350}>
                <Line x1="20" y1="30" x2="330" y2="30" stroke="#EBEBEB" />
              </Svg>
              <View style={styles.view4}>
                <Text style={styles.text6}>
                  ex) 월,수,금 루틴을 설정했다면, 2주동안 총 6일 루틴을
                </Text>
                <Text style={styles.text6}>진행해야해요!</Text>
                <Text style={styles.text6}>-6일 중 5일 완료시 +5RP 획득</Text>
                <Text style={styles.text6}>
                  -6일 중 6일 모두 완료시 +16RP (6RP+10RP) 획득{' '}
                </Text>
              </View>
              <View style={commonStyles.spacing3} />
            </View>
          </Shadow>
          <View style={commonStyles.spacing3} />
          <Shadow distance={10} startColor={'#F1F1F1'}>
            <View style={styles.view1}>
              <View style={commonStyles.spacing3} />
              <Text style={[styles.text1, styles.text4]}>
                <Text style={styles.text2}>RP</Text>를 모으면
              </Text>
              <Text style={[styles.text1, styles.text4]}>
                캐릭터 레벨이 높아져요!
              </Text>
              <View style={commonStyles.spacing3} />
              <Image source={twoWeeks} />
              <Text style={[styles.text1, styles.text5]}>
                +20RP 획득 시 <Text style={styles.text2}>LEVEL UP!</Text>
              </Text>
              <View style={commonStyles.spacing3} />
            </View>
          </Shadow>
          <View style={commonStyles.spacing3} />
          <Shadow distance={10} startColor={'#F1F1F1'}>
            <View style={styles.view1}>
              <View style={commonStyles.spacing3} />
              <Text style={[styles.text1, styles.text4]}>
                <Text style={styles.text2}>레벨</Text>에 따라
              </Text>
              <Text style={[styles.text1, styles.text4]}>
                캐릭터가 진화해요!
              </Text>
              <View style={commonStyles.spacing3} />
              <View style={commonStyles.row}>
                <View>
                  <Image source={lv1} />
                  <Text style={[styles.text1, styles.text5]}>Lv.1~5</Text>
                  <Text style={styles.text3}>0~99RP 획득</Text>
                </View>
                <View>
                  <Image source={lv2} />
                  <Text style={[styles.text1, styles.text5]}>Lv.6~15</Text>
                  <Text style={styles.text3}>100~299RP 획득</Text>
                </View>
                <View>
                  <Image source={lv3} />
                  <Text style={[styles.text1, styles.text5]}>Lv.16이상</Text>
                  <Text style={styles.text3}>300RP 획득</Text>
                </View>
              </View>
              <Svg height={30} width={350}>
                <Line x1="20" y1="1" x2="330" y2="1" stroke="#EBEBEB" />
              </Svg>
              <View style={styles.view4}>
                <Text style={styles.text6}>
                  - 동시에 진행 가능한 루틴은 총 4개예요!
                </Text>
                <Text style={styles.text6}>
                  - 루틴 완료를 취소할 경우, 획득한 RP가 사라져요.
                </Text>
                <Text style={styles.text6}>
                  - 루틴을 삭제할 경우, 루틴과 함께 획득한 RP가 사라져요.
                </Text>
                <Text style={styles.text6}>
                  &nbsp;루틴도, RP도 되돌릴 수 없으니 신중히 선택해 주세요!
                </Text>
                <Text style={styles.text6}>
                  - RP 변화에 따라 캐릭터가 이전 모습으로 바뀔 수 있어요
                </Text>
              </View>
              <View style={commonStyles.spacing3} />
            </View>
          </Shadow>
          <View style={commonStyles.spacing3} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FAFBFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    color: '#232323',
    fontWeight: '600',
    alignSelf: 'center',
    fontSize: 25,
  },
  text2: {
    color: '#585FFF',
  },
  text3: {
    fontSize: 12,
    marginBottom: 30,
    fontWeight: '600',
    alignSelf: 'center',
  },
  text4: {
    fontSize: 20,
  },
  text5: {
    fontSize: 15,
  },
  text6: {
    color: '#888888',
    fontSize: 12,
    marginLeft: 20,
  },
  img1: {
    width: 150,
  },
  img2: {
    alignSelf: 'flex-start',
  },
  view1: {
    width: 350,
    backgroundColor: '#FFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view2: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 0,
  },
  view3: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 30,
  },
  view4: {
    alignSelf: 'flex-start',
  },
});

export default HomeNoti;
