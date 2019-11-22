<template>
<div>
  <publicDelete ref="child" >           
          <template v-slot:body>

              <h6>是否確認刪除{{deleteData.code}}入倉單？</h6>

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
      deleteData:{_id:"", code:""}


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
            
          //alert(this.deleteData.code);
          let self=this;
          console.log(self.deleteData._id);
          this.$http.post(this.$parent.voidLink,
                           {
                              _id:self.deleteData._id,void_by:"jx.xu",void_reason:"xxxx"
                           })
                        .then(function(response){
                            if(response.data.code>0)
                            {
                              //self.$refs.child.showAlert(response.data.msg,"success");
                                alert(response.data.msg);
                            }
                            else{
                              //self.$refs.child.showAlert(response.data.msg,"danger");
                                alert(response.data.msg);
                            }

                            self.$refs.child.closeConfirm();//調用公用窗體的closeConfirm方法，用啟用相關的按鈕。
                            self.$parent.isLoading=false;//關閉加載頁面
                            self.isSaveDisabled=false;//啟用保存制
                            self.saveText="確認"//保存制保存的字樣
                            self.$refs.child.closeDialog();//關閉窗體
                            self.$parent.$refs.trTable.badingData();
                        })
                        .catch(function(error){
                            console.log(error);
                            alert("取消失敗！");
                            self.$refs.child.closeConfirm();//調用公用窗體的closeConfirm方法，用啟用相關的按鈕。
                            self.$parent.isLoading=false;//關閉加載頁面
                            self.isSaveDisabled=false;//啟用保存制
                            self.saveText="確認"//保存制保存的字樣                            
                        })
      },
      setData(deleteRow){
            //editRow.vendor_id.replace(/-/g,''),
                this.deleteData={
                                _id: deleteRow.item.header._id,
                                code: deleteRow.item.header.code,
                              };
                console.log(deleteRow);
          }      
 
  },
  components:{
    publicDelete
  },
  mounted(){
    this.$refs.child.modal_titel="取消訂單"


  }
  
}
</script>