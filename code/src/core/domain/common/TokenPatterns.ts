import { TokenDelimeters } from './TokenType/TokenDelimeters';
import { TokenIdentifier } from './TokenType/TokenIdentifier';
import { TokenType } from './TokenType/TokenType';

export class TokenPatterns {

  static token: { [key in TokenType]: RegExp } = {
    [TokenType.空白]: /^\s+/,
    [TokenType.标识符]: this.get标识符(),
    [TokenType.数字]: /^\d+(\.\d+)?/,
    [TokenType.字符串]: this.get字符串(), // 简单的双引号字符串，不支持转义  
    [TokenType.运算符]: /[+\-*/=<>!&|]/, // 示例操作符集合  
    [TokenType.分隔符]: this.get分隔符(), // 示例操作符集合  

    [TokenType.意外字符]: /^./, // 示例操作符集合  
    // ... 其他类型的正则表达式  
  };

  static 逻辑运算符: { [key in TokenIdentifier]: RegExp } = {
    [TokenIdentifier.等于]: /^==/,

  };

  static 分隔符: { [key in TokenDelimeters]: RegExp } = {
    [TokenDelimeters.左圆括号]: /^\(/,
    [TokenDelimeters.右圆括号]: /^\)/,
    [TokenDelimeters.左花括号]: /^\{/,
    [TokenDelimeters.右花括号]: /^\}/,
    [TokenDelimeters.逗号]: /^\,/,
    [TokenDelimeters.冒号]: /^\;/,
    [TokenDelimeters.分号]: /^\:/,
  };

  static get标识符(): RegExp {
    return /^[a-zA-Z_][a-zA-Z0-9_]*/;
  }

  static get字符串(): RegExp{
    return /^("(?:\\.|[^"\\])*")|('(?:\\.|[^"\\])*')/;
  }

  static get分隔符(): RegExp{
    let 分隔符arr = []
    for (const value in TokenDelimeters){
      分隔符arr.push(value);
    }
    return new RegExp(`^[${分隔符arr.join('')}]`);
    // return /^[(){},;:]/;
  }  

  
}