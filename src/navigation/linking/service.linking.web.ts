import {LinkingOptions} from '@react-navigation/native';
import {linkingConfig} from './service.config';
import {RootStackParamList} from '../model';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [],
  config: linkingConfig,
};
