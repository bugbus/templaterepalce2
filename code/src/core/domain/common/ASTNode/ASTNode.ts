import { v4 as uuidv4 } from 'uuid';
export namespace ASTNode {

  // export interface ASTNode {
  //   type: string;
  //   value: any;
  // }

  abstract class AbstractASTNode {
    id: string;  // 唯一标识符，可以用于调试或错误报告  
    type: string; // 节点类型，如 Identifier, IfStatement, FunctionDeclaration 等  
    // 源代码中该节点的起始和结束位置（可选，但对于错误报告和调试非常有用）  
    loc?: {
      start: {
        line: number;
        column: number;
      };
      end: {
        line: number;
        column: number;
      };
    };
    children: AbstractASTNode[];  // 子节点列表（根据节点类型，可能为空）  
    data?: any;  // 用于存储与节点相关的额外信息的字段（可选）  

    // 构造函数，用于初始化节点  
    constructor(type: string, loc?: { start: { line: number, column: number }, end: { line: number, column: number } }, children: AbstractASTNode[] = []) {
      this.id = uuidv4()/* 生成唯一ID的逻辑 */ // 例如，可以使用递增的计数器或UUID库  
      this.type = type;
      this.loc = loc;
      this.children = children;
    }

    // 可选的方法，例如遍历子节点、生成字符串表示等  
    traverse(callback: (node: AbstractASTNode) => void) {
      callback(this);
      this.children.forEach(child => child.traverse(callback));
    }

    // 抽象方法，每个子类应该实现自己的toString方法  
    abstract toString(): string;
  }
  export class Block extends AbstractASTNode {
    toString(): string {
      throw new Error('Method not implemented.');
    }
    name: string;
    constructor(name: string, loc?: { start: { line: number, column: number }, end: { line: number, column: number } }) {
      super('Block', loc);
      this.name = name;
    }
  }

  
}

