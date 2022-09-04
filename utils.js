const dataFormatting = ({ country, cases, deaths, recovered }) => `
Страна: <i>${country}</i>
Cлучаев: <i>${cases ? cases : 'не обнаружено'}</i>
Cмертей: <i>${deaths ? deaths : 'не обнаружено'}</i>
Вылечившихся: <i>${recovered ? recovered : 'не обнаружено'}</i>
`;

module.exports = dataFormatting;
