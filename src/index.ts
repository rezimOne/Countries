import { appVariables } from '../src/appVariables'
import { countriesLocalStorage, fetchData } from './task1/task1';
import { euCountriesSortedByPopulation, topFiveCountriesPopulationSum, countriesFromEU } from './task2/task2';
import { newBlocsObj, setDataToBlocsObj } from './task3/task3';

const { CURRENT_TIME, INTERVAL, POPULATION_LIMIT } = appVariables;
const { fetchTime, storedCountries } = countriesLocalStorage;

/*
Wywołanie funkcji fetchData po spełnieniu warunku.
*/
(!storedCountries || fetchTime + INTERVAL <= CURRENT_TIME)
? fetchData()
: console.log('%c * Countries from localStorage: ','color: #F0CD10', storedCountries);

/*
Lista krajów EU
*/
console.log('%c * EU countries: ', 'color: #CDEF32', countriesFromEU(storedCountries));

/*
Filtrowanie zwróconych krajów EU bez litery 'a' w nazwie kraju.
*/
console.log('%c * EU countries without letter "a" sorted desc: ', 'color: #CDEF32', euCountriesSortedByPopulation);

/*
Suma 5 krajów o największej populacji.
*/
(topFiveCountriesPopulationSum > POPULATION_LIMIT)
? console.log(`%c * Top Five EU countries without 'a' population sum equals to ${topFiveCountriesPopulationSum} is greater than 500 mln citizens.`, 'color: #CDEF32')
: console.log(`%c * Top Five countries population sum equals to ${topFiveCountriesPopulationSum} is smaller than 500 mln citizens.`, 'color: #CDEF32')

/*
Utworzenie obiektu z regionami
*/
setDataToBlocsObj(storedCountries);
console.log('%c * newBlocsObj: ', 'color: #05C6F0' , newBlocsObj);