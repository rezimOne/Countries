import { Countries } from '../types';
import { countriesLocalStorage } from '../task1/task1';
const { storedCountries } = countriesLocalStorage;

/*
Funckja countriesFromEU:
Zwraca kraje z regionu EU.
*/
export const countriesFromEU = (countries: Countries[]): Countries[] => {
  return countries.filter((item) => item.regionalBlocs && item.regionalBlocs[0].acronym === 'EU')
};

/*
Filtrowanie zwróconych krajów EU bez litery 'a' w nazwie kraju.
*/
export const euCountriesWithoutLetterA: Countries[] = countriesFromEU(storedCountries)
.filter((item) => !/a/.test(item.name));

/*
Dalsze sortowanie krajów EU bez 'a' wg liczby populacji.
*/
export const euCountriesSortedByPopulation: Countries[] = euCountriesWithoutLetterA
.sort((a, b) => b.population - a.population);

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
export const topFiveCountriesPopulationSum = countriesPopulationSum(storedCountries);
