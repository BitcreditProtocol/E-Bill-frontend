
import { describe, it, expect } from "vitest";
import { formatDate, parseFloatSafe, parseIntSafe } from ".";

describe("util", () => {

  describe("formatDate", () => {
    it("should format date according to designs", () => {
      expect(formatDate(new Date(2009, 0, 3), "en-US")).toBe("03-Jan-09");
      expect(formatDate(new Date(2009, 0, 3), "es-AR")).toBe("03-ene-09");
      expect(formatDate(new Date(2009, 0, 3), "tr")).toBe("03-Oca-09");
      expect(formatDate(new Date(2009, 0, 3), "fr")).toBe("03-janv.-09");
      expect(formatDate(new Date(2009, 0, 3), "zh")).toBe("03日-1月-09年");
    });
  });

  describe("parseFloatSafe", () => {
    it("should safely parse floats", () => {
      expect(parseFloatSafe("")).toBe(undefined);
      expect(parseFloatSafe("NaN")).toBe(undefined);
      expect(parseFloatSafe("Infinity")).toBe(undefined);
      expect(parseFloatSafe(String(1 / 0))).toBe(undefined);
      expect(parseFloatSafe("foobar")).toBe(undefined);
      expect(parseFloatSafe("0")).toBe(0);
      expect(parseFloatSafe("1")).toBe(1);
      expect(parseFloatSafe("-1")).toBe(-1);
      expect(parseFloatSafe("1.23456789")).toBe(1.23456789);
      expect(parseFloatSafe("-1.23456789")).toBe(-1.23456789);
    });
  });

  describe("parseIntSafe", () => {
    it("should safely parse ints", () => {
      expect(parseIntSafe("")).toBe(undefined);
      expect(parseIntSafe("NaN")).toBe(undefined);
      expect(parseIntSafe("Infinity")).toBe(undefined);
      expect(parseIntSafe(String(1 / 0))).toBe(undefined);
      expect(parseIntSafe("foobar")).toBe(undefined);
      expect(parseIntSafe("0")).toBe(0);
      expect(parseIntSafe("1")).toBe(1);
      expect(parseIntSafe("-1")).toBe(-1);
      expect(parseIntSafe("1.23456789")).toBe(1);
      expect(parseIntSafe("-1.23456789")).toBe(-1);
    });
  });
  
});
