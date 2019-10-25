<template>
<div>
   <publicDialogTable ref="child" >    
       
          <template v-slot:body>
             <div>
                <b-container class="bv-example-row">
                  <b-row>
                    <b-col>
                        <b-input-group prepend="搜索" class="mt-3" label-cols-sm="4">
                              <b-form-input v-model="search"></b-form-input>
                              <b-input-group-append>
                              <b-button variant="outline-success" @click="textSearch" >Search</b-button>
                              </b-input-group-append>
                        </b-input-group>
                    </b-col>
                  </b-row>
                </b-container>               
             </div>


          </template>
          <template v-slot:selectButton="myItem">
            <b-button @click="selectAll">頁全選</b-button>
            <b-button @click="unSelectAll">取消全部選擇</b-button>
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
  

</div>


</template>
<script>
import publicDialogTable from "../PublicDialog/PublicDialogTable"
//import { required, minLength, helpers } from 'vuelidate/lib/validators'
export default {
  name:"trDialog",
  data(){
    return{
      saveText:"加入",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      editData:{
        trans_id:"",
        code:"",
        vendor_id:"",
        invoice_no:"",
        delivery_no:"",
        remark:"",
        disable:0
      },
      isDisabled:false,//控制輸入項是否可以編輯
      editDisable_Disabled:false,//停用項是否可以編輯
      operation:"",//窗體的操作類型 add:新增， update:更改
      continueSaver:false, //是否繼續保存標示
      options_Vendor:[],
      options_warehouse:[],
      rows:[],
      columns: [
            {
              label:"選擇",
              key:"selectColumn"
            },
            {
                label: "資產號",
                key: "code",
                sortable: true,
            },
            {
                label: "資產名稱",
                key: "desc2",
                sortable: true,
            },
            {
                label:"所在倉庫",
                key:"warehouse_desc2"

            },
            {
                label:"數量",
                key:"qty"
            },
            {
                label:"圖片",
                key:"img"
            }

        ],
        search:"",
        selected:[],
        sysSelecteds:[]
    }
  },
  methods:{
    saveData(){
      console.clear();
      let selItem={};    
      this.selected.forEach(
        item=>{
          const rowsIds = this.$parent.$refs.child.tableRows.map(rowItem => rowItem.item_code);
          if(rowsIds.includes(item.code))
          {
            for(let i in this.$parent.$refs.child.tableRows){
              if(this.$parent.$refs.child.tableRows[i].item_code==item.code){
                //this.$parent.$refs.child.tableRows[i].qty+=item.qty;
                break;
              }
            }

          }
          else{
             selItem={"item_code":item.code,"item_desc2":item.desc2,"warehouse_code":item.code,"warehouse_desc2":item.warehouse_desc2,"qty":item.qty,"remark":""};
             this.$parent.$refs.child.tableRows.push(selItem);
          }

        }
      )
      this.$parent.$refs.child.tableConfig.totalRows=this.$parent.$refs.child.tableRows.length;

    },
    beforeOpen(){
      //this.$v.$reset();
      this.continueSaver=false;
      this.$refs.child.dialogSize="lg";
    },

      badingData(){
              this.rows=[{"item_id":"1","warehouse_code":"w001","warehouse_desc1":"IT","warehouse_desc2":"IT倉","vendor_code":"v01","code":"fb001","desc2":"資產1","qty":3,"img":"圖片1"},
                  {"item_id":"2","warehouse_code":"w001","warehouse_desc1":"IT","warehouse_desc2":"IT倉","vendor_code":"v02","code":"fb002","desc2":"資產2","qty":2,"img":"圖片2"},
                  {"item_id":"3","warehouse_code":"w001","warehouse_desc1":"IT","warehouse_desc2":"IT倉","vendor_code":"v03","code":"fb003","desc2":"資產3","qty":5,"img":"圖片3"},
                  {"item_id":"4","warehouse_code":"w001","warehouse_desc1":"IT","warehouse_desc2":"IT倉","vendor_code":"v04","code":"fb004","desc2":"資產4","qty":7,"img":"圖片4"},
                  {"item_id":"5","warehouse_code":"w001","warehouse_desc1":"IT","warehouse_desc2":"IT倉","vendor_code":"v05","code":"fb005","desc2":"資產5","qty":1,"img":"圖片5"},
                  {"item_id":"6","warehouse_code":"w002","warehouse_desc1":"HR","warehouse_desc2":"HR倉","vendor_code":"v06","code":"fb006","desc2":"資產6","qty":2,"img":"圖片6"},
                  {"item_id":"7","warehouse_code":"w002","warehouse_desc1":"HR","warehouse_desc2":"HR倉","vendor_code":"v06","code":"fb007","desc2":"資產7","qty":2,"img":"圖片7"},
                  {"item_id":"8","warehouse_code":"w002","warehouse_desc1":"HR","warehouse_desc2":"HR倉","vendor_code":"v06","code":"fb008","desc2":"資產8","qty":2,"img":"圖片8"},
                  {"item_id":"9","warehouse_code":"w002","warehouse_desc1":"HR","warehouse_desc2":"HR倉","vendor_code":"v06","code":"fb009","desc2":"資產9","qty":2,"img":"圖片9"},
                  {"item_id":"10","warehouse_code":"w002","warehouse_desc1":"HR","warehouse_desc2":"HR倉","vendor_code":"v06","code":"fb010","desc2":"資產10","qty":1,"img":"圖片10"},
                  {"item_id":"11","warehouse_code":"w002","warehouse_desc1":"HR","warehouse_desc2":"HR倉","vendor_code":"v07","code":"fb011","desc2":"資產11","qty":8,"img":"圖片10"}                 
                ];

              this.$refs.child.tableRows=this.rows;
            // this.$refs.child.tableConfig.totalPage=3;  
              this.$refs.child.tableConfig.totalRows=this.rows.length;
        
      },

     textSearch(){
         this.badingData();
     },
     setModalDialogName(strName){
       this.$refs.child.myModalDialog=strName;
     },

      onRowClicked(item){
        for(let i in this.selected){
          if(this.selected[i].item_id==item.item_id){
            this.selected.splice(i, 1);
            break;
          }
        }
      },
      onRowSelected(items){
        if(this.selected.length==0){
           items.forEach(item => {
             this.selected.push(item)
          })         
        }else{
          items.forEach(item => {
                const selectedIds = this.selected.map(selectedItem => selectedItem.item_id);
                if (!selectedIds.includes(item.item_id) ) {
                  this.selected.push(item)
                }
          })
        }
        this.sysSelecteds=items;


      },
      isSelected(citem){
        let re=false;
        const selectedIds = this.selected.map(selectedItem => selectedItem.item_id);
        if(selectedIds.includes(citem.item_id))
        {
          re=true;
        }
        return re;

      },
      selectAll(){
        this.$refs.child.selectAll();

      },
      unSelectAll(){
        this.$refs.child.unSelectAll();
        this.clearSelectCurrentPage();
        
        
      },
      //清除所有當前頁面的選擇項
      clearSelectCurrentPage(){
        //console.clear();
        //console.log(this.selected);
        // let start_index=this.$refs.child.tableConfig.currentPage*this.$refs.child.tableConfig.perPage-this.$refs.child.tableConfig.perPage;
        // let end_index=start_index+this.$refs.child.tableConfig.perPage;
        // for (let index = start_index; index < end_index; index++) {
        //     for(let i in this.selected){
        //        if (this.selected[i].item_id==this.rows[index].item_id ) {
        //             this.selected.splice(i, 1);
        //             console.log(this.rows[index].item_id);
        //             break;
                    
        //         }
          
        //      }
        // }

        this.rows.forEach(item => {
            for(let i in this.selected){
               if (this.selected[i].item_id==item.item_id ) {
                    this.selected.splice(i, 1);
                    break;
                    
                }
            }
        })

      }
           

  },
  components:{
    publicDialogTable

  },
  mounted(){
    this.$refs.child.modal_titel="入倉資產選擇";
    this.$refs.child.tableColumns=this.columns;
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