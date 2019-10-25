<template>
<div>
  <publicDialog ref="child" >           
          <template v-slot:body>

             <b-form-group 
                label-cols-sm="3"
                label="類型名稱(英):" 
                label-align-sm="right"
                label-for="nested-street"
            >
                 <b-form-input v-model.trim="$v.editData.desc1.$model" :class="{ 'is-invalid': $v.editData.desc1.$error,'is-valid':!$v.editData.desc1.$invalid }"></b-form-input>
                  <div class="valid-feedback" >類型名稱(英)正確</div>
                  <div class="invalid-feedback">
                      <span v-if="!$v.editData.desc1.required">類型名稱(中)必要的</span>
                  </div>                
             </b-form-group>

             <b-form-group 
                label-cols-sm="3"
                label="類型名稱(中):" 
                label-align-sm="right"
                label-for="nested-street"
            >
                 <b-form-input v-model.trim="$v.editData.desc2.$model" :class="{ 'is-invalid': $v.editData.desc2.$error,'is-valid':!$v.editData.desc2.$invalid }"></b-form-input>
                  <div class="valid-feedback" >類型名稱(中)正確</div>
                  <div class="invalid-feedback">
                      <span v-if="!$v.editData.desc2.required">類型名稱(英)必要的</span>
                  </div>                
             </b-form-group>         

             <b-form-group 
                  label-cols-sm="3"
                  label="停用:"
                  label-align-sm="right" 
                  class="mb-0"
                  :disabled="editDisable_Disabled"
             >
             <b-form-checkbox
                v-model="editData.disable"
                class="pt-2"
                value=1
                unchecked-value=0
             ></b-form-checkbox>

             </b-form-group> 

          </template>
          <template v-slot:okbutten >
                 <b-button 
                           variant="primary"
                           size="sm"
                           class="float-right"
                           :disabled="isSaveDisabled"
                           @click="saveData"
                 >
                 {{saveText}}
                 </b-button>
          </template>


  </publicDialog>
  <!-- {{$v}} -->

</div>
</template>
<script>
import publicDialog from "../PublicDialog/PublicDialog"
import { required } from 'vuelidate/lib/validators'
export default {
  name:"itDialog",
  data(){
    return{
      saveText:"保存",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      editData:{
        _id:"",
        desc1:"",
        desc2:"",
        disable:0

      },
      isDisabled:false,
      operation:"",
      editDisable_Disabled:false

    }
  },
  methods:{
    saveData(){
        this.$v.$touch()
        if(this.$v.$invalid){
              
              return;
        }
        else{
            this.$refs.child.confirmData();//調用公用窗體的confirmData方法，用禁用相關的按鈕。
            this.$parent.isLoading=true;//啟動加載頁面
            this.saveText="Saveing...";//保存制正在保存中的字樣
            this.isSaveDisabled=true;//禁用保存制
            switch(this.operation)
            {
              case "add":
                this.addData();

                break;
              case "update":
                this.updateData();
                break;


            }
        }
    },

    beforeOpen(){
      this.$v.$reset();
      this.continueSaver=false;
      this.isDisabled=true; 
      this.$parent.isLoading=false; 
      this.editDisable_Disabled=false;//停用項是否可以編輯     
      if(this.operation=="add")
      {
          this.editData={
                        _id:"",
                        desc1:"",
                        desc2:"",
                        disable:0
                        }
          this.isDisabled=false;  
          this.editDisable_Disabled=true;//停用項是否可以編輯
      }
    },
     addData(){
          let self=this;         
          this.$http.post(this.$parent.addLink,
                           {
                              "desc1":self.editData.desc1, "desc2":self.editData.desc2, "create_by":"jx.xu"   
                           })
                        .then(function(response){
                            if(response.data.code>0)
                            {
                              self.$refs.child.showAlert(response.data.msg,"success");

                            }
                            else{
                              self.$refs.child.showAlert(response.data.msg,"danger");

                            }

                            self.$refs.child.closeConfirm();//調用公用窗體的closeConfirm方法，用啟用相關的按鈕。
                            self.$parent.isLoading=false;//關閉加載頁面
                            self.isSaveDisabled=false;//啟用保存制
                            self.saveText="保存"//保存制保存的字樣
                            self.$parent.$refs.tyTable.badingData();
                        })
                        .catch(function(error){
                            console.log(error);
                            self.$refs.child.showAlert(error,"danger");
                            self.$refs.child.closeConfirm();//調用公用窗體的closeConfirm方法，用啟用相關的按鈕。
                            self.$parent.isLoading=false;//關閉加載頁面
                            self.isSaveDisabled=false;//啟用保存制
                            self.saveText="保存"//保存制保存的字樣
                            self.$parent.$refs.tyTable.badingData();
                        })
      },
    updateData(){
          let self=this;         
          this.$http.post(this.$parent.updateLink,
                           {
                              "_id":self.editData._id, "desc1":self.editData.desc1, "desc2":self.editData.desc2,  "disable":self.editData.disable,"update_by":"jx.xu"   
                           })
                        .then(function(response){
                            if(response.data.code>0)
                            {
                              self.$refs.child.showAlert(response.data.msg,"success");

                            }
                            else{
                              
                              self.$refs.child.showAlert(response.data.msg,"danger");

                            }
                            self.$refs.child.closeConfirm();//調用公用窗體的closeConfirm方法，用啟用相關的按鈕。
                            self.$parent.isLoading=false;//關閉加載頁面
                            self.isSaveDisabled=false;//啟用保存制
                            self.saveText="保存"//保存制保存的字樣
                            self.$parent.$refs.tyTable.badingData();
                        })
                        .catch(function(error){
                            console.log(error);
                            self.$refs.child.showAlert(error,"danger");
                            self.$refs.child.closeConfirm();//調用公用窗體的closeConfirm方法，用啟用相關的按鈕。
                            self.$parent.isLoading=false;//關閉加載頁面
                            self.isSaveDisabled=false;//啟用保存制
                            self.saveText="保存"//保存制保存的字樣
                            self.$parent.$refs.tyTable.badingData();
                        })
      },   
 
  },
  components:{
    publicDialog
  },
  mounted(){
    this.$refs.child.modal_titel="類型管理"


  },
  validations: {
    editData: {
      desc1:{
          required,
         },
      desc2:{
        required
      }     

    },

  }
  
}
</script>