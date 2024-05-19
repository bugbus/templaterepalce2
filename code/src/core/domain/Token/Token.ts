import { TokenType } from '../common/TokenType/TokenType'; 

export interface IToken{
  类型:TokenType;
  值:string;
  行号?:string;
  列号?:string;
}

export class Token implements IToken{
  类型:TokenType;
  值:string;
  行号:string;
  列号:string;
  constructor(
    类型:TokenType,
    值:string,
  ) {
    this.类型 = 类型;
    this.值 = 值;
    this.行号 = "0";
    this.列号 = "0";
  }

}