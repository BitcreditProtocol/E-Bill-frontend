
import { describe, it, expect } from "vitest";
import { parseFloatSafe, parseIntSafe } from "./numbers";

describe("util", () => {

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
