import { Request, Response } from 'express';
import { GetPagesData } from '../services/index';
import { PageRules } from '../validators/pageRules.validators'
import { plainToClass } from 'class-transformer';
const getTweetService = new GetPagesData();
import { validate } from "class-validator";


export type IauthData = {
  auth: IAuth;
  cpf: string;
}
export type IAuth ={
  userName: string,
  password: string
}
export default class PagesController {
  async find(request: Request, response: Response): Promise<Response> {
    const { auth, cpf } = request.body;

    const authData = plainToClass(PageRules,{userName:auth.userName, password:auth.password, cpf});

    const errors =  await validate(authData)

    if(errors.length > 0 ){
      response.status(400).send(errors)
    }
    
    try {
      const getPageData = await getTweetService.execute({ auth, cpf });
      return response.json(getPageData);

    } catch (error) {
      return response.status(422).json({ error: error.message });
    }
  }
}
