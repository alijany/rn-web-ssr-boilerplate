import ReactNativeBlobUtil from 'react-native-blob-util';

type BasicType =
  | string
  | boolean
  | number
  | undefined
  | {
      uri: string;
      type?: string;
      name?: string;
    }
  | null;

type DataObj<T> =
  | BasicType[]
  | {
      [P in keyof T]: BasicType | BasicType[] | Partial<DataObj<T>>;
    };

export function serializeData<
  T extends {
    [key: string | number]: unknown;
  },
>(
  obj: DataObj<T> | Partial<T>,
  form?: Record<string, any>[],
  namespace?: string,
): Record<string, any> {
  const formData = form ?? [];

  const isArr = Array.isArray(obj);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const property = obj[key];
      if (!property) {
        continue;
      }

      const formKey = namespace
        ? isArr
          ? namespace
          : `${namespace}[${key}]`
        : key;

      if (property instanceof Date) {
        formData.push({name: formKey, data: property.toISOString()});
      } else if (typeof property !== 'object') {
        formData.push({name: formKey, data: property.toString()});
      } else if ('uri' in property && typeof property.uri === 'string') {
        formData.push({
          name: formKey,
          filename: property.name,
          type: property.type,
          data: ReactNativeBlobUtil.wrap(property.uri),
        });
      } else if (!('uri' in property)) {
        serializeData(property, formData, formKey);
      }
    }
  }

  return formData;
}
