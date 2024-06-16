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
  static _左圆括号: TokenDelimeter;
  static _右圆括号: TokenDelimeter;
  static _左花括号: TokenDelimeter;
  static _右花括号: TokenDelimeter;
  static _冒号: TokenDelimeter;
  static _逗号: TokenDelimeter;
  static _分号: TokenDelimeter;
  static _DEFAULT: TokenDelimeter;

  static {
    TokenDelimeter._左圆括号 = this.newInstance("(", TokenDelimeters.左圆括号);
    TokenDelimeter._右圆括号 = this.newInstance(")", TokenDelimeters.右圆括号);
    TokenDelimeter._左花括号 = this.newInstance("{", TokenDelimeters.左花括号);
    TokenDelimeter._右花括号 = this.newInstance("}", TokenDelimeters.右花括号);
    TokenDelimeter._冒号 = this.newInstance(":", TokenDelimeters.冒号);
    TokenDelimeter._逗号 = this.newInstance(",", TokenDelimeters.逗号);
    TokenDelimeter._分号 = this.newInstance(";", TokenDelimeters.分号);
    TokenDelimeter._DEFAULT = this.newInstance("DEFAULT", TokenDelimeters.DEFAULT);
  }

  private constructor(value: string | number, type: TokenDelimeters) {
    super(value, type);
  }

  static newInstance(value: string | number, type: TokenDelimeters): TokenDelimeter {
    return new TokenDelimeter(value, type);
  }


  private static get分隔符(): RegExp {
    let 分隔符arr = []
    for (const key in TokenDelimeters) {
      if (key != TokenDelimeters.DEFAULT) {
        分隔符arr.push(TokenDelimeters[key as keyof typeof TokenDelimeters]);
      }
    }
    return new RegExp(`^[${分隔符arr.join('')}]`);
    // return /^[(){},;:]/;
  }

  private static REGEXP: { [key in any]: RegExp } = {
    [TokenDelimeters.左圆括号]: /^\(/,
    [TokenDelimeters.右圆括号]: /^\)/,
    [TokenDelimeters.左花括号]: /^\{/,
    [TokenDelimeters.右花括号]: /^\}/,
    [TokenDelimeters.冒号]: /^\:/,
    [TokenDelimeters.逗号]: /^\,/,
    [TokenDelimeters.分号]: /^\;/,
    [TokenDelimeters.DEFAULT]: this.get分隔符()
  };

  private static VALUE: TokenDelimeter[] = [
    TokenDelimeter._左圆括号,
    TokenDelimeter._右圆括号,
    TokenDelimeter._左花括号,
    TokenDelimeter._右花括号,
    TokenDelimeter._冒号,
    TokenDelimeter._逗号,
    TokenDelimeter._分号
  ]

  public regExp(): RegExp {
    return TokenDelimeter.REGEXP[this.type];
  }

  public of(value: string): TokenDelimeter {
    for (const delimiter of TokenDelimeter.VALUE) {
      if (delimiter.value === value) {
        return delimiter
      }
    }
    return TokenDelimeter._DEFAULT;
  }

  public 左圆括号(): TokenDelimeter {
    return TokenDelimeter._左圆括号;
  }
  public 右圆括号(): TokenDelimeter {
    return TokenDelimeter._右圆括号;
  }
  public 左花括号(): TokenDelimeter {
    return TokenDelimeter._左花括号;
  }
  public 右花括号(): TokenDelimeter {
    return TokenDelimeter._右花括号;
  }
  public 冒号(): TokenDelimeter {
    return TokenDelimeter._冒号;
  }
  public 逗号(): TokenDelimeter {
    return TokenDelimeter._逗号;
  }
  public 分号(): TokenDelimeter {
    return TokenDelimeter._分号;
  }
  public static DEFAULT(): TokenDelimeter {
    return TokenDelimeter._DEFAULT;
  }
}
