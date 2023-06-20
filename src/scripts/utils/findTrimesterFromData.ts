import { DateTime, Interval } from "luxon";

/**
 * What date format should this accept ? 
 * 
 * @param {*} expectedDate ISO string. IE 2023-03-23T07:00:00.000Z
 * @returns 
 */
export const findTrimesterFromDate = (expectedDate) => {
  const NUMBER_OF_WEEKS_PREGNANT = 40;
  const EXPECTED_DATE_CONFIG = DateTime.fromISO(expectedDate).toObject();
  
  const dateConfig = {
    ...(EXPECTED_DATE_CONFIG.year && { year: toNumber(EXPECTED_DATE_CONFIG.year) }), // optional, defaults to current year
    month: toNumber(EXPECTED_DATE_CONFIG.month),
    day: toNumber(EXPECTED_DATE_CONFIG.day),
    hour: toNumber(EXPECTED_DATE_CONFIG.hour),
  };

  const EXPECTED_DATE = DateTime.fromObject(dateConfig, {
    zone: 'America/Los_Angeles', 
    numberingSystem: 'beng',
    outputCalendar: "",
  });

  const currentDate = DateTime.now();

  const timeBetween = Interval.fromDateTimes(currentDate, EXPECTED_DATE)
    .toDuration("weeks", {})
    .toObject();

  const { weeks } = timeBetween;
  const currentWeek = NUMBER_OF_WEEKS_PREGNANT - weeks;
  const offset = 2.5;

  /**
   * array of products for each stage
   */
  const conception = ["conception-support-pack"];
  const firstTrimester = ["1st-trimester-prenatal-pack", "1st-trimester-prenatal-vitamin-powder"];
  const secondTrimester = ["2nd-trimester-prenatal-pack"];
  const thirdTrimester = ["3rd-trimester-prenatal-pack"];
  const mom = ["mom-multi-support-pack"];

  switch (true) {
    case weeks >= 41:
      return conception;

    case currentDate > EXPECTED_DATE:
      return mom;

    case currentWeek > 0 && currentWeek < 14 - offset:
      return firstTrimester;

    case currentWeek >= 14 - offset && currentWeek < 28 - offset:
      return secondTrimester;

    case currentWeek >= 28 - offset && currentWeek < 42:
      return thirdTrimester;

    case currentWeek >= 42:
      return mom;

    default:
      return conception;
  }
}

/**
 * Helper function
 * 
 * @param input 
 * @returns 
 */
function toNumber(input) {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input !== "string") {
    return new Error("Input is not a string or number");
  }

  return Number(input.replace(/[A-Za-z]/g, ""));
}
