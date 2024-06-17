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

  visitIdentifier(node: ASTNode.Identifier, context: Context): void {

    // 正则表达式匹配 {c数字r数字} 或 {r数字c数字}  
    const regex = /([rc])(\d+)([rc])(\d+)/;
    const match = node.value.match(regex);

    if (match && match.length === 5) {
      const [, direction1, index1, direction2, index2] = match;
      const rowIndex = direction1 === 'r' ? parseInt(index1, 10) - 1 : parseInt(index2, 10) - 1;
      const colIndex = direction1 === 'c' ? parseInt(index1, 10) - 1 : parseInt(index2, 10) - 1;

      // 确保索引在数组范围内  
      if (rowIndex >= 0 && rowIndex < context.data.length && colIndex >= 0 && colIndex < context.data[rowIndex].length) {
        if (node.length < 0) {
          context.result += context.data[rowIndex][colIndex].padStart(node.length * -1, ' ')
        } else {
          context.result += context.data[rowIndex][colIndex].padEnd(node.length, ' ')
        }
        // context.result += context.data[rowIndex][colIndex] 
      }

    }


  }

  interpret(nodes: AbstractASTNode[], data: Array<Array<string>>): string {
    const context = new Context();
    context.setData(data);
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