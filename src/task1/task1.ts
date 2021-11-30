import { LocalStorageMethods, LocalStorage, Countries, } from '../types';
import { appVariables } from '../appVariables';

const { TIME_KEY, COUNTRY_KEY, API_URL, CURRENT_TIME } = appVariables;

const localStorageMethods: LocalStorageMethods = {
  getData: (key) => localStorage.getItem(key),
  setData: (key, value) => localStorage.setItem(key, JSON.stringify(value))
};

const { getData, setData } = localStorageMethods;

const countriesInStorage = getData(COUNTRY_KEY);

export const countriesLocalStorage: LocalStorage = {
  fetchTime: Number(getData(TIME_KEY)),
  storedCountries: countriesInStorage ? JSON.parse(countriesInStorage) : null
};
const { storedCountries } = countriesLocalStorage;

export const fetchData = () => {
  fetch(API_URL)
  .then((res) => res.json())
  .then((countries) => {
    console.log('%c * Countries from fetch: ', 'color: #F0CD10', countries)

    const fetchedCountries: Countries[] = countries;

    setData(TIME_KEY, CURRENT_TIME);
    setData(COUNTRY_KEY, fetchedCountries);

    if (storedCountries) {
      comparePopulation(fetchedCountries, storedCountries);
    }
  })
  .catch((err) => console.log(err));
}

export const countriesWithPopulationChange: string[] = [];
const comparePopulation = (currData: Countries[], prevData: Countries[]): string[] => {
  for (let i = 0; i < prevData.length; i++) {
    if (currData[i].population !== prevData[i].population) {
      countriesWithPopulationChange.push(currData[i].name);
    }
  }
  return countriesWithPopulationChange;
};