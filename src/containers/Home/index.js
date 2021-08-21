import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidStyle, EventType } from '@notifee/react-native';

import {COLORS, SIZES, FONTS, icons, images} from '../../constants';
import {actions} from '../../redux/UserRedux';
import {fcmService} from '../../services/FCMService';
import styles from './styles';

const HomeContainer = () => {
  const dispatch = useDispatch();
  const dispatchAddToCart = () => dispatch(actions.logout());
  const [features, setFeatures] = React.useState(featuresData);
  const [specialPromos, setSpecialPromos] = React.useState(specialPromoData);

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.viewTitleHeader}>
          <Text style={styles.textViewTitle}>Hello!</Text>
          <Text style={styles.subTextViewTitle}>ByProgrammers</Text>
        </View>

        <View style={styles.viewBell}>
          <TouchableOpacity
            style={styles.buttonBell}
            onPress={dispatchAddToCart}>
            <Image source={icons.bell} style={styles.imageBell} />
            <View style={styles.dotNotification}></View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderBanner = () => {
    return (
      <View style={styles.viewBanner}>
        <Image
          source={images.banner}
          resizeMode="cover"
          style={styles.imageBanner}
        />
      </View>
    );
  };

  const renderFeatures = () => {
    const Header = () => (
      <View style={styles.headerFeatures}>
        <Text style={styles.textHeaderFeatures}>Features</Text>
      </View>
    );

    const renderItem = ({item}) => (
      <TouchableOpacity
        style={styles.buttonItemFeatures}
        onPress={() => console.log(item.description)}>
        <View
          style={[
            styles.viewButtonItem,
            {
              backgroundColor: item.backgroundColor,
            },
          ]}>
          <Image
            source={item.icon}
            resizeMode="contain"
            style={{
              height: 20,
              width: 20,
              tintColor: item.color,
            }}
          />
        </View>
        <Text style={styles.textViewButton}>{item.description}</Text>
      </TouchableOpacity>
    );

    return (
      <FlatList
        ListHeaderComponent={Header}
        data={features}
        numColumns={4}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        style={styles.containerFeatures}
      />
    );
  };

  const renderPromos = () => {
    const HeaderComponent = () => (
      <View>
        {renderHeader()}
        {renderBanner()}
        {renderFeatures()}
        {renderPromoHeader()}
      </View>
    );

    const renderPromoHeader = () => (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: SIZES.padding,
        }}>
        <View style={{flex: 1}}>
          <Text style={{...FONTS.h3}}>Special Promos</Text>
        </View>
        <TouchableOpacity onPress={checkApplicationPermission}>
          <Text style={{color: COLORS.gray, ...FONTS.body4}}>View All</Text>
        </TouchableOpacity>
      </View>
    );

    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{
          marginVertical: SIZES.base,
          width: SIZES.width / 2.5,
        }}
        onPress={() => console.log(item.title)}>
        <View
          style={{
            height: 80,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.primary,
          }}>
          <Image
            source={images.promoBanner}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        </View>

        <View
          style={{
            padding: SIZES.padding,
            backgroundColor: COLORS.lightGray,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <Text style={{...FONTS.h4}}>{item.title}</Text>
          <Text style={{...FONTS.body4}}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );

    const checkApplicationPermission = async () => {
      // const settings = await notifee.requestPermission();
      // if (settings) {
      //   if (settings.authorizationStatus) {
      //     console.log('User has notification permissions enabled', settings);
      //   } else {
      //     console.log('User not notification permissions enabled', settings);
      //   }
      // }

      // const channelId = await notifee.createChannel({
      //   id: 'important',
      //   name: 'Important Notifications',
      //   importance: AndroidImportance.HIGH,
      //   sound: 'notification1',
      //   vibration: true,
      //   vibrationPattern: [300, 500],
      // });
      // await notifee.displayNotification({
      //   title: 'Your account 1 attention',
      //   body: 'Custom sound',
      //   ios: {
      //     // iOS resource (.wav, aiff, .caf)
      //     sound: 'notification1.mp3',
      //     attachments: [
      //       {
      //         // iOS resource
      //         url: 'https://www.pxpng.com/public/uploads/preview/-11601774644rkfopjcrfk.png',
      //         thumbnailHidden: false,
      //       },
      //     ],
      //     foregroundPresentationOptions: {
      //       alert: true,
      //       badge: true,
      //       sound: true,
      //     },
      //   },
        // android: {
        //   channelId,
        //   color: '#4caf50',
        //   largeIcon: 'https://www.pxpng.com/public/uploads/preview/-11601774644rkfopjcrfk.png',
        //   actions: [
        //     {
        //       title: '<b>Dance</b> &#128111;',
        //       pressAction: { id: 'dance' },
        //     },
        //     {
        //       title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
        //       pressAction: { id: 'cry' },
        //     },
        //   ],
        //   timestamp: Date.now(),
        //   sound: 'notification1',
        //   vibrationPattern: [300, 500],
        //   showTimestamp: true,
        //   style: {
        //     type: AndroidStyle.BIGTEXT,
        //     text: 'You are overdue payment on one or more of your accounts! You are overdue payment on one or more of your accounts!'
        //   },
        //   importance: AndroidImportance.HIGH,
        // },
      // });
      // go to manager notification settings
      // await notifee.openNotificationSettings();
      console.log('0');
      // action when app is foreground(onForegroundEvent) and onBackground(onBackgroundEvent)
      // notifee.onForegroundEvent(({ type, detail }) => {
      //   console.log('1', detail, type);
      //   if (type === EventType.APP_BLOCKED) {
      //     console.log('User toggled app blocked', detail.blocked);
      //   }
      
      //   if (type === EventType.CHANNEL_BLOCKED) {
      //     console.log('User toggled channel block', detail.channel.id, detail.blocked);
      //   }
      
      //   if (type === EventType.CHANNEL_GROUP_BLOCKED) {
      //     console.log('User toggled channel group block', detail.channelGroup.id, detail.blocked);
      //   }
      // });
    };

    return (
      <FlatList
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={{paddingHorizontal: SIZES.padding * 3}}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={specialPromos}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{marginBottom: 80}}></View>}
      />
    );
  };

  return <SafeAreaView style={styles.container}>{renderPromos()}</SafeAreaView>;
};

export default HomeContainer;

const featuresData = [
  {
    id: 1,
    icon: icons.reload,
    color: COLORS.purple,
    backgroundColor: COLORS.lightpurple,
    description: 'Top Up',
  },
  {
    id: 2,
    icon: icons.send,
    color: COLORS.yellow,
    backgroundColor: COLORS.lightyellow,
    description: 'Transfer',
  },
  {
    id: 3,
    icon: icons.internet,
    color: COLORS.primary,
    backgroundColor: COLORS.lightGreen,
    description: 'Internet',
  },
  {
    id: 4,
    icon: icons.wallet,
    color: COLORS.red,
    backgroundColor: COLORS.lightRed,
    description: 'Wallet',
  },
  {
    id: 5,
    icon: icons.bill,
    color: COLORS.yellow,
    backgroundColor: COLORS.lightyellow,
    description: 'Bill',
  },
  {
    id: 6,
    icon: icons.game,
    color: COLORS.primary,
    backgroundColor: COLORS.lightGreen,
    description: 'Games',
  },
  {
    id: 7,
    icon: icons.phone,
    color: COLORS.red,
    backgroundColor: COLORS.lightRed,
    description: 'Mobile Prepaid',
  },
  {
    id: 8,
    icon: icons.more,
    color: COLORS.purple,
    backgroundColor: COLORS.lightpurple,
    description: 'More',
  },
];

const specialPromoData = [
  {
    id: 1,
    img: images.promoBanner,
    title: 'Bonus Cashback1',
    description: "Don't miss it. Grab it now!",
  },
  {
    id: 2,
    img: images.promoBanner,
    title: 'Bonus Cashback2',
    description: "Don't miss it. Grab it now!",
  },
  {
    id: 3,
    img: images.promoBanner,
    title: 'Bonus Cashback3',
    description: "Don't miss it. Grab it now!",
  },
  {
    id: 4,
    img: images.promoBanner,
    title: 'Bonus Cashback4',
    description: "Don't miss it. Grab it now!",
  },
];
