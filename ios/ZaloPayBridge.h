#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

const NSInteger PAYMENTSUCCESS = 1;
const NSInteger PAYMENTFAILED = -1;
const NSInteger PAYMENTCANCELED = 4;

@interface ZaloPayBridge : RCTEventEmitter<RCTBridgeModule>

@end
