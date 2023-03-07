import { Router } from 'express';

import TweetController from '../controllers/PagesDataController';

const tweetsRouter = Router();

const tweetController = new TweetController();

tweetsRouter.post('/', tweetController.find);

export default tweetsRouter;
