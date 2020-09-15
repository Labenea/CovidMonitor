import Axios from "axios";

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
  static getDailyGlb() {}
}

export default DataSource;
