import { json, urlencoded } from 'body-parser';
import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { prisma } from '@repo/database';

export const createServer = (): Express => {
  console.log(prisma.user.fields);

  const app = express();
  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get('/message/:name', (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get('/status', (_, res) => {
      return res.json({ ok: true });
    });

  return app;
};
