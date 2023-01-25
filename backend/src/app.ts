import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import 'dotenv/config';

import { route } from './routes';
import { errorsHandler } from './middlewares/errorsHandler';

const app = express();

app.use(express.json());
app.use(cors());

app.use(route);

app.use(errorsHandler);

export { app };
