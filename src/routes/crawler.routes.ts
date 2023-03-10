import { Router } from 'express';

import {PagesController} from '../controllers/PagesDataController';

const tweetsRouter = Router();

const pagesController = new PagesController();

tweetsRouter.post('/', pagesController.find);

export default tweetsRouter;
