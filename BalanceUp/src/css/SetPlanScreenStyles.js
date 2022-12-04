import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  topSheet: {
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  xBtn: {
    marginLeft: 120,
    marginRight: 20,
    fontSize: 30,
    fontWeight: '400',
    color: '#000',
  },
  subTitle: {
    marginTop: 10,
    marginLeft: 30,
    marginBottom: 20,
  },
  subText: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  inputSheet: {
    marginTop: 15,
    marginLeft: 30,
  },
  inputText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  inputStyle: {
    marginTop: 8,
    borderBottomWidth: 4,
    width: '90%',
    fontWeight: 'bold',
  },
  count: {
    marginLeft: 297,
    marginTop: 5,
    color: '#000',
  },
  daySelect: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  daySelectText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  recText: {
    color: '#3C64B1',
    fontWeight: '500',
  },
  daySelectBtnView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  daySelectBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    marginLeft: 10,
    marginTop: 15,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
  },
  alertView: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alertText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 35,
  },
  switchStyle: {
    marginRight: 35,
    marginTop: -8,
  },
  timeModalText: {
    color: '#3C64B1',
    height: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3C64B1',
    marginTop: 20,
    marginLeft: 150,
  },
  timeText: {
    color: '#000',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 10,
  },
  timeView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  Nextbutton: {
    width: '90%',
    borderRadius: 15,
    padding: 10,
    marginTop: 60,
  },
  NextbuttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
  },
  checkView: {
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#CACACA',
    borderBottomWidth: 1,
    borderBottomColor: '#CACACA',
  },
});

export default styles;
