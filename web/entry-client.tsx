import {getStateFromPath} from '@react-navigation/native';
import App from '../App.web';
import './style.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {HelmetProvider, HelmetServerState} from 'react-helmet-async';
import {linkingConfig} from '../src/navigation/linking/service.config';

const initialUrl = document.location.pathname + document.location.search;

const initialState = getStateFromPath(initialUrl, linkingConfig);

const helmetContext: {
  helmet?: HelmetServerState | undefined;
} = {};

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <HelmetProvider context={helmetContext}>
    <App initialState={initialState} />
  </HelmetProvider>,
);
