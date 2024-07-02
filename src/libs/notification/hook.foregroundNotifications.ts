import messaging from '@react-native-firebase/messaging';
import React from 'react';

export const useForegroundNotifications = () => {
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async _remoteMessage => {
      // TODO:
    });

    return unsubscribe;
  }, []);
};
