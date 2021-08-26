console.log("hi");
var covid_data;
var values;
var states = [
  "Andaman Nicobar",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chattisgarh",
  "Dadra and Nagar Haveli",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep Islands",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Pondicherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
async function get_data() {
  const response = await fetch(
    "https://data.covid19india.org/v4/min/data.min.json"
  );
  console.log(response);
  covid_data = await response.json();
  console.log(covid_data);

  return covid_data;
}

var a = get_data();
a.then((data) => start(data));
function start(keyData) {
  values = Object.keys(keyData);

  for (var i = 0; i < states.length; i++)
    document.getElementById(
      "place"
    ).innerHTML += `<option value=${values[i]}>${states[i]}</option>`;
}

var showBtn = document.getElementById("show");
var covid_figures = [];
showBtn.addEventListener("click", () => {
  c.clearRect(0, 0, can.width, can.height);
  // console.log(document.getElementById('place').value);
  var key = document.getElementById("place").value;
  covid_figures[0] = covid_data[key].total.tested;
  covid_figures[1] = covid_data[key].total.confirmed;
  covid_figures[2] = covid_data[key].total.recovered;
  covid_figures[3] = covid_data[key].total.vaccinated1;
  covid_figures[4] = covid_data[key].total.vaccinated2;
  covid_figures[5] = covid_data[key].total.deceased;
  // console.log(covid_figures);
  calculation();
});
// var tested_ratio;
// var confirmed_ratio;
// var recovered_ratio;
// var vaccinated1_ratio;
// var vaccinated2_ratio;
// var deceased_ratio;
var ratio = [];
function calculation() {
  var max = 0;
  for (var i = 0; i <= 5; i++) {
    if (covid_figures[i] > max) {
      max = covid_figures[i];
    }
  }
  //  tested_ratio=covid_figures[0]/sum;
  //  confirmed_ratio=covid_figures[1]/sum;
  //  recovered_ratio=covid_figures[2]/sum;
  //  vaccinated1_ratio=covid_figures[3]/sum;
  //  vaccinated2_ratio=covid_figures[4]/sum;
  //  deceased_ratio=covid_figures[5]/sum;
  ratio[0] = covid_figures[0] / max;
  ratio[1] = covid_figures[1] / max;
  ratio[2] = covid_figures[2] / max;
  ratio[3] = covid_figures[3] / max;
  ratio[4] = covid_figures[4] / max;
  ratio[5] = covid_figures[5] / max;
  document.getElementById(
    "Tested"
  ).innerHTML = `TESTED:<br>${covid_figures[0]}`;
  document.getElementById(
    "Confirmed"
  ).innerHTML = `CONFIRMED:<br>${covid_figures[1]}`;
  document.getElementById(
    "Recovered"
  ).innerHTML = `RECOVERED:<br>${covid_figures[2]}`;
  document.getElementById(
    "Vaccinated1"
  ).innerHTML = `VACCINATED 1:<br>${covid_figures[3]}`;
  document.getElementById(
    "Vaccinated2"
  ).innerHTML = `VACCINATED 2:<br>${covid_figures[4]}`;
  document.getElementById(
    "Deceased"
  ).innerHTML = `DECEASED:<br>${covid_figures[5]}`;
  draw();
}
var animation_ratio = 0;
var colors = ["blue", "orange", "green", "pink", "purple", "red"];
var can = document.getElementById("canvas");
//  can.width=window.innerWidth;
//  can.height=window.innerHeight-400;
// console.log(can.width,can.height);
c = can.getContext("2d");
function draw() {
  if (animation_ratio < 100) {
    id = requestAnimationFrame(draw);
    ++animation_ratio;
  } else {
    animation_ratio = 0;
  }
  var rel = can.width / 11;
  for (i = 0; i < 6; i++) {
    c.fillStyle = colors[i];

    c.fillRect(
      rel * 2 * i,
      can.height,
      rel,
      -(can.height * ratio[i]) * (animation_ratio / 100)
    );
    // console.log(colors[i]);
  }
}
