import { LocalStorageMethods, LocalStorage, Countries, RegionalBlocs } from '../src/types';
import { appVariables } from './appVariables';
const { TIME_KEY, COUNTRY_KEY, API_URL, CURRENT_TIME, INTERVAL, POPULATION_LIMIT } = appVariables;

/*
obiekt z metodami localStorage:
getData przyjmuje parametr key będący typem string, zwraca stringa lub null.
setData przyjmuje parametr key typu string, value typu any i nie zwraca nic
*/
export const localStorageMethods: LocalStorageMethods = {
  getData: (key) => localStorage.getItem(key),
  setData: (key, value) => localStorage.setItem(key, JSON.stringify(value))
};
const { getData, setData } = localStorageMethods;

/*
Zmienna pomocnicza countriesInStorage:
Argumentem w metodzie JSON.parse() musi być zmienna typu string
*/
const countriesInStorage = getData(COUNTRY_KEY);

/*
Obiekt countriesLocalStorage:
Przechowuje dane krajów i czas ich ostatniego pobrania z API
*/
export const countriesLocalStorage: LocalStorage = {
  fetchTime: Number(getData(TIME_KEY)),
  storedCountries: countriesInStorage ? JSON.parse(countriesInStorage) : null
};
const { fetchTime, storedCountries } = countriesLocalStorage;

/*
Funkcja fetchData:
Pobranie danych z API.
Wewnątrz funkcja comparePopulation
*/
const fetchData = () => {
  fetch(API_URL)
  .then((res) => res.json())
  .then((countries) => {
    console.log('Countries from fetch: ', countries)

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
Wywołanie funkcji fetchData po spełnieniu warunku
*/
(!storedCountries || fetchTime + INTERVAL <= CURRENT_TIME)
? fetchData()
: console.log('Countries from localStorage: ', storedCountries);

/*
Funckja countriesFromEU:
zwraca kraje z regionu EU
*/
const countriesFromEU = (countries: Countries[]): Countries[] => {
  return countries.filter((item) => item.regionalBlocs && item.regionalBlocs[0].acronym === 'EU')
};

/*
Filtrowanie zwróconych krajów EU bez litery 'a' w nazwie kraju
*/
const euCountriesWithoutLetterA: Countries[] = countriesFromEU(storedCountries)
.filter((item) => !/a/.test(item.name));

/*
Dalsze sortowanie krajów EU bez 'a' wg liczby populacji
*/
const euCountriesSortedByPopulation: Countries[] = euCountriesWithoutLetterA
.sort((a, b) => b.population - a.population);
console.log('EU countries without letter "a" sorted desc: ', euCountriesSortedByPopulation);

/*
Suma 5 krajów o największej populacji
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
? console.log(`Population sum equals to ${topFiveCountriesPopulationSum} is greater than 500 mln citizens.`)
: console.log(`Population sum equals to ${topFiveCountriesPopulationSum} is smaller than 500 mln citizens.`)

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
Funkcja createLangObj:
W kazdym obiekcie, dla klucza languages, przypisuje nowy obiekt
*/
const createLangObj = (data: string[], countries: Countries[]): {} => {
  data.forEach((key: string) => {
    newBlocsObj[key].languages = {
      [countries[0].languages[0].iso639_1]: {
        countries: [],
        languages: {},
        population: 0,
        area: 0
      }
    }
  });
  return {};
};
createLangObj(blocs, storedCountries);

/*
Funkcja setDataToObjBlocs:
Iteruje po tablicy blocs. Filtrując po countries (storedCountries) porównuje klucz regionName (wartość indexu tablicy) z countries.regionalBlocs.acronym.
Po spełnieniu warunku pushuje wartości do obiektu newBlocsObj. Pomija 'other' >>> false.
*/
const setDataToBlocsObj = (countries: Countries[]): void => {
  blocs.forEach((regionName) => countries.filter((country) => {
    if (country.regionalBlocs && country.regionalBlocs.find((region) => region.acronym === regionName)) {
      newBlocsObj[regionName].countries.push(country.nativeName);
      newBlocsObj[regionName].population += country.population;

      country.currencies.forEach((currency) => {
        if (!newBlocsObj[regionName].currencies.includes(currency.code)) {
          newBlocsObj[regionName].currencies.push(currency.code);
        }
      }
    )}
  }))
};
setDataToBlocsObj(storedCountries);
console.log(newBlocsObj);


/*
some fun
*/
const checkLanguages = (countries: Countries[]) => {
  let someVal: any = [];
  countries.forEach((country) => {
    if(country.languages){
      someVal.push(country.name + ' languages: ' + country.languages.map((language) => language.iso639_1))
    }
  })
  // console.log(someVal)
}
checkLanguages(storedCountries);


const keys: string[] = Object.keys(newBlocsObj);
// console.log(keys);


let objs = [
  { name: 'Mike', last_name: 'Kowalski' },
  { name: 'Peter', last_name: 'Volters' },
  { name: 'Arnold', last_name: 'Neger' }
];
// console.log(
//   objs.sort((a,b) => (a.name > b.name)
//   ? 1
//   : ((b.name > a.name) ? -1 : 0))
// )

















