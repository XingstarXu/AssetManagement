<template>
<div>
  <publicDelete ref="child" >           
          <template v-slot:body>

              <h1>是否確認刪除{{id}}的資產項目？</h1>

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


  </publicDelete>

</div>
</template>
<script>
import publicDelete from "../PublicDialog/PublicDelete"
export default {
  name:"itDelete",
  data(){
    return{
      saveText:"確認",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      id:"",
      isDisabled:false


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
                  this.saveText="確認";//保存制保存的字樣
                  this.$refs.child.closeDialog();//關閉窗體
                },5000) 
    }
 
  },
  components:{
    publicDelete
  },
  mounted(){
    this.$refs.child.modal_titel="資產刪除"


  }
  
}
</script>