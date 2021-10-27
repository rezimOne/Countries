import { LocalStorageDataTypes } from "./types";
import appVariables from "./appVariables";
import { localStorageMethods } from "./localStorageService";


const { TIME_KEY, COUNTRY_KEY } = appVariables;
const { getData } = localStorageMethods;
const countriesInLocalStore = getData(COUNTRY_KEY);

export const dataFromLocalStorage: LocalStorageDataTypes = {
  time: Number(getData(TIME_KEY)),
  storedData: countriesInLocalStore ? JSON.parse(countriesInLocalStore) : undefined
};


