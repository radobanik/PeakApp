import express from 'express';
// import cors from 'cors';
import helmet from 'helmet';
import { mainRouter } from './routes';

const app = express();

app.use(express.json());
// TODO cors does not work
// app.use(cors());
app.use(helmet());

// TODO app.use() for configs
app.use(mainRouter);

export default app;
