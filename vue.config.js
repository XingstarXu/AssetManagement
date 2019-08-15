const VueSSRServerPlugin=require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin=require("vue-server-renderer/client-plugin");
const nodeExternals=require("webpack-node-externals");
const merge=require("lodash.merge");//合并對像
const TARGET_NODE=process.env.WEBPACK_TARGET==="node";
const target=TARGET_NODE ? "server" : "client";
const DEV_MODE=process.env.NODE_ENV==='development'
module.exports={
    css:{
        //extract:false
        extract: process.env.NODE_ENV === 'production'
    },
    configureWebpack: ()=>({
        //將entry指向應用程序server/client文件
        entry:`./src/entry-${target}.js`,
        //對bundle renderer 提供 source map 支持
        devtool:'source-map',
        target:TARGET_NODE ? "node":"web",
        node:TARGET_NODE ? undefined :false,
        output:{
            libraryTarget:TARGET_NODE ? "commonjs2" : undefined
        },
    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // 外置化应用程序依赖模块。可以使服务器构建速度更快，
    // 并生成较小的 bundle 文件。
    externals:TARGET_NODE
      ? nodeExternals({
          //不要外置化webpack需要處理的依賴模塊。
          //你可以在這里添加更多的文件類型。例如未處理*.vue原始文件,
          //你還應該將修改'global'（例如polyfill）的依賴模塊列入白名單
          whitelist:[/\.css$/]
      })
      : undefined,
      optimization:{
          //splitChunks:undefined
          splitChunks: TARGET_NODE ? false : undefined
      },
      plugins:[TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
    }),
    chainWebpack:config =>{
        config.module
          .rule("vue")
          .use("vue-loader")
          .tap(options=>{
              return merge(options,{
                  optimizeSSR:false
              });
          });
    }
};