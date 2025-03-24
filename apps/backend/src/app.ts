import express from 'express';
// import cors from 'cors';
import helmet from 'helmet';
import { mainRouter } from './routes';
import globalControllerErrorHandler from './controllers/utils/globalControllerErrorHandler';

const app = express();

app.use(express.json());
// TODO cors does not work
// app.use(cors());
app.use(helmet());

// TODO app.use() for configs
app.use(mainRouter);

/**
 * default error handler, should be places the last
 */
app.use(globalControllerErrorHandler);

export default app;
