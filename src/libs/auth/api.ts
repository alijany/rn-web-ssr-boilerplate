import axios, {RawAxiosRequestHeaders, type AxiosResponse} from 'axios';
import {config} from '../../../config';
import {tokenValidation} from './dto';
import {getTokens, setTokens} from './service.storage';

export const refreshAccessToken = async () => {
  const {
    [config.refreshTokenKey]: refreshToken,
    [config.accessTokenKey]: accessToken,
  } = getTokens();
  if (!refreshToken) {
    return false;
  }

  const headers: RawAxiosRequestHeaders = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const {data} = await axios.post<void, AxiosResponse<unknown>>(
    '/auth/v1/refresh',
    {refreshToken},
    {
      headers,
      baseURL: config.baseUrl,
    },
  );
  const token = tokenValidation.safeParse(data);
  if (token.success) {
    setTokens(token.data);
    return true;
  }
  return false;
};
