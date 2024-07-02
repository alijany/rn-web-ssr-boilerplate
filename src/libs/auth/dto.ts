import {z} from 'zod';
import {config} from '../../../config';

export const tokenValidation = z.object({
  [config.accessTokenKey]: z.string(),
  [config.refreshTokenKey]: z.string(),
});
