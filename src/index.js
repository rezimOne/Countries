import './app.css'

const urlAPI = "https://restcountries.com/v2/all";
const timeKey = "time";
const countryKey = "countries";
const currTime = new Date().getTime();
const prevTime = parseInt(localStorage.getItem(timeKey));
const interval = 10000;
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


if(!localStorage.getItem(countryKey) || prevTime + interval  <= currTime){
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
    }
  });
}