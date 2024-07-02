/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {PortalProvider} from '@gorhom/portal';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {Dimensions, I18nManager, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {linking} from './src/navigation/linking/service.linking';
import {requestNotificationPermission} from './src/libs/notification/service.requestPermission';
import {onAppBootstrap} from './src/libs/notification/service.tokens';
import {Navigator} from './src/navigation';

I18nManager.allowRTL(false);

requestNotificationPermission();

onAppBootstrap();

// Handle background messages using setBackgroundMessageHandler
messaging().setBackgroundMessageHandler(async _remoteMessage => {
  console.log('TODO, Update UI to show notifications', _remoteMessage);
});

function App({isHeadless}: {isHeadless: boolean}): React.JSX.Element | null {
  // TODO: App has been launched in the background by iOS, ignorer
  if (isHeadless) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <View style={{height: Dimensions.get('window').height}}>
        <NavigationContainer
          linking={linking}
          fallback={<Text>loading...</Text>}>
          <PortalProvider>
            <Navigator />
          </PortalProvider>
        </NavigationContainer>
      </View>
    </GestureHandlerRootView>
  );
}

export default App;
