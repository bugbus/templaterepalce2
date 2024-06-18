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
    const maxRNumber = this.findMaxRNumber(input);
    const maxLineCount = this.getMaxLineCount(data);
    let loopCount = 1;
    let result = ""

    if (maxLineCount > maxRNumber && maxLineCount % maxRNumber === 0) {
      loopCount = maxLineCount / maxRNumber
    }

    for (let i = 0; i < loopCount; i++) {
      const dataslice = this.readInputFile(data).slice(i * maxRNumber, i * maxRNumber + maxRNumber)
      this.extractAllContents(input).forEach(item => {
        if (this.isBlock(item)) {
          result += this.process(item, dataslice)
        } else {
          result += item
        }
      });
    }

    return result;
  }

  public process(str: string, data: Array<Array<string>>): string {
    let out = ""
    this.doAnalysis.execute(
      str,
      data,
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

  public findMaxRNumber2(input: string): number {
    // 正则表达式用于匹配"{c[0-9]+r[0-9]+}" 或 "{r[0-9]+c[0-9]+}" 模式  
    // 并捕获r后面的数字  
    const regex = /\{([rc])(\d+)([rc])(\d+)\}/;
    /\{([rc])(\d+)([rc])\d+\}/g
    let maxRNumber = -1;

    let match;
    while ((match = regex.exec(input)) !== null) {
      // 因为我们可能有两种模式，我们需要检查哪个组被捕获了  
      const [, , rNumber1, rNumber2] = match;
      let rNumber: number;
      if (rNumber1) {
        rNumber = parseInt(rNumber1, 10); // 如果第一个捕获组有值  
      } else {
        rNumber = parseInt(rNumber2, 10); // 如果第二个捕获组有值  
      }
      // 更新最大值  
      if (rNumber > maxRNumber) {
        maxRNumber = rNumber;
      }
    }

    // 如果找到了任何匹配项，则返回最大值，否则返回0  
    return maxRNumber === -1 ? 0 : maxRNumber;
  }

  public findMaxRNumber(input: string): number {
    // 正则表达式，匹配 "{r数字c数字}" 或 "{c数字r数字}" 的模式，并捕获数字  
    const regex = /\{([rc])(\d+)([rc])(\d)+\}/g;
    let maxRValue = 0;
    let match;
    while ((match = regex.exec(input)) !== null) {
      const [, direction1, index1, direction2, index2] = match;
      const rowIndex = direction1 === 'r' ? parseInt(index1, 10) : parseInt(index2, 10);

      if (maxRValue === 0 || rowIndex > maxRValue) {
        maxRValue = rowIndex;
      }
      // 注意：我们不处理 "c" 开头的匹配项，因为我们只关心 "r" 后面的数字  
    }

    return maxRValue;
  }

  public getMaxLineCount(data: string): number {
    // 移除字符串开头和结尾的空白字符，以避免计算不必要的空行  
    data = data.trim();

    // 如果字符串为空，则认为只有一行  
    if (data.length === 0) {
      return 1;
    }

    // 使用正则表达式匹配换行符，并计算匹配到的数量  
    // 这里使用\n来匹配Unix/Linux风格的换行符，或者使用\r\n来匹配Windows风格的换行符  
    // 或者使用[\r\n]来匹配两种风格的换行符  
    const lineCount = (data.match(/\n/g) || []).length;

    // 如果只有一个换行符且其后没有内容，则仍然认为只有一行  
    if (lineCount === 1 && !/\n[^]/.test(data)) {
      return 1;
    }

    // 否则，返回行数（包括第一行）+ 1（因为第一行即使没有换行符也应该被计算在内）  
    return lineCount + 1;
  }

}