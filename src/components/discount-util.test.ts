
import { describe, it, expect } from "vitest";
import { daysBetween, Act360 } from "./discount-util";
import Big from "big.js";

describe("discount-util", () => {

  describe("daysBetween", () => {
    it("should calculate days between two dates correctly", () => {
      expect(daysBetween(new Date(2009, 0, 3), new Date(2009, 0, 3))).toBe(0);
      expect(daysBetween(new Date(2009, 0, 3), new Date(2009, 0, 4))).toBe(1);
      expect(daysBetween(new Date(2009, 0, 3), new Date(2009, 0, 2))).toBe(-1);
      expect(daysBetween(new Date(2009, 0, 3), new Date(2010, 0, 3))).toBe(365);
      expect(daysBetween(new Date(2024, 11, 6), new Date(2025, 2, 31))).toBe(115);

      // leap year
      expect(daysBetween(new Date(2004, 0, 3), new Date(2005, 0, 3))).toBe(366);

      // with time
      expect(daysBetween(new Date(2009, 0, 3, 1, 1, 1), new Date(2009, 0, 3, 2, 2, 2))).toBe(0);
      expect(daysBetween(new Date(2009, 0, 3, 1, 1, 1), new Date(2009, 0, 4, 2, 2, 2))).toBe(1);
      expect(daysBetween(new Date(2009, 0, 3, 1, 1, 1), new Date(2009, 0, 4, 23, 23, 23))).toBe(1);
      expect(daysBetween(new Date(2009, 0, 3, 23, 59, 59), new Date(2009, 0, 4, 0, 0, 0))).toBe(1);
      expect(daysBetween(new Date(2009, 0, 3, 0, 0, 1), new Date(2009, 0, 2, 23, 59, 59))).toBe(-1);
    });
  });

  describe("Act360", () => {
    describe("netToGross", () => {
      it("should calculate gross amount correctly (0)", () => {
        const startDate = new Date(2024, 11, 6);
        const endDate = new Date(2025, 2, 31);
        const netAmount = new Big("10.12");
        const discountRate = new Big("0.045");

        const days = daysBetween(startDate, endDate);
        const grossAmount = Act360.netToGross(netAmount, discountRate, days);
        expect(grossAmount).toStrictEqual(new Big("10.26759670259987317692"));
        expect(grossAmount!.toNumber()).toBe(10.267596702599873);
      });

      it("should calculate gross amount correctly (1)", () => {
        const grossAmount = Act360.netToGross(new Big("1"), new Big("1"), 365);
        expect(grossAmount).toStrictEqual(new Big("-71.99999999999999999424"));
      });

      it("should calculate gross amount correctly (2)", () => {
        expect(Act360.netToGross(new Big(1), new Big("0.9863"), 365)).toStrictEqual(new Big("719999.999999999424"));
        expect(Act360.netToGross(new Big(1), new Big("0.9864"), 365)).toStrictEqual(new Big("-10000"));
        expect(Act360.netToGross(new Big(1), new Big("0.9865"), 365)).toStrictEqual(new Big("-4965.51724137931031743163"));
      });

      it("should calculate gross amount correctly (step-by-step)", () => {
        const startDate = new Date(2024, 11, 6);
        const endDate = new Date(2025, 2, 31);
        const netAmount = new Big("10.12");
        const discountRate = new Big("0.045");

        const days = daysBetween(startDate, endDate);
        expect(days, "sanity check").toBe(115);

        const discountDays = discountRate.times(days).div(360);
        expect(discountDays.toNumber(), "sanity check").toBe(0.014375);

        const factor = new Big(1).minus(discountDays);

        const grossAmount = netAmount.div(factor);
        expect(grossAmount).toStrictEqual(new Big("10.26759670259987317692"));
        expect(grossAmount.toNumber()).toBe(10.267596702599873);

        const calcGrossAmount = Act360.netToGross(netAmount, discountRate, days);
        expect(calcGrossAmount).toStrictEqual(grossAmount);
      });
    });
  });
  
});
