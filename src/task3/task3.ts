import { Countries, RegionalBlocs, BlocsObj } from '../types';
import { countriesLocalStorage } from '../task1/task1';
const { storedCountries } = countriesLocalStorage;

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
export const newBlocsObj: {} = createBlocsObj(blocs);

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
    name: '',
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
export const setDataToBlocsObj = (countries: Countries[]) => {
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