import { TokenPatterns } from '../domain/common/TokenPatterns';
import { TokenType } from '../domain/common/TokenType/TokenType';
import { IToken } from '../domain/Token/Token';

export class DoInputToToken implements IDoInputToToken {
  private 位置: number = 0;

  public execute(
    input: string,
    outputPort: IDoInputToTokenOutputPort
  ):void {
    const tokens: IToken[] = [];

    // while (this.位置 < input.length) {
    //   identifier = this.match匹配空白字符(input);  
    //   if (identifier) return identifier;


    // }
    const identifier = this.getNextToken(input);

    if (identifier) {
      tokens.push(identifier);
    }
  }

  tokenize(input: string): IToken[] {
    const tokens: IToken[] = [];
    while (this.位置 < input.length) {
      const identifier = this.getNextToken(input);

      if (identifier) {
        tokens.push(identifier);
      }
    }
    return tokens;
  }



  getNextToken(input: string): IToken | null {
    let identifier: IToken | null;

    if (this.match匹配空白字符(input)) return null;

    identifier = this.match标识符(input);
    if (identifier) return identifier;

    identifier = this.match数字(input);
    if (identifier) return identifier;

    identifier = this.match字符串(input);
    if (identifier) return identifier;

    if (this.位置 >= input.length) {
      return null;
    }
    return this.handle意外字符(input);
  }

  public match字符串(input: string): IToken | null {
    const value = input.substring(this.位置)
    const match = TokenPatterns.token[TokenType.字符串].exec(value);
    if (match) {
      const value = match[0];
      this.位置 += value.length;
      return { 类型: TokenType.字符串, 值: value.slice(1,-1) };
    }
    return null;
  }

  public match数字(input: string): IToken | null {
    const value = input.substring(this.位置)
    const match = TokenPatterns.token[TokenType.数字].exec(value);
    if (match) {
      const value = match[0];
      this.位置 += value.length;
      return { 类型: TokenType.数字, 值: value };
    }
    return null;
  }

  public match标识符(input: string): IToken | null {
    const value = input.substring(this.位置)
    const match = TokenPatterns.token[TokenType.标识符].exec(value);
    if (match) {
      const value = match[0];
      this.位置 += value.length;
      return { 类型: TokenType.标识符, 值: value };
    }
    return null;
  }

  public match匹配空白字符(input: string):boolean {
    const value = input.substring(this.位置)

    const match = TokenPatterns.token[TokenType.空白].exec(value);
    if (match) {
      const value = match[0];
      if(value) this.位置 += value.length;
      return true;
    }
    return false;
  }

  public handle意外字符(input: string): IToken {
    return { 类型: TokenType.意外字符, 值: input.charAt(this.位置++) }; 
  }

  public get位置(){
    return this.位置;
  }

  public set位置(num:number){
    this.位置 = num;
  }
}