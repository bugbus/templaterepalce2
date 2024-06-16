
import { Context } from "../Interpret/Context";
import { IInterpreter } from "../Interpret/IInterpreter";
import { AbstractASTNode } from "./AbstractASTNode";

export namespace ASTNode {


  export class Program extends AbstractASTNode {
    constructor(children: AbstractASTNode[], loc?: { start: { line: number, column: number }, end: { line: number, column: number } }) {
      super('Block', loc);
      this.children = children;
    }

    accept(visitor: IInterpreter, context: Context): void {
      visitor.visitProgram(this, context);
    }
  }

  export class Block extends AbstractASTNode {
    constructor(children: AbstractASTNode[], loc?: { start: { line: number, column: number }, end: { line: number, column: number } }) {
      super('Block', loc);
      this.children = children;
    }

    accept(visitor: IInterpreter, context: Context): void {
      visitor.visitBlock(this, context);
    }
  }

  export class Statement extends AbstractASTNode {
    name: string;

    constructor(name: string, children: AbstractASTNode[], loc?: { start: { line: number, column: number }, end: { line: number, column: number } }) {
      super('Statement', loc);
      this.name = name;
      this.children = children;
    }
    accept(visitor: IInterpreter, context: Context): void {
      visitor.visitStatement(this, context);
    }
  }

  export class Expression extends AbstractASTNode {
    accept(visitor: IInterpreter, context: Context): void {
      throw new Error("Method not implemented.");
    }


    constructor(children: AbstractASTNode[], loc?: { start: { line: number, column: number }, end: { line: number, column: number } }) {
      super('Expression', loc);
      this.children = children;
    }
  }

  export class StringLiteral extends AbstractASTNode {
    value: string;

    constructor(value: string, loc?: { start: { line: number, column: number }, end: { line: number, column: number } }) {
      super('StringLiteral', loc);
      this.value = value;
      this.children = [];
    }
    accept(visitor: IInterpreter, context: Context): void {
      visitor.visitStringLiteral(this, context);
    }
  }

  export class StringLiteralAge extends AbstractASTNode {
    value: string;
    length: number = 0;

    constructor(value: string, temp: string, length: string, loc?: { start: { line: number, column: number }, end: { line: number, column: number } }) {
      super('StringLiteral', loc);
      this.value = value;

      this.length = Number(length);
      this.children = [];
    }
    accept(visitor: IInterpreter, context: Context): void {
      visitor.visitStringLiteralAge(this, context);
    }
  }

  export class Text extends AbstractASTNode {
    value: string;

    constructor(value: string, loc?: { start: { line: number, column: number }, end: { line: number, column: number } }) {
      super('Text', loc);
      this.value = value;
    }
    accept(visitor: IInterpreter, context: Context): void {
      visitor.visitText(this, context);
    }
  }
}

