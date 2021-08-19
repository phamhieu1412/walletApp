import {StyleSheet} from 'react-native';

import {COLORS, SIZES, icons, images, FONTS} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    marginVertical: SIZES.padding * 2,
  },
  viewTitleHeader: {
    flex: 1,
  },
  textViewTitle: {
    ...FONTS.h1,
  },
  subTextViewTitle: {
    ...FONTS.body2,
    color: COLORS.gray,
  },
  viewBell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBell: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  imageBell: {
    width: 20,
    height: 20,
    tintColor: COLORS.secondary,
  },
  dotNotification: {
    position: 'absolute',
    top: -5,
    right: -5,
    height: 10,
    width: 10,
    backgroundColor: COLORS.red,
    borderRadius: 5,
  },
  viewBanner: {
    height: 120,
    borderRadius: 20,
  },
  imageBanner: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  containerFeatures: {
    marginTop: SIZES.padding * 2,
  },
  headerFeatures: {
    marginBottom: SIZES.padding * 2,
  },
  textHeaderFeatures: {
    ...FONTS.h3,
  },
  buttonItemFeatures: {
    marginBottom: SIZES.padding * 2,
    width: 60,
    alignItems: 'center',
  },
  viewButtonItem: {
    height: 50,
    width: 50,
    marginBottom: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textViewButton: {
    textAlign: 'center',
    flexWrap: 'wrap',
    ...FONTS.body4,
  },
});

export default styles;
