import 'reflect-metadata';
import { IToken } from "../domain/model/Token/Token";
import { Inject, Service } from 'typedi';
import { TokenTranslator } from "./TokenTranslator";
import { IDoAnalysis } from "../contract/IDoAnalysis"
import { StatementTranslator } from './StatementTranslator';
import { InterpreterTranslator } from './InterpreterTranslator';
import { AbstractASTNode } from '../domain/model/ASTNode/AbstractASTNode';
import { IDoAnalysisOutputPort } from '../contract/OutputPort/IDoAnalysisOutputPort';

@Service()
export class DoAnalysis implements IDoAnalysis {
  constructor(
    @Inject() private readonly tokenTranslator: TokenTranslator,
    @Inject() private readonly statementTranslator: StatementTranslator,
    @Inject() private readonly interpreterTranslator: InterpreterTranslator,
  ) { }

  public execute(
    input: string,
    data:Array<Array<string>>,
    outputPort: IDoAnalysisOutputPort
  ): void {
    // 如果字符串存在{}bolck块，进入语法分析器。
    // 否则返回字符
    let tokens = this.tokenTranslator.tokenize(input);
    let astNode = this.statementTranslator.parse(tokens);
    let result = this.interpreterTranslator.interpret([astNode]);
    outputPort.onSuccess(result);
  }
}


