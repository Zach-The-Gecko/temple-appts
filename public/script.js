const submitBtnElm = document.querySelector("#submit");
const startDateElm = document.querySelector("#startDate");
const endDateElm = document.querySelector("#endDate");
const startTimeElm = document.querySelector("#startTime");
const endTimeElm = document.querySelector("#endTime");
const groupSizeElm = document.querySelector("#groupSize");
const jsessionidElm = document.querySelector("#jsessionid");
const vcapidElm = document.querySelector("#vcapid");
const templeElm = document.querySelector("#temple");

const templeIDs = { layton: 4108674, bountiful: 790370 };

Object.entries(templeIDs).forEach(([temple, id]) => {
  const optionElm = document.createElement("option");
  optionElm.value = id;
  optionElm.text = temple;
  templeElm.appendChild(optionElm);
});

submitBtnElm.addEventListener("click", () => {
  const startDate = new Date(startDateElm.value);
  const endDate = new Date(endDateElm.value);
  const startTime = parseInt(startTimeElm.value.replace(":", ""));
  const endTime = parseInt(endTimeElm.value.replace(":", ""));
  const groupSize = parseInt(groupSizeElm.value);
  const jsessionid = jsessionidElm.value;
  const vcapid = vcapidElm.value;
  const templeID = parseInt(templeElm.value);

  const startMonth = startDate.getMonth();
  const endMonth =
    endDate.getMonth() + 12 * (endDate.getFullYear() - startDate.getFullYear());

  const months = [];
  for (let i = startMonth; i <= endMonth; i++) {
    let year = startDate.getFullYear() + Math.floor(i / 12);
    let month = i % 12;

    months.push({ year, month });
  }

  // Send Request
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    startDate,
    endDate,
    startTime,
    endTime,
    groupSize,
    months,
    jsessionid,
    vcapid,
    templeID,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/get-available-sessions", requestOptions)
    .then((response) => response.json())
    .then(console.log);
});
