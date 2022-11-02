//
//  NotificationWidget.swift
//  NotificationWidget
//
//  Created by Hieu Pham on 18/10/2022.
//
//  UI : https://sarunw.com/posts/new-way-to-style-uibutton-in-ios15/#swiftui
//  For Dynamic Island
//

import WidgetKit
import SwiftUI
import Intents
import ActivityKit

@main
struct NotificationWidgets: WidgetBundle {
  var body: some Widget {
    if #available(iOS 16.1, *) {
      NotificationActivityWidget()
    }
  }
}

@available(iOSApplicationExtension 16.1, *)
struct ContentView: View {
  let context: ActivityViewContext<NotificationAttributes>
  var body: some View {
    VStack(alignment: .center) {
      Text(context.attributes.title)
        .foregroundColor(.white)
      Text(context.state.msg)
        .foregroundColor(.white)
    }
  }
}

@available(iOSApplicationExtension 16.1, *)
struct LockView: View {
  let context: ActivityViewContext<NotificationAttributes>
  let start = Date().addingTimeInterval(-30)
  let end = Date().addingTimeInterval(90)
  var body: some View {
    VStack {
      Spacer()
      Text("\(context.attributes.title) is on their way with your pizza!")
      Spacer()
      HStack {
        Spacer()
        Label {
          Text("\(context.state.msg) Pizzas")
        } icon: {
          Image(systemName: "bag")
            .foregroundColor(.indigo)
        }
        .font(.title2)
        Spacer()
        Label {
          Text(timerInterval: start...end, countsDown: true)
            .multilineTextAlignment(.center)
            .frame(width: 50)
            .monospacedDigit()
        } icon: {
          Image(systemName: "timer")
            .foregroundColor(.indigo)
        }
        .font(.title2)
        Spacer()
      }
      Spacer()
    }
    .activitySystemActionForegroundColor(.indigo)
    .activityBackgroundTint(.cyan)
  }
}

struct LeadingView: View {
  var body: some View {
    VStack(alignment: .center) {
      Text("Tit1")
      Text("Tit2")
    }
  }
}

struct TrailingView: View {
  var body: some View {
    Image(systemName: "xmark.circle")
      .foregroundColor(.pink)
  }
}

@available(iOSApplicationExtension 16.1, *)
struct CenterView: View {
  let context: ActivityViewContext<NotificationAttributes>
  var body: some View {
    VStack(alignment: .center) {
      Text(context.attributes.title)
        .foregroundColor(.white)
      Text(context.state.msg)
        .foregroundColor(.white)
    }
  }
}

struct BottomView: View {
  var body: some View {
    HStack {
      Button(action: {}) {
        HStack {
          Image(systemName: "rectangle.portrait.and.arrow.right")
            .foregroundColor(.white)
          Text("Go")
          .font(.callout)
          .bold()
        }
        .padding(EdgeInsets(top: 10, leading: 20, bottom: 10, trailing: 20))
        .background(.green)
        .clipShape(Capsule())
        .foregroundColor(.white)
      }
      Button(action: {}) {
        HStack {
          Image(systemName: "airplane")
            .foregroundColor(.white)
          Text("Fly")
          .font(.callout)
          .bold()
        }
        .padding(EdgeInsets(top: 10, leading: 20, bottom: 10, trailing: 20))
        .background(.red)
        .clipShape(Capsule())
        .foregroundColor(.white)
      }
    }
  }
}

struct CLeadingView: View {
  var body: some View {
    Image(systemName: "rectangle.portrait.and.arrow.right")
      .foregroundColor(.green)
  }
}

struct CTrailingView: View {
  var body: some View {
    Image(systemName: "airplane")
      .foregroundColor(.red)
  }
}

@available(iOSApplicationExtension 16.1, *)
struct MinimalView: View {
  let context: ActivityViewContext<NotificationAttributes>
  let start = Date().addingTimeInterval(-30)
  let end = Date().addingTimeInterval(90)

  var body: some View {
    VStack(alignment: .center) {
      Image(systemName: "timer")
      Text(timerInterval: start...end, countsDown: true)
        .multilineTextAlignment(.center)
        .monospacedDigit()
        .font(.caption2)
    }
  }
}

@available(iOSApplicationExtension 16.1, *)
struct NotificationActivityWidget: Widget {
  var body: some WidgetConfiguration {
    ActivityConfiguration(for: NotificationAttributes.self) { context in
      // Create the view that appears on the Lock Screen and as a
      // banner on the Home Screen of devices that don't support the
      // Dynamic Island.
      LockView(context: context)
    } dynamicIsland: { context in
      // Create the views that appear in the Dynamic Island.
      DynamicIsland {
        DynamicIslandExpandedRegion(.leading) {
          LeadingView()
        }
        
        DynamicIslandExpandedRegion(.trailing) {
          TrailingView()
        }
        
        DynamicIslandExpandedRegion(.center) {
          CenterView(context: context)
        }
        
        DynamicIslandExpandedRegion(.bottom) {
          BottomView()
        }
      } compactLeading: {
        CLeadingView()
      } compactTrailing: {
        CTrailingView()
      } minimal: {
        MinimalView(context: context)
      }
      .keylineTint(.cyan)
    }
  }
}
