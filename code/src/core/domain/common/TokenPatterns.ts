import { EnumTokenDelimeters } from './TokenType/TokenDelimeters';
import { EnumTokenIdentifier } from './TokenType/TokenIdentifier';
import { EnumTokenType } from './TokenType/TokenType';

export class TokenPatterns {



  static token: { [key in any]: RegExp } = {
    [EnumTokenType.空白]: /^\s+/,
    [EnumTokenType.标识符]: this.get标识符(),
    [EnumTokenType.数字]: /^\d+(\.\d+)?/,
    [EnumTokenType.字符串]: this.get字符串(), // 简单的双引号字符串，不支持转义  
    [EnumTokenType.运算符]: /[+\-*/=<>!&|]/, // 示例操作符集合  
    [EnumTokenType.分隔符]: this.get分隔符(), // 示例操作符集合  
    [EnumTokenType.意外字符]: /^./, // 示例操作符集合  
    // ... 其他类型的正则表达式  
  };

  static 逻辑运算符: { [key in EnumTokenIdentifier]: RegExp } = {
    [EnumTokenIdentifier.等于]: /^==/,
  };

  static 分隔符: { [key in EnumTokenDelimeters]: RegExp } = {
    [EnumTokenDelimeters.左圆括号]: /^\(/,
    [EnumTokenDelimeters.右圆括号]: /^\)/,
    [EnumTokenDelimeters.左花括号]: /^\{/,
    [EnumTokenDelimeters.右花括号]: /^\}/,
    [EnumTokenDelimeters.逗号]: /^\,/,
    [EnumTokenDelimeters.冒号]: /^\;/,
    [EnumTokenDelimeters.分号]: /^\:/,
  };


  static get标识符(): RegExp {
    return /^[a-zA-Z_][a-zA-Z0-9_]*/;
  }

  static get字符串(): RegExp{
    return /^("(?:\\.|[^"\\])*")|('(?:\\.|[^"\\])*')/;
  }

  static get分隔符(): RegExp{
    let 分隔符arr = []
    for (const value in EnumTokenDelimeters){
      分隔符arr.push(value);
    }
    return new RegExp(`^[${分隔符arr.join('')}]`);
    // return /^[(){},;:]/;
  }  

  
}