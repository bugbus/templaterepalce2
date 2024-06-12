import { TokenType } from "../../../../../src/core/domain/common/TokenType/TokenType";

describe('TokenType Test', () => {
  describe('正则表达式验证', () => {
    afterEach(() => {

    });

    it('空白', () => {
      expect(TokenType.空白.regExp()
      ).toEqual(/^\s+/);
    })

    it('标识符', () => {
      expect(TokenType.标识符.regExp()
      ).toEqual(/^[a-zA-Z_][a-zA-Z0-9_]*/);
    })

    it('数字', () => {
      expect(TokenType.数字.regExp()
      ).toEqual(/^\d+(\.\d+)?/);
    })

    it('字符串', () => {
      expect(TokenType.字符串.regExp()
      ).toEqual(/^("(?:\\.|[^"\\])*")|('(?:\\.|[^"\\])*')/);
    })
    it('运算符', () => {
      expect(TokenType.运算符.regExp()
      ).toEqual(/[+\-*/=<>!&|]/);
    })

    // it('分隔符', () => {
    //   expect(TokenType.分隔符.regExp()
    //   ).toEqual(/[+\-*/=<>!&|]/);
    // })


    it('意外字符', () => {
      expect(TokenType.意外字符.regExp()
      ).toEqual(/^./);
    })

  });
});