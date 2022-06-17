import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import cache from './cache';

import user from './routes/user';

import { fillData } from './fakeGenerator';

fillData();

const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny')); // logger of routes

app.use('/user', user);

app.delete('/cache', async(req: Request, res: Response) => {
  await cache.flushall();
  res.send('');
});

app.get('/', (req: Request, res: Response) => {
  res.send('Well done!');
})


app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
})