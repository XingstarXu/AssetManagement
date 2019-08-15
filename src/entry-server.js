import {createApp} from './main';
export default context=>{
    //因為有可能會是異步路由鉤子函數或組件，所以我們將返回一個Promise，
    //以便服務器能夠等待所有的內容在渲染前,
    //就已經準備就緒。
    return new Promise((resolve,reject)=>{
        const {app,router}=createApp();
        //設置服務器端 router的位置
        router.push(context.url);
        //等到router將可能的異步組件和鉤子函數解折完
        router.onReady(()=>{
            const matchedComponents=router.getMatchedComponents();
            //匹配不到的路由，執行reject函數，并返回404
            if(!matchedComponents.length){
                return reject({
                    code:404
                })
            }
            context.rendererd=()=>{
                context.stat=store.state
            }
            //Promise 應該resolve應用程序實例，以便它可以渲染
            resolve(app);
        },reject)
    })
}