

import { ASTNode } from '../domain/model/ASTNode/ASTNode';
import { IToken } from '../domain/model/Token/Token';
import { TokenType } from '../domain/model/TokenType/TokenType';
import { TokenTypes } from '../domain/model/TokenType/TokenTypes';
import { Service } from 'typedi';

@Service()
export class StatementTranslator {

  private tokens: IToken[] = []; // 假设这是从词法分析器获取的token数组  
  private currentIndex = 0; // 当前正在处理的token索引 

  // constructor(tokens: IToken[]) {
  //   this.tokens = tokens;
  // }

  parse(tokens: IToken[]): ASTNode.Program {
    this.tokens = tokens;
    this.currentIndex = 0;
    return this.p_program();
  }

  // 解析整个程序
  public p_program(): ASTNode.Program {
    const statements: ASTNode.Block[] = [];
    while (!this.isEndOfFile()) {
      if (this.checkToken(TokenTypes.标识符)) {
        statements.push(this.P_text());
      } else if (this.checkToken('{')) {
        statements.push(this.pBlock());
      }
    }
    return new ASTNode.Program(statements);
  }

  public pBlock(): ASTNode.Block {

    this.consumeToken("{");
    const statements: ASTNode.Statement | ASTNode.Identifier[] = [];
    while (!this.checkToken('}')) {
      // if (this.currentToken().类型 === TokenTypes.标识符) {
      //   statements.push(this.p_statement_Identifier());
      // } else if (this.currentToken().类型 === TokenTypes.字符串) {
      //   statements.push(this.p_statement_string());
      // } else {
      //   statements.push(this.pStatement());
      // }
      switch (this.currentToken().类型) {  
        case TokenTypes.标识符:  
          statements.push(this.p_statement_Identifier());  
          break;  
        case TokenTypes.字符串:
          statements.push(this.p_statement_string());  
          break;  
        default:  
          statements.push(this.pStatement());  
          break;  
      }
      // switch (this.currentToken().类型) {
      //   case TokenTypes.标识符:

      //   case TokenTypes.字符串:

      //   default:

      // }
    }
    this.consumeToken('}');
    return new ASTNode.Block(statements);
  }
  public pStatement(): ASTNode.Statement {
    // write_statement : Write write_body
    switch (this.currentToken().类型) {
      // case 'if_keyword':
      //   return this.parseIfStatement();
      // case 'type_keyword':
      //   return this.parseVariableDeclaration();
      case TokenTypes.标识符:
        return new ASTNode.Statement('write', [this.p_statement_Identifier()]);
      case TokenTypes.字符串:
        return new ASTNode.Statement('write', [this.p_statement_string()]);
      case TokenTypes.关键字.WRITE():
        return this.p_statement_write();
      default:
        throw new Error(`Unexpected token: ${this.currentToken().类型}`);
    }
  }

  public p_statement_write(): ASTNode.Statement {
    // write_statement : Write write_body
    this.consumeToken(TokenTypes.关键字.WRITE());
    this.consumeToken('(');
    // const args: (ASTNode.StringLiteral | ASTNode.Expression)[] = [];
    const args: (ASTNode.StringLiteral | ASTNode.Identifier | ASTNode.Block)[] = [];
    while (!this.checkToken(')')) {
      if (this.currentToken().类型 === TokenTypes.字符串) {
        args.push(this.p_statement_string());
      } else if (this.currentToken().类型 === TokenTypes.标识符) {
        args.push(this.p_statement_Identifier());
      }
      else if (this.checkToken('{')) {
        args.push(this.pBlock());
      }

      if (!this.checkToken(')')) {
        // this.consumeToken('comma');
      }
    }
    this.consumeToken(')');
    return new ASTNode.Statement('write', args);
  }

  public p_statement_Identifier(): ASTNode.Identifier {
    const args: (ASTNode.Identifier)[] = [];

    if (this.is带参标识符()) {
      args.push(this.p_expr_Identifier_age());
    } else if (this.currentToken().类型 === TokenTypes.标识符) {
      args.push(this.p_expr_Identifier());
    }

    return args[0];
  }

  public p_statement_string(): ASTNode.StringLiteralAge {
    const args: (ASTNode.StringLiteralAge)[] = [];

    if (this.is带参字符串()) {
      args.push(this.p_expr_string_age());
    } else if (this.currentToken().类型 === TokenTypes.字符串) {
      args.push(this.p_expr_string());
    }

    return args[0];
  }

  //TODO
  private p_expr_Identifier(): ASTNode.Identifier {
    return new ASTNode.Identifier(
      this.consumeToken(TokenTypes.标识符).值,
      ":",
      "0"
    );
  }

  private p_expr_Identifier_age(): ASTNode.Identifier {
    return new ASTNode.Identifier(
      this.consumeToken(TokenTypes.标识符).值,
      this.consumeToken(':').值,
      this.consumeToken(TokenTypes.数字).值
    );
  }

  private p_expr_string_age(): ASTNode.StringLiteralAge {
    return new ASTNode.StringLiteralAge(
      this.consumeToken(TokenTypes.字符串).值,
      this.consumeToken(':').值,
      this.consumeToken(TokenTypes.数字).值
    );
  }

  private p_expr_string(): ASTNode.StringLiteralAge {
    return new ASTNode.StringLiteralAge(
      this.consumeToken(TokenTypes.字符串).值,
      ":",
      "0"
    );
  }

  private P_text(): ASTNode.Text {
    return new ASTNode.Text(this.consumeToken(TokenTypes.标识符).值);
  }

  public ensueArray(value: any): any[] {
    return Array.isArray(value) ? value : [value];
  }


  // 检查下一个标记是否为给定类型
  private checkToken(value: string | TokenType<any>): boolean {
    return this.currentToken().类型.is(value);
  }

  // 对当前标记做类型检查，如果通过则返回当前标记的值，并消耗当前标记
  private consumeToken(type: string | TokenType<any>): IToken {
    const 当前标记 = this.currentToken()
    if (!this.checkToken(type)) {
      throw new Error(`Expected token: ${JSON.stringify(type, null, 2)}, but got: ${JSON.stringify(this.currentToken(), null, 2)}`);

    }
    this.nextToken();
    return 当前标记;
  }

  // 获取当前标记
  private currentToken(): IToken {
    return this.tokens[this.currentIndex];
  }

  // 获取下一个标记并前进
  private nextToken(): IToken {
    return this.tokens[++this.currentIndex];
  }

  private is带参字符串(): boolean {
    let tempcurrentIndex = this.currentIndex
    return this.currentToken().类型 === TokenTypes.字符串 &&
      this.tokens[++tempcurrentIndex].类型 === TokenTypes.分隔符.冒号() &&
      this.tokens[++tempcurrentIndex].类型 === TokenTypes.数字
  }
  private is带参标识符(): boolean {
    let tempcurrentIndex = this.currentIndex
    return this.currentToken().类型 === TokenTypes.标识符 &&
      this.tokens[++tempcurrentIndex].类型 === TokenTypes.分隔符.冒号() &&
      this.tokens[++tempcurrentIndex].类型 === TokenTypes.数字
  }
  // 检查是否到达文件末尾
  private isEndOfFile(): boolean {
    return this.currentIndex >= this.tokens.length;
  }
}

