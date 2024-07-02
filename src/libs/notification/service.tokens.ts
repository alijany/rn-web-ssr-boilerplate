import messaging from '@react-native-firebase/messaging';
import {postTokenToApi} from './api';

export async function onAppBootstrap() {
  const token = await messaging().getToken();

  await postTokenToApi(token);
}
