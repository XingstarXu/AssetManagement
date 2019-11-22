<template>
   <div>



        <publicTable ref="child" >
            <template v-slot:searchAdd>
                    <b-input-group prepend="篩選" class="mt-3">
                        <b-input-group-append is-text>
                        <b-form-select v-model="isVoid" :options="disableOptions" @change="textSearch"></b-form-select>
                        </b-input-group-append>
                    </b-input-group> 
                    <b-input-group prepend="入倉日期篩選" class="mt-3">
                       <b-form-input id="datepicker" type="date" v-model="searchDate" placeholder="輸入要查詢的入倉日期" @change="textSearch"></b-form-input>
                    </b-input-group> 
                  
            </template>
            <template v-slot:buttenAdd>
              <b-button variant="success" @click="showNewDialog">
                   <i class="far fa-plus-square"></i>
                   新增入倉單
               </b-button>
            </template>

            <template v-slot:diyColumn="myItem">
                  <b-button @click="showDetailsDialog(myItem.data)" variant="info"><i class="fas fa-info-circle"></i></b-button>
                  |
                  <b-button @click="showDelete(myItem.data)" :variant="changeVariant(myItem.data.item.header.void)" :disabled="myItem.data.item.header.void===1"><i class="fas fa-trash-alt"></i></b-button>
            </template>

        </publicTable>




   </div>
</template>
<script>
import publicTable from '../PublicTable/PublicTable';



export default {
    name:'Vendor',
    data(){
        return{
            columns: [

                        {
                            label: "入倉單號",
                            key: "header.code",
                            sortable: true,
                        },                     
                        {
                            label: "供應商名稱(中)",
                            key: "header.vendor_desc2",
                            sortable: true,
                        },
                        {
                            label:"日期",
                            key:"header.trans_date"
                        },
                         {
                            label:"備註",
                            key:"header.remark",
                        },
                        {
                            label: "操作",
                            key: "opColumn",

                        }, 
                    ],

                isVoid:-1,
                disableOptions:[{value:1 ,text:"無效單"},{value:0 ,text:"正常單"},{value:-1 ,text:"全部"}],
                searchDate:""
        }
    },
    methods:{
       showEditDialog(editRow){
           
           this.$parent.$refs.trDialog.setData(editRow.item.header,editRow.item.details);
        //    this.$parent.$refs.trDialog.editData=editRow;
           this.$parent.$refs.trDialog.operation="update";
           this.$bvModal.show('ModalDialog');

           

       },
       showNewDialog(){
           this.$parent.$refs.trDialog.operation="add"
           this.$bvModal.show('ModalDialog');



       },
       showDelete(deleteRow){
           this.$refs.child.selectRow(deleteRow.index);
           this.$parent.$refs.trDelete.setData(deleteRow);  
           this.$bvModal.show('ModalDelete');



       },
       showDetailsDialog(editRow){
           
           this.$parent.$refs.trDialog.setData(editRow.item.header,editRow.item.details);
           this.$parent.$refs.trDialog.operation="detalis";
           this.$bvModal.show('ModalDialog');

           

       },
       badingData(){
            let self=this; 
  
            let myCurrentPage=self.$refs.child.config.currentPage;
            let myPerPage=self.$refs.child.config.perPage;
            let mySearch=self.$refs.child.config.search;
            let mySearchDate=self.searchDate;
            let myisVoid=self.isVoid;
            self.isLoading=true;
            this.$http.post(this.$parent.searchLink,{"page":myCurrentPage,"num_of_page":myPerPage,"search":mySearch,"order_by":"","order_desc":false,"trans_date":mySearchDate,"void":myisVoid})
                        .then(function(response){                           
                            let res=response.data;
                            self.$refs.child.rows = res.data
                            self.$refs.child.columns=self.columns
                            self.isLoading=false;
                            self.$refs.child.config.totalPage=res.total_page;  
                            self.$refs.child.config.totalRows=res.records;
                        })
                        .catch(function(error){
                            console.log(error);
                            self.isLoading=false;
                        })
       },


      textSearch(){
         this.badingData();
      },
      //停用或取消記錄時的行樣式
      rowClass(item) {
        
        if (!item) return
        if (item.header.void===1){
            return 'table-danger'
        }

      },
     
      changeVariant(isVoid){
          let ren="";
          if(isVoid==1){
              ren="secondary";
          }else{
              ren="danger";
          }
          return ren;

      }

    },
    components:{
        publicTable

    },
    mounted:function(){
        this.$refs.child.columns=this.columns;
        //this.$refs.child.opColumn="trans_id"//設置操作列
        this.$refs.child.config.title="入倉管理"
        this.badingData();

        
    },
    
}
</script>
<style lang="scss">
#columnDispay{
  display: none
}

</style>
