// import { PersianDate } from "persian-date";
// import moment from "moment";
// const a = persianDate("2024-09-02", { ignoreCalendar: true });

import { PersianDate, persianDate } from "persian-date";

// console.log(a.format("YYYY/MM/DD"), "SDddfdf");
// us timezoneط
// crate a date by us timezone
// const date = new PersianDate("2024-09-02", {
//   ignoreCalendar: true,
//   timeZone: "Asia/Tehran",
// });

// console.log(persianDate("2001/02/14").format("YYYY/MM/DD"));

// set america timezone

// const americaDate = new Date();
// americaDate.toLocaleString("en-US", { timeZone: "2" });
// console.log(americaDate);
const date = new PersianDate("1399-12-1T12:15:25", {
  calender: "gregorian",
});
