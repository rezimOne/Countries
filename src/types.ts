export interface AppVariables {
  API_URL: string;
  TIME_KEY: string;
  COUNTRY_KEY: string;
  INTERVAL: number;
  CURRENT_TIME: number;
  POPULATION_LIMIT: number;
};

export interface LocalStorageMethods {
  getData (key: string): string | null;
  setData (key: string, value: any): void;
};

export interface Countries {
  name: string;
  nativeName: string;
  population: number;
  aplpha3Code: string;
  regionalBlocs: { acronym: string }[];
  currencies: { code: string }[];
  languages: { iso639_1: string, nativeName: string }[];
  area: number;
};

export interface LocalStorage {
  fetchTime: number;
  storedCountries: Countries[];
};

export interface CountriesByRegion {
  countries: string[];
  population: number;
  currencies: string[];
  languages: {
    [key: string]: {
      name: string;
      countries: string[];
      population: number;
      area: number;
    }
  }
};

export interface RegionalBlocs {
  EU: CountriesByRegion;
  AU: CountriesByRegion;
  NAFTA: CountriesByRegion;
  other: CountriesByRegion;
}


