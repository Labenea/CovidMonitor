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

class DateConvert {
  static dateConvert() {
    let today = new Date();
    let date = `${today.getDate()} ${
      month[today.getMonth()]
    } ${today.getFullYear()}`;
    return date;
  }
  static timeConvert() {
    let today = new Date();
    let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    return time;
  }
  static getRightDate(a) {
    let today = new Date();

    let dd = (today.getDate() - a < 10 ? "0" : "") + (today.getDate() - a);
    let mm = (today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth() + 1);
    let yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
  }
}

export default DateConvert;
