import {getStateFromPath} from '@react-navigation/native';
import compression from 'compression';
import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import fs from 'fs/promises';
import jwt from 'jsonwebtoken';
import path, {dirname} from 'path';
import serveStatic from 'serve-static';
import {fileURLToPath} from 'url';
import {createServer as createViteServer} from 'vite';
import {config} from '../config';

export type ResultState = ReturnType<typeof getStateFromPath>;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resolve = (p: string) => path.resolve(__dirname, p);

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: {middlewareMode: true},
    appType: 'custom',
    logLevel: 'info',
    root: 'dist',
    optimizeDeps: {include: []},
  });

  app.use(vite.middlewares);
  const assetsDir = resolve('public');
  const requestHandler = express.static(assetsDir);
  app.use(requestHandler);
  app.use('/public', requestHandler);
  app.use(compression());
  app.use(
    serveStatic(resolve('client'), {
      index: false,
    }),
  );

  const baseTemplate = await fs.readFile(resolve('client/index.html'), 'utf-8');

  const productionBuildPath = path.join(
    __dirname,
    './server/web/entry-server.mjs',
  );
  const buildModule = productionBuildPath;
  const {render} = (await vite.ssrLoadModule(buildModule)) as {
    render(req: Request, res: Response, template: string): Promise<void>;
  };

  const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const matchedRoute = config.routePermissions.find(route =>
      req.originalUrl.startsWith(route.path),
    );
    if (!matchedRoute) {
      return next();
    }
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send('Access Denied. No token provided.');
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      if (matchedRoute?.needRoles === false) {
        return next();
      }
      let roles: string[] = [];
      if (typeof decoded === 'object') {
        roles = decoded.roles ?? [];
      }
      const hasRequiredRole = matchedRoute?.roles.some(role =>
        roles.includes(role),
      );
      if (!hasRequiredRole) {
        return res
          .status(403)
          .send('Access Denied. You do not have the required role.');
      }
      return next();
    } catch (error) {
      return res.status(400).send('Invalid Token.');
    }
  };

  app.use(
    '*',
    authenticate,
    async (req: Request, res: Response, next: NextFunction) => {
      const url = req.originalUrl;
      try {
        const template = await vite.transformIndexHtml(url, baseTemplate);
        return render(req, res, template);
      } catch (e: any) {
        console.log(e.stack);
        next(e);
      }
    },
  );

  const port = process.env.PORT || 7456;

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`App is listening on http://localhost:${port}`);
  });
}

createServer();
