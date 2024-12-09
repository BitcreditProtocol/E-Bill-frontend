
import { describe, it, expect } from "vitest";
import { formatFileSize } from ".";

describe("util", () => {

  describe("formatFileSize", () => {
    it("should format file size according to designs", () => {
      expect(formatFileSize(-1)).toBe("-1 B");
      expect(formatFileSize(0)).toBe("0 B");
      expect(formatFileSize(1)).toBe("1 B");
      expect(formatFileSize(1_023)).toBe("1023 B");

      expect(formatFileSize(1_024)).toBe("1.00 KB");
      expect(formatFileSize(10_000)).toBe("9.77 KB");
      expect(formatFileSize(1_048_575)).toBe("1024.00 KB");

      expect(formatFileSize(10_48_576)).toBe("1.00 MB");
      expect(formatFileSize(10_48_576 * 1_000)).toBe("1000.00 MB");
      expect(formatFileSize(10_48_576 * 1_000 * 1_000)).toBe("1000000.00 MB");
      expect(formatFileSize(10_48_576 * 1_000 * 1_000 * 1_000)).toBe("1000000000.00 MB");
    });
  });
  
});
