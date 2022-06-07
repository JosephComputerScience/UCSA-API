import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from './errorHandler';

/* server setup */
const app = express();
// logger setup
app.use(morgan('combined'));
// parses body to json
app.use(express.json());
// use cors for request
app.use(cors());
// setup error handler
app.use(errorHandler);

export default app;
