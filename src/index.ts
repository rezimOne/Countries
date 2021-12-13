import { appVariables } from '../src/appVariables'
import { countriesLocalStorage, countriesWithPopulationChange, fetchData } from './task1/task1';
import { euCountriesSortedByPopulation, topFiveCountriesPopulationSum, countriesFromEU } from './task2/task2';
import { languagesOnMinMaxAreas, lessPopularLanguageByPeople, mostPopularLanguageByCountries, regionHighestPopulation, regionObj, regionSecondHighestDensity, regionThirdHighestArea, regionWithMaxNumberOfCurrencies, regionWithMinMaxNumberOfLanguages, regionWithMinNumberOfCountries } from './task3/task3';

const { POPULATION_LIMIT, CURRENT_TIME } = appVariables;
const { storedCountries, fetchTime } = countriesLocalStorage;

//*/
console.log('%c * Countries with population change:', 'color: #F40AEA', countriesWithPopulationChange);

//*/
console.log('%c * EU countries:', 'color: #F4B10A', countriesFromEU(storedCountries));

//*/
console.log('%c * EU countries without letter "a" sorted desc:', 'color: #F4B10A', euCountriesSortedByPopulation);

//*/
console.log('%c * Top Five countries population sum:', 'color: #F4B10A', topFiveCountriesPopulationSum.toLocaleString());

//*/
(topFiveCountriesPopulationSum > POPULATION_LIMIT)
? console.log(`%c * Top Five countries population sum equals to ${topFiveCountriesPopulationSum} is greater than 500 mln people.`, 'color: #F4B10A')
: console.log(`%c * Top Five countries population sum equals to ${topFiveCountriesPopulationSum} is smaller than 500 mln people.`, 'color: #F4B10A')

//*/
console.log('%c * Region object:', 'color: #CDEF32', regionObj);

//*/
console.log('%c * Highest population region:', 'color: #CDEF32', regionHighestPopulation[0]);

//*/
console.log('%c * Seocnd highest population density region:', 'color: #CDEF32', regionSecondHighestDensity[1]);

//*/
console.log('%c * Third highest area region:', 'color: #CDEF32', regionThirdHighestArea[2]);

//*/
console.log('%c * Regions with max & min number of languages:', 'color: #CDEF32', regionWithMinMaxNumberOfLanguages);

//*/
console.log('%c * Region with max number of currencies:', 'color: #CDEF32', regionWithMaxNumberOfCurrencies);

//*/
console.log('%c * Region with min number of countries:', 'color: #CDEF32', regionWithMinNumberOfCountries);

//*/
console.log('%c * The most popular language by countries is:', 'color: #CDEF32', mostPopularLanguageByCountries);

//*/
console.log('%c * The less popular language by population is:', 'color: #CDEF32', lessPopularLanguageByPeople);

//*/
console.log('%c * Languages of max & min area:', 'color: #CDEF32', languagesOnMinMaxAreas);