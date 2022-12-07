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
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F3F3F3',
    height: 55,
    width: '100%',
  },
  commonText: {
    marginTop: 15,
  },
  selectText: {
    marginTop: 15,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default commonStyles;
