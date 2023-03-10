import 'babel-polyfill';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import {GetPagesData} from './services/index'
import swaggerFile from './documentation/swagger.json'
const swaggerUi = require("swagger-ui-express");
const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));


const getTweetService = new GetPagesData();

app.use(cors());
app.use(express.json());
app.use(routes);
//getTweetService.execute({hashtag})
app.listen(3333, function () {
  console.log(`server running in port 3333`);
});
