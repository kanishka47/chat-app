const expect = require('expect');

var {isRealString} = require('./validation.js');

describe('isRealString' , () => {
    it("should reject non-string " , () => {
      var str = 1234;


      expect(isRealString(str)).toBe(false);

    });

    it("should reject string of spaces " , () => {
      var str = "    ";


      expect(isRealString(str)).toBe(false);

    });

    it("should allow string with only characters " , () => {
      var str = "kanishka";

      //boolean x = isRealString(str);
      expect(isRealString(str)).toBe(true);

    });

});
