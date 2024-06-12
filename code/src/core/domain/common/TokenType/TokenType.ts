import { AbstractTokenType } from "./AbstractTokenType";
import { TokenDelimeter } from "./TokenDelimeters";

enum TokenTypes {
  空白 = "空白",
  标识符 = "标识符",
  数字 = "数字",
  字符串 = "字符串",
  运算符 = "运算符",
  分隔符 = "分隔符",
  意外字符 = "意外字符"
}

export class TokenType extends AbstractTokenType<TokenTypes> {

  static 空白: TokenType = this.newInstance("", TokenTypes.空白);
  static 标识符: TokenType = this.newInstance("", TokenTypes.标识符);
  static 数字: TokenType = this.newInstance(0, TokenTypes.数字);
  static 字符串: TokenType = this.newInstance("", TokenTypes.字符串);
  static 运算符: TokenType = this.newInstance("", TokenTypes.运算符);
  static 分隔符: TokenDelimeter = TokenDelimeter.DEFAULT;
  static 意外字符: TokenType = this.newInstance("", TokenTypes.意外字符);

  private REGEXP: { [key in any]: RegExp } = {
    [TokenTypes.空白]: /^\s+/,
    [TokenTypes.标识符]: this.get标识符(),
    [TokenTypes.数字]: /^\d+(\.\d+)?/,
    [TokenTypes.字符串]: this.get字符串(), // 简单的双引号字符串，不支持转义  
    [TokenTypes.运算符]: /[+\-*/=<>!&|]/, // 示例操作符集合  
    [TokenTypes.分隔符]: TokenDelimeter.DEFAULT.regExp(), // 示例操作符集合  
    [TokenTypes.意外字符]: /^./, // 示例操作符集合  
    // ... 其他类型的正则表达式  
  };

  public regExp(): RegExp {
    return this.REGEXP[this.type];
  }

  private get标识符(): RegExp {
    return /^[a-zA-Z_][a-zA-Z0-9_]*/;
  }
  private get字符串(): RegExp{
    return /^("(?:\\.|[^"\\])*")|('(?:\\.|[^"\\])*')/;
  }

  private constructor(value: string | number, type: TokenTypes) {
    super(value,type);
  }

  static newInstance(value: string | number, type: TokenTypes): TokenType {
    return new TokenType(value, type);
  }


}