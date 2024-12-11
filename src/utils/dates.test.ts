
import { describe, it, expect } from "vitest";
import { formatDate, formatDateShort, formatDateLong, formatMonthLong, formatMonthYear, formatYearNumeric } from "./dates";

describe("util", () => {

  describe("formatDate", () => {
    it("should format date according to designs (default)", () => {
      expect(formatDate(new Date(2009, 0, 3), "en-US")).toBe("03-Jan-09");
      expect(formatDate(new Date(2009, 0, 3), "es-AR")).toBe("03-ene-09");
      expect(formatDate(new Date(2009, 0, 3), "tr")).toBe("03-Oca-09");
      expect(formatDate(new Date(2009, 0, 3), "fr")).toBe("03-janv.-09");
      expect(formatDate(new Date(2009, 0, 3), "zh")).toBe("03日-1月-09年");
    });
  });

  describe("formatDateShort", () => {
    it("should format date according to designs (short)", () => {
      expect(formatDateShort(new Date(2009, 0, 3), "en-US")).toBe("Jan 03, 2009");
      expect(formatDateShort(new Date(2009, 0, 3), "es-AR")).toBe("03 de ene de 2009");
      expect(formatDateShort(new Date(2009, 0, 3), "tr")).toBe("03 Oca 2009");
      expect(formatDateShort(new Date(2009, 0, 3), "fr")).toBe("03 janv. 2009");
      expect(formatDateShort(new Date(2009, 0, 3), "zh")).toBe("2009年1月03日");
    });
  });

  describe("formatDateLong", () => {
    it("should format date according to designs (long)", () => {
      expect(formatDateLong(new Date(2009, 0, 3), "en-US")).toBe("January 3, 2009");
      expect(formatDateLong(new Date(2009, 0, 3), "es-AR")).toBe("3 de enero de 2009");
      expect(formatDateLong(new Date(2009, 0, 3), "tr")).toBe("3 Ocak 2009");
      expect(formatDateLong(new Date(2009, 0, 3), "fr")).toBe("3 janvier 2009");
      expect(formatDateLong(new Date(2009, 0, 3), "zh")).toBe("2009年1月3日");
    });
  });

  describe("formatMonthLong", () => {
    it("should format month according to designs (long)", () => {
      expect(formatMonthLong(new Date(2009, 0, 3), "en-US")).toBe("January");
      expect(formatMonthLong(new Date(2009, 0, 3), "es-AR")).toBe("enero");
      expect(formatMonthLong(new Date(2009, 0, 3), "tr")).toBe("Ocak");
      expect(formatMonthLong(new Date(2009, 0, 3), "fr")).toBe("janvier");
      expect(formatMonthLong(new Date(2009, 0, 3), "zh")).toBe("一月");
    });
  });

  describe("formatMonthYear", () => {
    it("should format month and year according to designs (long)", () => {
      expect(formatMonthYear(new Date(2009, 0, 3), "en-US")).toBe("January 2009");
      expect(formatMonthYear(new Date(2009, 0, 3), "es-AR")).toBe("enero de 2009");
      expect(formatMonthYear(new Date(2009, 0, 3), "tr")).toBe("Ocak 2009");
      expect(formatMonthYear(new Date(2009, 0, 3), "fr")).toBe("janvier 2009");
      expect(formatMonthYear(new Date(2009, 0, 3), "zh")).toBe("2009年1月");
    });
  });

  describe("formatYearNumeric", () => {
    it("should format year according to designs (numeric)", () => {
      expect(formatYearNumeric(new Date(2009, 0, 3), "en-US")).toBe("2009");
      expect(formatYearNumeric(new Date(2009, 0, 3), "es-AR")).toBe("2009");
      expect(formatYearNumeric(new Date(2009, 0, 3), "tr")).toBe("2009");
      expect(formatYearNumeric(new Date(2009, 0, 3), "fr")).toBe("2009");
      expect(formatYearNumeric(new Date(2009, 0, 3), "zh")).toBe("2009年");
    });
  });
});
