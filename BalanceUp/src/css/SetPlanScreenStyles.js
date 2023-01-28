import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  topTitle: {
    fontSize: 22,
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
    marginTop: 30,
    color: '#000',
  },
  arrowBtn: {
    top: 30,
    left: 20,
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
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#AFAFAF',
    fontFamily: 'Pretendard-Bold',
    paddingLeft: 20,
    borderRadius: 5,
  },
  count: {
    fontSize: 12,
    marginLeft: 325,
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
    marginLeft: 20,
  },
  daySelectBtn: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    marginLeft: 0,
    marginRight: 20,
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
    marginRight: 20,
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
  },
  timeView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  nextBtn: {
    width: 358,
    height: 48,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#585FFF',
    borderRadius: 5,
  },
  nextBtnText: {
    fontSize: 16,
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
