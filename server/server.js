//創建一個Vue實列
const fs=require("fs");
const path=require("path");
const Router=require('koa-router')
const send=require('koa-send')
const router=new Router()

const resolve=file=>path.resolve(__dirname,file);
//開放dist目錄
//app.use(koaStatic(resolve('../dist')))

//第2步:獲得一個createBundleRenderer
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



//第3步: 添加一個中間件來處理所有請求
const handleRequest=async (ctx,next) =>{
    const url =ctx.path
    console.log(url)
    if(url.includes('.')){
        console.log(`proxy ${url}`)
        return await send(ctx,url,{root:path.resolve(__dirname,'../dist')})
    }

    ctx.res.setHeader("Content-Type","text/html");
    const context={
        title:"ssr test",
        url
    };
    //將context數據渲染為HTML
    const html= await renderToString(context);
    ctx.body=html;
}

router.get('*',handleRequest)

module.exports=router

// //添加一個中間件來處理所有請求
// app.use(async(ctx,next)=>{
//     //創建一個Vue實例
//     const context={
//         title:"ssr test",
//         url:ctx.url
//     };
//     //將context數據渲染為Html
//     const html =await renderToString(context);
//     ctx.body=html;
// });

// const port =3000;
// app.listen(port,function(){
//     console.log(`server started at localhost:${port}`);
// });