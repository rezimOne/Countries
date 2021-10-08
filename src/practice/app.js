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
    const storedData = JSON.parse(localStorage.getItem(countryKey));
    localStorage.setItem(timeKey, JSON.stringify(currTime));
    localStorage.setItem(countryKey, JSON.stringify(fetchedData));

    if (storedData) {
      compareData(fetchedData, storedData);
      euCountries(storedData);
      populationSumCheck(storedData);
    }
  });
}



// //dynamiczny html
function renderCountries(){
  // const TP = new Object(countries);
  // const TPjson = JSON.stringify(TP);
  // // console.log(TPjson);

  // const interface = Object.keys(TP[0])
  // console.log(interface);

  // localStorage.setItem();
  // console.log(localStorage);




  const box = document.createElement('ul');
  box.className = 'box-main';
  document.body.appendChild(box);

  countries.forEach(country => {

    const interfaceItems = [
      // country[interface[0]],
      // country[interface[5]],
      // country[interface[7]],
    ]

    const boxItem = document.createElement('li');
    boxItem.className = 'box-item';

    const boxRsection = document.createElement('section');
    boxRsection.className = 'box-right-section';

    const boxLsection = document.createElement('section');
    boxLsection.className = 'box-left-section';

    const countryInfo = document.createElement('ul');
    countryInfo.className = 'country-info';

    interfaceItems.forEach(item => {

      const li = document.createElement('li');
      li.className = 'country-attribute';
      li.innerText = item;
      countryInfo.appendChild(li);
    })

    const countryFlag = document.createElement('img');
    countryFlag.className = 'country-flag';
    countryFlag.src = country.flag;

    box.appendChild(boxItem);
    boxItem.appendChild(boxLsection);
    boxItem.appendChild(boxRsection);
    boxLsection.appendChild(countryInfo);
    boxRsection.appendChild(countryFlag);
  });
}

//testy
//sprawdzenie daty
// dane sprzed 7 dni tak czy nie
// czy dane powinny byc zapisane czy nie
// spora czesc logigi czy ostatni zapis mial miejsce sprezed 7 dni czy nie
// data ostatniego zapisu, data nowsza

// expect() to be or not to be