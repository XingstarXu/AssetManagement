<template>
<div>
  <publicDelete ref="child" >           
          <template v-slot:body>

              <h2>是否確認刪除{{deleteData.code}}號倉庫項目？</h2>

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
  name:"shDelete",
  data(){
    return{
      saveText:"確認",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      isDisabled:false,
      deleteData:{
        warehouse_id:"",
        code:"",
        desc1:"",
        desc2:"",
        disable:""
      }


    }
  },
  methods:{
    saveData(){
            this.$refs.child.confirmData();//調用公用窗體的confirmData方法，用禁用相關的按鈕。
            this.$parent.isLoading=true;//啟動加載頁面
            this.saveText="Saveing...";//保存制正在保存中的字樣
            this.isSaveDisabled=true;//禁用保存制
            this.deleteData.disable=1;
            this.updateData();
    },
    updateData(){
          let self=this;         
          this.$http.post('http://192.168.12.26:9090/asset_sys/upd_wh/',
                           {
                             "warehouse_id": self.deleteData.warehouse_id,"code":self.deleteData.code, "desc1":self.deleteData.desc1, "desc2":self.deleteData.desc2,"disable":self.deleteData.disable, "update_by":"jx.xu"   
                           })
                        .then(function(response){
                            if(response.data.code>0)
                            {
                              self.$refs.child.showAlert(response.data.msg,"success");
                                //alert(response.data.msg);
                            }
                            else{
                              self.$refs.child.showAlert(response.data.msg,"danger");
                                //alert(response.data.msg)
                            }

                            self.$refs.child.closeConfirm();//調用公用窗體的closeConfirm方法，用啟用相關的按鈕。
                            self.$parent.isLoading=false;//關閉加載頁面
                            self.isSaveDisabled=false;//啟用保存制
                            self.saveText="保存"//保存制保存的字樣
                            self.$parent.badingData();
                        })
                        .catch(function(error){
                            console.log(error)
                        })
      },
 
  },
  components:{
    publicDelete
  },
  mounted(){
    this.$refs.child.modal_titel="倉庫刪除"


  }
  
}
</script>