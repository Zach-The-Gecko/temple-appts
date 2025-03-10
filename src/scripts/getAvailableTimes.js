import axios from "axios";

const __DontUse__ = {
  startDate: "2025-03-09T00:00:00.000Z",
  endDate: "2025-05-09T00:00:00.000Z",
  startTime: 1500,
  endTime: 2000,
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

export default async (
  { year, month, day },
  { groupSize, startTime, endTime, jsessionid, vcapid, templeID }
) => {
  let data = JSON.stringify({
    sessionYear: year,
    sessionMonth: month,
    sessionDay: day,
    appointmentType: "PROXY_BAPTISM",
    templeOrgId: templeID,
    isGuestConfirmation: false,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://temple-online-scheduling.churchofjesuschrist.org/api/templeSchedule/getSessionInfo",
    headers: {
      "Content-Type": "application/json",
      Cookie: `JSESSIONID=${jsessionid}; __VCAP_ID__=${vcapid}`,
    },
    data: data,
  };

  try {
    const response = await axios.request(config);

    const filteredData = response.data.sessionList.filter((sessionData) => {
      const apptTime = parseInt(sessionData.sessionTime.replace(":", ""));
      const isInTimeRange = apptTime >= startTime && apptTime <= endTime;
      const availableSeats = sessionData.details.seatsAvailable >= groupSize;
      return isInTimeRange && availableSeats;
    });

    const formattedData = filteredData.map((sessionData) => {
      return { time: sessionData.sessionTime, year, month, day };
    });

    return formattedData;
  } catch (error) {
    console.log(error);
    return [];
  }
};
