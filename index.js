require('dotenv').config(); //подключили константу с токеном бота
const { Telegraf } = require('telegraf'),
  { getCountryMenu } = require('./keyboards'),
  text = require('./const'), //импорт объекта
  api = require('covid19-api'),
  bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) =>
  ctx.replyWithHTML(
    `
    Приветствую тебя, <b> ${
      ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'
    }</b>!\n\nЯ - бот, собирающий статистику по коронавирусу. Узнай статистику в своей стране <b><i>(обязательно вводи название на английском)</i></b>!\nПо команде /help можно увидеть весь список стран. 
  `,
    getCountryMenu()
  )
);

bot.help((ctx) => ctx.reply(text.countries_list));

bot.on('text', async (ctx) => {
  try {
    let data = {};
    data = await api.getReportsByCountries(ctx.message.text);
    const obj = data[0][0];

    const formatData = `
Страна: <i>${obj.country}</i>
Случаи: <i>${obj.cases}</i>
Смертей: <i>${obj.deaths}</i>
Вылечились: <i>${obj.recovered}</i>
    `;

    ctx.replyWithHTML(formatData);
  } catch (error) {
    ctx.reply(text.error_message);
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
