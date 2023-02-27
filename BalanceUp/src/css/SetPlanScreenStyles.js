import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  topTitle: {
    fontSize: 22,
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
    marginTop: responsiveHeight(7),
    color: '#232323',
  },
  arrowBtn: {
    top: responsiveWidth(8),
    left: responsiveWidth(5),
  },
  inputSheet: {
    marginTop: 15,
    marginLeft: 20,
  },
  inputText: {
    top: 20,
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: '#000',
  },
  inputStyle: {
    width: '94.5%',
    height: responsiveHeight(7),
    marginTop: 8,
    color: '#232323',
    borderWidth: 1,
    borderColor: '#AFAFAF',
    fontFamily: 'Pretendard-Bold',
    paddingLeft: 20,
    borderRadius: 5,
  },
  count: {
    fontSize: 12,
    marginLeft: responsiveWidth(83),
    fontFamily: 'Pretendard-Light',
    marginTop: 5,
    bottom: 3,
    color: '#888888',
  },
  daySelect: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  daySelectText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    marginLeft: 20,
  },
  recText: {
    top: 2,
    fontSize: 12,
    color: '#888888',
    fontFamily: 'Pretendard-Medium',
    marginLeft: 10,
  },
  daySelectBtnView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: responsiveWidth(5),
  },
  daySelectBtn: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsiveWidth(1),
    borderRadius: 100,
    marginRight: responsiveWidth(5),
    marginTop: 10,
  },
  btnText: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Pretendard-Medium',
  },
  alertView: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alertText: {
    color: '#000',
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    marginLeft: 20,
  },
  switchStyle: {
    marginRight: 10,
    marginTop: -5,
  },
  timeModalText: {
    color: '#585FFF',
    height: 20,
    fontFamily: 'Pretendard-Bold',
    borderBottomWidth: 1,
    borderBottomColor: '#585FFF',
    marginTop: 21,
    marginLeft: 150,
    left: 5,
  },
  timeText: {
    color: '#000',
    right: 8,
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
  },
  timeView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  nextBtn: {
    width: responsiveWidth(91),
    height: responsiveHeight(6.5),
    alignItems: 'center',
    backgroundColor: '#585FFF',
    borderRadius: 5,
  },
  nextBtnText: {
    fontSize: 16,
    top: responsiveHeight(1.7),
    fontFamily: 'Pretendard-Medium',
    color: '#fff',
  },
  nextBtnSheet: {
    alignItems: 'center',
    top: 65,
  },
  checkView: {
    alignItems: 'center',
  },
  boxView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  toastView: {
    top: 20,
    width: 230,
    height: 47,
    borderRadius: 35,
    justifyContent: 'center',
    backgroundColor: '#444444',
  },
  toastText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
  },
});

export default styles;
