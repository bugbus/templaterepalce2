import { TokenType } from "../domain/common/TokenType/TokenType";
import { IToken, Token } from "../domain/Token/Token";

class TokenTranslator {
  private 位置: number = 0;
  
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
    const match = TokenType.字符串.regExp().exec(value);
    if (match) {
      const value = match[0];
      this.位置 += value.length;
      return new Token(TokenType.字符串, value.slice(1, -1));
    }
    return null;
  }

  public match数字(input: string): IToken | null {
    const value = input.substring(this.位置)
    const match = TokenType.数字.regExp().exec(value);
    if (match) {
      const value = match[0];
      this.位置 += value.length;
      return new Token(TokenType.数字, value);
    }
    return null;
  }

  public match标识符(input: string): IToken | null {
    const value = input.substring(this.位置)
    const match = TokenType.标识符.regExp().exec(value);
    if (match) {
      const value = match[0];
      this.位置 += value.length;
      return new Token(TokenType.标识符, value);
    }
    return null;
  }

  public match分隔符(input: string): IToken | null {
    const value = input.substring(this.位置)
    const match = TokenType.分隔符.regExp().exec(value);
    if (match) {
      const value = match[0];
      this.位置 += value.length;
      return new Token(TokenType.分隔符.of(value), value);
    }
    return null;
  }

  public match匹配空白字符(input: string): boolean {
    const value = input.substring(this.位置)

    const match = TokenType.空白.regExp().exec(value);
    if (match) {
      const value = match[0];
      if (value) this.位置 += value.length;
      return true;
    }
    return false;
  }

  public handle意外字符(input: string): IToken {
    return new Token(TokenType.意外字符, input.charAt(this.位置++));
  }

  public get位置() {
    return this.位置;
  }

  public set位置(num: number) {
    this.位置 = num;
  }
}