import {LinkingOptions} from '@react-navigation/native';
import {RootStackParamList} from '../model';
import {config} from '../../../config';

const parseLink = (data: any) => {
  const navigationId = data?.navigationId;

  if (navigationId === 'home') {
    return 'app/home';
  }

  return null;
};

export function buildDeepLinkFromNotificationData(
  data: any,
  absolute = false,
): string | null {
  const path: string | null = parseLink(data);

  if (!path) {
    return null;
  }

  if (absolute) {
    return `/${path}`;
  }

  return `${config.appName}://${path}`;
}

export const linkingConfig: LinkingOptions<RootStackParamList>['config'] = {
  screens: {
    Root: {
      path: 'app',
      screens: {
        Forum: 'forum',
        Home: 'home',
      },
    },

    Auth: 'login',
  },
};
