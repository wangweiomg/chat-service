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

    // await ctx.telegram.sendChatAction()
    ctx.sendChatAction("typing")
    
    const res = await chat(ctx.message.text)

    console.log('res-->', typeof(res), res)

    const resp = res || "System error, please wait a moment"

    await ctx.telegram.sendMessage(ctx.message.chat.id, resp);


    // await ctx.reply(`Hello ${ctx.state.role}`);
})



bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));