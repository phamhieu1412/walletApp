//
//  ActivityAttributes.swift
//  walletMyApp
//
//  Created by Hieu Pham on 18/10/2022.
//  For Dynamic Island
//

import Foundation
import ActivityKit

struct NotificationAttributes: ActivityAttributes {
  public typealias NotificationStatus = ContentState
  
  public struct ContentState: Codable, Hashable {
    var msg: String // .state bên notificationWidget
  }
  
  var title: String // .attributes bên notificationWidget
}
