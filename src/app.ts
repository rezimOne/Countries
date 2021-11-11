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
import { resolvePreset } from '@babel/core';

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
    console.log('%c * Countries from fetch: ', 'color: #EAC117', countries)

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
: console.log('%c * Countries from localStorage: ','color: #EAC117', storedCountries);

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
console.log('%c * EU countries without letter "a" population sorted desc: ', 'color: #EAC117', euCountriesSortedByPopulation);

/*
Suma 5 krajów o największej populacji.
*/
export const countriesPopulationSum = (countries: Countries[]): number => {
  return countries
  .sort((a, b) => b.population - a.population)
  .slice(0,5)
  .map((item) => item.population)
  .reduce((a, b) => a + b);
}
const topFiveCountriesPopulationSum = countriesPopulationSum(storedCountries);

(topFiveCountriesPopulationSum > POPULATION_LIMIT)
? console.log(`%c * Population sum equals to ${topFiveCountriesPopulationSum} is greater than 500 mln citizens.`, 'color: #EC18CF')
: console.log(`%c * Population sum equals to ${topFiveCountriesPopulationSum} is smaller than 500 mln citizens.`, 'color: #EC18CF')

/*
Funkcja createRegionObj:
Tworzy obiekt przyjmując jako parametr tablicę regionAcronym.
Kluczami są wartości tablicy. Dla kazdego klucza przypisuje wartość - tworzy kolejny obiekt.
*/
const regionAcronyms: string[] = ['EU', 'AU', 'NAFTA', 'other'];

const createRegionObj = (data: string[]): RegionalBlocs | {} => {
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
const regionObj = createRegionObj(regionAcronyms);

/*
Funkcja setDataToRegionObj:
Iteruje po krajach i po tablicy regionalBlocs kazdego kraju
*/
const setDataToRegionObj = (countries: Countries[]) => {
  countries.forEach((country) => {
    if(country.regionalBlocs){
      for(let i=0; i < country.regionalBlocs.length; i++){
        if (country.regionalBlocs[i].acronym === 'EU') {
          regionObj['EU'].countries.push(country.nativeName)
          regionObj['EU'].countries.sort().reverse();
          regionObj['EU'].population += country.population;
          country.currencies.forEach((countryCurrency) => {
            if(countryCurrency.code)
              if (!regionObj['EU'].currencies.includes(countryCurrency.code)) {
                regionObj['EU'].currencies.push(countryCurrency.code);
              }
          });
          /*w obiekcie languages, przypisuje pusty obiekt dla utworzonego klucza*/
          country.languages.forEach((countryLang) => {
            if(countryLang.iso639_1){
              if(!regionObj['EU'].languages[countryLang.iso639_1]){
                regionObj['EU'].languages[countryLang.iso639_1] = {
                  countries: [],
                  name: '',
                  population: 0,
                  area: 0
                }
              }
              regionObj['EU'].languages[countryLang.iso639_1].countries.push(country.alpha3Code);
              regionObj['EU'].languages[countryLang.iso639_1].population += country.population;
              regionObj['EU'].languages[countryLang.iso639_1].area += country.area;
              regionObj['EU'].languages[countryLang.iso639_1].name = countryLang.nativeName;
            }
          });
        }
        if (country.regionalBlocs[i].acronym === 'NAFTA') {
          regionObj['NAFTA'].countries.push(country.nativeName);
          regionObj['NAFTA'].countries.sort().reverse();
          regionObj['NAFTA'].population += country.population;
          country.currencies.forEach((countryCurrency) => {
            if(countryCurrency.code)
              if (!regionObj['NAFTA'].currencies.includes(countryCurrency.code)) {
                regionObj['NAFTA'].currencies.push(countryCurrency.code);
              }
          });
          country.languages.forEach((countryLang) => {
            if(countryLang.iso639_1){
              if(!regionObj['NAFTA'].languages[countryLang.iso639_1]){
                regionObj['NAFTA'].languages[countryLang.iso639_1] = {
                  countries: [],
                  name: '',
                  population: 0,
                  area: 0
                }
              }
              regionObj['NAFTA'].languages[countryLang.iso639_1].countries.push(country.alpha3Code);
              regionObj['NAFTA'].languages[countryLang.iso639_1].population += country.population;
              regionObj['NAFTA'].languages[countryLang.iso639_1].area += country.area;
              regionObj['NAFTA'].languages[countryLang.iso639_1].name = countryLang.nativeName;
            }
          });
        }
        if (country.regionalBlocs[i].acronym === 'AU') {
          regionObj['AU'].countries.push(country.nativeName);
          regionObj['AU'].countries.sort().reverse();
          regionObj['AU'].population += country.population;
          country.currencies.forEach((countryCurrency) => {
            if(countryCurrency.code)
              if (!regionObj['AU'].currencies.includes(countryCurrency.code)) {
                regionObj['AU'].currencies.push(countryCurrency.code);
              }
          });
          country.languages.forEach((countryLang) => {
            if(countryLang.iso639_1){
              if(!regionObj['AU'].languages[countryLang.iso639_1]){
                regionObj['AU'].languages[countryLang.iso639_1] = {
                  countries: [],
                  name: '',
                  population: 0,
                  area: 0
                }
              }
              regionObj['AU'].languages[countryLang.iso639_1].countries.push(country.alpha3Code);
              regionObj['AU'].languages[countryLang.iso639_1].population += country.population;
              regionObj['AU'].languages[countryLang.iso639_1].area += country.area;
              regionObj['AU'].languages[countryLang.iso639_1].name = countryLang.nativeName;
            }
          });
        }
        else if(
          country.regionalBlocs[i].acronym !== 'AU' &&
          country.regionalBlocs[i].acronym !== 'EU' &&
          country.regionalBlocs[i].acronym !== 'NAFTA'
        ){
          regionObj['other'].countries.push(country.nativeName);
          regionObj['other'].countries.sort().reverse();
          regionObj['other'].population += country.population;
          country.currencies.forEach((countryCurrency) => {
            if(countryCurrency.code)
              if (!regionObj['other'].currencies.includes(countryCurrency.code)) {
                regionObj['other'].currencies.push(countryCurrency.code);
              }
          });
          country.languages.forEach((countryLang) => {
            if(countryLang.iso639_1){
              if(!regionObj['other'].languages[countryLang.iso639_1]){
                regionObj['other'].languages[countryLang.iso639_1] = {
                  countries: [],
                  name: '',
                  population: 0,
                  area: 0
                }
              }
              regionObj['other'].languages[countryLang.iso639_1].countries.push(country.alpha3Code);
              regionObj['other'].languages[countryLang.iso639_1].population += country.population;
              regionObj['other'].languages[countryLang.iso639_1].area += country.area;
              regionObj['other'].languages[countryLang.iso639_1].name = countryLang.nativeName;
            }
          });
        }
      }
    }
  });
}
setDataToRegionObj(storedCountries)
console.log('%c * Region object: ', 'color: #CDEF32', regionObj);

/*
Organizacja o największej populacji.
*/
const regionalPopulation: {}[] = [];

const compareRegionPopulation = (): {}[] => {
  for (let [key, value] of Object.entries(regionObj)){
    regionalPopulation.push([key, value.population]);
  }
  regionalPopulation.sort((a: number, b: number) => b[1] - a[1]);
  return regionalPopulation;
}
compareRegionPopulation();
console.log('%c * Region with biggest population: ', 'color: #CDEF32', regionalPopulation[1]);

/*

*/












// const setDataToBlocsObj = (countries: Countries[], regionName: string) => {

//   countries.forEach((country) => {
//     if(country.regionalBlocs){
//       for(let i=0; i < country.regionalBlocs.length; i++){
//         if (country.regionalBlocs[i].acronym === regionName) {

//           regionObj[regionName].countries.push(country.nativeName);
//           regionObj[regionName].population += country.population;

//           country.currencies.forEach((countryCurrency) => {
//             if(countryCurrency.code)
//               if (!regionObj[regionName].currencies.includes(countryCurrency.code)) {
//                 regionObj[regionName].currencies.push(countryCurrency.code);
//               }
//           });
//           /*w obiekcie languages, przypisuje pusty obiekt dla dynamicznie utworzonego klucza*/
//           country.languages.forEach((countryLang) => {
//             if(countryLang.iso639_1){
//               if(!regionObj[regionName].languages[countryLang.iso639_1]){
//                 regionObj[regionName].languages[countryLang.iso639_1] = {
//                   countries: [],
//                   name: '',
//                   population: 0,
//                   area: 0
//                 }
//               }
//               regionObj[regionName].languages[countryLang.iso639_1].countries.push(country.alpha3Code);
//               regionObj[regionName].languages[countryLang.iso639_1].population += country.population;
//               regionObj[regionName].languages[countryLang.iso639_1].area += country.area;
//               regionObj[regionName].languages[countryLang.iso639_1].name = countryLang.nativeName;
//             }
//           });
//         }
//       }
//     }
//   })
// };
// setDataToBlocsObj(storedCountries, 'NAFTA')
// setDataToBlocsObj(storedCountries, 'EU')
// setDataToBlocsObj(storedCountries, 'AU')








// const setDataToOther = (countries: Countries[]) => {
//   countries.forEach((country) => {
//     if(country.regionalBlocs){
//       for(let i=0; i < country.regionalBlocs.length; i++){
//         for(let j=0; j < regionalBlocsArr.length; j++){
//           if (country.regionalBlocs[i].acronym !== regionalBlocsArr[j]) {
//             setDataToBlocsObj(storedCountries, 'other')
//           }
//         }
//       }
//     }
//   })
// }

// setDataToOther(storedCountries);








  // let myArr: string[] = [];
  // countries.forEach(country => {
  //   if(country.regionalBlocs){
  //   for(let i = 0; i < country.regionalBlocs.length; i++){
  //   if (country.regionalBlocs[i].acronym === 'NAFTA'){
  //     myArr.push(country.name)
  //   }
  // }
  //   }

    // if (country.regionalBlocs && country.regionalBlocs.find((region) => region.acronym === 'EU')){
    //   console.log(country.name);
    // }
  // })
  // console.log(myArr);
  // console.log('other', other)








/*
Funkcja createRegLangList:
Zwraca tablicę języków (ich kodów iso) dla wybranego regionu. Jako parametr przyjmuje tez nazwę regionu.
Dla other >>> false
*/
// const createRegLangList = (countries: Countries[], region: string) => {
//   const iso639_1_langArr: any = [];
//   countries.forEach((country) => {
//     if (country.regionalBlocs && country.languages && country.regionalBlocs.find(item => item.acronym === region)) {
//       const langList = country.languages;
//       iso639_1_langArr.push(langList.map(item => item.iso639_1));
//   }
//   });
//   const isoCodeLangList: [] = iso639_1_langArr.flat();
//   const uniqIsoCodeLangList: string[] = isoCodeLangList.filter((a, b) => isoCodeLangList.indexOf(a) == b)
//   return uniqIsoCodeLangList;
// };

/*
Obiekt blocsObj:
Wartościami kluczy są wywołania funkcji createRegLangList z podaniem nazwy regionu.
*/
// const blocsObj: BlocsObj = {
//   NAFTA: createRegLangList(storedCountries, 'NAFTA'),
//   EU: createRegLangList(storedCountries, 'EU'),
//   AU: createRegLangList(storedCountries, 'AU'),
// }