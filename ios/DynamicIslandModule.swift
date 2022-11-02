//
//  DynamicIslandModule.swift
//  walletMyApp
//
//  Created by Hieu Pham on 18/10/2022.
//  For Dynamic Island
//
import ActivityKit
import Foundation

@objc(DynamicIslandModule)
class DynamicIslandModule: NSObject {
  @objc(startNotificationActivity: withMessage:)
  func startNotificationActivity(title: String, message: String) {
    if #available(iOS 16.1, *) {
      let activityAttributes = NotificationAttributes(title: title)
      let initContentState = NotificationAttributes.ContentState(msg: message)

      do {
        _ = try Activity.request(attributes: activityAttributes, contentState: initContentState)
        print("Requested a notification Live Activity.")
      }  catch (let error) {
        print("xxx startNotificationActivity \(error.localizedDescription).")
      }
    }
  }
  
  @objc(updateNotificationActivity:)
  func updateNotificationActivity(message: String) {
    let initContentState = NotificationAttributes.ContentState(msg: message)

    if #available(iOS 16.1, *) {
      let alertConfiguration = AlertConfiguration(title: "D", body: "E", sound: .default)
      
      Task {
        for activity in Activity<NotificationAttributes>.activities {
          await activity.update(using: initContentState, alertConfiguration: alertConfiguration)
        }
      }
    }
  }
  
  @objc
  func endNotificationActivity() {
    let notificationStatus = NotificationAttributes.NotificationStatus(msg: "F")

    if #available(iOS 16.1, *) {
      Task {
        for activity in Activity<NotificationAttributes>.activities {
          await activity.end(using: notificationStatus, dismissalPolicy: .default)
        }
      }
    }
  }
}
