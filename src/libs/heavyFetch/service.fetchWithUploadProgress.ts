import {objectToFormData} from 'nested-formdata';
import {Req} from './model';

export const fetchWithUploadProgress = ({
  url,
  body,
  headers,
  onProgress,
  method,
}: Req): Promise<any> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    xhr.upload.onprogress = (event: ProgressEvent) => {
      if (event.lengthComputable) {
        const percentComplete = event.loaded / event.total;
        onProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject({status: xhr.status, response: xhr.responseText});
      }
    };

    xhr.onerror = () => {
      reject({status: xhr.status, response: xhr.responseText});
    };

    if (headers) {
      Object.entries(headers).forEach(([key, value]) =>
        xhr.setRequestHeader(key, value),
      );
    }

    const formData = objectToFormData(body);

    xhr.send(formData);
  });
};
