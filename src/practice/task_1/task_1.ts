import { Countries, LocalStorageDataTypes, AppVariablesTypes } from "../shared/types";
import { localStorageMethods } from "../shared/localStorageService";
import appVariables from "../shared/appVariables";

//parametry funkcji typeof >>> object
const compareCountriesData = (currData: Countries[], prevData: Countries[]): Countries[] => {
  if (!prevData) {
    return currData;
  }

  // console.log(typeof currData);
  // console.log(currData.constructor)
  // console.log(typeof prevData);

  const updatedCountriesList: Countries[] = [];
  for (let i = 0; i < currData.length; i++) {
    if (currData[i].population !== prevData[i].population){
      updatedCountriesList.push(prevData[i]);
    }
  }
    // console.log(updatedCountriesList);
    return updatedCountriesList;
};


const populationChangeCountries = (currData: Countries[], prevData: Countries[]): string[] => {
  const countriesNames: string[] = [];
  for (let i = 0; i < prevData.length; i++) {
    if (currData[i].population !== prevData[i].population){ //!==
      countriesNames.push(currData[i].name);
    }
  }
  console.log('Countries with population change:', countriesNames);
  return countriesNames;
};


export const fetchData = (data: LocalStorageDataTypes, variables: AppVariablesTypes) => {
    const { storedData } = data;
    const { API_URL, TIME_KEY, CURRENT_TIME, COUNTRY_KEY } = variables;
    const { setData } = localStorageMethods;

    fetch(API_URL)
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      const fetchedData: Countries[] = res;

      if(storedData) {
        populationChangeCountries(fetchedData, storedData)
      }

      setData(TIME_KEY, CURRENT_TIME);
      setData(COUNTRY_KEY, compareCountriesData(fetchedData, storedData))
    })
    .catch((err) => console.log(err));
  }