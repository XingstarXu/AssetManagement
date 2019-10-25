import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export function createRouter(){
  return new Router({
    mode:'history',//一定要是history模式
    routes:[
      {
        path:'/',
        name:'home',
        component:Home
      },
      {
        path:'/about',
        name:'about',
        component:()=>import(/* webpackChunkname:"about" */'../views/About.vue')
      },
      {
        path:'/storehouse',
        name:'storehouse',
        component:()=>import('../views/StoreHouse/StoreHouse_Index')
      },
      {
        path:'/item',
        name:'item',
        component:()=>import('../views/Item/Item_Index')
      },
      {
        path:'/itemType',
        name:'itemType',
        component:()=>import('../views/ItemType/ItemType_Index')
      },
      {
        path:'/itemUnit',
        name:'itemUnit',
        component:()=>import('../views/ItemUnit/ItemUnit_Index')
      },
      {
        path:'/vendor',
        name:'vendor',
        component:()=>import('../views/Vendor/Vendor_Index')
      },
      {
        path:'/trans',
        name:'trans',
        component:()=>import('../views/Transaction/Trans_Index')
      }
    ]
  })
}

// export default new Router({
//   mode: 'history', 
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
//     }
//   ]
// })
