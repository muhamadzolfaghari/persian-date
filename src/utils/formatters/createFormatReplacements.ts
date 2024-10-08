import DateTimeSegment from "../../types/DateTimeSegment";
import Formatters from "../../types/Formatters";
import replacePersianNumbers from "../persian/replacePersianNumbers";

const formatter = (time: number) => (formatter: Intl.DateTimeFormat) => {
  const formattedDate = formatter.format(time);

  if (formatter.resolvedOptions().calendar === "persian") {
    return replacePersianNumbers(formattedDate);
  }

  return formattedDate;
};

type DateTimeTuple = [
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number
];

function extractDateTime(formattedDateTime: string): DateTimeTuple {
  const result = formattedDateTime.match(/\d+/g)?.map(Number);

  if (!result) {
    throw new Error("Invalid date");
  }

  /**
   * Non-Persian date format (e.g., day comes first instead of year)
   * Assuming the format is [day, month, year, ...rest]
   * This checks if the first element is not a four-digit year and swaps it with the year.
   */
  if (String(result[0]).length === 4) {
    const [day, , year] = result; // Extract day and year from result
    result[0] = year; // Set year as the first element
    result[2] = day; // Set day in the fourth position (assumed day position)
  }

  return result as DateTimeTuple;
}

const padTwoDigits = (num: number) => num.toString().padStart(2, "0");

/**
 *
 * Creates a map of replacements for the given date.
 *
 *
 * This function creates replacements for the date. It takes a date and a
 * template and returns a formatted date. It uses the template to replace the
 * date with the corresponding value.
 *
 * @param time - The date to format.
 * @param formatters - The formatters to use.
 * @returns The replacements.
 */
export default function createFormatReplacements(
  time: number,
  [dateTime, longWeekday, shortWeekday, longMonth, shortMonth]: Formatters
): Record<DateTimeSegment, string> {
  const formatterFactory = formatter(time);
  const [day, month, year, hours, minutes, seconds] = extractDateTime(
    formatterFactory(dateTime)
  );
  const [h12, amPm] = [hours % 12 || 12, hours < 12 ? "am" : "pm"];
  const milliseconds = time.toString().slice(-3);

  return {
    YYYY: year.toString(),
    MM: padTwoDigits(month),
    DD: padTwoDigits(day),
    HH: padTwoDigits(hours),
    mm: padTwoDigits(minutes),
    ss: padTwoDigits(seconds),
    dddd: formatterFactory(longWeekday),
    MMM: formatterFactory(shortMonth),
    MMMM: formatterFactory(longMonth),
    YY: year.toString().slice(-2),
    D: day.toString(),
    ddd: formatterFactory(shortWeekday),
    Do: padTwoDigits(day),
    M: month.toString(),
    h: h12.toString(),
    a: amPm,
    SSS: milliseconds,
  };
}
