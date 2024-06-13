

import {TokenTypes } from '../domain/common/TokenType/TokenTypes';

import { IToken } from '../domain/Token/Token';

export class StatementTranslator {

  private tokens: IToken[]; // 假设这是从词法分析器获取的token数组  
  private currentIndex = 0; // 当前正在处理的token索引 

  constructor(tokens: IToken[]) {
    this.tokens = tokens;
  }

  public nextToekn(){
    return this.tokens[this.currentIndex++];
  }

  parse(): any {
    return this.p_program();
  }

  private peek(): IToken {
    return this.tokens[this.currentIndex];
  }

  private next(): IToken {
    return this.tokens[this.currentIndex++];
  }

  private expect(token: IToken): void {
    if (!this.peek().eq(token)) {
      throw new Error(`Expected ${token}, but found ${this.peek()}`);
    }
    this.next();
  }

  private parseBlock(): Block {

    this.consumeToken("{");
    const statements: Statement[] = [];
    while (!this.checkToken('right_brace')) {
      statements.push(this.parseStatement());
    }
    this.consumeToken('}');

    return new Block(statements);
  }





  public p_program(p: any[]): void {
    // write_statement : Write write_body
    p[0] = p[1]
  }


  public p_statement_write(p: any[]): void {
    // write_statement : Write write_body
    p[0] = p[1]
  }

  public p_write_body(p: any[]): void {
    // write_body : exprs
    p[0] = p[1]
  }

  public p_exprs(p: any[]): void {
    // exprs : exprs expr
    //       | expr
    if (p.length === 3) {

    }
    p[0] = p[1]
  }

  public p_expr_identifier(p: any[]): void {
    // expr : identifier

    p[0] = p[1]
  }

  public p_expr_constant(p: any[]): void {
    // expr : constant
    this.p_expr_string(p[1])
    p[0] = p[0]
  }

  public p_expr_string(p: any[]): void {
    // constant : string
    p[0] = new ASTNode.Constant('string', p[1]);
  }

  public p_statements(p: any[]): void {
    if (p.length === 3) {
      p[0] = this.ensueArray(p[1]).concat(p[2]);
    } else {
      p[0] = p[1];
    }
  }

  public p_statement(p: any[]): void {
    // statement : if_statement
    p[0] = p[1]
  }


  public p_empty(p: any[]): void {
    return;
  }



  public ensueArray(value: any): any[] {
    return Array.isArray(value) ? value : [value];
  }


    // 检查下一个标记是否为给定类型
    private checkToken(value: string): boolean {
      return this.currentToken().类型.is(value);
    }
  
    // 消耗并返回下一个标记，如果类型不匹配则抛出错误
    private consumeToken(value: string): IToken {
      if (!this.checkToken(value)) {
        throw new Error(`Expected token: ${value}, but got: ${this.currentToken().类型}`);
      }
      return this.nextToken();
    }
  
    // 获取当前标记
    private currentToken(): IToken {
      return this.tokens[this.currentIndex];
    }
  
    // 获取下一个标记并前进
    private nextToken(): IToken {
      return this.tokens[++this.currentIndex];
    }
  
    // 检查是否到达文件末尾
    private isEndOfFile(): boolean {
      return this.currentIndex >= this.tokens.length;
    }
}

