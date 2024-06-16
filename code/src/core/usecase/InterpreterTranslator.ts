import { Service } from "typedi";
import { AbstractASTNode } from "../domain/model/ASTNode/AbstractASTNode";
import { ASTNode } from "../domain/model/ASTNode/ASTNode";
import { Context } from "../domain/model/Interpret/Context";
import { IInterpreter } from "../domain/model/Interpret/IInterpreter";


// 定义解释器
@Service()  
export class InterpreterTranslator implements IInterpreter {

  // private context: Context;

  // constructor() {
  //   this.context = new Context();
  // }
  visitProgram(node: ASTNode.Program, context: Context): void {
    for (const child of node.children) {
      child.accept(this, context);
    }

  }
  visitBlock(node: ASTNode.Block, context: Context): void {
    for (const child of node.children) {
      child.accept(this, context);
    }

  }
  visitStatement(node: ASTNode.Statement, context: Context): void {
    for (const child of node.children) {
      child.accept(this, context);
    }

  }
  visitStringLiteral(node: ASTNode.StringLiteral, context: Context): void {
    context.result += node.value
  }

  visitStringLiteralAge(node: ASTNode.StringLiteralAge, context: Context): void {
    if (node.length < 0) {
      context.result += node.value.padStart(node.length * -1, ' ')
    } else {
      context.result += node.value.padEnd(node.length, ' ')
    }
  }

  interpret(nodes: AbstractASTNode[]): string {
    const context = new Context();
    nodes.forEach(node => node.accept(this, context));
    return context.result;
  }

  visitText(node: ASTNode.Text, context: Context): void {
    context.result += node.value
  }

  // getResult():string{
  //   return context.result;
  // }
}