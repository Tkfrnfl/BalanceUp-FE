import {StyleSheet} from 'react-native';

const modalInnerStyles = StyleSheet.create({
  modalFlex: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalTitle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000',
  },
  noBtn: {
    padding: 10,
    backgroundColor: '#ADADAD',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 30,
  },
  nextBtn: {
    padding: 10,
    backgroundColor: '#6D81FA',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 30,
  },
  noText: {
    padding: 6,
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40,
  },
  nextText: {
    padding: 6,
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  bottomSheetContainer: {
    height: 220,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  }, // 모달이 띄워졌을 때 화면을 어둡게 하기 위한 오버레이

  // SetPlanScreen 완료 모달 style
  clearModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginTop: -10,
    marginBottom: 10,
  },
  clearSheetContainer: {
    height: 300,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
  },
  dayText: {
    color: '#6D81FA',
    fontWeight: 'bold',
    letterSpacing: 10,
    fontSize: 25,
    marginTop: 5,
  },
  todoText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 5,
  },
  timeText: {
    color: '#6D81FA',
    fontWeight: 'bold',
    marginTop: 5,
  },
  noCheckBtn: {
    padding: 8,
    backgroundColor: '#ADADAD',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 30,
  },
  yesBtn: {
    padding: 8,
    backgroundColor: '#6D81FA',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 30,
    width: '45%',
  },

  // MyPage 닉네임 변경 모달 style
  nameText: {
    color: '#000',
    fontWeight: '300',
    fontSize: 15,
  },
  saveBtn: {
    padding: 8,
    backgroundColor: '#6D81FA',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 30,
    width: '45%',
  },
  saveText: {
    padding: 6,
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40,
  },

  // MyPage 로그아웃 모달 style
  logoutModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  logoutModalText: {
    fontSize: 15,
    marginTop: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
  },
});

export default modalInnerStyles;
