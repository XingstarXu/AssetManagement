<template>
   <div>



        <publicTable ref="child" >
            <template v-slot:searchAdd>
                    <b-input-group prepend="篩選" class="mt-3">
                        <b-input-group-append is-text>
                        <b-form-select v-model="isDisable" :options="disableOptions" @change="textSearch"></b-form-select>
                        </b-input-group-append>
                    </b-input-group> 
            </template>
            <template v-slot:buttenAdd>
              <b-button variant="success" align="right" @click="showNewDialog">
                   <i class="far fa-plus-square"></i>
                   新增入倉單
               </b-button>
            </template>

            <template v-slot:diyColumn="myItem">
                  <b-button @click="showEditDialog(myItem.item)" variant="info"><i class="fas fa-edit" ></i></b-button>
            </template>

            

            
        </publicTable>




   </div>
</template>
<script>
import publicTable from '../PublicTable/PublicTable'
export default {
    name:'Vendor',
    data(){
        return{
            columns: [

                        {
                            label: "入倉單號",
                            key: "code",
                            sortable: true,
                        },                     
                        {
                            label: "供應商名稱(中)",
                            key: "desc2",
                            sortable: true,
                        },
                        {
                            label:"發票號",
                            kay:"invoice_no"
                        },
                        {
                            label:"交貨號",
                            kay:"delivery_no"

                        },
                        {
                            label:"備註",
                            key:"remark",
                        },
                        {
                            label: "操作",
                            key: "trans_id",

                        }, 
                    ],

                isDisable:-1,
                disableOptions:[{value:1 ,text:"停用"},{value:0 ,text:"啟用"},{value:-1 ,text:"全部"}]
        }
    },
    methods:{
       showEditDialog(editRow){
           console.log(editRow);
           this.$parent.$refs.trDialog.editData=editRow;
           this.$parent.$refs.trDialog.operation="update";
           this.$bvModal.show('ModalDialog');

           

       },
       showNewDialog(){
           this.$parent.$refs.trDialog.operation="add"
           this.$bvModal.show('ModalDialog');



       },
       showDelete(deleteRow){
           this.$parent.$refs.trDelete.deleteData=deleteRow;    
           this.$bvModal.show('ModalDelete');



       },
       badingData(){
            let self=this; 
            self.isLoading=true;  
            let myCurrentPage=self.$refs.child.config.currentPage;
            let myPerPage=self.$refs.child.config.perPage;
            let mySearch=self.$refs.child.config.search;
            let myDisable=self.isDisable;
            this.$http.post(this.$parent.searchLink,{"page":myCurrentPage,"num_of_page":myPerPage,"search":mySearch,"disable":myDisable})
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
         //this.badingData();
     }
     
    },
    components:{
        publicTable

    },
    mounted:function(){
        this.$refs.child.columns=this.columns;
        this.$refs.child.opColumn="trans_id"//設置操作列
        this.$refs.child.config.title="入倉管理"
        //this.badingData();

        
    },
    
}
</script>
<style lang="scss">

#columnDispay{
  display: none
}
</style>
