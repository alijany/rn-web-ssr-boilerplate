import React from 'react';
import {Text} from 'react-native';
import {BottomTabStackProps} from '../../navigation/model';

export const HomeScreen: React.FC<BottomTabStackProps<'Home'>> = () => {
  return <Text>HomeScreen</Text>;
};
