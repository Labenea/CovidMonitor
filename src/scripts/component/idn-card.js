import Axios from "axios";
import DateConvert from "../date-converter";
import DataSource from "../data/data-source";

let confirmed = 0;
let death = 0;
let recovered = 0;
let pastConfirmed = 0;
class IdnCard extends HTMLElement {
  connectedCallback() {
    DataSource.getIndData()
      .then((res) => {
        confirmed = res.confirmed.value;
        death = res.deaths.value;
        recovered = res.recovered.value;
      })
      .then(() => {
        DataSource.getDailyInd(1).then((res) => {
          pastConfirmed = res.confirmed;
          this.render();
        });
      });
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="container">
      <div>
      <h1 class="text-center text-torq">INDONESIA</h1>
    </div>
      <h6 class="text-center text-torq" >Last Updated ${DateConvert.dateConvert()},${DateConvert.timeConvert()}</h6>
        <div class="card-deck ">
            <div class="card card-bg mb-1 ">
              <div class="card-body">
                <h1 class="text-center crfm-color card-text">${new Intl.NumberFormat(
                  "ID-IN"
                ).format(confirmed)}</h1>
                <p class="crfm-color text-center">+${
                  confirmed - pastConfirmed
                } from yesterday</p>
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
