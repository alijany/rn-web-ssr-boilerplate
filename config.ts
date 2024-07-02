type Config = {
  version: number;
  appName: string;
  baseUrl: string;
  accessTokenKey: 'access_token';
  refreshTokenKey: 'refresh_token';
  userStorageKey: 'user';
  abortDelayMs: number;
  routePermissions: {path: string; needRoles: boolean; roles: string[]}[];
};

/**
 * Configuration object for the application.
 */
export const config: Config = {
  version: 1,
  appName: 'example',
  baseUrl: 'https://example.com',
  accessTokenKey: 'access_token',
  refreshTokenKey: 'refresh_token',
  userStorageKey: 'user',
  abortDelayMs: 10000,
  routePermissions: [
    {
      path: '/admin',
      needRoles: true,
      roles: ['admin'],
    },
    {
      path: '/profile',
      needRoles: false,
      roles: [],
    },
  ],
};
