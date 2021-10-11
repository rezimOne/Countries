import './app.css'

const urlAPI = "https://restcountries.com/v2/all";
const timeKey = "time";
const countryKey = "countries";
const currTime = new Date().getTime();
const prevTime = parseInt(localStorage.getItem(timeKey));
const interval = 10000000;
const citizensSum = 500000000;

const compareData = (currData, prevData) => {
  const countryList = [];
  for (let i = 0; i < currData.length; i++) {
    if (currData[i].population !== prevData[i].population) {
        countryList.push(prevData[i].name)
    }
  }
  console.log('Countries with population change:', countryList);
  return countryList;
}

//zadanie 2: euCountries, populationSumCheck

const euCountries = (data) => {
  const euCoutryList = data
  .filter((item) =>
    item.regionalBlocs && item.regionalBlocs[0].acronym === 'EU'
    && !/a/.test(item.name)
  )
  .sort((a, b) => b.population - a.population);
  console.log('My sorted EU countries without letter "a":', euCoutryList);
}


const populationSumCheck = (data) => {
  const noDublicateCountries = [];
  data.forEach((item) => {
    if (!noDublicateCountries.includes(item)){
      noDublicateCountries.push(item);
    }
  })

  const myMaxPopulationCountries = noDublicateCountries
  .sort((a, b) => b - a)
  .slice(0,5);

  const populationSum = myMaxPopulationCountries
  .reduce((acc, item) => item.population + acc,0);

  if (populationSum > citizensSum){
    console.log(`Population sum equals to ${populationSum} is greater than 500 mln citizens.`);
  } else {
    console.log(`Population sum equals to ${populationSum} is smaller than 500 mln citizens.`);
  }
}


const fetchData = async () => {
  try {
    const response = await fetch(urlAPI);
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
}


if(!localStorage.getItem(countryKey) || prevTime + interval  >= currTime){
  fetchData().then(response => {
    const fetchedData = response;
    localStorage.setItem(timeKey, JSON.stringify(currTime));
    localStorage.setItem(countryKey, JSON.stringify(fetchedData));
    const storedData = JSON.parse(localStorage.getItem(countryKey));
    console.log(storedData);

    if (storedData) {
      compareData(fetchedData, storedData);
      euCountries(storedData);
      populationSumCheck(storedData);
      task3(storedData);
    }

  });
}
//zadanie 3

const task3 = (el) => {

  const myCountries = {
      EU: {countries: [], population: 0, languages: {}, currencies: []},
      AU: {countries: [], population: 0, languages: {}, currencies: []},
      NAFTA: {countries: [], population: 0, languages: {}, currencies: []},
      other: {countries: [], population: 0, languages: {}, currencies: []}
  };

  for(let i = 0; i < el.length; i++){
    if(el[i].regionalBlocs){
      for(let j = 0; j < el[i].regionalBlocs.length; j++){
        if(el[i].regionalBlocs[j].acronym === "EU"){
          myCountries.EU.countries.push(el[i].nativeName);
          myCountries.EU.currencies.push(el[i].currencies[0].code);
          myCountries.EU.population += el[i].population;
        }else if(el[i].regionalBlocs[j].acronym === "AU"){
          myCountries.AU.countries.push(el[i].nativeName);
          myCountries.AU.currencies.push(el[i].currencies[0].code);
          myCountries.AU.population += el[i].population;
        }else if(el[i].regionalBlocs[j].acronym === "NAFTA"){
          myCountries.NAFTA.countries.push(el[i].nativeName);
          myCountries.NAFTA.currencies.push(el[i].currencies[0].code);
          myCountries.NAFTA.population += el[i].population;
        }else{
          myCountries.other.countries.push(el[i].nativeName);
        }
      }
    }else{
      myCountries.other.countries.push(el[i].nativeName);
    }
  }

  myCountries.EU.currencies = [...new Set(myCountries.EU.currencies)];
  myCountries.AU.currencies = [...new Set(myCountries.AU.currencies)];
  myCountries.NAFTA.currencies = [...new Set(myCountries.NAFTA.currencies)];
  myCountries.other.currencies = [...new Set(myCountries.other.currencies)];

  console.log('myCountries:', myCountries)

}