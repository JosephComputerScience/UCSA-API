// external imports
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// local imports
import { router } from './router';
import { errorHandler } from './errorHandler';

/* server setup */
const app = express();
// logger setup
app.use(morgan('combined'));
// parses body to json
app.use(express.json());
// use cors for request
app.use(cors());
// setup v1 routes
app.use('/api', router);
// setup error handler
app.use(errorHandler);

export default app;
