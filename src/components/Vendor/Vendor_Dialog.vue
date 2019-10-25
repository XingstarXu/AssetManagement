<template>
<div>
  <publicDialog ref="child" >           
          <template v-slot:body>
             <b-form-group
              label-cols-sm="4"
              label="供應商名稱(英):"
              label-align-sm="right"
              label-for="nested-street"
             >                
                 <b-form-input 
                   v-model.trim="$v.editData.desc1.$model" 
                   :class="{ 'is-invalid': $v.editData.desc1.$error,'is-valid':!$v.editData.desc1.$invalid }"
                 ></b-form-input>
                  <div class="valid-feedback" >倉庫名稱(英文)正確</div>
                 <div class="invalid-feedback">
                   <span v-if="!$v.editData.desc1.required">倉庫名稱(英文)必要的</span>
                 </div>                
             </b-form-group>

             <b-form-group
              label-cols-sm="4"
              label="供應商名稱(中):"
              label-align-sm="right"
              label-for="nested-street"
             >               
                 <b-form-input 
                   v-model.trim="$v.editData.desc2.$model"  
                   :class="{ 'is-invalid': $v.editData.desc2.$error,'is-valid':!$v.editData.desc2.$invalid }"
                 ></b-form-input>
                <div class="valid-feedback" >倉庫名稱(中文)正確</div>
                 <div class="invalid-feedback">
                   <span v-if="!$v.editData.desc2.required">倉庫名稱(中文)必要的</span>
                 </div>                  
             </b-form-group>  
             
             <b-form-group
               label-cols-sm="4"
               label="電話:"
               label-align-sm="right"
               label-for="nested-street"
             >
                <b-form-input 
                  v-model.trim="$v.editData.phone.$model"
                  :class="{'is-invalid':$v.editData.phone.$error,'is-valid':!$v.editData.phone.$invalid}"
                ></b-form-input>
                <div class="valid-feedback">電話正確</div>
                <div class="invalid-feedback">
                  <span v-if="!$v.editData.phone.required">電話是必要的</span>
                  <span v-if="!$v.editData.phone.minLength">電話長度最少8位數</span>
                </div>
             </b-form-group>

             <b-form-group
               label-cols-sm="4"
               label="郵箱:"
               label-align-sm="right"
               label-for="nested-street"

             >
               <b-form-input
                  v-model.trim="$v.editData.email.$model"
                  :class="{'is-invalid' :$v.editData.email.$error,'is-valid':!$v.editData.email.$invalid}"
               ></b-form-input>

               <div class="valid-feedback">郵箱正確</div>
               <div class="invalid-feedback">
                 <span v-if="!$v.editData.email.required">郵箱是必要的</span>
                 <span v-if="!$v.editData.email.isEmail">請填寫正確的郵箱址</span>
               </div>

             </b-form-group>




             <b-form-group
             label-cols-sm="4"
             label="地址:"
             label-align-sm="right"
             label-for="nested-street"            
             >
             <b-form-textarea 
               v-model.trim="$v.editData.address.$model"
               :class="{ 'is-invalid': $v.editData.address.$error,'is-valid':!$v.editData.address.$invalid }"             
             >
             </b-form-textarea>
             <div class="valid-feedback">地址正確</div>
             <div class="invalid-feedback">
               <span v-if="!$v.editData.address.required">地址是必要的</span>
             </div>

             </b-form-group>


             <b-form-group
              label-cols-sm="4"
              label="停用:"
              label-align-sm="right"
              label-for="nested-street"
             >               
               <b-form-checkbox
                v-model="editData.disable"
                class="pt-2"
                :disabled="editDisable_Disabled"
                value=1
                unchecked-value=0
               ></b-form-checkbox>
               <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide variant="warning" solid>
                    <template v-slot:toast-title>
                       <div class="d-flex flex-grow-1 align-items-baseline">
                         <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
                         <strong class="mr-auto">Notice!</strong>
                       </div>
                    </template>
                     你即將會停用此供應商！如不是停用此供應商請取消這選項，否則請按繼續保存.
               </b-toast>               
                 
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
import { required, minLength, helpers } from 'vuelidate/lib/validators'
export default {
  name:"veDialog",
  data(){
    return{
      saveText:"保存",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      editData:{
        _id:"",
        desc1:"",
        desc2:"",
        address:"",
        phone:"",
        email:"",
        disable:0
      },
      isDisabled:false,//控制輸入項是否可以編輯
      editDisable_Disabled:false,//停用項是否可以編輯
      operation:"",//窗體的操作類型 add:新增， update:更改
      continueSaver:false //是否繼續保存標示


      


    }
  },
  methods:{
    saveData(){
        this.$v.$touch()
        if(this.$v.$invalid){
              
              return;
        }
        else{
            console.log(this.editData.disable)
            if(this.editData.disable & !this.continueSaver)
            {
              this.$bvToast.show('example-toast')
              this.saveText="繼續保存"
              this.continueSaver=true
              return;
            }
            else
            {
              this.$bvToast.hide('example-toast')
              this.saveText="保存"
              this.continueSaver=false
            }
            
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
      this.editDisable_Disabled=false;     
      if(this.operation=="add")
      {
          this.editData={
            _id:"",
            desc1:"",
            desc2:"",
            address:"",
            phone:"",
            email:"",
            disable:0
          }
          this.isDisabled=false; 
          this.editDisable_Disabled=true; 
      }
      console.log(this.editData.disable)
      //e.preventDefault();//取消打開
      //alert(e.params.myui[0]);
    },
     addData(){
          let self=this;         
          this.$http.post(this.$parent.addLink,
                           {
                             "desc1":self.editData.desc1, "desc2":self.editData.desc2,"address":self.editData.address,"phone":self.editData.phone,"email":self.editData.email, "create_by":"jx.xu"   
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
                            self.$parent.$refs.veTable.badingData();
                        })
                        .catch(function(error){
                            console.log(error);
                            self.$refs.child.showAlert(error,"danger");
                            self.$refs.child.closeConfirm();//調用公用窗體的closeConfirm方法，用啟用相關的按鈕。
                            self.$parent.isLoading=false;//關閉加載頁面
                            self.isSaveDisabled=false;//啟用保存制
                            self.saveText="保存"//保存制保存的字樣
                            self.$parent.$refs.veTable.badingData();
                        })
      },
    updateData(){
          let self=this;         
          this.$http.post(this.$parent.updateLink,
                           {
                             "_id": self.editData._id, "desc1":self.editData.desc1, "desc2":self.editData.desc2,"address":self.editData.address,"phone":self.editData.phone,"email":self.editData.email,"disable":self.editData.disable, "update_by":"jx.xu"   
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
                            self.$parent.$refs.veTable.badingData();
                        })
                        .catch(function(error){
                            console.log(error);
                            self.$refs.child.showAlert(error,"danger");
                            self.$refs.child.closeConfirm();//調用公用窗體的closeConfirm方法，用啟用相關的按鈕。
                            self.$parent.isLoading=false;//關閉加載頁面
                            self.isSaveDisabled=false;//啟用保存制
                            self.saveText="保存"//保存制保存的字樣
                            self.$parent.$refs.veTable.badingData();                            
                        })
      },      


  },
  components:{
    publicDialog
  },
  mounted(){
    this.$refs.child.modal_titel="供應商管理"
  },
  validations: {
    editData: {
      desc1:{
        required
      },
      desc2:{
        required
      },  
      address:{
        required
      },
      phone:{
        required,
        minLength:minLength(8)
      },
      email:{
        required,
        isEmail: helpers.regex('alpha', /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/)
      },
                      
    },


  }
  
}
</script>