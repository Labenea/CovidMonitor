import Axios from "axios";
import DateConvert from "../date-converter";

const baseURL = "https://covid.mathdro.id/api";

class DataSource {
  static getIndData() {
    return Axios.get(`${baseURL}/countries/indonesia`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static getGlbData() {
    return Axios.get(`${baseURL}/`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static getDailyInd(a) {
    let today = new Date();
    return Axios.get(
      `${baseURL}/daily/${today.getFullYear()}-${today.getMonth() + 1}-${
        today.getDate() - a
      }`
    )
      .then((res) => {
        let result = res.data.filter((obj) => {
          return obj.countryRegion == "Indonesia";
        });
        return result.shift();
      })
      .catch(() => {
        return this.getDailyInd(a + 1);
      });
  }
  static getDailyGlb(a) {
    let today = DateConvert.getRightDate(a);
    return Axios.get(`${baseURL}/daily`)
      .then((res) => {
        let result = res.data.filter((obj) => {
          return obj.reportDate == today;
        });
        if (result.length < 1) {
          return this.getDailyGlb(a + 1);
        } else {
          return result.shift();
        }
      })
      .catch(() => {});
  }
}

export default DataSource;
