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
                 <b-form-input v-model.trim="$v.editData.type_desc1.$model" :class="{ 'is-invalid': $v.editData.type_desc1.$error,'is-valid':!$v.editData.type_desc1.$invalid }"></b-form-input>
                  <div class="valid-feedback" >類型名稱(英)正確</div>
                  <div class="invalid-feedback">
                      <span v-if="!$v.editData.type_desc1.required">類型名稱(中)必要的</span>
                  </div>                
             </b-form-group>

             <b-form-group 
                label-cols-sm="3"
                label="類型名稱(中):" 
                label-align-sm="right"
                label-for="nested-street"
            >
                 <b-form-input v-model.trim="$v.editData.type_desc2.$model" :class="{ 'is-invalid': $v.editData.type_desc2.$error,'is-valid':!$v.editData.type_desc2.$invalid }"></b-form-input>
                  <div class="valid-feedback" >類型名稱(中)正確</div>
                  <div class="invalid-feedback">
                      <span v-if="!$v.editData.type_desc2.required">類型名稱(英)必要的</span>
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
                           size="md"
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
import { required } from 'vuelidate/lib/validators'
export default {
  name:"itDialog",
  data(){
    return{
      saveText:"保存",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      editData:{
        type_id:"",
        type_desc1:"",
        type_desc2:"",
        disable:0

      },
      isDisabled:false,
      operation:"",
      editDisable_Disabled:false,
      addData:{},
      updateData:{},
      parentTable: null

    }
  },
  methods:{
    saveData(){
        this.$v.$touch()
        if(this.$v.$invalid){
              return;
        }
        else{
            
            this.addData={  "type_desc1":this.editData.type_desc1, 
                            "type_desc2":this.editData.type_desc2, 
                            "create_by":"jx.xu"   
                         }
            this.updateData={
                            "type_id":this.editData.type_id, 
                            "type_desc1":this.editData.type_desc1, 
                            "type_desc2":this.editData.type_desc2,  
                            "disable":this.editData.disable,
                            "update_by":"jx.xu"         
                            }               
            switch(this.operation)
            {
              case "add":
                this.$refs.child.saveData(this,this.$parent.addLink,this.addData)

                break;
              case "update":
                this.$refs.child.saveData(this,this.$parent.updateLink,this.updateData)
                break;


            }
        }
    },

    beforeOpen(){
      this.$v.$reset()
      this.continueSaver=false
      this.isDisabled=true 
      this.$parent.isLoading=false 
      this.editDisable_Disabled=false//停用項是否可以編輯 
      this.parentTable=this.$parent.$refs.tyTable 
      if(this.operation=="add")
      {
          this.editData={
                        type_id:"",
                        type_desc1:"",
                        type_desc2:"",
                        disable:0
                        }
          this.isDisabled=false;  
          this.editDisable_Disabled=true;//停用項是否可以編輯
      }

              


    },
    setData(editRow){
        this.editData={
                  type_id:editRow.type_id,
                  type_desc1:editRow.type_desc1,
                  type_desc2:editRow.type_desc2,
                  disable:editRow.disable
                }

    },
 
  },
  components:{
  },
  mounted(){
    this.$refs.child.modal_titel="類型管理"
  },
  validations: {
    editData: {
      type_desc1:{
          required,
         },
      type_desc2:{
        required
      }     

    },

  }
  
}
</script>