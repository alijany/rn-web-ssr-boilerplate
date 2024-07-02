import ReactNativeBlobUtil from 'react-native-blob-util';
import {Req} from './model';
import {serializeData} from './service.serialize';

export const fetchWithUploadProgressRn = ({
  url,
  body,
  headers = {},
  onProgress,
  method,
}: Req): Promise<any> => {
  return new Promise((resolve, reject) => {
    const req = serializeData(body);

    const fetchExp = ReactNativeBlobUtil.fetch(
      method,
      url,
      {
        ...headers,
        'Content-Type': 'multipart/form-data',
      },
      req,
    );

    fetchExp.uploadProgress({interval: 250}, (written, total) => {
      onProgress((written / total) * 100);
    });

    fetchExp
      .then(response => {
        if (
          response.respInfo.status >= 200 &&
          response.respInfo.status <= 300
        ) {
          resolve(response.json());
        } else {
          reject(response);
        }
      })
      .catch(reject);
  });
};
