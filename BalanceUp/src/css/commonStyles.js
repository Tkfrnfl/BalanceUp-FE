import {StyleSheet} from 'react-native';

const commonStyles = StyleSheet.create({
  spacing: {
    height: 150,
  },
  spacing2: {
    height: 50,
  },
  row: {
    flexDirection: 'row',
  },
  boldText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
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
