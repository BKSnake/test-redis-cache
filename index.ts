import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny')); // logger of routes


app.get('/', (req: Request, res: Response) => {
  res.send('Well done!');
})


app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
})