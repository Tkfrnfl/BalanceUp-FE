import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const modalInnerStyles = StyleSheet.create({
  modalFlex: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
    color: '#000',
  },
  noBtn: {
    width: responsiveWidth(42),
    height: responsiveHeight(7),
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#AFAFAF',
    marginTop: 30,
    marginBottom: 30,
    marginRight: 30,
  },
  noText: {
    fontSize: responsiveFontSize(1.98),
    fontFamily: 'Pretendard-Medium',
    color: '#232323',
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40,
  },
  nextText: {
    fontSize: responsiveFontSize(1.98),
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  }, // 모달이 띄워졌을 때 화면을 어둡게 하기 위한 오버레이

  // SetPlanScreen 완료 모달 style
  clearModalTitle: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
    marginTop: -3,
    marginBottom: 15,
  },
  clearSheetContainer: {
    height: 235,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 30,
  },
  planText: {
    color: '#232323',
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    marginRight: 3,
  },
  todoText: {
    bottom: 2,
    color: '#232323',
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    marginTop: 5,
  },
  dayText: {
    color: '#888888',
    fontFamily: 'Pretendard-Medium',
    letterSpacing: 4,
    fontSize: 14,
    marginRight: 3,
    marginTop: 5,
  },
  timeText: {
    color: '#888888',
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    marginTop: 5,
  },
  yesBtn: {
    width: responsiveWidth(42.5),
    height: responsiveHeight(7),
    justifyContent: 'center',
    backgroundColor: '#585FFF',
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 30,
    zIndex: 30,
  },

  // MyPage 닉네임 변경 모달 style
  nameSheetContainer: {
    bottom: -25,
    height: responsiveHeight(40),
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
    width: responsiveWidth(90),
    justifyContent: 'center',
    padding: 8,
    borderRadius: 5,
    marginTop: 25,
    marginBottom: 30,
  },
  saveText: {
    fontSize: responsiveFontSize(1.98),
    fontFamily: 'Pretendard-Medium',
    textAlign: 'center',
    color: '#FFFFFF',
    padding: 6,
  },

  // MyPage 로그아웃 모달 style
  logoutModalText: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'Pretendard-Medium',
    textAlign: 'center',
    color: '#000',
  },

  // Progress 완료 취소 모달
  complteChangeSheetContainer: {
    height: 230,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 30,
  },
  complteChangeModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  }, // 모달이 띄워졌을 때 화면을 어둡게 하기 위한 오버레이

  // Progress 완료 모달
  complteModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  centerSheetContainer: {
    width: 350,
    height: 250,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 30,
  },
  oneCompleteText: {
    fontSize: 22,
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
    marginTop: responsiveHeight(1.2),
    top: 3,
    color: '#585FFF',
  },
  onecompleteText_: {
    fontSize: 20,
    marginTop: responsiveHeight(1.2),
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
    color: '#232323',
  },
  onecompleteText__: {
    top: 3,
    color: '#888888',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Pretendard-Medium',
  },
  oneCompleteImg: {
    marginTop: responsiveHeight(3),
    fontFamily: 'Pretendard-Medium',
    textAlign: 'center',
    alignItems: 'center',
    color: '#888888',
  },
  oneCompleteImg_: {
    width: 180,
    height: 110,
  },
  complteBottomSheetContainer: {
    height: 240,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 30,
  },
  completeTitle: {
    right: 6,
    fontSize: 22,
    marginBottom: 10,
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
    color: '#585FFF',
  },

  // Progress 삭제 모달
  deleteSheetContainer: {
    height: 260,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 30,
  },
  progressModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  }, // 모달이 띄워졌을 때 화면을 어둡게 하기 위한 오버레이
  deletModalText: {
    fontSize: 16,
    marginTop: 15,
    fontFamily: 'Pretendard-Medium',
    textAlign: 'center',
    color: '#000',
  },
  deletModalText_: {
    fontSize: 16,
    marginTop: 3,
    fontFamily: 'Pretendard-Medium',
    textAlign: 'center',
    color: '#000',
  },
  deletModalText__: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: 'Pretendard-Medium',
    textAlign: 'center',
    color: '#888888',
  },

  // Progress 루틴 초과 모달
  overText: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: '#232323',
    bottom: 13,
  },
  overSubText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    color: '#888888',
    bottom: 3,
  },
  bntStyle: {
    top: 33,
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
    width: '120%',
  },
  btnText: {
    top: 13,
    fontSize: 16,
    color: '#232323',
    fontFamily: 'Pretendard-Medium',
    textAlign: 'center',
  },
});

export default modalInnerStyles;
