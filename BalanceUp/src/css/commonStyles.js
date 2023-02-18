import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const commonStyles = StyleSheet.create({
  spacing: {
    height: 150,
  },
  spacing2: {
    height: 50,
  },
  spacing3: {
    height: 25,
  },
  row: {
    flexDirection: 'row',
  },
  boldText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    color: '#232323',
  },
  boldText_: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: '#232323',
  },
  mediumText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    marginTop: 3,
    color: '#888888',
  },
  mediumText_: {
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    marginTop: 3,
    color: '#888888',
  },

  imgView: {
    flexDirection: 'row',
    marginTop: 60,
    marginBottom: 40,
  },
  rowSpacing: {
    width: 100,
  },
  bottomTabSheet: {
    height: responsiveHeight(10),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#EEEEEE',
  },
  commonText: {
    fontSize: 10,
    marginBottom: 10,
    right: responsiveWidth(0.7),
    bottom: responsiveHeight(0.3),
    fontFamily: 'Pretendard-Bold',
  },
});

export default commonStyles;
