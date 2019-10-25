import Vue from 'vue'
import App from './App.vue'
import {createRouter} from './router'
import {createStore} from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vueResource from 'vue-resource'
import vuelidate from 'vuelidate'
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import BootstrapVue from 'bootstrap-vue'

//import store from './store'

Vue.config.productionTip = false
//引用axios之前一定要先引用VueAxios再引用axios,否則會不能識別axios
Vue.use(VueAxios,axios,vueResource)
Vue.use(BootstrapVue,VueFormWizard)
Vue.use(vuelidate)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-search-select/dist/VueSearchSelect.css'

import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'


fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)

Vue.component('font-awesome-icon',FontAwesomeIcon)

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
