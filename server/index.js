const Koa = require('koa');
// const ejs = require('ejs');
// const pug = require('pug');
// const { htmlTpl,ejsTpl,pugTpl } = require('./tpl');
const app = new Koa();
const views = require('koa-views');
const { resolve } = require('path');
const mongoose = require('mongoose');
const { connect,initSchemas,initAdmin } = require('./database/init');  
const router = require('./routes');
// 在启动文件里面引用激活

(async () => {
  await connect();
  initSchemas();
  await initAdmin();
    //   const Movie = mongoose.model('Movie');
    //   const movies = await Movie.find({});
    //   console.log('movies: ', movies);
    //   把它 require 进来，他就会启动子进程去爬取数据，然后把爬取到的数据存在数据库里面  
    //  require('./tasks/movie');
    //  require('./tasks/api');
    //  require('./tasks/trailer');
    //  require('./tasks/qiniu');
})();
// 在routes里面使用引用一下
// app.use(router.routes()).use(router.allowedMethods())

app.use(views(resolve(__dirname, './views'), {
    extension: 'pug'
}))


app.use(async (ctx, next) => {
    await ctx.render('index', {
        you: 'zoomdong',
        me: 'fireairforce'
    })
})

app.listen(4440);