import { Request, Response } from 'express';
import { GetPagesData } from '../services/index';
import { PageRules } from '../validators/pageRules.validators'
import { plainToClass } from 'class-transformer';


import { validate } from "class-validator";


export type IauthData = {
  auth: IAuth;
  cpf: string;
}
export type IAuth ={
  userName: string,
  password: string
}
export class PagesController {
  async find(request: Request, response: Response): Promise<any> {
    const { auth, cpf } = request.body;
    
    const authData = plainToClass(PageRules,{userName:auth.userName, password:auth.password, cpf});
    
    const errors =  await validate(authData)
    
    if(errors.length > 0 ){
      return  response.status(400).send(errors)
    }
    
    try {
      const getPageService = new GetPagesData();

      const getPageData = await getPageService.execute({ auth, cpf });
      
      return response.json(getPageData);

    } catch (error) {
      return response.status(422).json({ error: error });
    }
  }
}
