import { TokenType } from "./TokenType";

export enum TokenDelimeters {
  左圆括号 = "(",
  右圆括号 = ")",
  左花括号 = "{",
  右花括号 = "}",
  冒号 = ":",
  逗号 = ",",
  分号 = ";",
  DEFAULT = "DEFAULT"
}

export class TokenDelimeter extends TokenType<TokenDelimeters> {
  static 左圆括号: TokenDelimeter = this.newInstance("(", TokenDelimeters.左圆括号);
  static 右圆括号: TokenDelimeter = this.newInstance(")", TokenDelimeters.右圆括号);
  static 左花括号: TokenDelimeter = this.newInstance("{", TokenDelimeters.左花括号);
  static 右花括号: TokenDelimeter = this.newInstance("}", TokenDelimeters.右花括号);
  static 冒号: TokenDelimeter = this.newInstance(":", TokenDelimeters.冒号);
  static 逗号: TokenDelimeter = this.newInstance(",", TokenDelimeters.逗号);
  static 分号: TokenDelimeter = this.newInstance(";", TokenDelimeters.分号);
  static DEFAULT: TokenDelimeter = this.newInstance("DEFAULT", TokenDelimeters.DEFAULT);

  private constructor(value: string | number, type: TokenDelimeters) {
    super(value, type);
  }

  static newInstance(value: string | number, type: TokenDelimeters): TokenDelimeter {
    return new TokenDelimeter(value, type);
  }


  private get分隔符(): RegExp {
    let 分隔符arr = []
    for (const key in TokenDelimeters) {
      if (key != TokenDelimeters.DEFAULT) {
        分隔符arr.push(TokenDelimeters[key as keyof typeof TokenDelimeters]);
      }
    }
    return new RegExp(`^[${分隔符arr.join('')}]`);
    // return /^[(){},;:]/;
  }

  private REGEXP: { [key in any]: RegExp } = {
    [TokenDelimeters.左圆括号]: /^\(/,
    [TokenDelimeters.右圆括号]: /^\)/,
    [TokenDelimeters.左花括号]: /^\{/,
    [TokenDelimeters.右花括号]: /^\}/,
    [TokenDelimeters.冒号]: /^\:/,
    [TokenDelimeters.逗号]: /^\,/,
    [TokenDelimeters.分号]: /^\;/,
    [TokenDelimeters.DEFAULT]: this.get分隔符()
  };

  private VALUE: TokenDelimeter[] = [
    TokenDelimeter.左圆括号,
    TokenDelimeter.右圆括号,
    TokenDelimeter.左花括号,
    TokenDelimeter.右花括号,
    TokenDelimeter.冒号,
    TokenDelimeter.逗号,
    TokenDelimeter.分号
  ]

  public regExp(): RegExp {
    return this.REGEXP[this.type];
  }

  public of(value: string): TokenDelimeter {
    for (const delimiter of this.VALUE) {
      if (delimiter.value === value) {
        return delimiter
      }
    }
    return TokenDelimeter.DEFAULT;
  }
}
