import { TokenTranslator } from '../src/core/usecase/TokenTranslator';
import { DoAnalysis } from '../src/core/usecase/DoAnalysis';
import { Container } from 'typedi';
import { StatementTranslator } from '../src/core/usecase/StatementTranslator';
import { InterpreterTranslator } from '../src/core/usecase/InterpreterTranslator';

describe('StatementTranslator', () => {
  describe('StatementTranslator', () => {

    it('p_statement', () => {
      const tokenTranslator = Container.get(TokenTranslator);
      const statementTranslator = Container.get(StatementTranslator);
      const interpreterTranslator = Container.get(InterpreterTranslator);
      const doAnalysis = new DoAnalysis(tokenTranslator, statementTranslator, interpreterTranslator);
      const testDataArr = doAnalysis.execute(
        '123{write("1te")}456',
        [],
        {
          onSuccess() { },
          onFailure() { }
        }
      )

    })


  });

});

