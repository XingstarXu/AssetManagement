<template>
<div>
  <publicDialog ref="child" >           
          <template v-slot:body>
            <b-form-group
              label-cols-sm="4"
              label="倉庫編號:"
              label-align-sm="right"
              label-for="nested-street"
            >               
                 <b-form-input v-model.trim="$v.editData.code.$model" :disabled="isDisabled" 
                    :class="{ 'is-invalid': $v.editData.code.$error,'is-valid':!$v.editData.code.$invalid }"
                    @input="setCode($event)"
                     ></b-form-input>
                 <div class="valid-feedback" >倉庫編號正確</div>
                 <div class="invalid-feedback">
                   <span v-if="!$v.editData.code.required">倉庫編號是必須的</span>
                   <span v-if="!$v.editData.code.isUnique">倉庫號已存</span>
                   <span v-if="!$v.editData.code.minLength | !$v.editData.code.maxLength">倉庫編號長度必需為{{$v.editData.code.$params.minLength.min}} 至 {{$v.editData.code.$params.maxLength.min}}位</span>
                 </div>
                 

             </b-form-group>
             <b-form-group
              label-cols-sm="4"
              label="倉庫名稱(中文):"
              label-align-sm="right"
              label-for="nested-street"
             >                
                 <b-form-input v-model.trim="$v.editData.desc1.$model" :class="{ 'is-invalid': $v.editData.desc1.$error,'is-valid':!$v.editData.desc1.$invalid }"></b-form-input>
                  <div class="valid-feedback" >倉庫名稱(中文)正確</div>
                 <div class="invalid-feedback">
                   <span v-if="!$v.editData.desc1.required">倉庫名稱(中文)必要的</span>
                 </div>                
             </b-form-group>

             <b-form-group
              label-cols-sm="4"
              label="倉庫名稱(英文):"
              label-align-sm="right"
              label-for="nested-street"
             >               
                 <b-form-input v-model.trim="$v.editData.desc2.$model"  :class="{ 'is-invalid': $v.editData.desc2.$error,'is-valid':!$v.editData.desc2.$invalid }"></b-form-input>
                <div class="valid-feedback" >倉庫名稱(英文)正確</div>
                 <div class="invalid-feedback">
                   <span v-if="!$v.editData.desc2.required">倉庫名稱(英文)必要的</span>
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
                     你即將會停用此倉庫！如不是停用此倉庫請取消這選項，否則請按繼續保存.
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
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name:"shDialog",
  data(){
    return{
      saveText:"保存",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      editData:{
        warehouse_id:"",
        code:"",
        desc1:"",
        desc2:"",
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
      if(this.operation=="add")
      {
          this.editData={
            warehouse_id:"",
            code:"",
            desc1:"",
            desc2:"",
            disable:0
          }
          this.isDisabled=false;  
      }
      console.log(this.editData.disable)
      //e.preventDefault();//取消打開
      //alert(e.params.myui[0]);
    },
     addData(){
          let self=this;         
          this.$http.post(this.$parent.addLink,
                           {
                             "code":self.editData.code, "desc1":self.editData.desc1, "desc2":self.editData.desc2, "create_by":"jx.xu"   
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
                            self.$parent.$refs.shTable.badingData();
                        })
                        .catch(function(error){
                            console.log(error)
                        })
      },
    updateData(){
          let self=this;         
          this.$http.post(this.$parent.updateLink,
                           {
                             "warehouse_id": self.editData.warehouse_id,"code":self.editData.code, "desc1":self.editData.desc1, "desc2":self.editData.desc2, "disable":self.editData.disable,"update_by":"jx.xu"   
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
                            self.$parent.$refs.shTable.badingData();
                        })
                        .catch(function(error){
                            console.log(error)
                        })
      },      

      setSHNO(value){
        console.log(value)
          //let self=this;
          this.editData.code=value;
          this.$v.editData.code.$touch();
          if(this.$v.editData.code.required & this.$v.editData.code.minLength & this.$v.editData.code.maxLength)
          {

             this.code_required=false;
             this.code_requiredText="倉庫編號已存在！"
          }
          else
          {
            this.code_required=false;
            this.code_requiredText="倉庫編號必要的。"
          }
          this.$v.editData.code.$touch(); 
      },

      // 封装axios请求，返回promise, 用于驗證是否唯一。
    getCodeUnique (data) {
      return new Promise((resolve, reject) => {
        this.axios.post(this.$parent.checkCodeUnique, {
          "code":data
        }).then((res) => {
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      })
    },

    setCode(value){
      this.editData.code=value.toUpperCase();

    }

  },
  components:{
    publicDialog
  },
  mounted(){
    this.$refs.child.modal_titel="倉庫管理"


  },
  validations: {
    editData: {
      code:{
          required,
          minLength: minLength(1),
          maxLength: minLength(3),
          async isUnique (value) {//驗證是否唯一
            let se=this
            let isCodeUnique=false
            if (value === '') return true
            try {
              let res = await se.getCodeUnique(value)
              console.log(res.data.code)
              // 等拿到返回数据res后再进行处理
              if(res.data.code==1102 | se.operation=="update")
              {
                isCodeUnique=true  
              }
              else
              {
                isCodeUnique=false 
              }
             
           } catch (err) {
             console.log(err)
             isCodeUnique=true
           
           } 
            return Boolean(isCodeUnique)

          }
         },
      desc1:{
        required
      },
      desc2:{
        required
      }      
    },


  }
  
}
</script>