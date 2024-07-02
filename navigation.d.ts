import {RootStackParamList} from './src/components/navigator/model';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
