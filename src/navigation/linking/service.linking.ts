import messaging from '@react-native-firebase/messaging';
import {LinkingOptions} from '@react-navigation/native';
import {Linking} from 'react-native';
import {
  buildDeepLinkFromNotificationData,
  linkingConfig,
} from './service.config';
import {RootStackParamList} from '../model';
import {config} from '../../../config';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [
    `${config.appName}://`,
    `https://www.${config.appName}.com`,
    `https://www.${config.appName}.com`,
  ],
  config: linkingConfig,
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    // getInitialNotification: When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();
    const deepLinkURL = buildDeepLinkFromNotificationData(message?.data);
    if (typeof deepLinkURL === 'string') {
      return deepLinkURL;
    }
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({url}: {url: string}) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (typeof url === 'string') {
        listener(url);
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
    };
  },
};
