import { Variables } from './interface/types';

const variables: Variables = {
  apiURL: "https://restcountries.com/v2/all",
  time_key: "time",
  country_key: "countries",
  current_time: new Date().getTime(),
  interval: 10000,
  citizen_sum: 500000000
}

export default variables;