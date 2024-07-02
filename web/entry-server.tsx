import {getStateFromPath} from '@react-navigation/native';
import {Request, Response} from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../App.web';
import {config} from '../config';
import {linkingConfig} from '../src/navigation/linking/service.config';
import {Transform} from 'node:stream';
import {HelmetProvider, HelmetServerState} from 'react-helmet-async';

export async function render(req: Request, res: Response, template: string) {
  const helmetContext: {
    helmet?: HelmetServerState | undefined;
  } = {};

  const initialState = getStateFromPath(req.originalUrl, linkingConfig);

  let didError = false;

  const {pipe, abort} = ReactDOMServer.renderToPipeableStream(
    <HelmetProvider context={helmetContext}>
      <App initialState={{...initialState, stale: false} as any} />,
    </HelmetProvider>,
    {
      onShellReady() {
        res.status(didError ? 500 : 200);

        res.setHeader('Content-Type', 'text/html');

        const {helmet} = helmetContext;

        template.replace(
          '<!--app-head-->',
          `${helmet?.title.toString()}
          ${helmet?.meta.toString()}
          ${helmet?.link.toString()}`,
        );

        res.set({'Content-Type': 'text/html'});

        const transformStream = new Transform({
          transform(chunk, encoding, callback) {
            res.write(chunk, encoding);
            callback();
          },
        });

        const [htmlStart, htmlEnd] = template.split('<!--app-html-->');

        res.write(htmlStart);

        transformStream.on('finish', () => {
          res.end(htmlEnd);
        });

        pipe(transformStream);
      },
      onShellError(error) {
        console.error(error);
        res.status(500);
        res.set({'Content-Type': 'text/html'});
        res.send('<h1>Something went wrong</h1>');
      },
      onError(error) {
        didError = true;
        console.error(error);
      },
    },
  );

  setTimeout(() => {
    abort();
  }, config.abortDelayMs);
}
