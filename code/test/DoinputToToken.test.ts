// person.test.ts  
import { TokenType } from '../src/core/domain/model/TokenType/TokenType';
import { TokenTypes } from '../src/core/domain/model/TokenType/TokenTypes';
import { Token } from '../src/core/domain/model/Token/Token';
import { TokenTranslator } from './../src/core/usecase/TokenTranslator';

describe('返回捕获组的数组，like python 的 match.group()', () => {
  describe('match标识符', () => {
    const underTest = new TokenTranslator();
    afterEach(() => {
      underTest.set位置(0);
    });

    it('match标识符 只有半角字符', () => {
      expect(underTest.match标识符(
        "asd123asd     123 asdf123 567 890"
      )).toEqual(
        new Token(TokenTypes.标识符, "asd123asd"));
      expect(underTest.get位置()).toBe(9);
    })
    // it('match标识符 只有全角字符', () => {
    //   expect(underTest.match标识符(
    //     "全角字符包含     123 asdf123 567 890"
    //   )).toEqual(
    //     new Token(TokenTypes.标识符, "全角字符包含"));
    // }) 

    // it('match标识符 全角字符包含', () => {
    //   expect(underTest.match标识符(
    //     "asd1全角字符包含23asd     123 asdf123 567 890"
    //   )).toEqual(
    //     new Token(TokenTypes.标识符, "asd1全角字符包含23asd"));
    // })

    it('match标识符', () => {
      expect(underTest.match标识符(
        "  asd123asd     123 asdf123 567 890"
      )).toBe(null);

      expect(underTest.get位置()).toBe(0);
    })
  });

  describe('match关键字', () => {
    const underTest = new TokenTranslator();
    afterEach(() => {
      underTest.set位置(0);
    });

    it('match关键字', () => {
      expect(underTest.match关键字(
        "write     123 asdf123 567 890"
      )).toEqual(
        new Token(TokenTypes.关键字.WRITE(), "write"));
      expect(underTest.get位置()).toBe(5);
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

    it('tokenize1', () => {
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

    it('tokenize2', () => {
      const test1 = "test111{write('asdasd'{c1r1}'123123'):20}test2222"
      const outArr = underTest.tokenize(
        test1
      )

      expect(outArr[0]).toEqual(new Token(TokenTypes.标识符, "test111"))
      expect(outArr[1]).toEqual(new Token(TokenTypes.分隔符.左花括号(), "{"))
      expect(outArr[2]).toEqual(new Token(TokenTypes.关键字.WRITE(), "write"))
      expect(outArr[3]).toEqual(new Token(TokenTypes.分隔符.左圆括号(), "("))
      expect(outArr[4]).toEqual(new Token(TokenTypes.字符串, "asdasd"))
      expect(outArr[5]).toEqual(new Token(TokenTypes.分隔符.左花括号(), "{"))
      expect(outArr[6]).toEqual(new Token(TokenTypes.标识符, "c1r1"))
      expect(outArr[7]).toEqual(new Token(TokenTypes.分隔符.右花括号(), "}"))
      expect(outArr[8]).toEqual(new Token(TokenTypes.字符串, "123123"))
      expect(outArr[9]).toEqual(new Token(TokenTypes.分隔符.右圆括号(), ")"))
      expect(outArr[10]).toEqual(new Token(TokenTypes.分隔符.冒号(), ":"))
      expect(outArr[11]).toEqual(new Token(TokenTypes.数字, "20"))
      expect(outArr[12]).toEqual(new Token(TokenTypes.分隔符.右花括号(), "}"))
      expect(outArr[13]).toEqual(new Token(TokenTypes.标识符, "test2222"))

    });
  });
});
