import Cookies from 'js-cookie';

export const getDeviceId = async () => {
  let id = Cookies.get('deviceId');
  if (id) {
    return id;
  }
  id = window.crypto.randomUUID();
  Cookies.set('deviceId', id, {expires: 365});
  return id;
};
