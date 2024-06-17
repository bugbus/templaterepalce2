export class Context {
  public result: string;
  public data:Array<Array<string>>
  constructor() {
    this.result = '';
    this.data = [];
  }

  public setData(data:Array<Array<string>>){
    this.data = data;
  }
}