import "./styles.css"
import { euCountries, populationSumCheck } from './task_2/task_2';
import { fetchData } from "./task_1/task_1";
import { dataFromLocalStorage } from "./shared/localStorageData";
import appVariables from "./shared/appVariables";

const { storedData, time } = dataFromLocalStorage;
const { INTERVAL, CURRENT_TIME } = appVariables;

if (!storedData || time + INTERVAL <= CURRENT_TIME) {
  fetchData(dataFromLocalStorage, appVariables);
};



if(dataFromLocalStorage){
  euCountries(storedData);
  populationSumCheck(storedData, appVariables);
  console.log(dataFromLocalStorage);
}







