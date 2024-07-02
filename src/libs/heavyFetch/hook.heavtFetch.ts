import {useMemo, useState} from 'react';
import {Platform} from 'react-native';
import {refreshAccessToken} from '../auth/api';
import {getTokens} from '../auth/service.storage';
import {fetchWithUploadProgress} from './service.fetchWithUploadProgress';
import {fetchWithUploadProgressRn} from './service.fetchWithUploadProgressRn';

export const useHeavyFetch = () => {
  const [data, setData] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  const fetch = useMemo(() => {
    return ({
      url,
      body,
      method,
    }: {
      url: string;
      body: any;
      method: 'PATCH' | 'POST' | 'GET';
    }) => {
      setIsPending(true);
      setError(null);
      setData(null);
      setProgress(0);

      const fetchFn = (headers?: Record<string, any>) =>
        Platform.OS === 'web'
          ? fetchWithUploadProgress({
              url,
              body,
              method,
              headers,
              onProgress: setProgress,
            })
          : fetchWithUploadProgressRn({
              url,
              body,
              method,
              headers,
              onProgress: setProgress,
            });

      const run: any = async (ifRefresh = false) => {
        const tokens = getTokens();
        const headers = tokens.access_token
          ? {Authorization: `Bearer ${tokens.access_token}`}
          : undefined;
        try {
          const response = await fetchFn(headers);
          setIsPending(false);
          setProgress(100);
          setData(response);
          setError(null);
          return response;
        } catch (err: any) {
          if (!ifRefresh && err.status === 401) {
            const success = await refreshAccessToken();
            if (success) {
              return run(true);
            }
          }
          setIsPending(false);
          setProgress(100);
          setData(null);
          setError(err ?? {});
          return null;
        }
      };

      return run();
    };
  }, []);

  return [{data, isPending, error, progress}, fetch] as const;
};
