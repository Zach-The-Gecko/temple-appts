import axios from "axios";

// Remeber JAN = 0, FEB = 1, MAR = 2, etc.
// Year is in YYYY format
export default async (
  { groupSize, jsessionid, vcapid, templeID },
  month,
  year
) => {
  let data = JSON.stringify({
    sessionDate: `${year}-${month + 1}-01T07:00:00.000Z`,
    month: month,
    year: year,
    templeOrgId: templeID,
    appointmentType: "PROXY_BAPTISM",
    gender: "MALE",
    inclSelf: true,
    addSpouse: false,
    apptMales: groupSize,
    apptFemales: 0,
    apptNeutralGuests: 0,
    isGroupAppt: false,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://temple-online-scheduling.churchofjesuschrist.org/api/templeSchedule/getTempleMonthlySchedule",
    headers: {
      "Content-Type": "application/json",
      Cookie: `JSESSIONID=${jsessionid}; __VCAP_ID__=${vcapid}`,
    },
    data: data,
  };
  try {
    const response = await axios.request(config);

    const filteredDayData = response.data.days.filter((dayData) => {
      return dayData.ordinanceAvailable;
    });

    const formattedData = filteredDayData.map((dayData) => {
      return { month, year, day: dayData.dayOfMonth };
    });

    return formattedData;
  } catch (error) {
    console.log(error);
    return [];
  }
};
