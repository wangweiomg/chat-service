const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

require('dotenv').config()

const chat = require('./service/chatgpt')

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('quit', async (ctx) => {
    await ctx.telegram.leaveChat(ctx.message.chat.id);

    // using context shortcut
    // await ctx.leaveChat();
})

bot.on(message('text'), async (ctx) => {

    const res = await chat(ctx.message.text)
    const resp = res.data.choices[0].message.content

    await ctx.telegram.sendMessage(ctx.message.chat.id, resp);


    // await ctx.reply(`Hello ${ctx.state.role}`);
})



bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));