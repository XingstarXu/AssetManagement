<template>
<div>
  <transItemDialog ref="trItemDialog"/>
  <publicDialogTable ref="child" >           
          <template v-slot:body>
             <div>
                <b-container class="bv-example-row">
                  <b-row>

                    <b-col>
                          <b-form-group 
                              label-cols-sm="4" 
                              label="供應商:" 
                              label-align-sm="right"
                              label-for="nested-street"
                        >
                            <b-form-select v-model="editData.vendor_id" :options="options_Vendor" ></b-form-select>
                          
                        </b-form-group>   
                    </b-col>
                    <b-col>
                          <b-form-group 
                              label-cols-sm="4" 
                              label="發貨號:" 
                              label-align-sm="right"
                              label-for="nested-street"
                        >
                            <b-form-input v-model="editData.delivery_no"></b-form-input>
                          
                        </b-form-group>                     

                    </b-col>                    
                    <b-col>
                          <b-form-group 
                              label-cols-sm="4"
                              label="發票號:" 
                              label-align-sm="right"
                              label-for="nested-street"
                          >
                              <b-form-input v-model="editData.invoice_no"></b-form-input>             
                          </b-form-group>                      

                    </b-col>
                  </b-row>
                  <b-row align-h="start">
                    <b-col cols="12" >
                           <b-form-group 
                              label-cols-sm="1"
                              label="備註:" 
                              label-align-sm="right"
                              label-for="nested-street"

                          >
                              <b-form-input v-model="editData.remark"></b-form-input>             
                          </b-form-group>                     

                    </b-col>
                  </b-row>
                </b-container>               
             </div>


          </template>
          <template v-slot:diyButton>
               <b-button variant="success" align="right" @click="showNewDialog">
                   <i class="far fa-plus-square"></i>
                   新增入倉資產
               </b-button>
          </template>

          <template v-slot:diyColumn="myData">
            <template v-if="isEdit(myData.data.index)">

                  <!-- <b-button  variant="info" @click="editRow(myData)"><i class="fas fa-check"></i></b-button> -->
                  <b-button  variant="success" @click="editRowOK(myData)" size="sm" >確認</b-button>
                  <span>&nbsp; | &nbsp;</span>
                  <b-button  variant="danger" @click="editRowCancel(myData)" size="sm" >取消</b-button>
            </template>
            <template v-else>
                  <!-- <b-button  variant="info" @click="editRow(myData)"><i class="fas fa-edit"></i></b-button>   -->
                  <b-button  variant="info" @click="editRow(myData)" id="v1" size="sm">編輯</b-button> 
            </template>
                
          </template>
          <template v-slot:diyColumn2="myData2">
            <template v-if="isEdit(myData2.data.index)">
                  <b-form-input v-model="myData2.data.item.qty" size="sm" @change="amtChange(myData2.data.item)"></b-form-input>
            </template>
            <template v-else>
                  <p>{{myData2.data.item.qty}}</p>   
            </template>


                
          </template>

          <template v-slot:diyColumn3="myData3">
            <template v-if="isEdit(myData3.data.index)">
                  <b-form-input v-model="myData3.data.item.remark" size="sm" ></b-form-input>
            </template>
            <template v-else>
                  <p>{{myData3.data.item.remark}}</p>   
            </template>
          </template>

          <template v-slot:diyColumn4="myData4">
            <template v-if="isEdit(myData4.data.index)">
                  <!-- <b-form-input v-model="myData4.data.item.warehouse_desc2" size="sm"></b-form-input> -->
                  <model-list-select :list="options_warehouse"  v-model="myData4.data.item.warehouse_code"                 
                    option-value="code"
                    option-text="desc2"
                    @change="warehouseChange(value,myData4.data.item)"
                    >                 
                  </model-list-select>


            </template>
            <template v-else>
                  <p>{{myData4.data.item.warehouse_desc2}}</p>   
            </template>      
          </template>

          <template v-slot:diyColumn5="myData5">
            <template v-if="isEdit(myData5.data.index)">
                  <b-form-input v-model="myData5.data.item.price" size="sm" @change="amtChange(myData5.data.item)"></b-form-input>
            </template>
            <template v-else>
                  <p>{{myData5.data.item.price}}</p>   
            </template>      
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


  </publicDialogTable>
  <!-- {{$v}} -->

</div>
</template>
<script>
import publicDialogTable from "../PublicDialog/PublicDialogTable";
import transItemDialog from "../../components/Transaction/Trans_Item_Dialog";
import { ModelListSelect } from 'vue-search-select';
//import { required, minLength, helpers } from 'vuelidate/lib/validators'
export default {
  name:"trDialog",
  data(){
    return{
      saveText:"保存",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      editData:{
        trans_id:"",
        code:"",
        vendor_id:"",
        invoice_no:"",
        delivery_no:"",
        remark:"",
        disable:0,
      },
      editItem:{
        editIndex:-1,
        remarkValue:"",
        qtyValue:0,
        warehouseIdValue:"",
        priceValue:"",
        amtValue:""


      },

      isDisabled:false,//控制輸入項是否可以編輯
      editDisable_Disabled:false,//停用項是否可以編輯
      operation:"",//窗體的操作類型 add:新增， update:更改
      continueSaver:false, //是否繼續保存標示
      options_Vendor:[],
      options_warehouse:[],
      columns: [

            {
                label: "資產名稱",
                key: "item_desc2",
                sortable: true,
            },
            {
                label: "倉庫名稱",
                key: "editColumn3",
                sortable: true,
            },
            {
                label: "單價",
                key: "editColumn4",
            },
            {
                label:"數據量",
                key:"editColumn"
            },

            {
                label: "金額",
                key: "amt",

            },            

            {
                label:"備註",
                key:"editColumn2"

            },
            {
              label:"操作",
              key:"opcolumn"
            }
        ],


      


    }
  },
  methods:{
    saveData(){
      this.$v.$touch()
      if(this.$v.$invalid){
            
            return;
      }
      else{
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
        //this.$v.$reset();
        this.continueSaver=false;
        this.isDisabled=true;  
        this.editDisable_Disabled=false;     
        if(this.operation=="add")
        {
            this.editData={
                trans_id:"",
                code:"",
                vendor_id:"",
                invoice_no:"",
                delivery_no:"",
                remark:"",
                disable:0
            }
            this.isDisabled=false; 
            this.editDisable_Disabled=true; 
            this.$refs.child.dialogSize="xl";
        }
      


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
                        self.$parent.$refs.shTable.badingData();
                    })
                    .catch(function(error){
                        console.log(error);
                        self.$refs.child.showAlert(error,"danger");
                        self.$refs.child.closeConfirm();//調用公用窗體的closeConfirm方法，用啟用相關的按鈕。
                        self.$parent.isLoading=false;//關閉加載頁面
                        self.isSaveDisabled=false;//啟用保存制
                        self.saveText="保存"//保存制保存的字樣
                        self.$parent.$refs.shTable.badingData();
                    })
      },
    updateData(){
        let self=this;         
        this.$http.post(this.$parent.updateLink,
                          {
                            "vendor_id": self.editData.vendor_id, "desc1":self.editData.desc1, "desc2":self.editData.desc2,"address":self.editData.address,"phone":self.editData.phone,"email":self.editData.email,"update_by":"jx.xu"   
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
                          console.log(error);
                          self.$refs.child.showAlert(error,"danger");
                          self.$refs.child.closeConfirm();//調用公用窗體的closeConfirm方法，用啟用相關的按鈕。
                          self.$parent.isLoading=false;//關閉加載頁面
                          self.isSaveDisabled=false;//啟用保存制
                          self.saveText="保存"//保存制保存的字樣
                          self.$parent.$refs.shTable.badingData();                            
                      })
      }, 

      getWareHouse(){
        let self=this;
        this.$http.post(this.$parent.getWareHouseLink,{"page":1,"num_of_page":1000,"search":"","disable":0}
                      )
                      .then(
                        function(response){
                          let res=response.data;
                          
                          self.options_warehouse=res.data;


                        }
                      )
                      .catch(
                        function(error){
                          console.log(error)
                        }
                      )
      },

      badingData(){
         let rows=[{"item_code":"fb001","item_desc2":"資產1","warehouse_code":"IT-001","warehouse_desc2":"IT倉","qty":1,"price":100,"amt":100,"remark":"無"},
                   {"item_code":"fb002","item_desc2":"資產2","warehouse_code":"HR-001","warehouse_desc2":"HR倉","qty":1,"price":200,"amt":200,"remark":"無"}
                 ]
         this.$refs.child.tableConfig.totalPage=1;  
         this.$refs.child.tableRows=rows;
      },
      showNewDialog(){
         this.$bvModal.show('TransItemDialog');
      },     
      onRowClicked(){
      },
      onRowSelected(){

      },
      isSelected(){

      },
      pageChange(){
          this.editIndex=-1;
          this.$refs.child.$refs.selectTable.clearSelected();
      },
      editRow(item){
          this.editItem.editIndex=item.data.index;
          this.editItem.qtyValue=item.data.item.qty;
          this.editItem.warehouseIdValue=item.data.item.warehouse_code;
          this.editItem.remarkValue=item.data.item.remark;
          this.editItem.priceValue=item.data.item.price;
          this.editItem.amtValue=item.data.item.amt;
          if(this.$refs.child.$refs.selectTable.isRowSelected(item.data.index))
          {
            this.$refs.child.$refs.selectTable.unselectRow(item.data.index);
          }
          else{
            this.$refs.child.$refs.selectTable.selectRow(item.data.index);

          }
        
      },
      isEdit(index){      
          return this.editItem.editIndex==index
      },
       editRowOK(item){
          this.editItem.editIndex=-1;
          this.$refs.child.$refs.selectTable.unselectRow(item.data.index);
          this.$refs.child.$refs.selectTable.selectRow(item.data.index);
      },
      editRowCancel(item){
          this.editItem.editIndex=-1;
          this.$refs.child.tableRows.forEach(rowItem => {
                if(rowItem.item_code==item.data.item.item_code){              
                  rowItem.qty=this.editItem.qtyValue;
                  rowItem.warehouse_code=this.editItem.warehouseIdValue;
                  rowItem.remark=this.editItem.remarkValue;
                  rowItem.price=this.editItem.priceValue;
                  rowItem.amt=this.editItem.amtValue;
                }
                
          });
          this.editItem.qtyValue=0;
          this.editItem.warehouseIdValue="";
          this.editItem.remarkValue="";
          this.editItem.priceValue=0;
          this.editItem.amtValue=0;
          this.$refs.child.$refs.selectTable.unselectRow(item.data.index);
          this.$refs.child.$refs.selectTable.unselectRow(item.data.index);
          this.$refs.child.$refs.selectTable.selectRow(item.data.index);
        

      },
      amtChange(item){
        item.amt=item.qty*item.price;

      },
      warehouseChange(value,item){
        console.log(value);
        item.warehouse_code=value;

      }



  },
  components:{
    publicDialogTable,
    transItemDialog,
    ModelListSelect

  },
  mounted(){
    this.$refs.child.modal_titel="入倉管理";
    console.log(this.$refs);
    this.$refs.child.tableColumns=this.columns;
    this.$refs.child.serverModel=false;//分頁時不會在DB時獲取數據
    this.$refs.trItemDialog.setModalDialogName("TransItemDialog");
    this.$refs.child.selectMode="single";
    this.badingData();
    this.getWareHouse();
  },
  // validations: {
  //   editData: {
  //     desc1:{
  //       required
  //     },
  //     desc2:{
  //       required
  //     },  
  //     address:{
  //       required
  //     },
  //     phone:{
  //       required,
  //       minLength:minLength(8)
  //     },
  //     email:{
  //       required,
  //       isEmail: helpers.regex('alpha', /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/)
  //     },
                      
  //   },


  // }
  
}
</script>