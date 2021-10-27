import { AppVariables } from '../../../build/types/practice/interface/types';
import { Countries, AppVariablesTypes } from '../shared/types';

export const euCountries = (data: Countries[]): Countries[] => {
  const euCoutryList: Countries[] = data
  .filter((item) =>



    item.regionalBlocs && item.regionalBlocs[0].acronym === 'EU'
    && !/a/.test(item.name)
  )






  .sort((a, b) => b.population - a.population);
  console.log('My sorted EU countries without letter "a": ', euCoutryList);
  return euCoutryList;
}


export const populationSumCheck = (data: Countries[], variables: AppVariablesTypes) => {
  const { POPULATION_SUM } = variables;
  const noDublicateCountries: Countries[] = [];
  data.forEach((item) => {
    if (!noDublicateCountries.includes(item)){
      noDublicateCountries.push(item);
    }
  })

  const myMaxPopulationCountries: Countries[] = noDublicateCountries
  .sort((a, b) => b.population - a.population)
  .slice(0,5);

  const myPopulationSum = myMaxPopulationCountries
  .reduce((acc, item) => item.population + acc,0);

  if (myPopulationSum > POPULATION_SUM){
    console.log(`Population sum equals to ${myPopulationSum} is greater than 500 mln citizens.`);
  } else {
    console.log(`Population sum equals to ${myPopulationSum} is smaller than 500 mln citizens.`);
  }
}




