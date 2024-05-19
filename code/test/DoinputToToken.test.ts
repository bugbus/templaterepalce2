// person.test.ts  
import { DoInputToToken } from './../src/core/usecase/DoInputToToken';
import { TokenPatterns } from './../src/core/domain/common/TokenPatterns';



describe('返回捕获组的数组，like python 的 match.group()', () => {
  describe('match标识符', () => {
    const underTest = new DoInputToToken();
    afterEach(() => {
      underTest.set位置(0);
    });

    it('match标识符', () => {
      expect(underTest.match标识符(
        "asd123asd     123 asdf123 567 890"
      )
      ).toEqual({ "值": "asd123asd", "类型": "标识符" });

      expect(underTest.get位置()).toBe(9);
    }),

      it('match标识符', () => {
        expect(underTest.match标识符(
          "  asd123asd     123 asdf123 567 890"
        )).toBe(null);

        expect(underTest.get位置()).toBe(0);
      })
  });

  describe('match匹配空白字符', () => {
    const underTest = new DoInputToToken();
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
    const underTest = new DoInputToToken();
    afterEach(() => {
      underTest.set位置(0);
    });

    it('单引号 字符串', () => {
      expect(underTest.match字符串(
        "'asd123asd     123 asdf123 567 890'"
      )).toEqual({"值": "asd123asd     123 asdf123 567 890", "类型": "字符串"});
    }),

    it('双引号 字符串', () => {
      expect(underTest.match字符串(
        '"asd123asd     123 asdf123 567 890"'
      )).toEqual({"值": "asd123asd     123 asdf123 567 890", "类型": "字符串"});
    })
  });

  describe('tokenize', () => {
    const underTest = new DoInputToToken();
    afterEach(() => {
      underTest.set位置(0);
    });

    it('tokenize 数字', () => {
      expect(underTest.tokenize(
        "567 890"
      )).toEqual([{ "值": "567", "类型": "数字" }, { "值": "890", "类型": "数字" }]);
    });

    it('tokenize 标识符', () => {
      expect(underTest.tokenize(
        "token underTest"
      )).toEqual([{ "值": "token", "类型": "标识符" }, { "值": "underTest", "类型": "标识符" }]);
    });

    it('tokenize 字符串 无转译', () => {
      expect(underTest.tokenize(
        '"token underTest"'
      )).toEqual([{ "值": "token underTest", "类型": "字符串" }]);
    });


    it('tokenize', () => {
      expect(underTest.tokenize(
        "   asd123asd     123 asdf123 567 890"
      )).toEqual(null);

      expect(underTest.get位置()).toBe(3);
    });
  });
});
