import { StatementTranslator } from "../src/core/usecase/StatementTranslator";
import { TokenTranslator } from "../src/core/usecase/TokenTranslator";
import {Interpreter} from "../src/core/domain/common/Interpret/Interpreter"

describe('StatementTranslator', ()=>{
  describe('StatementTranslator', ()=>{
    const interpreter = new Interpreter();
    it('p_statement', ()=>{
      const tokenTranslator = new TokenTranslator();
      const testDataArr = tokenTranslator.tokenize(
        '{write("test")}'
      )
      const underTest = new StatementTranslator(testDataArr);
      expect(interpreter.interpret([underTest.pBlock()])).toBe("test")

    })
    it('p_statement1', ()=>{
      const tokenTranslator = new TokenTranslator();
      const testDataArr = tokenTranslator.tokenize(
        '{write("te"{write("test")}"st")}'
      )

      const underTest = new StatementTranslator(testDataArr);
      expect(interpreter.interpret([underTest.pBlock()])).toBe("tetestst")
    })
    it('p_statement2', ()=>{
      const tokenTranslator = new TokenTranslator();
      const testDataArr = tokenTranslator.tokenize(
        '{write("1te""2st""3")}'
      )
      const underTest = new StatementTranslator(testDataArr);
    
      expect(interpreter.interpret([underTest.pBlock()])).toBe("1te2st3")
    })
    it('p_statement3', ()=>{
      const tokenTranslator = new TokenTranslator();
      const testDataArr = tokenTranslator.tokenize(
        '{write("1te":10)}'
      )
      const underTest = new StatementTranslator(testDataArr);
    
      expect(interpreter.interpret([underTest.pBlock()])).toBe("1te       ");
    })

    it('p_statement4', ()=>{
      const tokenTranslator = new TokenTranslator();
      const testDataArr = tokenTranslator.tokenize(
        '{write("1te":-10)}'
      )
      const underTest = new StatementTranslator(testDataArr);
    
      expect(interpreter.interpret([underTest.pBlock()])).toBe("       1te");
    })

  });

});