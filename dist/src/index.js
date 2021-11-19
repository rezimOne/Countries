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
  POPULATION_LIMIT: 500000000 // regionObjKeyVal: {
  //   countries: [],
  //   currencies: [],
  //   languages: {},
  //   population: 0
  // },
  // languagesObjKeyVal:{
  //   name: '',
  //   countries: [],
  //   population: 0,
  //   area: 0
  // }

};

/***/ }),

/***/ "./src/task1/task1.ts":
/*!****************************!*\
  !*** ./src/task1/task1.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "countriesLocalStorage": () => (/* binding */ countriesLocalStorage),
/* harmony export */   "fetchData": () => (/* binding */ fetchData),
/* harmony export */   "countriesWithPopulationChange": () => (/* binding */ countriesWithPopulationChange)
/* harmony export */ });
/* harmony import */ var _appVariables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../appVariables */ "./src/appVariables.ts");

var TIME_KEY = _appVariables__WEBPACK_IMPORTED_MODULE_0__.appVariables.TIME_KEY,
    COUNTRY_KEY = _appVariables__WEBPACK_IMPORTED_MODULE_0__.appVariables.COUNTRY_KEY,
    API_URL = _appVariables__WEBPACK_IMPORTED_MODULE_0__.appVariables.API_URL,
    CURRENT_TIME = _appVariables__WEBPACK_IMPORTED_MODULE_0__.appVariables.CURRENT_TIME;
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
var countriesInStorage = getData(COUNTRY_KEY);
var countriesLocalStorage = {
  fetchTime: Number(getData(TIME_KEY)),
  storedCountries: countriesInStorage ? JSON.parse(countriesInStorage) : null
};
var storedCountries = countriesLocalStorage.storedCountries;
var fetchData = function fetchData() {
  fetch(API_URL).then(function (res) {
    return res.json();
  }).then(function (countries) {
    console.log('%c * Countries from fetch: ', 'color: #F0CD10', countries);
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
var countriesWithPopulationChange = [];

var comparePopulation = function comparePopulation(currData, prevData) {
  for (var i = 0; i < prevData.length; i++) {
    if (currData[i].population !== prevData[i].population) {
      countriesWithPopulationChange.push(currData[i].name);
    }
  }

  return countriesWithPopulationChange;
};

/***/ }),

/***/ "./src/task2/task2.ts":
/*!****************************!*\
  !*** ./src/task2/task2.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "countriesFromEU": () => (/* binding */ countriesFromEU),
/* harmony export */   "euCountriesSortedByPopulation": () => (/* binding */ euCountriesSortedByPopulation),
/* harmony export */   "topFiveCountriesPopulationSum": () => (/* binding */ topFiveCountriesPopulationSum)
/* harmony export */ });
/* harmony import */ var _task1_task1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../task1/task1 */ "./src/task1/task1.ts");

var storedCountries = _task1_task1__WEBPACK_IMPORTED_MODULE_0__.countriesLocalStorage.storedCountries;
var countriesFromEU = function countriesFromEU(countries) {
  return countries.filter(function (item) {
    return item.regionalBlocs && item.regionalBlocs.find(function (el) {
      return el.acronym === 'EU';
    });
  });
};
var euCountriesWithoutLetterA = countriesFromEU(storedCountries).filter(function (item) {
  return !/a/.test(item.name);
});
var euCountriesSortedByPopulation = euCountriesWithoutLetterA.sort(function (a, b) {
  return b.population - a.population;
});

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

/***/ }),

/***/ "./src/task3/task3.ts":
/*!****************************!*\
  !*** ./src/task3/task3.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "regionObj": () => (/* binding */ regionObj),
/* harmony export */   "regionHighestPopulation": () => (/* binding */ regionHighestPopulation),
/* harmony export */   "regionSecondHighestDensity": () => (/* binding */ regionSecondHighestDensity),
/* harmony export */   "regionThirdHighestArea": () => (/* binding */ regionThirdHighestArea),
/* harmony export */   "regionWithMinMaxNumberOfLanguages": () => (/* binding */ regionWithMinMaxNumberOfLanguages),
/* harmony export */   "regionWithMaxNumberOfCurrencies": () => (/* binding */ regionWithMaxNumberOfCurrencies),
/* harmony export */   "regionWithMinNumberOfCountries": () => (/* binding */ regionWithMinNumberOfCountries),
/* harmony export */   "mostPopularLanguageByCountries": () => (/* binding */ mostPopularLanguageByCountries),
/* harmony export */   "lessPopularLanguageByPeople": () => (/* binding */ lessPopularLanguageByPeople),
/* harmony export */   "languagesOnMinMaxAreas": () => (/* binding */ languagesOnMinMaxAreas)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _task1_task1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../task1/task1 */ "./src/task1/task1.ts");




var storedCountries = _task1_task1__WEBPACK_IMPORTED_MODULE_3__.countriesLocalStorage.storedCountries;
var regionObjKeys = ['EU', 'AU', 'NAFTA', 'other'];

var createRegionObj = function createRegionObj(data) {
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

var regionObj = createRegionObj(regionObjKeys);
/*
Funkcja dataTransferToRegionObj:
metody do wypełniania obiektu danymi
*/

var dataTransferToRegionObj = function dataTransferToRegionObj(param, country) {
  regionObj[param].countries.push(country.nativeName);
  regionObj[param].countries.sort().reverse();
  regionObj[param].population += country.population;

  if (country.currencies) {
    country.currencies.forEach(function (countryCurrency) {
      if (countryCurrency.code) if (!regionObj[param].currencies.includes(countryCurrency.code)) {
        regionObj[param].currencies.push(countryCurrency.code);
      }
    });
  }

  country.languages.forEach(function (countryLang) {
    if (countryLang.iso639_1) {
      if (!regionObj[param].languages[countryLang.iso639_1]) {
        regionObj[param].languages[countryLang.iso639_1] = {
          countries: [],
          name: '',
          population: 0,
          area: 0
        };
      }

      regionObj[param].languages[countryLang.iso639_1].countries.push(country.alpha3Code);
      regionObj[param].languages[countryLang.iso639_1].population += country.population;
      regionObj[param].languages[countryLang.iso639_1].area += country.area;
      regionObj[param].languages[countryLang.iso639_1].name = countryLang.nativeName;
    }
  });
};
/*
Funkcja setDataToRegionObj:
Steruje w jaki sposob ma być wypełniony regionObj (dane krajów dla wybranego regionu oraz klucza 'other')
*/


var setDataToRegionObj = function setDataToRegionObj(countries) {
  countries.forEach(function (country) {
    if (country.regionalBlocs) {
      country.regionalBlocs.forEach(function (item) {
        regionObjKeys.forEach(function (region) {
          if (region !== 'other' && region === item.acronym) {
            dataTransferToRegionObj(region, country);
          }
        });

        if (item.acronym !== 'EU' && item.acronym !== 'NAFTA' && item.acronym !== 'AU') {
          dataTransferToRegionObj('other', country);
        }
      });
    } else if (!country.regionalBlocs) {
      dataTransferToRegionObj('other', country);
    }
  });
};

setDataToRegionObj(storedCountries);
/*
Obiekt {region: obszar}
*/

var regionAreaObj = {};
var regionCountryArea = [];
storedCountries.forEach(function (country) {
  if (country.regionalBlocs && country.area) {
    for (var i = 0; i < country.regionalBlocs.length; i++) {
      for (var _i = 0, _Object$keys = Object.keys(regionObj); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];

        if (country.regionalBlocs[i].acronym === key && key !== 'other') {
          regionCountryArea.push((0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])({}, key, country.area));
        }
      }
    }
  }
});
regionCountryArea.forEach(function (item) {
  for (var _i2 = 0, _Object$entries = Object.entries(item); _i2 < _Object$entries.length; _i2++) {
    var _Object$entries$_i = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_Object$entries[_i2], 2),
        key = _Object$entries$_i[0],
        val = _Object$entries$_i[1];

    regionAreaObj[key] ? regionAreaObj[key] += val : regionAreaObj[key] = val;
  }
});
/*
Obiekt {region: populacja}
*/

var regionPopulationObj = {};

for (var _i3 = 0, _Object$entries2 = Object.entries(regionObj); _i3 < _Object$entries2.length; _i3++) {
  var _Object$entries2$_i = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_Object$entries2[_i3], 2),
      key = _Object$entries2$_i[0],
      value = _Object$entries2$_i[1];

  if (key !== 'other') {
    regionPopulationObj[key] = value.population;
  }
}

;
/*
Obiekt {region: gęstość zaludnienia}
*/

var regionDensityObj = {};

var regionDensity = function regionDensity() {
  for (var _len = arguments.length, objs = new Array(_len), _key = 0; _key < _len; _key++) {
    objs[_key] = arguments[_key];
  }

  objs.reduce(function (a, b) {
    for (var _key2 in b) {
      if (b.hasOwnProperty(_key2)) {
        regionDensityObj[_key2] = Math.round((a[_key2] || 0) / b[_key2]);
      }
    }
  });
};

regionDensity(regionPopulationObj, regionAreaObj);
/*
Obiekty:
{region: liczba języków}
{region: liczba państw członkowskich}
{region: liczba walut}
*/

var regionNumberOfLanguagesObj = {};
var regionNumberOfCountries = {};
var regionNumberOfCurrenciesObj = {};

for (var _i4 = 0, _Object$entries3 = Object.entries(regionObj); _i4 < _Object$entries3.length; _i4++) {
  var _Object$entries3$_i = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_Object$entries3[_i4], 2),
      _key3 = _Object$entries3$_i[0],
      _value = _Object$entries3$_i[1];

  if (_key3 !== 'other') {
    regionNumberOfLanguagesObj[_key3] = Object.keys(_value.languages).length;
    regionNumberOfCurrenciesObj[_key3] = Object.keys(_value.currencies).length;
    regionNumberOfCountries[_key3] = Object.keys(_value.countries).length;
  }
}

;
/*
Obiekty:
{natywna nazwa języka: liczba krajów}
{natywna nazwa języka: populacja}
{natywna nazwa języka: obszar kraju}
*/

var languageNumberOfCountriesObj = {};
var languagePopulationObj = {};
var languagePopulation = [];
var languageAreaObj = {};
var languageArea = [];
Object.entries(regionObj).forEach(function (item) {
  if (item[0] !== 'other') {
    var languagesList = Object.values(item[1].languages);

    for (var i = 0; i < languagesList.length; i++) {
      languageNumberOfCountriesObj[languagesList[i].name] = languagesList[i].countries.length;

      if (languagesList[i].population) {
        languagePopulation.push((0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])({}, languagesList[i].name, languagesList[i].population));
        languagePopulation.forEach(function (item) {
          for (var _i5 = 0, _Object$entries4 = Object.entries(item); _i5 < _Object$entries4.length; _i5++) {
            var _Object$entries4$_i = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_Object$entries4[_i5], 2),
                _key4 = _Object$entries4$_i[0],
                val = _Object$entries4$_i[1];

            languagePopulationObj[_key4] ? languagePopulationObj[_key4] += val : languagePopulationObj[_key4] = val;
          }
        });
      }

      if (languagesList[i].area) {
        languageArea.push((0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])({}, languagesList[i].name, languagesList[i].area));
        languageArea.forEach(function (item) {
          for (var _i6 = 0, _Object$entries5 = Object.entries(item); _i6 < _Object$entries5.length; _i6++) {
            var _Object$entries5$_i = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_Object$entries5[_i6], 2),
                _key5 = _Object$entries5$_i[0],
                val = _Object$entries5$_i[1];

            languageAreaObj[_key5] ? languageAreaObj[_key5] += val : languageAreaObj[_key5] = val;
          }
        });
      }
    }
  }
});
var regionHighestPopulation = Object.keys(regionPopulationObj).sort(function (a, b) {
  return regionPopulationObj[b] - regionPopulationObj[a];
});
var regionSecondHighestDensity = Object.keys(regionDensityObj).sort(function (a, b) {
  return regionDensityObj[b] - regionDensityObj[a];
});
var regionThirdHighestArea = Object.keys(regionAreaObj).sort(function (a, b) {
  return regionAreaObj[b] - regionAreaObj[a];
});
var regionWithMinMaxNumberOfLanguages = [];

for (var _i7 = 0, _Object$entries6 = Object.entries(regionNumberOfLanguagesObj); _i7 < _Object$entries6.length; _i7++) {
  var _Object$entries6$_i = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_Object$entries6[_i7], 2),
      _key6 = _Object$entries6$_i[0],
      val = _Object$entries6$_i[1];

  var numberOfLanguages = Object.values(regionNumberOfLanguagesObj);

  if (val === Math.max.apply(Math, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(numberOfLanguages)) || val === Math.min.apply(Math, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(numberOfLanguages))) {
    regionWithMinMaxNumberOfLanguages.push(_key6);
  }
}

;
var regionWithMaxNumberOfCurrencies = ''; //const nie mozna nadpisać

for (var _i8 = 0, _Object$entries7 = Object.entries(regionNumberOfCurrenciesObj); _i8 < _Object$entries7.length; _i8++) {
  var _Object$entries7$_i = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_Object$entries7[_i8], 2),
      _key7 = _Object$entries7$_i[0],
      _val = _Object$entries7$_i[1];

  var numberOfCurrencies = Object.values(regionNumberOfCurrenciesObj);

  if (_val === Math.max.apply(Math, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(numberOfCurrencies))) {
    regionWithMaxNumberOfCurrencies = _key7;
  }
}

;
var regionWithMinNumberOfCountries = '';

for (var _i9 = 0, _Object$entries8 = Object.entries(regionNumberOfCountries); _i9 < _Object$entries8.length; _i9++) {
  var _Object$entries8$_i = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_Object$entries8[_i9], 2),
      _key8 = _Object$entries8$_i[0],
      _val2 = _Object$entries8$_i[1];

  var numberOfCountries = Object.values(regionNumberOfCountries);

  if (_val2 === Math.min.apply(Math, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(numberOfCountries))) {
    regionWithMinNumberOfCountries = _key8;
  }
}

;
var mostPopularLanguageByCountries = '';

for (var _i10 = 0, _Object$entries9 = Object.entries(languageNumberOfCountriesObj); _i10 < _Object$entries9.length; _i10++) {
  var _Object$entries9$_i = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_Object$entries9[_i10], 2),
      _key9 = _Object$entries9$_i[0],
      _val3 = _Object$entries9$_i[1];

  var languageCountriesNumber = Object.values(languageNumberOfCountriesObj);

  if (_val3 === Math.max.apply(Math, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(languageCountriesNumber))) {
    mostPopularLanguageByCountries = _key9;
  }
}

;
var lessPopularLanguageByPeople = '';

for (var _i11 = 0, _Object$entries10 = Object.entries(languagePopulationObj); _i11 < _Object$entries10.length; _i11++) {
  var _Object$entries10$_i = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_Object$entries10[_i11], 2),
      _key10 = _Object$entries10$_i[0],
      _val4 = _Object$entries10$_i[1];

  var populationNumber = Object.values(languagePopulationObj);

  if (_val4 === Math.min.apply(Math, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(populationNumber))) {
    lessPopularLanguageByPeople = _key10;
  }
}

;
var languagesOnMinMaxAreas = [];

for (var _i12 = 0, _Object$entries11 = Object.entries(languageAreaObj); _i12 < _Object$entries11.length; _i12++) {
  var _Object$entries11$_i = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_Object$entries11[_i12], 2),
      _key11 = _Object$entries11$_i[0],
      _val5 = _Object$entries11$_i[1];

  var areaOfLanguages = Object.values(languageAreaObj);

  if (_val5 === Math.max.apply(Math, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(areaOfLanguages)) || _val5 === Math.min.apply(Math, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(areaOfLanguages))) {
    languagesOnMinMaxAreas.push(_key11);
  }
}

;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithHoles)
/* harmony export */ });
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithoutHoles)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArray)
/* harmony export */ });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArrayLimit)
/* harmony export */ });
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableRest)
/* harmony export */ });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableSpread)
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _slicedToArray)
/* harmony export */ });
/* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");




function _slicedToArray(arr, i) {
  return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr, i) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr, i) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toConsumableArray)
/* harmony export */ });
/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(arr) {
  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
}

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
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_appVariables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/appVariables */ "./src/appVariables.ts");
/* harmony import */ var _task1_task1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task1/task1 */ "./src/task1/task1.ts");
/* harmony import */ var _task2_task2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task2/task2 */ "./src/task2/task2.ts");
/* harmony import */ var _task3_task3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./task3/task3 */ "./src/task3/task3.ts");




var CURRENT_TIME = _src_appVariables__WEBPACK_IMPORTED_MODULE_0__.appVariables.CURRENT_TIME,
    INTERVAL = _src_appVariables__WEBPACK_IMPORTED_MODULE_0__.appVariables.INTERVAL,
    POPULATION_LIMIT = _src_appVariables__WEBPACK_IMPORTED_MODULE_0__.appVariables.POPULATION_LIMIT;
var fetchTime = _task1_task1__WEBPACK_IMPORTED_MODULE_1__.countriesLocalStorage.fetchTime,
    storedCountries = _task1_task1__WEBPACK_IMPORTED_MODULE_1__.countriesLocalStorage.storedCountries;
/*
Wywołanie funkcji fetchData
*/

!storedCountries || fetchTime + INTERVAL <= CURRENT_TIME ? (0,_task1_task1__WEBPACK_IMPORTED_MODULE_1__.fetchData)() : console.log('%c * Countries from localStorage:', 'color: #F40AEA', storedCountries);
/*
Kraje, w których zmieniła się populacja
*/

console.log('%c * Countries with population change:', 'color: #F40AEA', _task1_task1__WEBPACK_IMPORTED_MODULE_1__.countriesWithPopulationChange);
/*
Lista krajów EU
*/

console.log('%c * EU countries:', 'color: #F4B10A', (0,_task2_task2__WEBPACK_IMPORTED_MODULE_2__.countriesFromEU)(storedCountries));
/*
Filtrowanie zwróconych krajów EU bez litery 'a' w nazwie kraju
*/

console.log('%c * EU countries without letter "a" sorted desc:', 'color: #F4B10A', _task2_task2__WEBPACK_IMPORTED_MODULE_2__.euCountriesSortedByPopulation);
/*
Suma 5 krajów o największej populacji
*/

console.log('%c * Top Five countries population sum:', 'color: #F4B10A', _task2_task2__WEBPACK_IMPORTED_MODULE_2__.topFiveCountriesPopulationSum.toLocaleString());
_task2_task2__WEBPACK_IMPORTED_MODULE_2__.topFiveCountriesPopulationSum > POPULATION_LIMIT ? console.log("%c * Top Five countries population sum equals to ".concat(_task2_task2__WEBPACK_IMPORTED_MODULE_2__.topFiveCountriesPopulationSum, " is greater than 500 mln people."), 'color: #F4B10A') : console.log("%c * Top Five countries population sum equals to ".concat(_task2_task2__WEBPACK_IMPORTED_MODULE_2__.topFiveCountriesPopulationSum, " is smaller than 500 mln people."), 'color: #F4B10A');
/*
Utworzenie obiektu z regionami
*/

console.log('%c * Region object:', 'color: #CDEF32', _task3_task3__WEBPACK_IMPORTED_MODULE_3__.regionObj);
/*
Organizacja o największej populacji
*/

console.log('%c * Highest population region:', 'color: #CDEF32', _task3_task3__WEBPACK_IMPORTED_MODULE_3__.regionHighestPopulation[0]);
/*
Organizacja o drugiej największej gęstości zaludnienia
*/

console.log('%c * Seocnd highest population density region:', 'color: #CDEF32', _task3_task3__WEBPACK_IMPORTED_MODULE_3__.regionSecondHighestDensity[1]);
/*
Organizacja o trzecim największym obszarze
*/

console.log('%c * Third highest area region:', 'color: #CDEF32', _task3_task3__WEBPACK_IMPORTED_MODULE_3__.regionThirdHighestArea[2]);
/*
Organizacja o największej i najmniejszej liczbie języków
*/

console.log('%c * Regions with max & min number of languages:', 'color: #CDEF32', _task3_task3__WEBPACK_IMPORTED_MODULE_3__.regionWithMinMaxNumberOfLanguages);
/*
Organizacja z największą liczbą walut
*/

console.log('%c * Region with max number of currencies:', 'color: #CDEF32', _task3_task3__WEBPACK_IMPORTED_MODULE_3__.regionWithMaxNumberOfCurrencies);
/*
Organizacja z najmniejszą liczbą pańśtw członkowskich
*/

console.log('%c * Region with min number of countries:', 'color: #CDEF32', _task3_task3__WEBPACK_IMPORTED_MODULE_3__.regionWithMinNumberOfCountries);
/*
Natywna nazwa języka uzywanego w największej liczbie krajów
*/

console.log('%c * The most popular language by countries is:', 'color: #CDEF32', _task3_task3__WEBPACK_IMPORTED_MODULE_3__.mostPopularLanguageByCountries);
/*
Natywna nazwa języka uzywanego przez najmniejszą liczbę ludzi
*/

console.log('%c * The less popular language by population is:', 'color: #CDEF32', _task3_task3__WEBPACK_IMPORTED_MODULE_3__.lessPopularLanguageByPeople);
/*
Nazwy języków uzywanych na największym i najmnijeszym obszarze
*/

console.log('%c * Languages of max & min area:', 'color: #CDEF32', _task3_task3__WEBPACK_IMPORTED_MODULE_3__.languagesOnMinMaxAreas);
})();

/******/ })()
;
//# sourceMappingURL=index.js.map