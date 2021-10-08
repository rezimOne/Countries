//interfejsy określające typy zmiennych:

export interface Countries {
  name: string;
  population: number;
  regionalBlocs: { acronym: string }[];
}

export interface AppVariables {
  apiURL: string;
  time_key: string;
  country_key: string;
  time_interval: number;
  current_time: number;
  population_sum: number;
}

export interface StoredCountries {
  countryList: Countries[];
  time: number;
}

export interface AppMethods {
  getCountries (key: string): string | null;
  setCountries (key: string, value: any): void;
  compareCountriesData(currData: Countries[], prevData: Countries[]): Countries[];
  // countriesEU();
  // populationSumCheck();
}