import { StatementTranslator } from "../src/core/usecase/StatementTranslator";
import { TokenTranslator } from "../src/core/usecase/TokenTranslator";
import { InterpreterTranslator } from "../src/core/usecase/InterpreterTranslator"

describe('StatementTranslator', () => {
  describe('StatementTranslator', () => {
    const interpreter = new InterpreterTranslator();

    it('p_statement', () => {
      const tokenTranslator = new TokenTranslator();
      const testDataArr = tokenTranslator.tokenize(
        '{write("1te")}'
      )
      const underTest = new StatementTranslator();

      expect(interpreter.interpret([underTest.parse(testDataArr)], [])).toBe("1te")

    })

    it('p_statement', () => {
      const tokenTranslator = new TokenTranslator();
      const testDataArr = tokenTranslator.tokenize(
        '{write("test")}'
      )
      const underTest = new StatementTranslator();

      expect(interpreter.interpret([underTest.parse(testDataArr)], [])).toBe("test")

    })
    it('p_statement1', () => {
      const tokenTranslator = new TokenTranslator();
      const testDataArr = tokenTranslator.tokenize(
        '{write("te"{write("test")}"st")}'
      )

      const underTest = new StatementTranslator();

      expect(interpreter.interpret([underTest.parse(testDataArr)], [])).toBe("tetestst")
    })
    it('p_statement2', () => {
      const tokenTranslator = new TokenTranslator();
      const testDataArr = tokenTranslator.tokenize(
        '{write("1te""2st""3")}'
      )
      const underTest = new StatementTranslator();

      expect(interpreter.interpret([underTest.parse(testDataArr)], [])).toBe("1te2st3")
    })
    it('p_statement3', () => {
      const tokenTranslator = new TokenTranslator();
      const testDataArr = tokenTranslator.tokenize(
        '{write("1te":10)}'
      )
      const underTest = new StatementTranslator();

      expect(interpreter.interpret([underTest.parse(testDataArr)], [])).toBe("1te       ");
    })

    it('p_statement4', () => {
      const tokenTranslator = new TokenTranslator();
      const testDataArr = tokenTranslator.tokenize(
        '{write("1te":-10)}'
      )
      const underTest = new StatementTranslator();

      expect(interpreter.interpret([underTest.parse(testDataArr)], [])).toBe("       1te");
    })

    it('p_statement5', () => {
      const tokenTranslator = new TokenTranslator();
      const testDataArr = tokenTranslator.tokenize(
        'asdfqwer'
      )
      const underTest = new StatementTranslator();

      expect(interpreter.interpret([underTest.parse(testDataArr)], [])).toBe("asdfqwer");
    })

    it('p_statement6', () => {
      const tokenTranslator = new TokenTranslator();
      const testDataArr = tokenTranslator.tokenize(
        'asdf{write("1te":-10)}qwer'
      )
      const underTest = new StatementTranslator();

      expect(interpreter.interpret([underTest.parse(testDataArr)], [])).toBe("asdf       1teqwer");
    })

  });

  describe('p_statement', () => {
    const interpreter = new InterpreterTranslator();
    const testarr: string[][] = [
      ["10", "20", "30"],
      ["40", "50", "60"],
    ];
    it('p_statement7', () => {
      const tokenTranslator = new TokenTranslator();
      const testDataArr = tokenTranslator.tokenize(
        'asdf{c1r1}qwer'
      )
      const underTest = new StatementTranslator();

      expect(interpreter.interpret([underTest.parse(testDataArr)], testarr)).toBe("asdf10qwer");
    })
    it('p_statement7', () => {
      const tokenTranslator = new TokenTranslator();
      const testDataArr = tokenTranslator.tokenize(
        'asdf{r2c1}qwer'
      )
      const underTest = new StatementTranslator();

      expect(interpreter.interpret([underTest.parse(testDataArr)], testarr)).toBe("asdf40qwer");
    })
    it('p_statement7', () => {
      const tokenTranslator = new TokenTranslator();
      const testDataArr = tokenTranslator.tokenize(
        'asdf{r2c1:50}qwer'
      )
      const underTest = new StatementTranslator();

      expect(interpreter.interpret([underTest.parse(testDataArr)], testarr)).toBe("asdf40                                                qwer");
    })

  });


});