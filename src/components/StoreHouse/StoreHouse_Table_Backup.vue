<template>
   <div>
                                    <!-- :row-style="tableRowStyle"  -->
       <vue-bootstrap4-table :rows="rows" 
                             :columns="columns" 
                             :config="config" 
                             :searching="false" 
                             :classes="classes"

                             >
           <template slot="vbt-action-buttons" >
               <b-button variant="success" align="right" @click="showNewDialog">
                   <i class="far fa-plus-square"></i>
                   新增倉庫
               </b-button>
           </template>

           <template slot="op" slot-scope="props">
                    
                     <!--v-b-modal.ModalDialog props.row.warehouse_id-->
                     <b-button data-toggle="modal" data-target="#exampleModalEdit" type="button"  variant="primary" @click="showEditDialog(props.row)" >
                         <i class="fas fa-edit" ></i>
                     </b-button>
                     <!-- &nbsp; | &nbsp;
                      <b-button data-toggle="modal" data-target="#exampleModalEdit" type="button" variant="danger"  @click="showDelete(props.row)">
                         <i class="fas fa-trash-alt"></i>
                     </b-button>                     -->
                 
           </template>

          <template slot="sort-asc-icon">
            <i class="fas fa-angle-up"></i>
          </template>
          <template slot="sort-desc-icon">
            <i class="fas fa-angle-down"></i>
          </template> 
          <template slot="no-sort-icon">
             <i class="fas fa-sort"></i>
          </template>


       </vue-bootstrap4-table>
   </div>
</template>
<script>
import VueBootstrap4Table from 'vue-bootstrap4-table'
export default {
    name:'StoreHouse',
    data(){
        return{
            rows:[],
         columns: [{
                        label: "倉庫ID",
                        name: "warehouse_id",
                        sort: true,
                        visibility:false
                    },
                    {
                        label: "倉庫編號",
                        name: "code",
                        sort: true,
                    },
                    {
                        label: "倉庫名稱(中文)",
                        name: "desc1",
                        sort: true,
                    },
                    {
                        label: "倉庫名稱(英文)",
                        name: "desc2",
                        sort: true,
                    }, 
                    {
                        label:"是否停用",
                        name:"disable",
                        visibility:false

                    },

                    {
                        label:"操作",
                        name:"op"
                    }
                 ],
                 config:{
                     card_title: "倉庫管理",
                     pagination: true,
                     pagination_info: true,
                     num_of_visibile_pagination_buttons: 7,
                     per_page: 5,
                     highlight_row_hover: true,
                     multi_column_sort: true,
                     highlight_row_hover_color:"grey",                   
                     show_reset_button: false,
                     show_refresh_button: false,
                     preservePageOnDataChange: true,
                     //server_mode: true,
                     queryParams: {
                              sort: [],
                              filters: "code,desc1,desc2",
                              global_search: "",
                              per_page: 5,
                              page: 1,
                            },

                 },
                 classes: {
                    tableWrapper: "outer-table-div-class wrapper-class-two",
                    // table : {
                    //     "table-striped my-class" : true,
                    //     "table-bordered my-class-two" : function(rows) {
                    //         return true
                    //     }
                    //},
                    row : {
                        "my-row my-row2" : true,
                        "function-class" : function(row) {
                            return row.disable== 1
                        }
                    }
                 },                  
                             

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
            //this.$parent.searchLink
            this.$http.post(this.$parent.searchLink,{"st_page":1,"ed_page":5,"num_of_page":2})
                        .then(function(response){
                            let res=response.data;
                            self.rows = res.data
                            self.isLoading=false;  
                        })
                        .catch(function(error){
                            console.log(error);
                            self.isLoading=false;
                        })
       },

    // 修改table tr行的背景色
    // tableRowStyle({ row, rowIndex }) {
    //   return 'background-color: pink'
    // },
      
    },
    components:{
        VueBootstrap4Table
    },
    mounted:function(){
         this.badingData();
    }
}
</script>
<style  lang="scss">

</style>
