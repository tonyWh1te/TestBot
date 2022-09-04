require('dotenv').config(); //подключили константу с токеном бота

const { Telegraf, Markup } = require('telegraf'),
  { getCountryMenu } = require('./keyboards'),
  { addCountry, getCountry } = require('./db'),
  dataFormatting = require('./utils'),
  text = require('./const'), //импорт объекта
  api = require('covid19-api'),
  bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.replyWithHTML(
    `
    Приветствую тебя, <b> ${
      ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'
    }</b>!\n\nЯ - бот, собирающий статистику по коронавирусу. Узнай статистику в своей стране <b><i>(названия можно вводить как на русском, так и на английском)</i></b>!\nПо команде /help можно увидеть весь список стран. 
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

bot.on('text', async (ctx) => {
  let resultStr = '';
  const countrys = [];

  await ctx.reply(text.load_message);

  try {
    let data = {};
    data = await api.getReports();

    ctx.message.text
      .trim()
      .split(',')
      .forEach((messageItem) => {
        let country;

        if (/[а-я]/gi.test(ctx.message.text)) {
          const arr = Object.entries(text.countries_dictionary)
            .filter(
              (item) => item[1].toLowerCase() === messageItem.toLowerCase()
            )
            .map((item) => item[0]);

          country = arr[0];

          if (!country) throw new Error();
        }

        country = countrySearch(
          data[0][0].table[0],
          !country ? ctx.message.text : country
        );

        if (!country) throw new Error();

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
    await ctx.reply(text.error_message);
  }
});

// bot.command('course', async (ctx) => {
//   //меню с кнопками
//   try {
//     await ctx.replyWithHTML(
//       //await чтобы сразу несколько команд выполнять с ctx по очереди
//       '<b>Курсы:</b>',
//       Markup.inlineKeyboard([
//         [
//           Markup.button.callback('Редакторы', 'btn_1'),
//           Markup.button.callback('Обзоры', 'btn_2'),
//           Markup.button.callback('JS', 'btn_3'),
//         ],
//       ])
//     );
//   } catch (error) {
//     console.error(error);
//   }
// });

// addActionBot('btn_1', './img/1.png', text.text1);
// addActionBot('btn_2', './img/2.png', text.text2);
// addActionBot('btn_3', '', text.text3);

// function addActionBot(name, src, text) {
//   bot.action(name, async (ctx) => {
//     try {
//       await ctx.answerCbQuery(); //убирает часики обработки на кнопке

//       if (src) {
//         await ctx.replyWithPhoto({
//           source: src,
//         });
//       }

//       await ctx.replyWithHTML(text, {
//         disable_web_page_preview: true, //при отправке ссылки не будет отправляться изображение
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   });
// }

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
