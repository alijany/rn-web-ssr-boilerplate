import {MMKV} from 'react-native-mmkv';
import {config} from '../../../config';

export const authStorage = new MMKV({id: config.accessTokenKey});

/**
 * Sets the access and refresh tokens in the cookies.
 * @param options - the tokens to set
 * @returns void
 */
export const setTokens = (options: {
  [config.accessTokenKey]: string;
  [config.refreshTokenKey]: string;
}): void => {
  authStorage.set(config.accessTokenKey, options[config.accessTokenKey]);
  authStorage.set(config.refreshTokenKey, options[config.refreshTokenKey]);
};

/**
 * Extracts the token from the cookies.
 * @returns the access and refresh tokens
 */
export const getTokens = () => {
  const accessToken = authStorage.getString(config.accessTokenKey);
  const refreshToken = authStorage.getString(config.refreshTokenKey);
  return {
    [config.accessTokenKey]: accessToken,
    [config.refreshTokenKey]: refreshToken,
  };
};

/**
 * Deletes the access and refresh tokens from the cookies.
 * @returns void
 */
export const deleteTokens = (): void => {
  authStorage.delete(config.accessTokenKey);
  authStorage.delete(config.refreshTokenKey);
};
