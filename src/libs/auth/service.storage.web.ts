import Cookies from 'js-cookie';
import {map} from 'nanostores';
import {config} from '../../../config';

type Tokens = Record<'access_token' | 'refresh_token', string | undefined>;

export const authStorage = map<
  Tokens & {onTokensUpdate?: (tokens: Tokens) => void}
>({
  [config.accessTokenKey]: undefined,
  [config.refreshTokenKey]: undefined,
  onTokensUpdate: undefined,
});

/**
 * Sets the access and refresh tokens in the cookies.
 * @param options - the tokens to set
 * @returns void
 */
export const setTokens = (options: {
  [config.accessTokenKey]: string;
  [config.refreshTokenKey]: string;
}): void => {
  const onTokensUpdate = authStorage.get().onTokensUpdate;
  authStorage.set({...options, onTokensUpdate});
  onTokensUpdate?.(options);
};

/**
 * Extracts the token from the cookies.
 * @returns the access and refresh tokens
 */
export const getTokens = () => {
  return authStorage.get();
};

/**
 * Deletes the access and refresh tokens from the cookies.
 * @returns void
 */
export const deleteTokens = (): void => {
  const onTokensUpdate = authStorage.get().onTokensUpdate;
  const options = {
    [config.accessTokenKey]: undefined,
    [config.refreshTokenKey]: undefined,
  };
  authStorage.set({
    ...options,
    onTokensUpdate,
  });
  onTokensUpdate?.(options);
};

export function syncTokenToCookies(options: {
  [config.accessTokenKey]?: string;
  [config.refreshTokenKey]?: string;
}) {
  const accessToken = options[config.accessTokenKey];
  if (accessToken) {
    Cookies.set(config.accessTokenKey, accessToken, {
      expires: 60,
    });
  } else {
    Cookies.remove(config.accessTokenKey);
  }
  const refreshToken = options[config.refreshTokenKey];
  if (refreshToken) {
    Cookies.set(config.refreshTokenKey, refreshToken, {
      expires: 60,
    });
  } else {
    Cookies.remove(config.refreshTokenKey);
  }
}

export function restoreTokensFromCookies() {
  const tokens = {
    [config.accessTokenKey]: Cookies.get(config.accessTokenKey),
    [config.refreshTokenKey]: Cookies.get(config.refreshTokenKey),
  };
  authStorage.set({
    ...tokens,
    onTokensUpdate: newTokens => {
      syncTokenToCookies(newTokens);
    },
  });
}
