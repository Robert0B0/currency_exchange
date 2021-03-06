import { countries, testRates } from "./redundancy.js";

const countryDataQuery = require("country-data-query");
const { getISOByParam } = require("iso-country-currency");
const moment = require("moment");

const todayDate = moment(Date.now()).format("DD - MM - YYYY");

const fetchCurrency = (currencies) => {
  let payload = { rates: testRates, date: todayDate };
  const url = "http://api.exchangeratesapi.io/v1";

  const params = (paramsObj) => {
    return new URLSearchParams({
      access_key: "f78f714ef9ff0589eb35c5b2d615799d",
      ...paramsObj,
    });
  };

  async function getLatest(options) {
    const response = await fetch(`${url}/latest?${params(options)}`);
    const data = await response.json();
    return data;
  }

  getLatest({ symbols: currencies }).then((data) => {
    payload.rates = data.rates;
    payload.date = data.date;
  });

  return payload;
};

export const getData = (numberOfCountries) => {
  //Constructing the currencies array of objects
  let payload = { currencies: [], date: "" };
  let data = [];
  for (let i = 0; i < numberOfCountries + 1; i++) {
    try {
      const country = countryDataQuery({
        country: {
          type: "countrycode",
          value: getISOByParam("countryName", countries[i]),
        },
      });
      if (country.length !== 0) {
        const id = i;
        const symbol = country[0].currency.symbol;
        const currency = country[0].currency.code;
        const name = country[0].currency.name;
        const rate = 1.2345;
        const countryCode = country[0].code === "DE" ? "EU" : country[0].code;

        data.push({ id, symbol, currency, name, rate, countryCode });
      }
    } catch (err) {}
  }

  let crs = "";
  data.map((a) => {
    crs += a.currency + ",";
  });

  const rates_data = fetchCurrency(crs);

  //Adding received rates to their currencies
  data.forEach((item) => {
    item.rate = rates_data.rates[item.currency];
  });

  //Sort the array by the currency name
  //Making sure EURO is first in the ordered array
  data.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  const euIndex = data.findIndex((ob) => ob.currency === "EUR");
  const aux = data[euIndex];
  data[euIndex] = data[0];
  data[0] = aux;

  payload.currencies = data;
  payload.date = rates_data.date;

  console.log(("payload:", payload));

  return payload;
};
