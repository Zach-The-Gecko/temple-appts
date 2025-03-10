import getTempleDataForMonth from "./getTempleDataForMonth.js";
import getTempleSessionDataForDay from "./getTempleSessionDataForDay.js";

const requestData = {
  startDate: "2025-03-09T00:00:00.000Z",
  endDate: "2025-05-09T00:00:00.000Z",
  startTime: 1500,
  endTime: 2300,
  groupSize: 2,
  months: [
    { year: 2025, month: 2 },
    { year: 2025, month: 3 },
    { year: 2025, month: 4 },
  ],
  jsessionid: "0D1DF1377B18C8133C5F86C0C9F15924",
  vcapid: "7cdbbf3e-960b-4e19-772a-ea66",
  templeID: 4108674,
};

const options = {
  month: 3,
  year: 2025,
  groupSize: 4,
  startDate: new Date("2025-02-01"),
  endDate: new Date("2025-05-26"),
  hourStart: 15,
  hourEnd: 24,
  jsessionid: "FD5DF7A815CC5523579A5388CAA8B3E7",
  vcapid: "49d8b0ef-4645-4ae8-7edb-06df",
};

const availableDays = requestData.months.reduce(
  async (acc, { month, year }) => {
    // console.log(acc);
    const monthTempleDays = await getTempleDataForMonth(
      requestData,
      month,
      year
    );
    return [...acc, ...monthTempleDays];
  },
  []
);

console.log(availableDays);

// const sessionData = await getTempleSessionDataForDay(
//   options.year,
//   options.month,
//   availableDays[0].dayOfMonth,
//   options.jsessionid,
//   options.vcapid
// );

// const availableSessions = sessionData.sessionList.filter((session) => {
//   const newDate = new Date(session.time);
//   return (
//     session.details.seatsAvailable >= options.groupSize &&
//     newDate.getTime() >= options.startDate.getTime() &&
//     newDate.getTime() <= options.endDate.getTime() &&
//     newDate.getHours() >= options.hourStart &&
//     newDate.getHours() <= options.hourEnd
//   );
// });

// console.log(availableSessions);
