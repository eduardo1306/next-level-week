import 'reflect-metadata';
import './database';
import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

export default app;
