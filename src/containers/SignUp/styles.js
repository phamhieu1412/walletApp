import {StyleSheet} from 'react-native';

import {COLORS, SIZES, FONTS} from '../../constants';

const styles = StyleSheet.create({
  buttonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.padding * 6,
    paddingHorizontal: SIZES.padding * 2,
  },
  iconHeader: {
    width: 20,
    height: 20,
    tintColor: COLORS.white,
  },
  textHeader: {
    marginLeft: SIZES.padding * 1.5,
    color: COLORS.white,
    ...FONTS.h4,
  },
  viewLogo: {
    marginTop: SIZES.padding * 5,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogo: {
    width: '60%',
  },
  viewForm: {
    marginTop: SIZES.padding * 3,
    marginHorizontal: SIZES.padding * 3,
  },
  fullName: {
    marginTop: SIZES.padding * 3,
  },
  textForm: {
    color: COLORS.lightGreen,
    ...FONTS.body3,
  },
  inputFullName: {
    marginVertical: SIZES.padding,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    height: 40,
    color: COLORS.white,
    ...FONTS.body3,
  },
  phoneNumber: {
    marginTop: SIZES.padding * 2,
  },
  buttonCountryCode: {
    width: 100,
    height: 50,
    marginHorizontal: 5,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    flexDirection: 'row',
    ...FONTS.body2,
  },
  viewCountryCode: {
    justifyContent: 'center',
    marginLeft: 5,
  },
  iconDown: {
    width: 10,
    height: 10,
    tintColor: COLORS.white,
  },
  inputPhoneNumber: {
    flex: 1,
    marginVertical: SIZES.padding,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    height: 40,
    color: COLORS.white,
    ...FONTS.body3,
  },
  inputPassword: {
    marginVertical: SIZES.padding,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    height: 40,
    color: COLORS.white,
    ...FONTS.body3,
  },
  buttonShowPassword: {
    position: 'absolute',
    right: 0,
    bottom: 10,
    height: 30,
    width: 30,
  },
  iconShowPassword: {
    height: 20,
    width: 20,
    tintColor: COLORS.white,
  },
  buttonContinue: {
    height: 60,
    backgroundColor: COLORS.black,
    borderRadius: SIZES.radius / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContinue: {
    color: COLORS.white,
    ...FONTS.h3,
  },
});

export default styles;
