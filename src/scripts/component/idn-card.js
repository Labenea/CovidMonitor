const { default: Axios } = require("axios");

const baseURL = "https://covid.mathdro.id/api";
const month = new Array();

month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

let confirmed = 0;
let death = 0;
let recovered = 0;

class IdnCard extends HTMLElement {
  connectedCallback() {
    this.getData();
  }

  getData() {
    Axios.get(`${baseURL}/countries/indonesia`)
      .then((res) => {
        confirmed = res.data.confirmed.value;
        death = res.data.deaths.value;
        recovered = res.data.recovered.value;
        this.render();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("first");
    this.render();
  }

  render() {
    let today = new Date();
    let date = `${today.getDate()} ${
      month[today.getMonth()]
    } ${today.getFullYear()}`;
    let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    this.innerHTML = `
      <div class="container">
      <div>
      <h1 class="text-center text-torq">INDONESIA</h1>
    </div>
      <h6 class="text-center text-torq" >Last Updated ${date},${time}</h6>
        <div class="card-deck ">
            <div class="card card-bg mb-1 ">
              <div class="card-body">
                <h1 class="text-center crfm-color card-text">${new Intl.NumberFormat(
                  "ID-IN"
                ).format(confirmed)}</h1>
                <p class="crfm-color text-center">Case</p>
                <h5 class="text-center text-crd card-title">Confirmed</h5>
              </div>
           </div>
          <div class="card card-bg mb-1">
              <div class="card-body ">
                <h1 class="text-center rcvd-color card-text">${new Intl.NumberFormat(
                  "ID-IN"
                ).format(recovered)}</h1>
                <p class="text-center rcvd-color">${Math.round(
                  (recovered / confirmed) * 100
                )}%</p>
                <h5 class="text-center text-crd card-title">Recovered</h5>
              </div>
            </div>
          <div class="card  card-bg mb-1 ">
              <div class=" card-body ">
                <h1 class="text-center d-color card-text">${new Intl.NumberFormat(
                  "ID-IN"
                ).format(death)}</h1>
                <p class="text-center d-color">${Math.round(
                  (death / confirmed) * 100
                )}%</p>
                <h5 class="text-center text-crd card-title">Death</h5>
              </div>
            </div>
        </div>
      </div>`;
  }
}

customElements.define("idn-card", IdnCard);
