import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

// dd

const MainScreen = ({navigation}) => {
  function onStart() {
    navigation.navigate('Name');
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title1}>KEYUM</Text>
        <Text style={styles.title1}>Project!</Text>
        <Text style={styles.title2}>(온보딩 예정)</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={onStart}>
          <Text style={styles.buttonText}>닉네임 만들기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titleWrapper: {
    width: '100%',
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    width: '100%',
    height: '45%',
    alignItems: 'center',
    paddingTop: 90,
  },
  title1: {
    fontSize: 65,
  },
  title2: {
    fontSize: 40,
  },
  button: {
    width: '70%',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 2,
    padding: 10,
  },
  buttonText: {
    fontSize: 25,
  },
});

export default MainScreen;
