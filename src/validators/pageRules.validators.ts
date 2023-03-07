import {isString,IsNotEmpty,isNotEmptyObject,} from 'class-validator'
export class PageRules {
  @IsNotEmpty({message:"Cpf Não pode ser vazio"}) 
  cpf: string | undefined;

  @IsNotEmpty({message:"Nome de usuario Não pode ser vazio"})
  userName: string | undefined;

  @IsNotEmpty({message:"senha Não pode ser vazio"})
  password: Object | undefined;
}

