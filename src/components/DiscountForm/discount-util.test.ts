
import { describe, it, expect } from "vitest";
import Big from "big.js";
import { daysBetween } from "@/utils/dates";
import { Act360 } from "./discount-util";

describe("discount-util", () => {

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
        expect(Act360.netToGross(new Big("1"), new Big("1"), -1)).toStrictEqual(new Big("0.99722991689750692521"));
        expect(Act360.netToGross(new Big("1"), new Big("1"), 0)).toStrictEqual(new Big("1"));
        expect(Act360.netToGross(new Big("1"), new Big("1"), 1)).toStrictEqual(new Big("1.00278551532033426184"));
        expect(Act360.netToGross(new Big("1"), new Big("1"), 355)).toStrictEqual(new Big("71.99999999999999999424"));
        expect(Act360.netToGross(new Big("1"), new Big("1"), 360)).toStrictEqual(undefined);
        expect(Act360.netToGross(new Big("1"), new Big("1"), 365)).toStrictEqual(new Big("-71.99999999999999999424"));
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

    describe("grossToNet", () => {
      it("should calculate net amount correctly (0)", () => {
        const startDate = new Date(2024, 11, 6);
        const endDate = new Date(2025, 2, 31);
        const grossAmount = new Big("10.12");
        const discountRate = new Big("0.045");

        const days = daysBetween(startDate, endDate);
        const netAmount = Act360.grossToNet(grossAmount, discountRate, days);
        expect(netAmount).toStrictEqual(new Big("9.974525"));
        expect(netAmount!.toNumber()).toBe(9.974525);
      });

      it("should calculate net amount correctly (1)", () => {
        expect(Act360.grossToNet(new Big("1"), new Big("1"), -1)).toStrictEqual(new Big("1.00277777777777777778"));
        expect(Act360.grossToNet(new Big("1"), new Big("1"), 0)).toStrictEqual(new Big("1"));
        expect(Act360.grossToNet(new Big("1"), new Big("1"), 1)).toStrictEqual(new Big("0.99722222222222222222"));
        expect(Act360.grossToNet(new Big("1"), new Big("1"), 355)).toStrictEqual(new Big("0.01388888888888888889"));
        expect(Act360.grossToNet(new Big("1"), new Big("1"), 360)).toStrictEqual(new Big("0"));
        expect(Act360.grossToNet(new Big("1"), new Big("1"), 365)).toStrictEqual(new Big("-0.01388888888888888889"));
      });

      it("should calculate net amount correctly (2)", () => {
        expect(Act360.grossToNet(new Big(1), new Big("0.9863"), 365)).toStrictEqual(new Big("0.00000138888888888889"));
        expect(Act360.grossToNet(new Big(1), new Big("0.9864"), 365)).toStrictEqual(new Big("-0.0001"));
        expect(Act360.grossToNet(new Big(1), new Big("0.9865"), 365)).toStrictEqual(new Big("-0.00020138888888888889"));
      });
    });
  });
  
});
