export interface Countries {
  name: string;
  nativeName: string;
  aplpha3Code: string;
  regionalBlocs: { acronym: string }[];
  currencies: { code: string }[];
  languages: { iso639_1: string, nativeName: string }[];
  population: number;
  area: number;
}

export interface AppVariablesTypes {
  API_URL: string;
  TIME_KEY: string;
  COUNTRY_KEY: string;
  INTERVAL: number;
  CURRENT_TIME: number;
  POPULATION_SUM: number;
}

export interface LocalStorageDataTypes {
  storedData: Countries[];
  time: number;
}

export interface LocalStorageService {
  getData (key: string): string | null;
  setData (key: string, value: any): void;
}