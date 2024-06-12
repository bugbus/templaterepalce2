export abstract class AbstractTokenType<T> {
  value: string | number;
  type:T;

  // 构造函数  
  constructor(value: string | number, type: T) {
    this.value = value;
    this.type = type;
  }

  public abstract  regExp(): RegExp;  
  public setValue(value: string) {
    this.value = value;
  }


}
