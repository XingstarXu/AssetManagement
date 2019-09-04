<template>
<div>
  <publicDialog ref="child" >           
          <template v-slot:body>
             <b-input-group prepend="Username" class="mt-3">
                 <b-form-input v-model="userid"></b-form-input>
             </b-input-group>
             <b-input-group prepend="Email" class="mt-3">
                 <b-form-input v-model="email" ></b-form-input>
             </b-input-group>
             <b-input-group prepend="Country" class="mt-3">
                 <b-form-input v-model="country"></b-form-input>
             </b-input-group>                           
          </template>
          <template v-slot:okbutten >
                 <b-button variant="primary"
                           size="sm"
                           class="float-right"
                           :disabled="isSaveDisabled"
                           @click="saveData"
                 >
                 {{saveText}}
                 </b-button>
          </template>


  </publicDialog>

</div>
</template>
<script>
import publicDialog from "../Dialog/PublicDialog"
export default {
  name:"shDialog",
  data(){
    return{
      saveText:"Save",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      userid:"",
      email:"",
      country:""

    }
  },
  methods:{
    saveData(){
            this.$refs.child.confirmData();//調用公用窗體的confirmData方法，用禁用相關的按鈕。
            this.$parent.isLoading=true;//啟動加載頁面
            this.saveText="Saveing...";//保存制正在保存中的字樣
            this.isSaveDisabled=true;//禁用保存制
            setTimeout(() => {
                  this.$refs.child.closeConfirm();//調用公用窗體的closeConfirm方法，用啟用相關的按鈕。
                  this.$parent.isLoading=false;//關閉加載頁面
                  this.isSaveDisabled=false;//啟用保存制
                  this.saveText="Save"//保存制保存的字樣
                },5000) 
    }
 
  },
  components:{
    publicDialog
  },
  mounted(){
    this.$refs.child.modal_titel="Test Titel"
    

  }
  
}
</script>