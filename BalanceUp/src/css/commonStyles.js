import {StyleSheet} from 'react-native';

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
  lightText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Light',
    marginTop: 3,
    color: '#232323',
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
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#EEEEEE',
  },
  commonText: {
    right: 2,
    bottom: 3,
    fontSize: 10,
    marginBottom: 10,
    fontFamily: 'Pretendard-Bold',
  },
});

export default commonStyles;
