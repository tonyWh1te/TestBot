const text = require('./const');

const dataFormatting = ({ country, cases, deaths, recovered }) => `
Страна: <i>${country}</i>
Cлучаев: <i>${cases ? cases : 'не обнаружено'}</i>
Cмертей: <i>${deaths ? deaths : 'не обнаружено'}</i>
Вылечившихся: <i>${recovered ? recovered : 'не обнаружено'}</i>
`;

const englishTranslation = (word) =>
  Object.entries(text.countries_dictionary)
    .filter((item) => item[1].toLowerCase() === word.toLowerCase())
    .map((item) => item[0])[0];

module.exports.dataFormatting = dataFormatting;
module.exports.englishTranslation = englishTranslation;
