function updateTime() {
  // Los Angeles
  let losAngelesElement = document.querySelector("#los-angeles");
  if (losAngelesElement) {
    let losAngelesDateElement = losAngelesElement.querySelector(".date");
    let losAngelesTimeElement = losAngelesElement.querySelector(".time");
    let losAngelesTime = moment().tz("America/Los_Angeles");

    losAngelesDateElement.innerHTML = losAngelesTime.format("MMMM Do YYYY");
    losAngelesTimeElement.innerHTML = `${losAngelesTime.format("h:mm:ss")} <small>${losAngelesTime.format("A")}</small>`;
  }

  // London
  let londonElement = document.querySelector("#london");
  if (londonElement) {
    let londonDateElement = londonElement.querySelector(".date");
    let londonTimeElement = londonElement.querySelector(".time");
    let londonTime = moment().tz("Europe/London");

    londonDateElement.innerHTML = londonTime.format("MMMM Do YYYY");
    londonTimeElement.innerHTML = `${londonTime.format("h:mm:ss")} <small>${londonTime.format("A")}</small>`;
  }
  // Tokyo
  let tokyoElement = document.querySelector("#tokyo");
  if (tokyoElement) {
    let tokyoDateElement = tokyoElement.querySelector(".date");
    let tokyoTimeElement = tokyoElement.querySelector(".time");
    let tokyoTime = moment().tz("Asia/Tokyo");

    tokyoDateElement.innerHTML = tokyoTime.format("MMMM Do YYYY");
    tokyoTimeElement.innerHTML = `${tokyoTime.format("h:mm:ss")} <small>${tokyoTime.format("A")}</small>`;
  }
}

let cityTimer = null;
function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (!cityTimeZone) return;
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }
  let cityName = cityTimeZone.replace("_", " ").split("/")[1] || cityTimeZone;
  let citiesElement = document.querySelector("#cities");

  function renderCity() {
    let cityTime = moment().tz(cityTimeZone);
    citiesElement.innerHTML = `
      <div class="city">
        <div>
          <h2>${cityName}</h2>
          <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
        </div>
        <div class="time">${cityTime.format("h:mm:ss")} <small>${cityTime.format("A")}</small></div>
      </div>
      <p><a href="/">Back to all cities</a></p>
    `;
  }

  // initial render and set an interval to update the selected city time
  renderCity();
  if (cityTimer) clearInterval(cityTimer);
  cityTimer = setInterval(renderCity, 1000);
}

updateTime();
setInterval(updateTime, 1000);

let citySelectElement = document.querySelector("#city");
if (citySelectElement) citySelectElement.addEventListener("change", updateCity);