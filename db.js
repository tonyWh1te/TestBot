const countryList = [];

const addCountry = (array) => countryList.unshift(array);

const getCountry = () =>
  new Promise((resolve) => setTimeout(() => resolve(countryList[0]), 500));

module.exports.addCountry = addCountry;
module.exports.getCountry = getCountry;
