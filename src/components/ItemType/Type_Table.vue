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
                   新增類型
               </b-button>
            </template>

            <template v-slot:diyColumn="myItem">
                  <b-button @click="showEditDialog(myItem.data.item)" variant="info"><i class="fas fa-edit" ></i></b-button>
            </template>
           
        </publicTable>
   </div>
</template>
<script>
import publicTable from '../PublicTable/PublicTable'
export default {
    name:'item',
    data(){
        return{
            rows:[
                  ],
            columns: [ {
                            label: "類型名稱(英)",
                            key: "desc1",
                            sortable: true,
                        },
                        {
                            label: "類型名稱(中)",
                            key: "desc2",
                            sortable: true,
                        },
                        {
                            label: "停用",
                            key: "disable",
                            
                        }, 
                        {
                            label:"操作",
                            key:"opColumn"
                        }
                    ],
            isDisable:-1,   
            disableOptions:[{value:1 ,text:"停用"},{value:0 ,text:"啟用"},{value:-1 ,text:"全部"}]          

        }
    },
    methods:{
       showEditDialog(editRow){
           console.log(editRow);
           this.$parent.$refs.tyDialog.editData=editRow;
           this.$parent.$refs.tyDialog.operation="update";
           this.$bvModal.show('ModalDialog');
       },
       showNewDialog(){
           this.$parent.$refs.tyDialog.operation="add"
           this.$bvModal.show('ModalDialog');
       },

       badingData(){
            let self=this; 
            self.isLoading=true;  
            let myCurrentPage=self.$refs.child.config.currentPage;
            let myPerPage=self.$refs.child.config.perPage;
            let mySearch=self.$refs.child.config.search;
            let myDisable=self.isDisable;

            this.$http.post(this.$parent.searchLink,{"page":myCurrentPage,"num_of_page":myPerPage,"search":mySearch,"disable":myDisable,"order_by":"","order_desc":false})
                        .then(function(response){
                            let res=response.data;
                            self.$refs.child.rows = res.data
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
     }
    },
    components:{
        publicTable
    },
    mounted:function(){
        this.$refs.child.columns=this.columns;
        this.$refs.child.config.title="資產類型管理"
        this.badingData();

        
    }

}
</script>
<style  lang="scss">

</style>
