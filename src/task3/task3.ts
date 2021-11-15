import { Countries, RegionalBlocs } from '../types';
import { countriesLocalStorage } from '../task1/task1';

const { storedCountries } = countriesLocalStorage;

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
export const regionObj = createRegionObj(regionAcronyms);

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
  }
  );
};
setDataToRegionObj(storedCountries);


/*
Obiekt {region: obszar}
*/
const regionAreaObj = {};
const regionCountryArea: {}[] = [];
storedCountries.forEach((country) => {
  if(country.regionalBlocs && country.area){
    for(let i=0; i < country.regionalBlocs.length; i++){
      for (let key of Object.keys(regionObj)){
        if (country.regionalBlocs[i].acronym === key && key !== 'other') {
          regionCountryArea.push({[key]: country.area})
        }
      }
    }
  }
});
regionCountryArea.forEach(item => {
  for (let [key, val] of Object.entries(item)) {
    (regionAreaObj[key]) ? regionAreaObj[key] += val: regionAreaObj[key] = val
  }
});

/*
Obiekt {region: populacja}
*/
const regionPopulationObj: {} = {};
for (let [key, value] of Object.entries(regionObj)){
  if(key !== 'other'){
    regionPopulationObj[key] = value.population;
  }
};

/*
Obiekt {region: gęstość zaludnienia}
*/
const regionDensityObj: {} = {}
const regionDensity = (...objs: any) => {
  objs.reduce((a: any, b: any) => {
    for (let key in b) {
      if(b.hasOwnProperty(key)) {
        regionDensityObj[key] = Math.round((a[key] || 0) / b[key]);
      }
    }
  });
};
regionDensity(regionPopulationObj, regionAreaObj);

/*
Obiekt {region: liczba języków}
*/
const regionNumberOfLanguagesObj: {} = {};
for (let [key, value] of Object.entries(regionObj)){
  if(key !== 'other'){
    regionNumberOfLanguagesObj[key] = Object.keys(value.languages).length;
  }
};

/*
Obiekt {region: liczba walut}
*/
const regionNumberOfCurrenciesObj: {} = {};
for (let [key, value] of Object.entries(regionObj)){
  if(key !== 'other'){
    regionNumberOfCurrenciesObj[key] = Object.keys(value.currencies).length;
  }
};

/*
Obiekt {region: liczba państw członkowskich}
*/
const regionNumberOfCountries: {} = {};
for (let [key, value] of Object.entries(regionObj)){
  if(key !== 'other'){
    regionNumberOfCountries[key] = Object.keys(value.countries).length;
  }
};

/*
Obiekt {natywna nazwa języka: liczba krajów}
*/
const languageNumberOfCountriesObj: {} = {};
Object.entries(regionObj).forEach((item: any) => {
  if (item[0] !== 'other') {
    let languagesList: any = Object.values(item[1].languages);
    for (let i = 0; i < languagesList.length; i++) {
      languageNumberOfCountriesObj[languagesList[i].name] = languagesList[i].countries.length;
    }
  }
});

/*
Obiekt {natywna nazwa języka: populacja}
*/
const languagePopulationObj: {} = {};
const languagePopulation: any[] = [];
Object.entries(regionObj).forEach((item) => {
  if (item[0] !== 'other') {
    let languagesList: any = Object.values(item[1].languages);
    for (let i = 0; i < languagesList.length; i++) {
      if(languagesList[i].population){
        languagePopulation.push({[languagesList[i].name]: languagesList[i].population});
      }
    }
  }
});
languagePopulation.forEach(item => {
  for (let [key, val] of Object.entries(item)) {
    (languagePopulationObj[key]) ? languagePopulationObj[key] += val: languagePopulationObj[key] = val;
  }
});

/*
Obiekt {natywna nazwa języka: obszar kraju}
*/
const languageAreaObj: {} = {};
const languageArea: any[] = [];
Object.entries(regionObj).forEach((item) => {
  if (item[0] !== 'other') {
    let languagesList: any = Object.values(item[1].languages);
    for (let i = 0; i < languagesList.length; i++) {
      if(languagesList[i].area){
        languageArea.push({[languagesList[i].name]: languagesList[i].area});
      }
    }
  }
});
languageArea.forEach(item => {
  for (let [key, val] of Object.entries(item)) {
    (languageAreaObj[key]) ? languageAreaObj[key] += val: languageAreaObj[key] = val;
  }
});

export const regionHighestPopulation = Object.keys(regionPopulationObj).sort((a, b) => regionPopulationObj[b] - regionPopulationObj[a]);

export const regionSecondHighestDensity = Object.keys(regionDensityObj).sort((a, b) => regionDensityObj[b] - regionDensityObj[a]);

export const regionThirdHighestArea = Object.keys(regionAreaObj).sort((a, b) => regionAreaObj[b] - regionAreaObj[a]);

export const regionWithMinMaxNumberOfLanguages: string[] = [];
for(let [key, val] of Object.entries(regionNumberOfLanguagesObj)){
  let numberOfLanguages: number[] = Object.values(regionNumberOfLanguagesObj);
  if(val === Math.max(...numberOfLanguages) || val === Math.min(...numberOfLanguages)){
    regionWithMinMaxNumberOfLanguages.push(key);
  }
};

export let regionWithMaxNumberOfCurrencies: string = ''; //const nie mozna nadpisać
for (let [key, val] of Object.entries(regionNumberOfCurrenciesObj)){
  let numberOfCurrencies: number[] = Object.values(regionNumberOfCurrenciesObj);
  if(val === Math.max(...numberOfCurrencies)){
    regionWithMaxNumberOfCurrencies = key;
  }
}

export let regionWithMinNumberOfCountries: string = '';
for (let [key, val] of Object.entries(regionNumberOfCountries)){
  let numberOfCountries: number[] = Object.values(regionNumberOfCountries);
  if(val === Math.min(...numberOfCountries)){
    regionWithMinNumberOfCountries = key;
  }
}

export let mostPopularLanguageByCountries: string = '';
for (let [key, val] of Object.entries(languageNumberOfCountriesObj)){
  let languageCountriesNumber: number[] = Object.values(languageNumberOfCountriesObj);
  if(val === Math.max(...languageCountriesNumber)){
    mostPopularLanguageByCountries = key;
  }
};

export let lessPopularLanguageByPeople: string = '';
for (let [key, val] of Object.entries(languagePopulationObj)){
  let populationNumber: number[] = Object.values(languagePopulationObj);
  if(val === Math.min(...populationNumber)){
    lessPopularLanguageByPeople = key;
  }
}

export const languagesOnMinMaxAreas: string[] = [];
for(let [key, val] of Object.entries(languageAreaObj)){
  let areaOfLanguages: number[] = Object.values(languageAreaObj);
  if(val === Math.max(...areaOfLanguages) || val === Math.min(...areaOfLanguages)){
    languagesOnMinMaxAreas.push(key);
  }
};