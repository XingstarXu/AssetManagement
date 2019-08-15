import {createApp} from './main.js'
//客戶端特定引導邏輯
const {app,router,store} =createApp()

if(window.__INITIAL_STATE__){
    store.replaceState(window.__INITIAL_STATE__)
}

//這里假定 App.vue 模板中根元素具有 ‘id="app"’
app.$mount('#app')