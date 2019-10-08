<template>
<div>
  <publicDialog ref="child" >           
          <template v-slot:body>

             <b-form-group 
                label-cols-sm="3"
                label="資產名稱(英):" 
                label-align-sm="right"
                label-for="nested-street"
            >
                 <b-form-input v-model.trim="$v.editData.desc1.$model" :class="{ 'is-invalid': $v.editData.desc1.$error,'is-valid':!$v.editData.desc1.$invalid }"></b-form-input>
                  <div class="valid-feedback" >資產名稱正確</div>
                  <div class="invalid-feedback">
                      <span v-if="!$v.editData.desc1.required">資產名稱必要的</span>
                  </div>                
             </b-form-group>

             <b-form-group 
                label-cols-sm="3"
                label="資產名稱(中):" 
                label-align-sm="right"
                label-for="nested-street"
            >
                 <b-form-input v-model.trim="$v.editData.desc2.$model" :class="{ 'is-invalid': $v.editData.desc2.$error,'is-valid':!$v.editData.desc2.$invalid }"></b-form-input>
                  <div class="valid-feedback" >資產名稱正確</div>
                  <div class="invalid-feedback">
                      <span v-if="!$v.editData.desc1.required">資產名稱必要的</span>
                  </div>                
             </b-form-group>

             <b-form-group 
                label-cols-sm="3"
                label="型號:" 
                label-align-sm="right"
                label-for="nested-street"
            >
                 <b-form-input v-model="editData.model_no"></b-form-input>             
             </b-form-group>


             <b-form-group 
                 label-cols-sm="3"
                 label="資產類型:"
                 label-align-sm="right"
                 label-for="nested-street"
                 
             >
                <!-- <b-form-select v-model.trim="$v.editData.type_id.$model" :options="options_Type"  
                :class="{ 'is-invalid': $v.editData.type_id.$error,'is-valid':!$v.editData.type_id.$invalid }" ></b-form-select> 
                
                <div class="valid-feedback" >資產類型正確</div>
                <div class="invalid-feedback">
                   <span v-if="!$v.editData.type_id.required">資產類型必要的</span>
                </div>                   -->
                <model-list-select :list="options_Type"  v-model.trim="$v.editData.type_id.$model" 
                                   :isError= $v.editData.type_id.$error                       
                                   option-value="type_id"
                                   option-text="desc1"
                                   >                 
                </model-list-select>

                <div v-if="$v.editData.type_id.$error" class="invalid-feedback d-block">
                   <span>資產類型必要的</span>
                </div>


             </b-form-group>

             <b-form-group 
                  label-cols-sm="3" 
                  label="資產單位:" 
                  label-align-sm="right"
                  label-for="nested-street"
             >


                 <!-- <b-form-select v-model.trim="$v.editData.unit_id.$model" :options="options_Unit" :class="{ 'is-invalid': $v.editData.unit_id.$error,'is-valid':!$v.editData.unit_id.$invalid }"></b-form-select>
                 <div class="valid-feedback" >資產單位正確</div>
                 <div class="invalid-feedback">
                   <span v-if="!$v.editData.unit_id.required">資產單位必要的</span>
                 </div>   -->

                <model-list-select :list="options_Unit"  v-model.trim="$v.editData.unit_id.$model" 
                                   :isError= $v.editData.unit_id.$error                       
                                   option-value="unit_id"
                                   option-text="desc1"
                                   >                 
                </model-list-select>

                <div v-if="$v.editData.type_id.$error" class="invalid-feedback d-block">
                   <span>資單位是型必要的</span>
                </div>


             </b-form-group> 

              <b-form-group 
                  label-cols-sm="3" 
                  label="供應商:" 
                  label-align-sm="right"
                  label-for="nested-street"
             >
                 <b-form-select v-model="editData.vendor_code" :options="options_Vendor" ></b-form-select>
               
             </b-form-group>             

             <b-form-group 
                  label-cols-sm="3"
                  label="ISO:"
                  label-align-sm="right" 
                  class="mb-0"
             >
             <b-form-checkbox
                v-model="editData.iso"
                class="pt-2"
                value=1
                unchecked-value=0
             ></b-form-checkbox>

             </b-form-group> 



             <b-form-group 
                  label-cols-sm="3"
                  label="photo"
                  label-align-sm="right"
                  class="mb-0"
             >
             <div class="clearfix">
                 
                  
                  <b-img thumbnail fluid :src="photoBase64" alt="assets photo" ></b-img>
                  <b-form-file
                     v-model="photoFile"
                     :state="Boolean(photoFile)"
                     placeholder="Choose a file or drop it here..."
                     drop-placeholder="Drop file here..."
                     accept=".jpg, .png, .gif"
                     :file-name-formatter="formatNames"
                     @change="previewImage"
                  >
                  
                  </b-form-file>
                  <!-- {{editData.photoFile?editData.photoFile.name:"NULL"}} -->
                <div v-if="photoError" class="invalid-feedback d-block">
                   <span>{{photoErrorText}}</span>
                </div>

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
  <!-- {{$v}} -->

</div>
</template>
<script>
import publicDialog from "../PublicDialog/PublicDialog"
import { required } from 'vuelidate/lib/validators'
import { ModelListSelect } from 'vue-search-select'
// import { saveAs } from 'file-saver'
export default {
  name:"itDialog",
  data(){
    return{
      saveText:"Save",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      editData:{
        item_id:"",
        desc1:"",
        desc2:"",
        code:"",
        unit_id:"",
        type_id:"",
        model_no:"",
        iso:0,
        vendor_code:"",
        img:"",
        qty:0,
        warehouse_code:""
      },
      isDisabled:false,
      operation:"",
      options_Type: [],
      options_Unit: [],
      options_Vendor: [
          { value: '0', text: '供應商1' },
          { value: '1', text: '供應商2' },
          { value: '2', text: '供應商3' }
      ],     
      photoPath:"/assetsPhoto/",
      photoFile:null,
      photoBase64:"",
      photoErrorText:"",
      photoError:false

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
      if(this.operation=="add")
      {
          this.editData={
                          item_id:"",
                          desc1:"",
                          desc2:"",
                          code:"",
                          unit_id:"",
                          type_id:"",
                          model_no:"",
                          iso:0,
                          vendor_code:"",
                          img:"1000006.jpg",
                          qty:0,
                          warehouse_code:""

                        }
          this.isDisabled=false;  
      }
      //靜態資源文件需要放在public文件夾中才能動態讀取到。
      this.photoPath="/assetsPhoto/"+this.editData.img;
      this.photoBase64=this.photoPath;
      this.getType();
      this.getUnit();


    },
     addData(){
          let self=this; 
          // if(this.photoFile){
          //       var fn=this.photoFile.name;
          //       //fn=response.data.code+fn.substring(fn.indexOf("."))
          //       fn="/assetsPhoto/"+'test.jpg'
          //       var FileSaver = require('file-saver');
          //       FileSaver.saveAs(this.photoFile, fn);

          // }

          this.$http.post(this.$parent.addLink,
                           {
                             "code":self.editData.code, 
                             "desc1":self.editData.desc1, 
                             "desc2":self.editData.desc2, 
                             "qty":self.editData.qty, 
                             "unit_id":self.editData.unit_id, 
                             "type_id":self.editData.type_id, 
                             "model_no":self.editData.model_no, 
                             "img":self.editData.img, 
                             "warehouse_code":self.editData.warehouse_code,
                             "iso":self.editData.iso,
                             "vendor_code":self.editData.vendor_code, 
                             "create_by":"jx.xu"   
                           })
                        .then(function(response){
                            if(response.data.code>0)
                            {
                              self.$refs.child.showAlert(response.data.msg,"success");
                              self.savePhoto();

                            }
                            else{
                              self.$refs.child.showAlert(response.data.msg,"danger");

                            }
                            self.$refs.child.closeConfirm();//調用公用窗體的closeConfirm方法，用啟用相關的按鈕。
                            self.$parent.isLoading=false;//關閉加載頁面
                            self.isSaveDisabled=false;//啟用保存制
                            self.saveText="保存"//保存制保存的字樣
                            self.$parent.$refs.itTable.badingData();
                            

                        })
                        .catch(function(error){
                            console.log(error);
                            self.$refs.child.showAlert(error,"danger");
                            self.$refs.child.closeConfirm();//調用公用窗體的closeConfirm方法，用啟用相關的按鈕。
                            self.$parent.isLoading=false;//關閉加載頁面
                            self.isSaveDisabled=false;//啟用保存制
                            self.saveText="保存"//保存制保存的字樣
                            self.$parent.$refs.itTable.badingData();                            
                        })
      },
    updateData(){
          let self=this;         
          this.$http.post(this.$parent.updateLink,
                           {
                              "item_id":self.editData.item_id, "desc1":self.editData.desc1, "desc2":self.editData.desc2,  "code":self.editData.code, "qty":self.editData.qty, "unit_id":self.editData.unit_id, "type_id":self.editData.type_id, "model_no":self.editData.model_no, "img":self.editData.img, "warehouse_code":self.editData.warehouse_code,"iso":self.editData.iso,"vendor_code":self.editData.vendor_code,"update_by":"jx.xu"   
                           })
                        .then(function(response){
                            console.log(self.editData.type_id)
                            if(response.data.code>0)
                            {
                              self.$refs.child.showAlert(response.data.msg,"success");
                              self.savePhoto();

                            }
                            else{
                              self.$refs.child.showAlert(response.data.msg,"danger");

                            }
                            self.$refs.child.closeConfirm();//調用公用窗體的closeConfirm方法，用啟用相關的按鈕。
                            self.$parent.isLoading=false;//關閉加載頁面
                            self.isSaveDisabled=false;//啟用保存制
                            self.saveText="保存"//保存制保存的字樣
                            self.$parent.$refs.itTable.badingData();
                        })
                        .catch(function(error){
                            console.log(error);
                            self.$refs.child.showAlert(error,"danger");
                            self.$refs.child.closeConfirm();//調用公用窗體的closeConfirm方法，用啟用相關的按鈕。
                            self.$parent.isLoading=false;//關閉加載頁面
                            self.isSaveDisabled=false;//啟用保存制
                            self.saveText="保存"//保存制保存的字樣
                            self.$parent.$refs.itTable.badingData();
                           
                        })
      }, 
      
    getType(){
      let self=this;
      this.$http.post(this.$parent.getTypeLink,{}
                    )
                    .then(
                      function(response){
                        let res=response.data;
                        
                        self.options_Type=res.data;


                      }
                    )
                    .catch(
                      function(error){
                        console.log(error)
                      }
                    )
    },
    getUnit(){
      let self=this;
      this.$http.post(this.$parent.getUnitLink,{}
                    )
                    .then(
                      function(response){
                        let res=response.data;                        
                        self.options_Unit=res.data;

                      }
                    )
                    .catch(
                      function(error){
                        console.log(error)
                      }
                    )
    },


    setData(editRow){
                this.editData={
                          item_id:editRow.item_id,
                          desc1:editRow.desc1,
                          desc2:editRow.desc2,
                          code:editRow.code,
                          unit_id:editRow.unit_id,
                          type_id:editRow.type_id,
                          model_no:editRow.model_no,
                          iso:editRow.iso,
                          vendor_code:editRow.vendor_code,
                          img:editRow.img,
                          qty:editRow.qty,
                          warehouse_code:editRow.warehouse_code

                        }

    },
    formatNames(files){
      if(files.length===1){
        return files[0].name
      }else{
        return 'NewAssetsPhoto'
      }

    },
    //上傳文件時，自動顯示所上傳的文件圖片
    previewImage(ev){
      let _this = this;
      var input=ev.target
      if(input.files && input.files[0]){
          if (input.files[0].size/(1024*1024) >1) 
          { 
            _this.photoErrorText="上傳的圖片不可大於5M！"; 
            _this.photoError=true;
            return false; 
          }
          console.log(input.files[0]);
          console.log(input.files[0].name.substring(input.files[0].name.indexOf(".")));
           var reader = new FileReader();
           reader.onload = function (e) { 
                  var base64 = e.target.result; 
                  _this.photoBase64 = base64;
                 }
           reader.readAsDataURL(input.files[0]);
      }

    },

    //**待測試是否可以上傳文件到指定路徑**
    savePhoto(){
      let self=this;
      let formData=new FormData();
      formData.append("attachment",this.photoFile);
      var url="assetsPhoto";
      this.$http.post(url,formData,{
        headers:{'Content-Type':'multipart/form-data'}
      }).then(function(res){
        console.log(res)
        self.$refs.child.shoAlert("Photo saveed success!","success");


      }).catch(function(error){
          self.$refs.child.showAlert(error,"danger");        
      })
    }
 
  },
  components:{
    publicDialog,
    ModelListSelect
  },
  mounted(){
    this.$refs.child.modal_titel="資產管理";
    


  },
  validations: {
    editData: {
      desc1:{
          required,
         },
      desc2:{
        required
      },
      type_id:{
        required
      },
      unit_id:{
        required
      }
      

    },

  }
  
}
</script>