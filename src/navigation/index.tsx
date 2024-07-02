import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LoginScreen} from '../components/account/account.screen.login';
import {BottomTabNavigator} from './component.tabNav';
import {RootStackParamList} from './model';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const Navigator: React.FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <RootStack.Group>
        <RootStack.Screen
          name="Auth"
          component={LoginScreen}
          options={{headerShown: false}}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
