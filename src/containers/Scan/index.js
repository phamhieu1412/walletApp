import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';

import {icons, images} from '../../constants';
import styles from './styles';

const Scan = ({navigation}) => {
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.buttonCloseHeader}
          onPress={() => navigation.navigate('Home')}>
          <Image source={icons.close} style={styles.imageCloseHeader} />
        </TouchableOpacity>

        <View style={styles.viewTitleHeader}>
          <Text style={styles.textTitleHeader}>Scan for Payment</Text>
        </View>

        <TouchableOpacity
          style={styles.buttonInfoHeader}
          onPress={() => console.log('Info')}>
          <Image source={icons.info} style={styles.imageInfoHeader} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderScanFocus = () => {
    return (
      <View style={styles.viewFocus}>
        <Image
          source={images.focus}
          resizeMode="stretch"
          style={styles.imageFocus}
        />
      </View>
    );
  };

  const renderPaymentMethods = () => {
    return (
      <View style={styles.viewPaymentMethod}>
        <Text style={styles.titlePaymentMethod}>Another payment methods</Text>

        <View style={styles.phoneNumberPayment}>
          <TouchableOpacity
            style={styles.buttonPhoneNumberPayment}
            onPress={() => console.log('Phone Number')}>
            <View style={styles.viewPhoneNumberPayment}>
              <Image
                source={icons.phone}
                resizeMode="cover"
                style={styles.imageViewPhoneNumber}
              />
            </View>
            <Text style={styles.textView}>Phone Number</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonBarCodePayment}
            onPress={() => console.log('Barcode')}>
            <View style={styles.viewBarCodePayment}>
              <Image
                source={icons.barcode}
                resizeMode="cover"
                style={styles.imageViewBarCode}
              />
            </View>
            <Text style={styles.textView}>Barcode</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  function onBarCodeRead(result) {
    console.log(result.data);
  }

  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{flex: 1}}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        onBarCodeRead={onBarCodeRead}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'Camera is required for barcode scanning',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }}>
        {renderHeader()}
        {renderScanFocus()}
        {renderPaymentMethods()}
      </RNCamera>
    </View>
  );
};

export default Scan;
