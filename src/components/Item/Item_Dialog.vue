<template>
<div>
  <publicDialog ref="child" >           
          <template v-slot:body>

            <b-form-group
              label-cols-sm="3"
              label="資產編號:"
              label-align-sm="right"
              label-for="nested-street"
            >
                 <b-form-input v-model.trim="$v.editData.id.$model" :disabled="isDisabled" :class="{ 'is-invalid': $v.editData.id.$error,'is-valid':!$v.editData.id.$invalid }"></b-form-input>
                 <div class="valid-feedback" >資產編號正確</div>
                 <div class="invalid-feedback">
                     <span v-if="!$v.editData.id.required">資產編號必要的</span>
                     <span v-if="!$v.editData.id.minLength | !$v.editData.id.maxLength">資產編號長度必需為{{$v.editData.id.$params.minLength.min}} 至 {{$v.editData.id.$params.maxLength.min}}位</span>
                 </div>
             </b-form-group>
             <b-form-group 
                label-cols-sm="3"
                label="資產名稱:" 
                label-align-sm="right"
                label-for="nested-street"
            >
                 <b-form-input v-model.trim="$v.editData.itName.$model" :class="{ 'is-invalid': $v.editData.itName.$error,'is-valid':!$v.editData.itName.$invalid }"></b-form-input>
                  <div class="valid-feedback" >資產名稱正確</div>
                  <div class="invalid-feedback">
                      <span v-if="!$v.editData.itName.required">資產名稱必要的</span>
                  </div>                
             </b-form-group>
             <b-form-group 
                 label-cols-sm="3"
                 label="資產類型:"
                 label-align-sm="right"
                 label-for="nested-street"
                 
             
             >
                <b-form-select v-model.trim="$v.editData.itType.$model" :options="options_Type" :class="{ 'is-invalid': $v.editData.itType.$error,'is-valid':!$v.editData.itType.$invalid }"></b-form-select>
                <div class="valid-feedback" >資產類型正確</div>
                <div class="invalid-feedback">
                   <span v-if="!$v.editData.itType.required">資產類型必要的</span>
                </div>                  
             </b-form-group>

             <b-form-group 
                  label-cols-sm="3" 
                  label="資產單位:" 
                  label-align-sm="right"
                  label-for="nested-street"
             >
                 <b-form-select v-model.trim="$v.editData.itUnit.$model" :options="options_Unit" :class="{ 'is-invalid': $v.editData.itUnit.$error,'is-valid':!$v.editData.itUnit.$invalid }"></b-form-select>
                 <div class="valid-feedback" >資產單位正確</div>
                 <div class="invalid-feedback">
                   <span v-if="!$v.editData.itUnit.required">資產單位必要的</span>
                 </div>                  
             </b-form-group> 

             <b-form-group 
                  label-cols-sm="3"
                  label="ISO:"
                  label-align-sm="right" 
                  class="mb-0"
             >
             <b-form-checkbox
                v-model="editData.itISO"
                class="pt-2"
             ></b-form-checkbox>

             </b-form-group> 

             <b-form-group 
                  label-cols-sm="3"
                  label="photo"
                  label-align-sm="right"
                  class="mb-0"
             >
             <div class="clearfix">
                  <!-- <b-img left src="https://picsum.photos/125/125/?image=58" alt="Center image"></b-img> -->
                  <b-img left :src="this.photoPath" alt="Center image"></b-img>
                  <b-form-file
                     v-model="editData.itPhotoFile"
                     :state="Boolean(editData.itPhotoFile)"
                     placeholder="Choose a file or drop it here..."
                     drop-placeholder="Drop file here..."
                  >
                  
                  </b-form-file>
                  {{editData.itPhotoFile?editData.itPhotoFile.name:"NULL"}}

             </div>
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
  {{$v}}

</div>
</template>
<script>
import publicDialog from "../PublicDialog/PublicDialog"
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name:"itDialog",
  data(){
    return{
      saveText:"Save",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      editData:{
        id:"",
        itName:"",
        itType:"",
        itUnit:"",
        itISO:false,
        itPhotoFile:""
      },
      isDisabled:false,
      operation:"",
      options_Type: [
          { value: '0', text: '類型1' },
          { value: '1', text: '類型2' },
          { value: '2', text: '類型3' }
      ],
      options_Unit: [
          { value: '0', text: '單位1' },
          { value: '1', text: '單位2' },
          { value: '2', text: '單位3' }
      ],
      photoPath:"../../assets/"
      


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
                alert("我是新增模式");

                break;
              case "update":
                alert("我是更新模式");
                break;


            }

            setTimeout(() => {
                  this.$refs.child.closeConfirm();//調用公用窗體的closeConfirm方法，用啟用相關的按鈕。
                  this.$parent.isLoading=false;//關閉加載頁面
                  this.isSaveDisabled=false;//啟用保存制
                  this.saveText="保存"//保存制保存的字樣
                },5000) 
        }
    },
    beforeOpen(e){
      console.log(e);
      this.$v.$reset(); 
            
      if(this.operation=="add")
      {
          this.isDisabled=false; 
          this.editData={id:"",
                     itName:"",
                     itType:"",
                     itUnit:"",
                     itISO:false,
                     itPhotoFile:""

                    }
      }
      else{
          this.isDisabled=true;

      }
      this.photoPath= "../../assets/"+this.editData.itPhotoFile
      //e.preventDefault();//取消打開
      //alert(e.params.myui[0]);
    },
 
  },
  components:{
    publicDialog
  },
  mounted(){
    this.$refs.child.modal_titel="資產管理"


  },
  validations: {
    editData: {
      id:{
          required,
          minLength: minLength(1),
          maxLength: minLength(10)
         },
      itName:{
        required
      },
      itType:{
        required
      },
      itUnit:{
        required
      }
      

    },

  }
  
}
</script>