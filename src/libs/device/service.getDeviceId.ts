import {getUniqueId} from 'react-native-device-info';
import {$device} from './atom.device';

export const getDeviceId = async () => {
  let id = $device.get().id;
  if (id) {
    return id;
  }
  id = await getUniqueId();
  $device.set({id});
  return id;
};
