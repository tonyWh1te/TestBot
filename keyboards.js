const { Markup } = require('telegraf');

const getCountryMenu = () =>
  Markup.keyboard([
    ['US', 'Russia'],
    ['Ukraine', 'Kazakhstan'],
  ]).resize();

module.exports.getCountryMenu = getCountryMenu;
