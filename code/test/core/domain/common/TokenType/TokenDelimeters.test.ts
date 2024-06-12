import { TokenType } from "../../../../../src/core/domain/common/TokenType/TokenType";
import { TokenDelimeter } from "../../../../../src/core/domain/common/TokenType/TokenDelimeters";


describe('TokenDelimeter Test', () => {
  describe('正则表达式验证', () => {


    it('DEFAULT', () => {
      expect(TokenDelimeter.DEFAULT.regExp()
      ).toEqual(/^[(){}:,;]/);
    })

    it('左圆括号', () => {
      expect(TokenDelimeter.左圆括号.regExp()
      ).toEqual(/^\(/);
    })
    it('右圆括号', () => {
      expect(TokenDelimeter.右圆括号.regExp()
      ).toEqual(/^\)/);
    })

    it('左花括号', () => {
      expect(TokenDelimeter.左花括号.regExp()
      ).toEqual(/^\{/);
    })

    it('右花括号', () => {
      expect(TokenDelimeter.右花括号.regExp()
      ).toEqual(/^\}/);
    })

    it('冒号', () => {
      expect(TokenDelimeter.冒号.regExp()
      ).toEqual(/^\:/);
    })

    it('逗号', () => {
      expect(TokenDelimeter.逗号.regExp()
      ).toEqual(/^\,/);
    })

    it('分号', () => {
      expect(TokenDelimeter.分号.regExp()
      ).toEqual(/^\;/);
    })
  });
});