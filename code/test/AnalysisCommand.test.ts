import Container from "typedi";
import { DoAnalysis } from "../src/core/usecase/DoAnalysis";
import { AnalysisCommand } from "../src/adapt/model/command/AnalysisCommand";

describe('AnalysisCommand.test', ()=>{
  describe('AnalysisCommand.test', ()=>{

    it('AnalysisCommand1', ()=>{
      const test = '{write("1te""2st""3")}'
      const myClassInstance = Container.get(DoAnalysis);  
      const tokenTranslator = new AnalysisCommand(myClassInstance);
      const result =tokenTranslator.execute(test,"")
      expect(result).toEqual("1te2st3")
    })
    it('AnalysisCommand1', ()=>{
      const test = '123{write("1te")}456'
      const myClassInstance = Container.get(DoAnalysis);  
      const tokenTranslator = new AnalysisCommand(myClassInstance);
      const result =tokenTranslator.execute(test,"")
      expect(result).toEqual('1231te456')
    })

    it('AnalysisCommand1', ()=>{
      const test = '123{write("1te")}456{write("2st")}'
      const myClassInstance = Container.get(DoAnalysis);  
      const tokenTranslator = new AnalysisCommand(myClassInstance);
      const result =tokenTranslator.execute(test,"")
      expect(result).toEqual('1231te4562st')
    })
    // it('AnalysisCommand1', ()=>{
    //   const test = '123{write("1te")}456{c1r2}'
    //   const myClassInstance = Container.get(DoAnalysis);  
    //   const tokenTranslator = new AnalysisCommand(myClassInstance);
    //   const result =tokenTranslator.execute(test,"")
    //   expect(result).toEqual("1231te456")
    // })

  });

  describe('AnalysisCommand.test', ()=>{

    it('AnalysisCommand1', ()=>{
      const test = '{write("1te""2st""3")}'
      const myClassInstance = Container.get(DoAnalysis);  
      const tokenTranslator = new AnalysisCommand(myClassInstance);
      const result =tokenTranslator.extractAllContents(test)
      expect(result).toEqual(["{write(\"1te\"\"2st\"\"3\")}"])
    })
    it('AnalysisCommand2', ()=>{
      const test = '123{write("1te")}456'
      const myClassInstance = Container.get(DoAnalysis);  
      const tokenTranslator = new AnalysisCommand(myClassInstance);
      const result =tokenTranslator.extractAllContents(test)
      expect(result).toEqual(["123","{write(\"1te\")}","456"])
    })

    it('AnalysisCommand3', ()=>{
      const test = '123{write("1te")}456{c1r2}'
      const myClassInstance = Container.get(DoAnalysis);  
      const tokenTranslator = new AnalysisCommand(myClassInstance);
      const result =tokenTranslator.extractAllContents(test)
      expect(result).toEqual(["123","{write(\"1te\")}","456","{c1r2}"])
    })

  });

  describe.only('AnalysisCommand.test', ()=>{

    it('AnalysisCommand1', ()=>{
      const test = '123\t456\n789\t111'
      const myClassInstance = Container.get(DoAnalysis);  
      const tokenTranslator = new AnalysisCommand(myClassInstance);
      const result =tokenTranslator.readInputFile(test)
      expect(result).toEqual([["123","456",],["789","111",],])
    })


  });

});

