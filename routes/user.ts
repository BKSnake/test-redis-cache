import express, { Request, Response } from 'express';
import { uuid } from 'uuidv4';

import cache from '../cache';
import { random } from '../fakeGenerator';

const route = express.Router();

route.get('/', async(req: Request, res: Response) => {
  const keys = await cache.keys('*');
  res.json(keys);
});

route.get('/:id', async (req: Request, res: Response) => {
  const data = await cache.get(`${req.params.id}`)

  if (!data) {
    console.log('Cache miss');
    const data = random(req.params.id);
    await cache.set(data.id, JSON.stringify(data));
    res.json(data)
  } else {
    console.log('Cache hit”');
    res.json(JSON.parse(data))
  }
});

route.post('/', async (req: Request, res: Response) => {
  const id = uuid();
  const data = {...(req.body || {}), id};

  await cache.set(id, JSON.stringify(data));
  res.json(data);
});

route.put('/:id', async (req: Request, res: Response) => {
  const data = {...(req.body || {}), id: req.params.id};
  if (Object.keys(data).length === 0) {
    res.json({error: 'wrong data'});
    return;
  }

  let isExists = await cache.exists(`${req.params.id}`)

  if (!isExists) {
    res.json({error: 'data not updated'});
    return;
  }

  await cache.set(data.id, JSON.stringify(data));

  res.json(data)
});

route.delete('/:id', async (req: Request, res: Response) => {
  await cache.del(`${req.params.id}`);

  res.json({id: req.params.id});
});

export default route;
