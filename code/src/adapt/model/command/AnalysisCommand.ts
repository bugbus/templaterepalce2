import 'reflect-metadata';
import { Inject, Service } from 'typedi';
import { DoAnalysis } from '../../../core/usecase/DoAnalysis';

export class AnalysisCommand {


  constructor(
    @Inject() private readonly doAnalysis: DoAnalysis,
  ) { }

  public execute(
    input: string,
    data: string
  ): string {
    let result = ""
    this.extractAllContents(input).forEach(item => {
      if (this.isBlock(item)) {
        result += this.process(item, data)
      } else {
        result += item
      }
    });
    return result;
  }

  public process(str: string, data: string): string {
    let out = ""
    this.doAnalysis.execute(
      str,
      this.readInputFile(data),
      {
        onFailure() {

        },
        onSuccess(result: string) {
          out += result
        },
      })
    return out;
  }

  public extractAllContents(str: string): string[] {
    // 使用正则表达式匹配非花括号内容或花括号及其内容  
    // 非捕获组(?:...)用于分组但不捕获该组  
    // 正则表达式解释：  
    //   - ([^{}]+): 匹配一个或多个非花括号字符，并捕获为一个组  
    //   - (\{.*?\}): 匹配一个花括号对及其内容，并捕获为一个组  
    //   - g: 全局匹配，找到所有匹配项  
    const regex = /([^{}]+)|(\{.*?\})/g;
    const matches = str.match(regex) || []; // 如果没有匹配项，则返回空数组  
    return matches;
  }

  private isBlock(str: string): boolean {
    return str.includes('{') && str.includes('}');
  }

  public readInputFile(word: string): Array<Array<string>> {
    const variable: Array<Array<string>> = []; // 使用数组字面量语法  
    const rCol = /\r?\n/g; // 匹配换行符，包括CR LF和LF  
    const rRow = /\t/g; // 匹配制表符  

    word.split(rCol).forEach((str) => {
      if (str.trim() === "") { // 使用trim()去除空白字符  
        return;
      }
      const vartemp: Array<string> = str.split(rRow).map(varitem => varitem.trim()); // 使用map和trim()  
      variable.push(vartemp);
    });

    // 如果需要，您可以取消注释下面的行，但注意这行代码在函数外部没有使用  
    // this.variableMaxRow = variable.length;  

    return variable;
  }

}