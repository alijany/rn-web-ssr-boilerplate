import {useStore} from '@nanostores/react';
import {$device} from './atom.device';
import {useEffect} from 'react';
import {getDeviceId} from './service.getDeviceId';

export const useDeviceId = () => {
  const deviceId = useStore($device).id;

  useEffect(() => {
    if (!deviceId) {
      getDeviceId();
    }
  }, [deviceId]);

  return deviceId;
};
