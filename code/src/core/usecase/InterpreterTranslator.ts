class InterpreterTranslator {  
  interpret(rootNode: ASTNode): void {  
    const context = new Context();  
    const visitor = new Interpreter(context);  
    rootNode.accept(visitor);  
  }  
}