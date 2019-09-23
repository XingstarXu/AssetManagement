<template>
   <div>
<b-container fluid class="text-light text-center">
  <b-row >
        <b-col  class="p-3 bg-info">{{this.config.title}}</b-col>
  </b-row>

  <b-row >
        <b-col md="4"  class="p-3">
           <b-input-group prepend="搜索" class="mt-3">
                <b-form-input v-model="config.search" @input="setValue($event)"></b-form-input>
                <b-input-group-append>
                   <b-button variant="outline-success" @click="textSearch" >Search</b-button>
                </b-input-group-append>

           </b-input-group>

             <b-input-group prepend="篩選" class="mt-3">
                <b-input-group-append is-text>
                 <b-form-select v-model="config.isDisable" :options="disableOptions" @change="textSearch"></b-form-select>
                </b-input-group-append>
             </b-input-group> 
        </b-col>

  </b-row>

  <b-row class="align-content">
    <b-col>
      <b-table :items="rows" :fields="columns"  
      :sort-by.sync="config.sortBy"
      :sort-desc.sync="config.sortDesc"
      sortClass="sort-icon-left"
      :tbody-tr-class="rowClass"
      no-border-collapse="true"
      >
      <template v-slot:table-caption>
         <b-pagination
          v-model="config.currentPage"
          :total-rows="config.totalRows"
          :per-page="config.perPage"
          @change="pageChange"
          align="left"
          size="sm"
          class="my-0"
          first-text="First"
          prev-text="Prev"
          next-text="Next"
          last-text="Last"
        >
        </b-pagination>
            <div>
              總頁數  <b>{{config.totalPage}}</b>頁， 
              每頁顯示 <b>{{config.perPage}}</b>條記錄，
              總記錄數  <b>{{config.totalRows}}</b>條
              
             
            </div>
      </template>

      <template slot="warehouse_id" slot-scope="{ value, item }">
         <!-- value is the field value -->
         <!-- {{ value }} -->
         <!-- item is the entire row object -->
         <!--you can use it for actions on buttons, etc -->
         <b-button @click="showEditDialog(item)" variant="info"><i class="fas fa-edit" ></i></b-button>
      </template>




     </b-table>      
    </b-col>

  </b-row>
</b-container>



   </div>
</template>
<script>

export default {
    name:'StoreHouse',
    data(){
        return{
            rows:[],
         columns: [
                    {
                        label: "倉庫編號",
                        key: "code",
                        sortable: true,
                    },
                    {
                        label: "倉庫名稱(中文)",
                        key: "desc1",
                        sortable: true,
                    },
                    {
                        label: "倉庫名稱(英文)",
                        key: "desc2",
                        sortable: true,
                    }, 
                    {
                        label:"是否停用",
                        key:"disable",
                    },
                    {
                        label: "操作",
                        key: "warehouse_id",

                    }, 
                 ],
                 config:{
                     sortBy:"code",
                     sortDesc:false,
                     totalRows:0,
                     currentPage: 1,
                     perPage: 5,
                     pageOptions: [5, 10, 15],
                     title:"倉庫管理",
                     search:"",
                     isDisable:0,
                     totalPage:0


                 },
                 disableOptions:[{value:1 ,text:"停用"},{value:0 ,text:"啟用"},{value:-1 ,text:"全部"}]
                 
                             

        }
    },
    methods:{
       showEditDialog(editRow){
           console.log(editRow);
           this.$parent.$refs.shDialog.editData=editRow;
           this.$parent.$refs.shDialog.operation="update";
           this.$bvModal.show('ModalDialog');

           

       },
       showNewDialog(){
           this.$parent.$refs.shDialog.operation="add"
           this.$bvModal.show('ModalDialog');



       },
       showDelete(deleteRow){
           this.$parent.$refs.shDelete.deleteData=deleteRow;    
           this.$bvModal.show('ModalDelete');



       },
       badingData(){
            let self=this; 
            self.isLoading=true;  
            let cp=self.config.currentPage;
            let pp=self.config.perPage;
            this.$http.post(this.$parent.searchLink,{"page":cp,"num_of_page":pp,"search":self.config.search,"disable":self.config.isDisable})
                        .then(function(response){
                            let res=response.data;
                            self.rows = res.data
                            self.isLoading=false;
                            self.config.totalPage=res.total_page;  
                            self.config.totalRows=res.records;
                        })
                        .catch(function(error){
                            console.log(error);
                            self.isLoading=false;
                        })
       },
       rowClass(item) {
           
        if (!item) return
        if (item.disable === 1){
            return 'table-danger'

        } 
      },

      pageChange (page) {
          this.config.currentPage = page;
          //this.filter.offset = ((this.currentPage - 1) * this.filter.limit)
          this.badingData(); // api call
     },

     textSearch(){
         this.badingData();
     },
     setValue(value){
         this.config.search=value.toUpperCase();

    }

    // 修改table tr行的背景色
    // tableRowStyle({ row, rowIndex }) {
    //   return 'background-color: pink'
    // },
      
    },
    components:{

    },
    mounted:function(){
         this.badingData();
    }
}
</script>
<style lang="scss">

#columnDispay{
  display: none
}
</style>
