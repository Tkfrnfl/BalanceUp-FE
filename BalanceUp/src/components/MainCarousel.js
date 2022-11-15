import * as React from 'react';
import {Dimensions, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel'; // https://www.npmjs.com/package/react-native-reanimated-carousel

// 캐러셀 임시 구현
const MainCarousel = () => {
  const width = Dimensions.get('window').width;
  return (
    <View style={{flex: 1}}>
      <Carousel
        loop
        width={300}
        height={width / 2}
        autoPlay={true}
        data={[...new Array(3).keys()]}
        scrollAnimationDuration={3000}
        // onSnapToItem={index => console.log('current index:', index)}
        renderItem={({index}) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: 'center',
            }}>
            <Text style={{textAlign: 'center', fontSize: 30}}>{index}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MainCarousel;
