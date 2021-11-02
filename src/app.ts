import {
  LocalStorageMethods,
  LocalStorage,
  Countries,
  RegionalBlocs,
  BlocsObj
} from '../src/types';

import {
  appVariables
} from '../src/appVariables'

const {
  TIME_KEY,
  COUNTRY_KEY,
  API_URL,
  CURRENT_TIME,
  INTERVAL,
  POPULATION_LIMIT
} = appVariables;

/*
obiekt z metodami localStorage:
getData przyjmuje parametr key będący typem string, zwraca stringa lub null.
setData przyjmuje parametr key typu string, value typu any i nie zwraca nic.
*/
const localStorageMethods: LocalStorageMethods = {
  getData: (key) => localStorage.getItem(key),
  setData: (key, value) => localStorage.setItem(key, JSON.stringify(value))
};
const { getData, setData } = localStorageMethods;

/*
Zmienna pomocnicza countriesInStorage:
Argumentem w metodzie JSON.parse() musi być zmienna typu string.
*/
const countriesInStorage = getData(COUNTRY_KEY);

/*
Obiekt countriesLocalStorage:
Przechowuje dane krajów i czas ich ostatniego pobrania z API.
*/
const countriesLocalStorage: LocalStorage = {
  fetchTime: Number(getData(TIME_KEY)),
  storedCountries: countriesInStorage ? JSON.parse(countriesInStorage) : null
};
const { fetchTime, storedCountries } = countriesLocalStorage;

/*
Funkcja fetchData:
Pobranie danych z API.
Wewnątrz funkcja comparePopulation.
*/
const fetchData = () => {
  fetch(API_URL)
  .then((res) => res.json())
  .then((countries) => {
    console.log('%c * Countries from fetch: ', 'color: #CDEF32', countries)

    const fetchedCountries: Countries[] = countries;

    setData(TIME_KEY, CURRENT_TIME);
    setData(COUNTRY_KEY, fetchedCountries);

    if (storedCountries) {
      comparePopulation(fetchedCountries, storedCountries);
    }
  })
  .catch((err) => console.log(err));
}

/*
Funkcja comparePopulation:
Porównuje dane krajów z localStorage i z fetch pod względem zmian populacji. Jezeli w danych z fetch populacja się
zmieniła, nazwy tych krajów zwracane są w nowej tablicy countriesWithPopulationChange.
*/
const comparePopulation = (currData: Countries[], prevData: Countries[]): string[] => {
  const countriesWithPopulationChange: string[] = [];
  for (let i = 0; i < prevData.length; i++) {
    if (currData[i].population !== prevData[i].population) {
      countriesWithPopulationChange.push(currData[i].name);
    }
  }
  // console.log('Countries with population change:', countriesWithPopulationChange);
  return countriesWithPopulationChange;
};

/*
Wywołanie funkcji fetchData po spełnieniu warunku.
*/
(!storedCountries || fetchTime + INTERVAL <= CURRENT_TIME)
? fetchData()
: console.log('%c * Countries from localStorage: ','color: #CDEF32', storedCountries);

/*
Funckja countriesFromEU:
Zwraca kraje z regionu EU.
*/
const countriesFromEU = (countries: Countries[]): Countries[] => {
  return countries.filter((item) => item.regionalBlocs && item.regionalBlocs[0].acronym === 'EU')
};

/*
Filtrowanie zwróconych krajów EU bez litery 'a' w nazwie kraju.
*/
const euCountriesWithoutLetterA: Countries[] = countriesFromEU(storedCountries)
.filter((item) => !/a/.test(item.name));

/*
Dalsze sortowanie krajów EU bez 'a' wg liczby populacji.
*/
const euCountriesSortedByPopulation: Countries[] = euCountriesWithoutLetterA
.sort((a, b) => b.population - a.population);
console.log('%c * EU countries without letter "a" sorted desc: ', 'color: #CDEF32', euCountriesSortedByPopulation);

/*
Suma 5 krajów o największej populacji.
*/
const countriesPopulationSum = (countries: Countries[]): number => {
  return countries
  .sort((a, b) => b.population - a.population)
  .slice(0,5)
  .map((item) => item.population)
  .reduce((a, b) => a + b);
}
const topFiveCountriesPopulationSum = countriesPopulationSum(storedCountries);

(topFiveCountriesPopulationSum > POPULATION_LIMIT)
? console.log(`%c * Population sum equals to ${topFiveCountriesPopulationSum} is greater than 500 mln citizens.`, 'color: #CDEF32')
: console.log(`%c * Population sum equals to ${topFiveCountriesPopulationSum} is smaller than 500 mln citizens.`, 'color: #CDEF32')

/*
Funkcja createBlocsObj:
Tworzy obiekt przyjmując jako parametr tablicę stringów objKeys.
Kluczami są wartości tablicy. Dla kazdego klucza przypisuje wartość - tworzy kolejny obiekt.
*/
const blocs: string[] = ['EU', 'AU', 'NAFTA', 'other'];

const createBlocsObj = (data: string[]): RegionalBlocs | {} => {
  const obj: RegionalBlocs | {} = {};
  data.forEach((key) => {
    obj[key] = {
      countries: [],
      currencies: [],
      languages: {},
      population: 0
    }
  })
  return obj;
};
const newBlocsObj: {} = createBlocsObj(blocs);

/*
Funkcja createRegLangList:
Zwraca tablicę języków (ich kodów iso) dla wybranego regionu. Jako parametr przyjmuje tez nazwę regionu.
Dla other >>> false
*/
const createRegLangList = (countries: Countries[], region: string) => {
  const iso639_1_langArr: any = [];
  countries.forEach((country) => {
    if (country.regionalBlocs && country.languages && country.regionalBlocs.find(item => item.acronym === region)) {
      const langList = country.languages;
      iso639_1_langArr.push(langList.map(item => item.iso639_1));
  }
  });
  const isoCodeLangList: [] = iso639_1_langArr.flat();
  const uniqIsoCodeLangList: string[] = isoCodeLangList.filter((a, b) => isoCodeLangList.indexOf(a) == b)
  return uniqIsoCodeLangList;
};

/*
Obiekt blocsObj:
Wartościami kluczy są wywołania funkcji createRegLangList z podaniem nazwy regionu.
*/
const blocsObj: BlocsObj = {
  NAFTA: createRegLangList(storedCountries, 'NAFTA'),
  EU: createRegLangList(storedCountries, 'EU'),
  AU: createRegLangList(storedCountries, 'AU'),
}

/*
Funkcja createLangObj:
Tworzy obiekty langObj dla kazdego languages w danym regionie.
*/
const createLangObj = (data: string) => {
  const langObj = {
    countries: [],
    languages: {},
    population: 0,
    area: 0
    }
  return Object.fromEntries(blocsObj[data].map((key: string) => [key, langObj]));
}

/*
Funkcja setDataToObjBlocs:
Iteruje po tablicy blocs. Filtrując po countries (storedCountries) porównuje klucz regionName (wartość indexu tablicy) z countries.regionalBlocs.acronym.
Po spełnieniu warunku pushuje wartości do obiektu newBlocsObj. Pomija 'other' >>> false.
*/
const setDataToBlocsObj = (countries: Countries[]) => {
  blocs.forEach((regionName) => countries.filter((country) => {
    if (country.regionalBlocs && country.regionalBlocs.find((region) => region.acronym === regionName)) {
      newBlocsObj[regionName].countries.push(country.nativeName);
      newBlocsObj[regionName].population += country.population;
      newBlocsObj[regionName].languages = createLangObj(regionName);

      country.currencies.forEach((currency) => {
        if (!newBlocsObj[regionName].currencies.includes(currency.code)) {
          newBlocsObj[regionName].currencies.push(currency.code);
        }
      }
    )}
  }))
};
setDataToBlocsObj(storedCountries);
console.log('%c * newBlocsObj: ', 'color: #CDEF32', newBlocsObj);