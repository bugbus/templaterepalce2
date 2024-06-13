import { TokenDelimeter } from "./TokenDelimeters";
import { TokenType } from "./TokenType";

enum TokenAllType {
  空白 = "空白",
  标识符 = "标识符",
  数字 = "数字",
  字符串 = "字符串",
  运算符 = "运算符",
  分隔符 = "分隔符",
  意外字符 = "意外字符"
}

export class TokenTypes extends TokenType<TokenAllType> {

  static 空白: TokenTypes = this.newInstance("", TokenAllType.空白);
  static 标识符: TokenTypes = this.newInstance("", TokenAllType.标识符);
  static 数字: TokenTypes = this.newInstance(0, TokenAllType.数字);
  static 字符串: TokenTypes = this.newInstance("", TokenAllType.字符串);
  static 运算符: TokenTypes = this.newInstance("", TokenAllType.运算符);
  static 分隔符: TokenDelimeter = TokenDelimeter.DEFAULT();
  static 意外字符: TokenTypes = this.newInstance("", TokenAllType.意外字符);

  private REGEXP: { [key in any]: RegExp } = {
    [TokenAllType.空白]: /^\s+/,
    [TokenAllType.标识符]: this.get标识符(),
    [TokenAllType.数字]: /^\d+(\.\d+)?/,
    [TokenAllType.字符串]: this.get字符串(), // 简单的双引号字符串，不支持转义  
    [TokenAllType.运算符]: /[+\-*/=<>!&|]/, // 示例操作符集合  
    [TokenAllType.分隔符]: TokenDelimeter.DEFAULT().regExp(), // 示例操作符集合  
    [TokenAllType.意外字符]: /^./, // 示例操作符集合  
    // ... 其他类型的正则表达式  
  };

  public regExp(): RegExp {
    return this.REGEXP[this.type];
  }

  private get标识符(): RegExp {
    return /^[a-zA-Z_][a-zA-Z0-9_]*/;
  }
  private get字符串(): RegExp{
    // return /^("(?:\\.|[^"\\])*")|('(?:\\.|[^"\\])*')/;
    return /^'([^']*)'|"([^"]*)"/
  }

  private constructor(value: string | number, type: TokenAllType) {
    super(value,type);
  }

  static newInstance(value: string | number, type: TokenAllType): TokenTypes {
    return new TokenTypes(value, type);
  }


}