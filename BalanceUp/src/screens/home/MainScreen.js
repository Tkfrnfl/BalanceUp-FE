import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import commonStyles from '../../css/commonStyles';
import ProgressCircle from 'react-native-progress-circle';

const MainScreen = ({navigation}) => {
  function onSet() {
    navigation.navigate('Set');
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title1}>KEYUM</Text>
        </View>
        <View style={commonStyles.row}>
          <View style={styles.aimText1}>
            <Text>item1</Text>
            <Text>text text</Text>
          </View>

          <ProgressCircle
            percent={30}
            radius={50}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff">
            <Text style={{fontSize: 18}}>{'30%'}</Text>
          </ProgressCircle>
        </View>
        <View style={commonStyles.row}>
          <View style={styles.aimText1}>
            <Text>item1</Text>
            <Text>text text</Text>
          </View>

          <ProgressCircle
            percent={30}
            radius={50}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff">
            <Text style={{fontSize: 18}}>{'30%'}</Text>
          </ProgressCircle>
        </View>
        <View style={commonStyles.row}>
          <View style={styles.aimText1}>
            <Text>item1</Text>
            <Text>text text</Text>
          </View>

          <ProgressCircle
            percent={30}
            radius={50}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff">
            <Text style={{fontSize: 18}}>{'30%'}</Text>
          </ProgressCircle>
        </View>
        <View style={commonStyles.spacing}>
          <Text> </Text>
        </View>

        {/* 루틴 설정 이동 버튼 **임시** */}
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              width: '70%',
              alignItems: 'center',
              backgroundColor: '#b779ed',
            }}
            onPress={onSet}>
            <Text style={{color: '#fff', fontSize: 20}}>
              루틴 설정하기(임시 구현)
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },
  titleWrapper: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title1: {
    fontSize: 65,
  },
  title2: {
    fontSize: 40,
  },
  scrollview: {
    width: '100%',
  },
  aimText1: {
    paddingLeft: 50,
    paddingRight: 100,
  },
});

export default MainScreen;
