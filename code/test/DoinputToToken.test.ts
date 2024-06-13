// person.test.ts  
import { TokenType } from '../src/core/domain/common/TokenType/TokenType';
import { TokenTypes } from '../src/core/domain/common/TokenType/TokenTypes';
import { Token } from '../src/core/domain/Token/Token';
import { TokenTranslator } from './../src/core/usecase/TokenTranslator';

describe('返回捕获组的数组，like python 的 match.group()', () => {
  describe('match标识符', () => {
    const underTest = new TokenTranslator();
    afterEach(() => {
      underTest.set位置(0);
    });

    it('match标识符', () => {
      expect(underTest.match标识符(
        "asd123asd     123 asdf123 567 890"
      )).toEqual(
        new Token(TokenTypes.标识符, "asd123asd"));
      expect(underTest.get位置()).toBe(9);
    })

    it('match标识符', () => {
      expect(underTest.match标识符(
        "  asd123asd     123 asdf123 567 890"
      )).toBe(null);

      expect(underTest.get位置()).toBe(0);
    })
  });

  describe('match匹配空白字符', () => {
    const underTest = new TokenTranslator();
    afterEach(() => {
      underTest.set位置(0);
    });

    it('match标识符', () => {
      expect(underTest.match匹配空白字符(
        "asd123asd     123 asdf123 567 890"
      )).toBe(false);

      expect(underTest.get位置()).toBe(0);
    }),

      it('match标识符', () => {
        expect(underTest.match匹配空白字符(
          "  asd123asd     123 asdf123 567 890"
        )).toBe(true);

        expect(underTest.get位置()).toBe(2);
      })
  });

  describe('match匹配 字符串', () => {
    const underTest = new TokenTranslator();
    afterEach(() => {
      underTest.set位置(0);
    });

    it('单引号 字符串', () => {
      expect(underTest.match字符串(
        "'asd123asd     123 asdf123 567 890'"
      )).toEqual(
        new Token(TokenTypes.字符串, "asd123asd     123 asdf123 567 890"));
    })

    it('双引号 字符串', () => {
      expect(underTest.match字符串(
        '"asd123asd     123 asdf123 567 890"'
      )).toEqual(
        new Token(TokenTypes.字符串, "asd123asd     123 asdf123 567 890"));
    })
  });

  describe('tokenize', () => {
    const underTest = new TokenTranslator();
    afterEach(() => {
      underTest.set位置(0);
    });

    it('tokenize 数字', () => {
      expect(underTest.tokenize(
        "567 890"
      )).toEqual(
        [
          new Token(TokenTypes.数字, "567"),
          new Token(TokenTypes.数字, "890")
        ]);
    });

    it('tokenize 标识符', () => {
      expect(underTest.tokenize(
        "token underTest"
      )).toEqual(
        [
          new Token(TokenTypes.标识符, "token"),
          new Token(TokenTypes.标识符, "underTest")
        ]);
    });

    it('tokenize 字符串 无转译', () => {
      expect(underTest.tokenize(
        '"token underTest"'
      )).toEqual([
        new Token(TokenTypes.字符串, "token underTest")
      ]);
    });

    it('tokenize', () => {
      expect(underTest.tokenize(
        "   asd123asd     123 asdf123 567 890"
      )).toEqual(
        [
          new Token(TokenTypes.标识符, "asd123asd"),
          new Token(TokenTypes.数字, "123"),
          new Token(TokenTypes.标识符, "asdf123"),
          new Token(TokenTypes.数字, "567"),
          new Token(TokenTypes.数字, "890"),
        ]
      );

      expect(underTest.get位置()).toBe(36);
    });
  });
});
