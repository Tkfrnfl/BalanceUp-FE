import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Shadow} from 'react-native-shadow-2';

const Notice = ({navigation}) => {
  const goBack = () => {
    navigation.navigate('MyPage');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSheet}>
        <TouchableOpacity onPress={goBack}>
          {/* 임시 디자인 버튼 */}
          <Text style={styles.arrowBtn}>⬅</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>공지사항</Text>
      </View>
      <Shadow distance={3}>
        <View style={styles.nameSheet}>
          <Text style={styles.nameText}>안녕하세요! 키움 공지사항입니다!</Text>
          <View style={styles.infoSheet}>
            <Text style={styles.infoText}>Test1</Text>
          </View>
        </View>
      </Shadow>
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
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  topTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  arrowBtn: {
    marginRight: 100,
    marginBottom: 25,
    fontSize: 60,
    fontWeight: 'bold',
    color: '#000',
  },
  nameSheet: {
    backgroundColor: '#FAFAFA',
    width: 400,
    height: 150,
  },
  nameText: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 50,
    marginTop: 35,
  },
  infoText: {
    color: '#000',
    fontWeight: '300',
    marginLeft: 50,
    marginTop: 10,
  },
  info_Text: {
    color: '#000',
    fontWeight: '300',
    marginLeft: 70,
  },
  agreeSheet: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  agreeText: {
    marginTop: 5,
    color: '#000',
    fontWeight: '500',
  },
  Nextbutton: {
    width: '50%',
    alignItems: 'center',
    borderRadius: 15,
    padding: 10,
    marginTop: 30,
    marginLeft: 100,
  },
  NextbuttonText: {
    fontSize: 20,
    color: '#fff',
  },
});
export default Notice;
