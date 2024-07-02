import {PermissionsAndroid, Platform} from 'react-native';

export const requestNotificationPermission = async () => {
  try {
    if (Platform.OS !== 'android') {
      return true;
    }
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
  }
};
