<template>
    <div id="mymenu" >
        <!-- <ul id="v-for-object" class="demo">
            <li v-for="value in this.myinfo" :key="value">
                {{value}}
            </li>
        
        </ul> -->
<b-list-group>
  <b-list-group-item href="#" :active="isActive==index?true:false" 
     v-for="(item,index) in this.myinfo"
     v-bind:item="item"
     v-bind:index="index"
     v-bind:key="item.id" 
     v-on:click="isSelected(index)"
  >
      {{item}}
  </b-list-group-item>
</b-list-group>

        
    </div>
</template>
<script>
export default {
    name:"mymenu",
    data(){
        return{
            myinfo:{
                a:"AAC",
                b:"BBD"
                },
            isActive:""

        }

    },
    methods:{
        isSelected:function(v){
            this.isActive=v;

        }

    },
    mounted(){
            //原因是axios无法获取到this 解决办法: _this=this
            //var _this=this   
            // this.axios.get('http://192.168.12.26:9090/asset_sys/testing/')
            // .then(function(res){
            //     //_this.myinfo=res.data;
            //     console.log(res.data);
            // },function(error){
            //     console.log(error);
            // })
       
    }
}
</script>
<style lang="scss">
#mymenu{
    width:100%
}
</style>