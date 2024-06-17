import { ASTNode } from "../ASTNode/ASTNode";
import { Context } from "./Context";


export interface IInterpreter {
  visitProgram(node: ASTNode.Program,context: Context): void;
  visitBlock(node: ASTNode.Block,context: Context): void;
  visitStatement(node: ASTNode.Statement,context: Context): void;
  visitStringLiteral(node: ASTNode.StringLiteral,context: Context): void;
  visitStringLiteralAge(node: ASTNode.StringLiteralAge,context: Context): void;
  visitText(node: ASTNode.Text,context: Context): void;
  visitIdentifier(node: ASTNode.Identifier,context: Context): void;
}

