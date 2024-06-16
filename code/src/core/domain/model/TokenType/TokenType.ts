import { AbstractTokenType } from "./AbstractTokenType";

export class TokenType<T> extends AbstractTokenType<T>{
  // 构造函数  
  constructor(value: string | number, type: T) {
    super(value,type);
  }

  public regExp(): RegExp {
    throw new Error("Method not implemented.");
  }

  public setValue(value: string) {
    this.value = value;
  }

  is(value: string|TokenType<any>){
    if(typeof value === 'string'){
      return this.value === value
    }else{
      return this.type === value.type;
    }
  }

  isStringType(){
    return this.type === '字符串';
  }
}
