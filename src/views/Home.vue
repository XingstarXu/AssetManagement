<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>TEST</h1>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- <div v-if="book">{{book.name}}</div>
    <div v-else>nothing</div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',

  // computed:{
  //   book(){
  //     return this.$store.state.book.items[this.$route.params.id || 1]
  //   }
  // },

  // //此函數只會在服務器端調用，注意，只有vue v2.60+ 才支持此函數
  // serverPrefetch(){
  //   return this.fetchBookItem()
  // },
  // //此生命週期函數只會在客戶端調用
  // //客戶端需要判斷在item不存在的場景再去調用fetchBookItem方法獲取數據
  // mounted(){
  //   if(!this.item){
  //     this.fetchBookItem()
  //   }
  // },

  // methods:{
  //   fetchBookItem(){
  //     //這里要求book的fetchItem返回一個Promise
  //     return this.$store.dispatch('book/fetchItem',this.$route.params.id||1)
  //   }
  // },

  components: {
    HelloWorld
  }
}
</script>
