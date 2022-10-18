package com.walletmyapp;

import android.content.Intent;

import com.facebook.react.ReactActivity;
import vn.zalopay.sdk.ZaloPaySDK;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "walletMyApp";
  }

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    ZaloPaySDK.getInstance().onResult(intent);
  }
}
