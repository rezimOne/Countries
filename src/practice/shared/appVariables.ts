import { AppVariablesTypes } from './types'

const appVariables: AppVariablesTypes = {
API_URL: "https://restcountries.com/v2/all",
TIME_KEY: "time",
COUNTRY_KEY: "countries",
CURRENT_TIME: new Date().getTime(),
INTERVAL: 10000,
POPULATION_SUM: 500000000
}

export default appVariables;