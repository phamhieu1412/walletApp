import {StyleSheet} from 'react-native';

import {COLORS, SIZES, FONTS} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.transparent,
  },
  header: {
    flexDirection: 'row',
    marginTop: SIZES.padding * 4,
    paddingHorizontal: SIZES.padding * 3,
  },
  buttonCloseHeader: {
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCloseHeader: {
    height: 20,
    width: 20,
    tintColor: COLORS.white,
  },
  viewTitleHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitleHeader: {
    color: COLORS.white,
    ...FONTS.body3,
  },
  buttonInfoHeader: {
    height: 45,
    width: 45,
    backgroundColor: COLORS.green,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageInfoHeader: {
    height: 25,
    width: 25,
    tintColor: COLORS.white,
  },
  viewFocus: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageFocus: {
    marginTop: '-55%',
    width: 200,
    height: 300,
  },
  viewPaymentMethod: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 220,
    padding: SIZES.padding * 3,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    backgroundColor: COLORS.white,
  },
  titlePaymentMethod: {
    ...FONTS.h4,
  },
  phoneNumberPayment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: SIZES.padding * 2,
  },
  buttonPhoneNumberPayment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewPhoneNumberPayment: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.lightpurple,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  imageViewPhoneNumber: {
    height: 25,
    width: 25,
    tintColor: COLORS.purple,
  },
  textView: {
    marginLeft: SIZES.padding,
    ...FONTS.body4,
  },
  buttonBarCodePayment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SIZES.padding * 2,
  },
  viewBarCodePayment: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  imageViewBarCode: {
    height: 25,
    width: 25,
    tintColor: COLORS.primary,
  },
});

export default styles;
