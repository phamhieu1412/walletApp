//
//  DynamicIslandBridge.m
//  walletMyApp
//
//  Created by Hieu Pham on 18/10/2022.
//  For Dynamic Island
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(DynamicIslandModule, NSObject)

RCT_EXTERN_METHOD(startNotificationActivity: (NSString) title withMessage: (NSString) message)
RCT_EXTERN_METHOD(updateNotificationActivity: (NSString) message)
RCT_EXTERN_METHOD(endNotificationActivity)

@end
