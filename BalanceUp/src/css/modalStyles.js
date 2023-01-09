import {StyleSheet} from 'react-native';

const modalInnerStyles = StyleSheet.create({
  modalFlex: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000',
  },
  noBtn: {
    width: 170,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#AFAFAF',
    marginTop: 30,
    marginBottom: 30,
    marginRight: 35,
  },
  nextBtn: {
    padding: 8,
    backgroundColor: '#6D81FA',
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 30,
  },
  noText: {
    padding: 6,
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: '#232323',
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40,
  },
  nextText: {
    padding: 6,
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: '#fff',
    textAlign: 'center',
  },
  bottomSheetContainer: {
    height: 210,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 30,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    width: 170,
    padding: 8,
    backgroundColor: '#585FFF',
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 30,
  },

  // MyPage 닉네임 변경 모달 style
  nameSheetContainer: {
    bottom: -25,
    height: 280,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 30,
  },
  nameText: {
    color: '#000',
    fontWeight: '300',
    fontSize: 15,
  },
  saveBtn: {
    padding: 8,
    borderRadius: 5,
    marginTop: 25,
    marginBottom: 30,
    width: '105%',
  },
  saveText: {
    padding: 6,
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: '#fff',
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40,
  },

  // MyPage 로그아웃 모달 style
  logoutModalText: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'Pretendard-Medium',
    textAlign: 'center',
    color: '#000',
  },

  // Progress 완료 모달
  complteModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centerSheetContainer: {
    width: 300,
    height: 250,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
  },

  // Progress 삭제 모달
  deleteSheetContainer: {
    height: 250,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
  },
});

export default modalInnerStyles;
