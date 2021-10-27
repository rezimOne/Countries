import { AppVariables } from '../src/types'
/*
obiekt ze zmiennymi uzywanymi w apliakcji
*/
export const appVariables: AppVariables = {
  API_URL: "https://restcountries.com/v2/all",
  TIME_KEY: "time",
  COUNTRY_KEY: "countries",
  CURRENT_TIME: new Date().getTime(),
  INTERVAL: 100000,
  POPULATION_LIMIT: 500000000,
};