import { Router } from 'express';
import tweetsRouter from './crawler.routes';
const routes = Router();

routes.use('/crawler', tweetsRouter);

export default routes;
