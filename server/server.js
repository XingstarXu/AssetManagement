//創建一個Vue實列
const fs=require("fs");
const path=require("path");
const koaStatic=require('koa-static');
//const Vue=require("vue");
const Koa=require("koa");
const app=new Koa();

const resolve=file=>path.resolve(__dirname,file);
//開放dist目錄
app.use(koaStatic(resolve('../dist')))

//獲得一個createBundleRenderer
const { createBundleRenderer } = require("vue-server-renderer");
const bundle = require("../dist/vue-ssr-server-bundle.json");
const clientManifest=require("../dist/vue-ssr-client-manifest.json");

const renderer=createBundleRenderer(bundle,{
    runInNewContext: false,
    template: fs.readFileSync(resolve("../src/index.temp.html"),"utf-8"),
    clientManifest:clientManifest
});

function renderToString(context){
    return new Promise((resolve,reject) => {
        renderer.renderToString(context,(err,html)=>{
            err? reject(err):resolve(html);
        });
    });
}

//添加一個中間件來處理所有請求
app.use(async(ctx,next)=>{
    //創建一個Vue實例
    const context={
        title:"ssr test",
        url:ctx.url
    };
    //將context數據渲染為Html
    const html =await renderToString(context);
    ctx.body=html;
});

const port =3000;
app.listen(port,function(){
    console.log(`server started at localhost:${port}`);
});