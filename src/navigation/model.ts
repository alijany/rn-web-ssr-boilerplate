import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type BottomTabParamList = {
  Home: undefined;
  Forum: {page?: number; isBookmarked?: boolean} | undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<BottomTabParamList>;
  Auth: undefined | {required?: boolean};
};

export type RootScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type BottomTabStackProps<Screen extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
