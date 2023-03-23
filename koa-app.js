const Koa = require('koa')
const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser')

const chat = require('./service/chatgpt')


const app = new Koa()
const router = new Router()


router.get('/', (ctx, next) => {
    // ctx.router available
    ctx.body = 'Hello World'
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