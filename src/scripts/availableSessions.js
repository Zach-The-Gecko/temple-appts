import getTempleDataForMonth from "./getAvailableMonths.js";
import getTempleSessionDataForDay from "./getAvailableTimes.js";

export default async (requestData) => {
  const availableDates = await Promise.all(
    requestData.months.map(async ({ month, year }) => {
      return await getTempleDataForMonth(requestData, month, year);
    })
  ).then((results) => results.flat());

  const openSessions = await Promise.all(
    availableDates.map(async (date) => {
      return await getTempleSessionDataForDay(date, requestData);
    })
  ).then((results) => results.flat());

  return openSessions;
};
