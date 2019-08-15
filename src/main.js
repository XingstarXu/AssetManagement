import Vue from 'vue'
import App from './App.vue'
import {createRouter} from './router'
import {createStore} from './store'
//import store from './store'

Vue.config.productionTip = false

//導出一個工廠函數，用於創建新的應用程式、router 和 store 實列
export function createApp(){
  const router=createRouter();
  const store=createStore();
  const app=new Vue({
    router,
    store,
    //根實例簡單的渲染應用程序組件。
    render:h=>h(App)
  })
  return {app,router,store};
}


/*new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')*/
