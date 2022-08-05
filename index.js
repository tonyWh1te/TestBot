const { Telegraf, Markup } = require('telegraf');
require('dotenv').config(); //подключили константу с токеном бота

const text = require('./const'); //импорт объекта


const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Привет, ${ctx.from.first_name ? ctx.from.first_name : 'незнакомец'}!`));
bot.help((ctx) => ctx.reply(text.commands));

bot.command('course', async ctx => { //меню с кнопками
    try {
        await ctx.replyWithHTML(
          //await чтобы сразу несколько команд выполнять с ctx по очереди
          '<b>Курсы:</b>',
          Markup.inlineKeyboard([
            [
              Markup.button.callback('Редакторы', 'btn_1'),
              Markup.button.callback('Обзоры', 'btn_2'),
              Markup.button.callback('JS', 'btn_3'),
            ],
          ])
        ); 
    } catch (error) {
        console.error(error);
    }
});

addActionBot('btn_1', './img/1.png', text.text1);
addActionBot('btn_2', './img/2.png', text.text2);
addActionBot('btn_3', '', text.text3);

function addActionBot(name, src, text) {
    bot.action(name, async (ctx) => {
      try {
        await ctx.answerCbQuery(); //убирает часики обработки на кнопке

        if (src) {
            await ctx.replyWithPhoto({
                source: src
            });
        }

        await ctx.replyWithHTML(text, {
          disable_web_page_preview: true, //при отправке ссылки не будет отправляться изображение
        });
      } catch (error) {
        console.error(error);
      }
    });
}

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
