import {getStateFromPath} from '@react-navigation/native';
import App from '../App.web';
import './style.css';
import {AppRegistry} from 'react-native-web';
import React from 'react';
import {HelmetProvider, HelmetServerState} from 'react-helmet-async';
import {linkingConfig} from '../src/navigation/linking/service.config';

const initialUrl = document.location.pathname + document.location.search;

const initialState = getStateFromPath(initialUrl, linkingConfig);

const helmetContext: {
  helmet?: HelmetServerState | undefined;
} = {};

const WebApp = () => {
  return (
    <HelmetProvider context={helmetContext}>
      <App initialState={{...initialState, stale: false} as any} />
    </HelmetProvider>
  );
};

// register the app
AppRegistry.registerComponent('App', () => WebApp);

AppRegistry.runApplication('App', {
  hydrate: true,
  mode: 'legacy',
  rootTag: document.getElementById('root'),
});
