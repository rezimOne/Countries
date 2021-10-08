import './app.css';
import { Variables, Countries, StoredData, StorageMethods } from './interface/types';
import onLocalStorage from './service/localStorage';
import variables from './variables';

const { time_key, country_key } = variables;
const { getData } = onLocalStorage;

const list = getData(country_key);


const dataFromStorage: StoredData = {
  countryList: getData(country_key) ?
}















const urlAPI: string = "https://restcountries.com/v2/all";
const timeKey: string = "time";
const countryKey: string = "countries";
const currTime = new Date().getTime();
const prevTime = parseInt(localStorage.getItem(timeKey));
const interval = 10000;
const citizensSum = 500000000;