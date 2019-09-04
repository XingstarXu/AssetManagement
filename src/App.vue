<template>
  <div id="app">
   <div class="container-fluid">
      <div class="row">

        <div class="col-md-12" id="Top_had">
           <div id="nav">
              <router-link to="/">Home</router-link> |
              <router-link to="/about">About</router-link>
              <router-link to="/storehouse">Store House</router-link>
           </div>
        </div>
      </div>
      <div class="row" id='row2'>
        <div class="col-md-2" id="Top_left">
          
          <MyMenu/>
        </div>        
         <div class="col-md-10">
           .col-md-8
           <router-view/>
          </div>
       </div>
  </div>


    
  </div>
</template>
<script>
import MyMenu from '@/components/MyMenu.vue'
export default {
  name:"app",
  components:{
    MyMenu

  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#Top_had{
  background-color:bisque;
}
#Top_left{
  background-color:rgb(166, 229, 245);
  width:100%
}
#row2{
  height:700px;
  width:100%
}
</style>
