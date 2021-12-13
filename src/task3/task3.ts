import { Countries, RegionalBlocs } from '../types';
import { countriesLocalStorage } from '../task1/task1';

const { storedCountries } = countriesLocalStorage;

const regionObjKeys: string[] = ['EU', 'AU', 'NAFTA', 'other'];

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
export const regionObj = createRegionObj(regionObjKeys);

const dataTransferToRegionObj = (param: string, country: Countries) => {
  regionObj[param].countries.push(country.nativeName)
  regionObj[param].countries.sort().reverse();
  regionObj[param].population += country.population;
  if(country.currencies){
    country.currencies.forEach((countryCurrency) => {
      if(countryCurrency.code)
        if (!regionObj[param].currencies.includes(countryCurrency.code)) {
          regionObj[param].currencies.push(countryCurrency.code);
        }
    });
  }
  country.languages.forEach((countryLang) => {
    if(countryLang.iso639_1){
      if(!regionObj[param].languages[countryLang.iso639_1]) {
        regionObj[param].languages[countryLang.iso639_1] = {
          countries: [],
          name: '',
          population: 0,
          area: 0
        }
      }
      regionObj[param].languages[countryLang.iso639_1].countries.push(country.alpha3Code);
      regionObj[param].languages[countryLang.iso639_1].population += country.population;
      regionObj[param].languages[countryLang.iso639_1].area += country.area;
      regionObj[param].languages[countryLang.iso639_1].name = countryLang.nativeName;
    }
  });
};

const setDataToRegionObj = (countries: Countries[]) => {
  countries.forEach(country => {
    if(country.regionalBlocs){
      country.regionalBlocs.forEach((item) => {
        regionObjKeys.forEach(region => {
          if (region !== 'other' && region === item.acronym) {
            dataTransferToRegionObj(region, country);
          }
        });
        if (!['EU', 'AU', 'NAFTA'].includes(item.acronym)) {
          dataTransferToRegionObj('other', country);
        }
      })
    } else if (!country.regionalBlocs){
      dataTransferToRegionObj('other', country)
    }
  });
}
setDataToRegionObj(storedCountries);

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

const regionPopulationObj: {} = {};
for (let [key, value] of Object.entries(regionObj)){
  if(key !== 'other'){
    regionPopulationObj[key] = value.population;
  }
};

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

const regionNumberOfLanguagesObj: {} = {};
const regionNumberOfCountries: {} = {};
const regionNumberOfCurrenciesObj: {} = {};
for (let [key, value] of Object.entries(regionObj)){
  if(key !== 'other'){
    regionNumberOfLanguagesObj[key] = Object.keys(value.languages).length;
    regionNumberOfCurrenciesObj[key] = Object.keys(value.currencies).length;
    regionNumberOfCountries[key] = Object.keys(value.countries).length;
  }
};

const languageNumberOfCountriesObj: {} = {};
const languagePopulationObj: {} = {};
const languagePopulation: any[] = [];
const languageAreaObj: {} = {};
const languageArea: any[] = [];

Object.entries(regionObj).forEach((item: any) => {
  if (item[0] !== 'other') {
    let languagesList: any = Object.values(item[1].languages);
    for (let i = 0; i < languagesList.length; i++) {

      languageNumberOfCountriesObj[languagesList[i].name] = languagesList[i].countries.length;

      if(languagesList[i].population){
        languagePopulation.push({[languagesList[i].name]: languagesList[i].population});
        languagePopulation.forEach(item => {
          for (let [key, val] of Object.entries(item)) {
            (languagePopulationObj[key]) ? languagePopulationObj[key] += val: languagePopulationObj[key] = val;
          }
        });
      }

      if(languagesList[i].area){
        languageArea.push({[languagesList[i].name]: languagesList[i].area});
        languageArea.forEach(item => {
          for (let [key, val] of Object.entries(item)) {
            (languageAreaObj[key]) ? languageAreaObj[key] += val: languageAreaObj[key] = val;
          }
        });
      }
    }
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
};

export let regionWithMinNumberOfCountries: string = '';
for (let [key, val] of Object.entries(regionNumberOfCountries)){
  let numberOfCountries: number[] = Object.values(regionNumberOfCountries);
  if(val === Math.min(...numberOfCountries)){
    regionWithMinNumberOfCountries = key;
  }
};

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
};

export const languagesOnMinMaxAreas: string[] = [];
for(let [key, val] of Object.entries(languageAreaObj)){
  let areaOfLanguages: number[] = Object.values(languageAreaObj);
  if(val === Math.max(...areaOfLanguages) || val === Math.min(...areaOfLanguages)){
    languagesOnMinMaxAreas.push(key);
  }
};