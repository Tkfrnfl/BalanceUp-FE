import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Button,
} from 'react-native';
import Swiper from 'react-native-swiper';

export default function OnBoarding({navigation}) {
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        dot={
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,.3)',
              width: 13,
              height: 13,
              borderRadius: 7,
              marginLeft: 7,
              marginRight: 7,
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: '#fff',
              width: 13,
              height: 13,
              borderRadius: 7,
              marginLeft: 7,
              marginRight: 7,
            }}
          />
        }
        loop={false}>
        <View style={styles.slide}>
          <Text style={styles.title}>test1</Text>
        </View>
        <View style={styles.slide}>
          <Text>test2</Text>
        </View>
        <View style={styles.slide}>
          <Text>test3</Text>
          <Button
            onPress={() => navigation.push('Login')}
            title="회원가입"
            />
        </View>
      </Swiper>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: '#f00'
  },
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    width: '100%',
    height: '15%',
    justifyContent: 'center',
  },
});
