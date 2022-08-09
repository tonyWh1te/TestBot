const { Markup } = require('telegraf');

const getCountryMenu = () =>
  Markup.keyboard([['Статистика за день', 'Статистика за все время']]).resize();

module.exports.getCountryMenu = getCountryMenu;
