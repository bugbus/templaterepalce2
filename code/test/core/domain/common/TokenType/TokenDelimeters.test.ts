import { TokenDelimeter } from "../../../../../src/core/domain/model/TokenType/TokenDelimeters";


describe('TokenDelimeter Test', () => {
  describe('正则表达式验证', () => {
    const underTest = TokenDelimeter.DEFAULT()
    it('DEFAULT', () => {
      expect(underTest.regExp()
      ).toEqual(/^[(){}:,;]/);
    })

    it('左圆括号', () => {
      expect(underTest.左圆括号().regExp()
      ).toEqual(/^\(/);
    })
    it('右圆括号', () => {
      expect(underTest.右圆括号().regExp()
      ).toEqual(/^\)/);
    })

    it('左花括号', () => {
      expect(underTest.左花括号().regExp()
      ).toEqual(/^\{/);
    })

    it('右花括号', () => {
      expect(underTest.右花括号().regExp()
      ).toEqual(/^\}/);
    })

    it('冒号', () => {
      expect(underTest.冒号().regExp()
      ).toEqual(/^\:/);
    })

    it('逗号', () => {
      expect(underTest.逗号().regExp()
      ).toEqual(/^\,/);
    })

    it('分号', () => {
      expect(underTest.分号().regExp()
      ).toEqual(/^\;/);
    })
  });
});