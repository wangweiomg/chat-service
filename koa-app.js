const Koa = require('koa')
const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser')
const fs = require('fs')

const chat = require('./service/chatgpt')


const app = new Koa()
const router = new Router()


router.get('/', (ctx, next) => {
    // ctx.router available
    ctx.body = 'Hello World'
})

router.get('/download/clash', async(ctx) => {
    const filePath = '/home/weiw/tools/clash-armv7'
    const stat = fs.statSync(filePath); // 获取文件信息
    ctx.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename=${encodeURIComponent('clash-linux-armv7')}`, 
        'Content-Length': stat.size
    });

    const stream = fs.createReadStream(filePath)
    ctx.body = stream;

})

router.get('/download/yacd', async(ctx) => {
    const filePath = '/home/weiw/tools/yacd.tar.gz'
    const stat = fs.statSync(filePath); // 获取文件信息
    ctx.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename=${encodeURIComponent('yacd.tar.gz')}`, 
        'Content-Length': stat.size
    });

    const stream = fs.createReadStream(filePath)
    ctx.body = stream;

})

router.get('/download/gost', async(ctx) => {
    const filePath = '/home/weiw/tools/gost-linux-armv7-2.11.5.gz'
    const stat = fs.statSync(filePath); // 获取文件信息
    ctx.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename=${encodeURIComponent('gost.gz')}`, 
        'Content-Length': stat.size
    });

    const stream = fs.createReadStream(filePath)
    ctx.body = stream;

})

router.get('/chat', async (ctx, next) => {

    const msg = ctx.query.msg;
    
    const res = await chat(msg);

    const resp = res || "System error, please wait a moment"

    ctx.body = resp;

})

router.post('/users', async (ctx, next) => {

    const { name, email } = ctx.request.body;
    // do something with user data 
    ctx.body = 'User createad';

})



app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
    console.log('Koa app listening on port 3000...')
});