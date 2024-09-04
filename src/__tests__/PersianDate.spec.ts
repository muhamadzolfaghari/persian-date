import PersianDate from "../PersianDate";

describe("PersianDate", () => {
  describe("normalizeDate", () => {
    it("should throw error for year 2003 in strict mode", () => {
      const date = new PersianDate("2003", {
        ignoreCalendar: false,
        invalidDateSeverity: "error",
      });
      expect(date.getUTCFullYear()).toBe(1381);
    });

    it("should throw Invalid Date 1399/12/31 23:59:59.999 in strict mode", () => {
      expect(
        () =>
          new PersianDate("1399/12/31 23:59:59.999", {
            invalidDateSeverity: "error",
          })
      ).toThrow("Invalid Date");
    });

    it("should return 1399-10-13", () => {
      const date = new PersianDate("1399/10/13");
      expect(date.format("YYYY-MM-DD")).toBe("1399-10-13");
    });

    it("should set date to NaN and don't throw error for invalid date", () => {
      const date = new PersianDate("1393/12/31", {
        invalidDateSeverity: "default",
        ignoreCalendar: false,
      });
      expect(date.getDate()).toBe(NaN);
    });
  });

  describe("format", () => {
    it("should format date 2021/1/2 23:59:59.999", () => {
      const date = new PersianDate("2021/1/2 23:59:59.999");
      expect(date.format("YYYY-MM-DD")).toBe("1399-10-13");
    });
  });

  describe("isLeapYear", () => {
    it("should return true for leap year 1404", () => {
      const date = new PersianDate("1404/10/13");
      expect(date.isLeapYear()).toBe(true);
    });
  });
});

console.log(new PersianDate("1399").isLeapYear()); // false;
