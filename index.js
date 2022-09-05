require('dotenv').config(); //подключили константу с токеном бота

const { Telegraf, Markup } = require('telegraf'),
  { getCountryMenu } = require('./keyboards'),
  { addCountry, getCountry } = require('./db'),
  { dataFormatting, englishTranslation } = require('./utils'),
  text = require('./const'), //импорт объекта
  api = require('covid19-api'),
  bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.replyWithHTML(
    `
    Приветствую тебя, <b> ${
      ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'
    }</b>!${text.description}
    `,
    Markup.removeKeyboard()
  );
});

bot.help(async (ctx) => {
  const arrPhoto = [{}, {}, {}, {}, {}, {}];

  arrPhoto.forEach((photo, i) => {
    photo.type = 'photo';
    photo.media = {
      source: `img/${i + 1}dic.png`,
    };
  });

  await ctx.replyWithMediaGroup(arrPhoto);

  await ctx.reply(text.dicExplanation);
});

const countrySearch = (countrys, searchCountry) => {
  for (let i = 0; i < countrys.length; i++) {
    if (countrys[i].Country.toLowerCase() === searchCountry.toLowerCase()) {
      return countrys[i];
    }
  }

  return '';
};

bot.hears('Статистика за день', async (ctx) => {
  const data = await getCountry();
  let formatData = '';

  data.forEach(({ Country, NewCases, NewDeaths, NewRecovered }) => {
    formatData += dataFormatting({
      country: Country,
      cases: NewCases,
      deaths: NewDeaths,
      recovered: NewRecovered,
    });
  });

  ctx.replyWithHTML(formatData);
});

bot.hears('Статистика за все время', async (ctx) => {
  const data = await getCountry();
  let formatData = '';

  data.forEach(({ Country, TotalCases, TotalDeaths, TotalRecovered }) => {
    formatData += dataFormatting({
      country: Country,
      cases: TotalCases,
      deaths: TotalDeaths,
      recovered: TotalRecovered,
    });
  });

  ctx.replyWithHTML(formatData);
});

bot.on('sticker', (ctx) => ctx.reply('👍'));

bot.hears(text.regexEmoji, (ctx) => ctx.reply('👍'));

bot.on('text', async (ctx) => {
  let resultStr = '';
  const countrys = [];

  await ctx.reply(text.load_message);

  try {
    let data = {};
    data = await api.getReports();

    ctx.message.text
      .replace(/[\s\d!?-_*#()]/g, '')
      .split(',')
      .forEach((messageItem) => {
        let country;

        if (/[а-я]/gi.test(messageItem)) {
          country = englishTranslation(messageItem);

          if (!country)
            throw new Error(`страна ${messageItem} не найдена в моем списке`);
        }

        country = countrySearch(
          data[0][0].table[0],
          !country ? ctx.message.text : country
        );

        if (!country)
          throw new Error(`страна ${messageItem} не найдена в моем списке`);

        countrys.push(country);

        resultStr += `\n<b>${messageItem}</b>`;
      });

    addCountry(countrys);

    await ctx.replyWithHTML(
      `Я нашел информацию по данным странам: ${resultStr}`,
      getCountryMenu()
    );

    resultStr = '';
  } catch (error) {
    await ctx.replyWithHTML(
      error.name === 'Error'
        ? `<b>Ошибка</b>: ${error.message}. Посмотрите /help и попробуйте еще раз.`
        : error.message
    );
  }
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
