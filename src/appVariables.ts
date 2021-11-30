import { AppVariables } from '../src/types'

export const appVariables: AppVariables = {
  API_URL: "https://restcountries.com/v2/all",
  TIME_KEY: "time",
  COUNTRY_KEY: "countries",
  CURRENT_TIME: new Date().getTime(),
  INTERVAL: 100000,
  POPULATION_LIMIT: 500000000,
};
