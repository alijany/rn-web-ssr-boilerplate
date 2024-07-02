export type Req = {
  url: string;
  body: any;
  onProgress: (progress: number) => void;
  headers?: Record<string, string>;
  method: 'PATCH' | 'POST' | 'GET';
};
