const axios = require("axios");

class CoinAPI {
  constructor() {
    this.apiUrl = "https://api.coindesk.com/v1/bpi/historical/close.json";
  }

  formatDate(date) {
    const dateField = new Date(date);
    let month = `${dateField.getMonth() + 1}`;
    let day = `${dateField.getDate()}`;
    const year = `${dateField.getFullYear()}`;

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join("-");
  }

  async fetch() {
    const today = new Date();
    const end = this.formatDate(today);
    const start = this.formatDate(today.setFullYear(today.getFullYear() - 5));
    const url = `${this.apiUrl}?start=${start}&end=${end}`;
    console.log(url)
    const response = await axios.get(url);
    return response.data;
  }
}
module.exports = CoinAPI;
