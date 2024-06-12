
import { TokenPatterns } from '../domain/common/TokenPatterns';
import { TokenType } from '../domain/common/TokenType/TokenType';
import { IToken } from '../domain/Token/Token';
import { Token } from '../domain/Token/Token';


export class DoInputToToken implements IDoInputToToken {


  public execute(
    input: string,
    outputPort: IDoInputToTokenOutputPort
  ): void {
    const tokens: IToken[] = [];

    // while (this.位置 < input.length) {
    //   identifier = this.match匹配空白字符(input);  
    //   if (identifier) return identifier;


    // }
    const identifier = this.getNextToken(input);

    if (identifier) {
      tokens.push(identifier);
    }
  }


}