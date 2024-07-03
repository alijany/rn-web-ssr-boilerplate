/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useMemo} from 'react';

import {PortalProvider} from '@gorhom/portal';
import {
  NavigationContainer,
  NavigationState,
  PartialState,
} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {Navigator} from './src/navigation';
import {restoreTokensFromCookies} from './src/libs/auth/service.storage.web';
import {linking} from './src/navigation/linking/service.linking';
import {onAppBootstrap} from './src/libs/notification/service.tokens';

onAppBootstrap();

type ResultState = PartialState<NavigationState> & {
  state?: ResultState;
};

function App({
  initialState,
}: {
  initialState?: ResultState;
}): React.JSX.Element | null {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    restoreTokensFromCookies();
  }, []);

  const notStaledInitialState = useMemo(
    () => (initialState ? {...initialState, stale: false} : undefined),
    [initialState],
  );

  return (
    <View className="h-screen">
      <NavigationContainer
        documentTitle={{
          enabled: false,
        }}
        initialState={notStaledInitialState}
        linking={linking}
        fallback={<Text>loading...</Text>}>
        <PortalProvider>
          <Navigator />
        </PortalProvider>
      </NavigationContainer>
    </View>
  );
}

export default App;
