import { TokenType } from "./TokenType";

export enum TokenKeywords {
  WRITE = "write",
  DEFAULT = "DEFAULT"
}

export class TokenKeyword extends TokenType<TokenKeywords> {
  static _WRITE: TokenKeyword;
  static _DEFAULT: TokenKeyword;

  static {
    TokenKeyword._WRITE = this.newInstance("write", TokenKeywords.WRITE);
    TokenKeyword._DEFAULT = this.newInstance("DEFAULT", TokenKeywords.DEFAULT);
  }

  private constructor(value: string | number, type: TokenKeywords) {
    super(value, type);
  }

  static newInstance(value: string | number, type: TokenKeywords): TokenKeyword {
    return new TokenKeyword(value, type);
  }

  private static get关键字(): RegExp {
    let 关键字arr = []
    for (const key in TokenKeywords) {
      if (key != TokenKeywords.DEFAULT) {
        关键字arr.push(TokenKeywords[key as keyof typeof TokenKeywords]);
      }
    }
    return new RegExp(`^(${关键字arr.join('|')})`);
    // return /^[(){},;:]/;
  }

  private static REGEXP: { [key in any]: RegExp } = {
    [TokenKeywords.WRITE]: /^write/,
    [TokenKeywords.DEFAULT]: this.get关键字()
  };

  private static VALUE: TokenKeyword[] = [
    TokenKeyword._WRITE,
  ]

  public regExp(): RegExp {
    return TokenKeyword.REGEXP[this.type];
  }

  public of(value: string): TokenKeyword {
    for (const delimiter of TokenKeyword.VALUE) {
      if (delimiter.value === value) {
        return delimiter
      }
    }
    return TokenKeyword._DEFAULT;
  }

  public WRITE(): TokenKeyword {
    return TokenKeyword._WRITE;
  }

  public static DEFAULT(): TokenKeyword {
    return TokenKeyword._DEFAULT;
  }
}