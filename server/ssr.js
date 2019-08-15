const Koa=require('koa')
const koaStatic=require('koa-static');
const koaMount=require('koa-mount')
const path=require('path')
// __dirname項目路徑
const resolve=file=>path.resolve(__dirname,file);
const app=new Koa()

const isDev=process.env.NODE_ENV !== 'prduction'
const router=isDev ? require('./dev.ssr') : require('./server')

app.use(router.routes()).use(router.allowedMethods())

//開放目錄，加載所有靜態文件到指定目錄！
app.use(koaMount('/dist',koaStatic(resolve("../dist"))));
app.use(koaMount('/public',koaStatic(resolve('../public'))));

const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server started at localhost:${port}`);

});

module.exports=app