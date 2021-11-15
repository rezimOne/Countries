import { appVariables } from '../src/appVariables'
import { countriesLocalStorage, countriesWithPopulationChange, fetchData } from './task1/task1';
import { euCountriesSortedByPopulation, topFiveCountriesPopulationSum, countriesFromEU } from './task2/task2';
import { languagesOnMinMaxAreas, lessPopularLanguageByPeople, mostPopularLanguageByCountries, regionHighestPopulation, regionObj, regionSecondHighestDensity, regionThirdHighestArea, regionWithMaxNumberOfCurrencies, regionWithMinMaxNumberOfLanguages, regionWithMinNumberOfCountries } from './task3/task3';

const { CURRENT_TIME, INTERVAL, POPULATION_LIMIT } = appVariables;
const { fetchTime, storedCountries } = countriesLocalStorage;

/*
Wywołanie funkcji fetchData
*/
(!storedCountries || fetchTime + INTERVAL <= CURRENT_TIME)
? fetchData()
: console.log('%c * Countries from localStorage:','color: #F40AEA', storedCountries);

/*
Kraje, w których zmieniła się populacja
*/
console.log('%c * Countries with population change:', 'color: #F40AEA', countriesWithPopulationChange);

/*
Lista krajów EU
*/
console.log('%c * EU countries:', 'color: #F4B10A', countriesFromEU(storedCountries));

/*
Filtrowanie zwróconych krajów EU bez litery 'a' w nazwie kraju
*/
console.log('%c * EU countries without letter "a" sorted desc:', 'color: #F4B10A', euCountriesSortedByPopulation);

/*
Suma 5 krajów o największej populacji
*/
console.log('%c * Top Five countries population sum:', 'color: #F4B10A', topFiveCountriesPopulationSum);

/*
Suma 5 krajów o największej populacji
*/
(topFiveCountriesPopulationSum > POPULATION_LIMIT)
? console.log(`%c * Top Five countries population sum equals to ${topFiveCountriesPopulationSum} is greater than 500 mln citizens.`, 'color: #F4B10A')
: console.log(`%c * Top Five countries population sum equals to ${topFiveCountriesPopulationSum} is smaller than 500 mln citizens.`, 'color: #F4B10A')

/*
Utworzenie obiektu z regionami
*/
console.log('%c * Region object:', 'color: #CDEF32', regionObj);

/*
Organizacja o największej populacji
*/
console.log('%c * Highest population region:', 'color: #CDEF32', regionHighestPopulation[0]);

/*
Organizacja o drugiej największej gęstości zaludnienia
*/
console.log('%c * Seocnd highest population density region:', 'color: #CDEF32', regionSecondHighestDensity[1]);

/*
Organizacja o trzecim największym obszarze
*/
console.log('%c * Third highest area region:', 'color: #CDEF32', regionThirdHighestArea[2]);

/*
Organizacja o największej i najmniejszej liczbie języków
*/
console.log('%c * Regions with max & min number of languages:', 'color: #CDEF32', regionWithMinMaxNumberOfLanguages);

/*
Organizacja z największą liczbą walut
*/
console.log('%c * Region with max number of currencies:', 'color: #CDEF32', regionWithMaxNumberOfCurrencies);

/*
Organizacja z najmniejszą liczbą pańśtw członkowskich
*/
console.log('%c * Region with min number of countries:', 'color: #CDEF32', regionWithMinNumberOfCountries);

/*
Natywna nazwa języka uzywanego w największej liczbie krajów
*/
console.log('%c * The most popular language by countries is:', 'color: #CDEF32', mostPopularLanguageByCountries);

/*
Natywna nazwa języka uzywanego przez najmniejszą liczbę ludzi
*/
console.log('%c * The less popular language by population is:', 'color: #CDEF32', lessPopularLanguageByPeople);

/*
Nazwy języków uzywanych na największym i najmnijeszym obszarze
*/
console.log('%c * Languages of max & min area:', 'color: #CDEF32', languagesOnMinMaxAreas);