import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import {ForumScreen} from '../components/forum/forum.screen.main';
import {HomeScreen} from '../components/home/home.screen.main';
import {BottomTabParamList} from './model';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator: React.FC = () => {
  return (
    <BottomTab.Navigator backBehavior={'initialRoute'}>
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Forum" component={ForumScreen} />
    </BottomTab.Navigator>
  );
};
