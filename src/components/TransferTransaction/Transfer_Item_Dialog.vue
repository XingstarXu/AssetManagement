<template>
<div>
   <publicDialogTable ref="child" >        
          <template v-slot:body>
             <div>
                <b-container class="bv-example-row">
                  <b-row class="mb-3">
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
            <b-button @click="unSelectAll" class="ml-3">取消全部選擇</b-button>
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

//import { required, minLength, helpers } from 'vuelidate/lib/validators'
export default {
  name:"ttDialog",
  data(){
    return{
      saveText:"加入",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
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
                key: "item_code",
                sortable: true,
            },
            {
                label: "資產名稱",
                key: "item_desc2",
                sortable: true,
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
        sysSelecteds:[],
        importCount:0,
        parentTable:null

    }
  },
  methods:{
    saveData(){
      let selItem={}
      this.importCount=0
      this.selected.forEach(
        item=>{
          const rowsIds = this.$parent.$refs.child.tableRows.map(rowItem => rowItem.item_id)
          if(rowsIds.includes(item.item_id))
          {
            for(let i in this.$parent.$refs.child.tableRows){
              if(this.$parent.$refs.child.tableRows[i].item_id==item.item_id){
                //this.$parent.$refs.child.tableRows[i].qty+=item.qty;
                break
              }
            }

          }
          else{

             selItem={"item_id":item.item_id,"item_desc1":item.item_desc1,"item_desc2":item.item_desc2,"qty":0,"remark":"","create_by":""}
             this.$parent.$refs.child.tableRows.push(selItem)
             this.importCount=this.importCount+1
          }

        }
      )
      this.$parent.$refs.child.tableConfig.totalRows=this.$parent.$refs.child.tableRows.length
      this.$parent.$refs.child.tableConfig.totalPage=Math.ceil(this.$parent.$refs.child.tableConfig.totalRows / this.$parent.$refs.child.tableConfig.perPage);
      let msg="已選加入"+this.importCount+"資產。"
      if(this.importCount<=0){
        msg="沒有任何資產加入"
        this.$refs.child.showAlert(msg,"danger")
      }
      else{
        this.$refs.child.showAlert(msg,"success")

      }
      
      
       

    },
    beforeOpen(){
      //this.$v.$reset();
      this.continueSaver=false
      this.$refs.child.dialogSize="lg"
      this.$refs.child.tableRows=[]
      this.selected=[]
      this.$parent.$refs.child.tableRows.forEach(
           item=>{
                this.selected.push(item)
      })
      this.$refs.child.tableConfig.totalRows=this.$refs.child.tableRows.length
      this.$refs.child.tableConfig.totalPage=Math.ceil(this.$refs.child.tableConfig.totalRows / this.$refs.child.tableConfig.perPage)
      
      
    },

    badingData(){
            let self=this
            this.$http.post(this.$parent.$parent.getItemLink,{"search":self.search,"disable":0})
                        .then(function(response){
                            let res=response.data
                            self.$refs.child.tableRows = res.data
                            self.$refs.child.tableColumns=self.columns
                            self.isLoading=false
                            self.$refs.child.tableConfig.totalRows=res.records;
                            self.$refs.child.tableConfig.totalPage=Math.ceil(res.records / self.$refs.child.tableConfig.perPage)

                        })
                        .catch(function(error){
                            console.log(error)
                            self.isLoading=false
                        })
        
      },

     textSearch(){
         this.badingData()
     },
     setModalDialogName(strName){
       this.$refs.child.myModalDialog=strName
     },

      onRowClicked(item){
        for(let i in this.selected){
          if(this.selected[i].item_id==item.item_id){
            this.selected.splice(i, 1)
            break
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
                const selectedIds = this.selected.map(selectedItem => selectedItem.item_id)
                if (!selectedIds.includes(item.item_id) ) {
                  this.selected.push(item)
                }
          })
        }
        this.sysSelecteds=items


      },
      isSelected(citem){
        let re=false;
        const selectedIds = this.selected.map(selectedItem => selectedItem.item_id)
        if(selectedIds.includes(citem.item_id))
        {
          re=true
        }
        return re

      },
      selectAll(){
        this.$refs.child.selectAll()

      },
      unSelectAll(){
        this.clearSelectCurrentPage()
        this.$refs.child.unSelectAll()
        
        
        
      },
      //清除所有當前頁面的選擇項
      clearSelectCurrentPage(){
        this.$refs.child.tableRows.forEach(item => {
            for(let i in this.selected){
               if (this.selected[i].item_id==item.item_id ) {
                    this.selected.splice(i, 1);
                    break;
                    
                }
            }
        })

      },
      rowClass(){
      }
           

  },
  components:{

  },
  mounted(){
    this.$refs.child.modal_titel="入倉資產選擇"
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