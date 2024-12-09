
import { describe, it, expect } from "vitest";
import { formatDate } from "./dates";

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
  
});
