import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

const UseInfoScreen = ({navigation}) => {
  const goAgree = () => {
    navigation.navigate('Agree');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goAgree}>
        <Text style={styles.btn}>X</Text>
      </TouchableOpacity>
      <Text style={styles.title}>개인 정보 처리 방침</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 25,
    color: 'black',
    marginLeft: 70,
  },
  btn: {
    fontSize: 20,
    color: 'black',
    marginLeft: 10,
  },
});

export default UseInfoScreen;
