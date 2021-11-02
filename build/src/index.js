/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/appVariables.ts":
/*!*****************************!*\
  !*** ./src/appVariables.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appVariables": () => (/* binding */ appVariables)
/* harmony export */ });
/*
obiekt ze zmiennymi uzywanymi w apliakcji
*/
var appVariables = {
  API_URL: "https://restcountries.com/v2/all",
  TIME_KEY: "time",
  COUNTRY_KEY: "countries",
  CURRENT_TIME: new Date().getTime(),
  INTERVAL: 100000,
  POPULATION_LIMIT: 500000000
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _appVariables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./appVariables */ "./src/appVariables.ts");

var TIME_KEY = _appVariables__WEBPACK_IMPORTED_MODULE_0__.appVariables.TIME_KEY,
    COUNTRY_KEY = _appVariables__WEBPACK_IMPORTED_MODULE_0__.appVariables.COUNTRY_KEY,
    API_URL = _appVariables__WEBPACK_IMPORTED_MODULE_0__.appVariables.API_URL,
    CURRENT_TIME = _appVariables__WEBPACK_IMPORTED_MODULE_0__.appVariables.CURRENT_TIME,
    INTERVAL = _appVariables__WEBPACK_IMPORTED_MODULE_0__.appVariables.INTERVAL,
    POPULATION_LIMIT = _appVariables__WEBPACK_IMPORTED_MODULE_0__.appVariables.POPULATION_LIMIT;
/*
obiekt z metodami localStorage:
getData przyjmuje parametr key będący typem string, zwraca stringa lub null.
setData przyjmuje parametr key typu string, value typu any i nie zwraca nic.
*/

var localStorageMethods = {
  getData: function getData(key) {
    return localStorage.getItem(key);
  },
  setData: function setData(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }
};
var getData = localStorageMethods.getData,
    setData = localStorageMethods.setData;
/*
Zmienna pomocnicza countriesInStorage:
Argumentem w metodzie JSON.parse() musi być zmienna typu string.
*/

var countriesInStorage = getData(COUNTRY_KEY);
/*
Obiekt countriesLocalStorage:
Przechowuje dane krajów i czas ich ostatniego pobrania z API.
*/

var countriesLocalStorage = {
  fetchTime: Number(getData(TIME_KEY)),
  storedCountries: countriesInStorage ? JSON.parse(countriesInStorage) : null
};
var fetchTime = countriesLocalStorage.fetchTime,
    storedCountries = countriesLocalStorage.storedCountries;
/*
Funkcja fetchData:
Pobranie danych z API.
Wewnątrz funkcja comparePopulation.
*/

var fetchData = function fetchData() {
  fetch(API_URL).then(function (res) {
    return res.json();
  }).then(function (countries) {
    console.log('%c * Countries from fetch: ', 'color: #CDEF32', countries);
    var fetchedCountries = countries;
    setData(TIME_KEY, CURRENT_TIME);
    setData(COUNTRY_KEY, fetchedCountries);

    if (storedCountries) {
      comparePopulation(fetchedCountries, storedCountries);
    }
  })["catch"](function (err) {
    return console.log(err);
  });
};
/*
Funkcja comparePopulation:
Porównuje dane krajów z localStorage i z fetch pod względem zmian populacji. Jezeli w danych z fetch populacja się
zmieniła, nazwy tych krajów zwracane są w nowej tablicy countriesWithPopulationChange.
*/


var comparePopulation = function comparePopulation(currData, prevData) {
  var countriesWithPopulationChange = [];

  for (var i = 0; i < prevData.length; i++) {
    if (currData[i].population !== prevData[i].population) {
      countriesWithPopulationChange.push(currData[i].name);
    }
  } // console.log('Countries with population change:', countriesWithPopulationChange);


  return countriesWithPopulationChange;
};
/*
Wywołanie funkcji fetchData po spełnieniu warunku.
*/


!storedCountries || fetchTime + INTERVAL <= CURRENT_TIME ? fetchData() : console.log('%c * Countries from localStorage: ', 'color: #CDEF32', storedCountries);
/*
Funckja countriesFromEU:
Zwraca kraje z regionu EU.
*/

var countriesFromEU = function countriesFromEU(countries) {
  return countries.filter(function (item) {
    return item.regionalBlocs && item.regionalBlocs[0].acronym === 'EU';
  });
};
/*
Filtrowanie zwróconych krajów EU bez litery 'a' w nazwie kraju.
*/


var euCountriesWithoutLetterA = countriesFromEU(storedCountries).filter(function (item) {
  return !/a/.test(item.name);
});
/*
Dalsze sortowanie krajów EU bez 'a' wg liczby populacji.
*/

var euCountriesSortedByPopulation = euCountriesWithoutLetterA.sort(function (a, b) {
  return b.population - a.population;
});
console.log('%c * EU countries without letter "a" sorted desc: ', 'color: #CDEF32', euCountriesSortedByPopulation);
/*
Suma 5 krajów o największej populacji.
*/

var countriesPopulationSum = function countriesPopulationSum(countries) {
  return countries.sort(function (a, b) {
    return b.population - a.population;
  }).slice(0, 5).map(function (item) {
    return item.population;
  }).reduce(function (a, b) {
    return a + b;
  });
};

var topFiveCountriesPopulationSum = countriesPopulationSum(storedCountries);
topFiveCountriesPopulationSum > POPULATION_LIMIT ? console.log("%c * Population sum equals to ".concat(topFiveCountriesPopulationSum, " is greater than 500 mln citizens."), 'color: #CDEF32') : console.log("%c * Population sum equals to ".concat(topFiveCountriesPopulationSum, " is smaller than 500 mln citizens."), 'color: #CDEF32');
/*
Funkcja createBlocsObj:
Tworzy obiekt przyjmując jako parametr tablicę stringów objKeys.
Kluczami są wartości tablicy. Dla kazdego klucza przypisuje wartość - tworzy kolejny obiekt.
*/

var blocs = ['EU', 'AU', 'NAFTA', 'other'];

var createBlocsObj = function createBlocsObj(data) {
  var obj = {};
  data.forEach(function (key) {
    obj[key] = {
      countries: [],
      currencies: [],
      languages: {},
      population: 0
    };
  });
  return obj;
};

var newBlocsObj = createBlocsObj(blocs);
/*
Funkcja createRegLangList:
Zwraca tablicę języków (ich kodów iso) dla wybranego regionu. Jako parametr przyjmuje tez nazwę regionu.
Dla other >>> false
*/

var createRegLangList = function createRegLangList(countries, region) {
  var iso639_1_langArr = [];
  countries.forEach(function (country) {
    for (var i = 0; i < blocs.length; i++) {
      if (country.regionalBlocs && country.languages && country.regionalBlocs.find(function (i) {
        return i.acronym === region;
      })) {
        var langList = country.languages;
        iso639_1_langArr.push(langList.map(function (item) {
          return item.iso639_1;
        }));
      }
    }
  });
  var isoCodeLangList = iso639_1_langArr.flat();
  var uniqIsoCodeLangList = isoCodeLangList.filter(function (a, b) {
    return isoCodeLangList.indexOf(a) == b;
  });
  return uniqIsoCodeLangList;
};
/*
Obiekt blocsObj:
Wartościami kluczy są wywołania funkcji createRegLangList z podaniem nazwy regionu.
*/


var blocsObj = {
  NAFTA: createRegLangList(storedCountries, 'NAFTA'),
  EU: createRegLangList(storedCountries, 'EU'),
  AU: createRegLangList(storedCountries, 'AU')
};
/*
Funkcja createLangObj:
Tworzy obiekty langObj dla kazdego languages w danym regionie.
*/

var createLangObj = function createLangObj(data) {
  var langObj = {
    countries: [],
    languages: {},
    population: 0,
    area: 0
  };
  return Object.fromEntries(blocsObj[data].map(function (key) {
    return [key, langObj];
  }));
};
/*
Funkcja setDataToObjBlocs:
Iteruje po tablicy blocs. Filtrując po countries (storedCountries) porównuje klucz regionName (wartość indexu tablicy) z countries.regionalBlocs.acronym.
Po spełnieniu warunku pushuje wartości do obiektu newBlocsObj. Pomija 'other' >>> false.
*/


var setDataToBlocsObj = function setDataToBlocsObj(countries) {
  blocs.forEach(function (regionName) {
    return countries.filter(function (country) {
      if (country.regionalBlocs && country.regionalBlocs.find(function (region) {
        return region.acronym === regionName;
      })) {
        newBlocsObj[regionName].countries.push(country.nativeName);
        newBlocsObj[regionName].population += country.population;
        newBlocsObj[regionName].languages = createLangObj(regionName);
        country.currencies.forEach(function (currency) {
          if (!newBlocsObj[regionName].currencies.includes(currency.code)) {
            newBlocsObj[regionName].currencies.push(currency.code);
          }
        });
      }
    });
  });
};

setDataToBlocsObj(storedCountries);
console.log('%c * newBlocsObj: ', 'color: #CDEF32', newBlocsObj);
})();

/******/ })()
;
//# sourceMappingURL=index.js.map