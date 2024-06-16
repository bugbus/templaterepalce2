import { TokenTypes } from "../../../../../src/core/domain/model/TokenType/TokenTypes";

describe('TokenTypes Test', () => {
  describe('正则表达式验证', () => {
    afterEach(() => {

    });

    it('空白', () => {
      expect(TokenTypes.空白.regExp()
      ).toEqual(/^\s+/);
    })

    it('标识符', () => {
      expect(TokenTypes.标识符.regExp()
      ).toEqual(/^[a-zA-Z_][a-zA-Z0-9_]*/);
    })

    it('数字', () => {
      expect(TokenTypes.数字.regExp()
      ).toEqual(/^-?\d+(\.\d+)?/);
    })

    it('字符串', () => {
      expect(TokenTypes.字符串.regExp()
      ).toEqual(/^'([^']*)'|"([^"]*)"/);
    })
    it('运算符', () => {
      expect(TokenTypes.运算符.regExp()
      ).toEqual(/[+\-*/=<>!&|]/);
    })

    it('分隔符', () => {
      expect(TokenTypes.分隔符.regExp()
      ).toEqual(/^[(){}:,;]/);
    })

    it('意外字符', () => {
      expect(TokenTypes.意外字符.regExp()
      ).toEqual(/^./);
    })

  });
});