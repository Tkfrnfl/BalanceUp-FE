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
});

export default modalInnerStyles;
