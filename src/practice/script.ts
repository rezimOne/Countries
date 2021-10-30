import './styles.css';

/* interface - typy zmiennych */

interface MyVariables {
  API_URL: string;
  TIME_KEY: string;
  COUNTRY_KEY: string;
  INTERVAL: number;
  CURRENT_TIME: number;
  COMPARE_TO_POPULATION_SUM: number;
};

interface Countries {
  name: string;
  nativeName: string;
  aplpha3Code: string;
  regionalBlocs: { acronym: string }[];
  currencies: { code: string }[];
  languages: { iso639_1: string, nativeName: string }[];
  population: number;
  area: number;
};

interface LocalStorage {
  fetchTime: number;
  storedCountries: Countries[];
};

interface LocalStorageServices {
  getData (key: string): string | null;
  setData (key: string, value: any): void;
};


interface CountriesByRegion {
  countries: string[];
  population: number;
  currencies: string[];
  area: number;
  languages: {
    [key: string]: {
      name: string;
      countries: string[];
      population: number;
      area: number;
    }
  };
}

interface RegionalBlocs {
  EU: CountriesByRegion;
  AU: CountriesByRegion;
  NAFTA: CountriesByRegion;
  other: CountriesByRegion;
}

/* zmienne i funkcje */

const myVariables: MyVariables = {
  API_URL: "https://restcountries.com/v2/all",
  TIME_KEY: "time",
  COUNTRY_KEY: "countries",
  CURRENT_TIME: new Date().getTime(),
  INTERVAL: 100000,
  COMPARE_TO_POPULATION_SUM: 500000000,
};

const localStorageMethods: LocalStorageServices = {
  getData: (key) => localStorage.getItem(key),
  setData: (key, value) => localStorage.setItem(key, JSON.stringify(value))
};

const countriesInLocalStorage = localStorageMethods.getData(myVariables.COUNTRY_KEY);

const myLocalStorage: LocalStorage = {
  fetchTime: Number(localStorageMethods.getData(myVariables.TIME_KEY)),
  storedCountries: countriesInLocalStorage ? JSON.parse(countriesInLocalStorage) : null
};

const comparePopulation = (currData: Countries[], prevData: Countries[]): string[] => {
  const countriesWithPopulationChange: string[] = [];
  for (let i = 0; i < prevData.length; i++) {
    if (currData[i].population !== prevData[i].population){ //!==
      countriesWithPopulationChange.push(currData[i].name);
    }
  }
  console.log('Countries with population change:', countriesWithPopulationChange);
  return countriesWithPopulationChange;
};

const fetchData = () => {
  fetch(myVariables.API_URL)
  .then((response) => response.json())
  .then((countries) => {

    console.log('Countries from fetch: ',countries)
    const fetchedCountries: Countries[] = countries;

    localStorageMethods.setData(myVariables.TIME_KEY, myVariables.CURRENT_TIME);
    localStorageMethods.setData(myVariables.COUNTRY_KEY, fetchedCountries);

    if (myLocalStorage.storedCountries) {
      comparePopulation(fetchedCountries, myLocalStorage.storedCountries);
    }

  })
  .catch((err) => console.log(err));
}

if (!myLocalStorage.storedCountries || myLocalStorage.fetchTime + myVariables.INTERVAL <= myVariables.CURRENT_TIME) {
  fetchData();
} else {
  console.log('Countries from localStorage: ', myLocalStorage.storedCountries);
};


const countriesFromEU = (data: Countries[]): Countries[] => data
.filter((item) => item.regionalBlocs && item.regionalBlocs[0].acronym === 'EU');

const euCountries: Countries[] = countriesFromEU(myLocalStorage.storedCountries);

const euCountriesWithoutLetterA: Countries[] = euCountries
.filter((item) => !/a/.test(item.name));

const euCountriesSortedByPopulation: Countries[] = euCountriesWithoutLetterA
.sort((a, b) => b.population - a.population);
console.log('EU countries without letter "a" sorted: ', euCountriesSortedByPopulation);

const countriesPopulationSum = (data: Countries[]): number => data
.sort((a, b) => b.population - a.population)
.slice(0,5)
.map((item) => item.population)
.reduce((a, b) => a + b);

const topFiveCountriesPopulationSum = countriesPopulationSum(myLocalStorage.storedCountries);

if (topFiveCountriesPopulationSum > myVariables.COMPARE_TO_POPULATION_SUM){
    console.log(`Population sum equals to ${topFiveCountriesPopulationSum} is greater than 500 mln citizens.`);
  } else {
    console.log(`Population sum equals to ${topFiveCountriesPopulationSum} is smaller than 500 mln citizens.`);
  }


const myArr = ['EU', 'AU', 'NAFTA', 'other'];

const createObj = (regBlocs: string[]): RegionalBlocs | {} => {
  const obj: RegionalBlocs | {} = {};
  regBlocs.forEach((region) => {
    obj[region] = {
      countries: [],
      currencies: [],
      languages: {},
      population: 0,
      area: 0
    }
  })
  return obj;
}

const regionsObj: RegionalBlocs | {} = createObj(myArr);
console.log('My region countries; ', regionsObj);

const placeDataInObj = (data: Countries[]) => {
  let regionBlocs = ['EU', 'AU', 'NAFTA']

  regionBlocs.forEach((regionName) => data.filter((country) => {
    if(country.regionalBlocs && country.regionalBlocs.find((region) => region.acronym === regionName)){
      regionsObj[regionName].countries.push(country.nativeName);
      regionsObj[regionName].population += country.population;

      country.currencies.forEach((currency) => {
        if(!regionsObj[regionName].currencies.includes(currency.code)){
          regionsObj[regionName].currencies.push(currency.code);
        }
      });
    }
  }));

  // for(let i=0; i<data.length; i++){
  //   if(data[i].regionalBlocs){
  //     for(let j=0; j<data[i].regionalBlocs.length; j++){
  //       if(data[i].regionalBlocs[j].acronym !== "EU"
  //       && data[i].regionalBlocs[j].acronym !== "AU"
  //       && data[i].regionalBlocs[j].acronym !== "NAFTA"){
  //         regionsObj['other'].countries.push(data[i].name)
  //       }
  //     }
  //   } else {
  //     if(!data[i].regionalBlocs){
  //       if(regionsObj['other'].countries.indexOf(data[i].name) == -1){
  //         regionsObj['other'].countries.push(data[i].name);
  //     }
  //   }
  // }}




  // data.forEach((country) => {
  //   if(country.regionalBlocs && country.regionalBlocs.find(el => el.acronym !== 'NAFTA')){
  //     regionsObj['other'].countries.push(country.name)
  //   }
  // });

}

// placeDataInObj(myLocalStorage.storedCountries);


// const languagesCheck = (data: Countries[]) => {
//   const regionsObjCountry = regionsObj[regionName];
//   data.languages.forEach((newLanguageObj) => {
//     if(!regionsObjCountry.languages[newLanguageObj.iso639_1]){
//       regionsObjCountry.languages[newLanguageObj.iso639_1] = {
//         countries: [],
//         population: 0,
//         area: 0,
//         name: ''
//       };
//     }
//   const language = regionsObjCountry.languages[newLanguageObj.iso639_1];
//   language.countries.push(data.aplpha3Code);
//   language.population += data.population;
//   language.area += data.area;
//   language.name = newLanguageObj.nativeName
//   })
//   return regionsObjCountry.languages;
// }

// languagesCheck(myLocalStorage.storedCountries);





// const placeDataInObj = (data: Countries[]) => {
//   data.forEach(country => {
//     if(country.regionalBlocs){
//       if(country.regionalBlocs.find(el => el.acronym === 'EU')){
//         regionsObj['EU'].countries.push(country.nativeName);
//         regionsObj['EU'].population += country.population;
//         country.currencies.forEach(currency => {
//           if(regionsObj['EU'].currencies.indexOf(currency.code) == -1){
//             regionsObj['EU'].currencies.push(currency.code);
//           }
//         });
//       }

//       if(country.regionalBlocs.find(el => el.acronym === 'AU')){
//         regionsObj['AU'].countries.push(country.nativeName);
//         regionsObj['AU'].population += country.population;
//         country.currencies.forEach(currency => {
//           if(regionsObj['AU'].currencies.indexOf(currency.code) == -1){
//             regionsObj['AU'].currencies.push(currency.code);
//           }
//         });
//       };

//       if(country.regionalBlocs.find(el => el.acronym === 'NAFTA')){
//         regionsObj['NAFTA'].countries.push(country.nativeName);
//         regionsObj['NAFTA'].population += country.population;
//         country.currencies.forEach(currency => {
//           if(regionsObj['NAFTA'].currencies.indexOf(currency.code) == -1){
//             regionsObj['NAFTA'].currencies.push(currency.code);
//           }
//         });
//       };
//     }
//   });
// }






// interface CountriesServices {
//   getEUcountries(data: Countries[]): Countries[],
//   getEUcountriesWithoutLetterA(data: Countries[]): Countries[],
//   sortEUcountriesByPopulation(data: Countries[]): Countries[],
//   sumCountriesByPopulation(data: Countries[]): number
// }


