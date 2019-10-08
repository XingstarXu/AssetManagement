<template>
   <div>
        <publicTable ref="child" >
            <template v-slot:searchAdd>
                    <b-input-group prepend="篩選" class="mt-3">
                        <b-input-group-append is-text>
                        <b-form-select v-model="isISO" :options="isoOptions" @change="textSearch"></b-form-select>
                        </b-input-group-append>
                    </b-input-group> 
            </template>
            <template v-slot:buttenAdd>
              <b-button variant="success" align="right" @click="showNewDialog">
                   <i class="far fa-plus-square"></i>
                   新增資產
               </b-button>
            </template>

            <template v-slot:diyColumn="myItem">
                  <b-button @click="showEditDialog(myItem.item)" variant="info"><i class="fas fa-edit" ></i></b-button>
            </template>

            <template v-slot:photoColumn="myphoto">
                  <img src="/assetsPhoto/1000006.jpg">
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
            rows:[],
            columns: [{
                            label: "資產編號",
                            key: "code",
                            sortable: true,
                        },
                        {
                            label: "資產名稱(英)",
                            key: "desc1",
                            sortable: true,
                        },
                        {
                            label: "資產名稱(中)",
                            key: "desc2",
                            sortable: true,
                        },
                        {
                            label: "資產類型",
                            key: "type_id",
                            sortable: true,
                        }, 
                        {
                            label:"單位",
                            key:"unit_id",
                            
                        },
                        {
                            label:"型號",
                            key:"model_no",
                            
                        },
                        {
                            label:"ISO",
                            key:"iso"
                           
                        },
                        {
                            label:"供應商",
                            key:"vendor_code"
                           
                        },
                        {
                            label:"數量",
                            key:"qty"
                           
                        },                                              
                        {
                            label:"操作",
                            key:"item_id"
                        }
                        ,                                              
                        {
                            label:"圖片",
                            key:"img"
                        }
                    ],
            isISO:-1, 
            isoOptions:[{value:1 ,text:"ISO"},{value:0 ,text:"非ISO"},{value:-1 ,text:"全部"}]

        }
    },
    methods:{
       showEditDialog(editRow){
           this.$parent.$refs.itDialog.setData(editRow);
           this.$parent.$refs.itDialog.operation="update";
           this.$bvModal.show('ModalDialog');
       },
       showNewDialog(){
           this.$parent.$refs.itDialog.operation="add"
           this.$bvModal.show('ModalDialog');
       },
       showDelete(deleteRow){
           this.$parent.$refs.itDelete.deleteData=deleteRow;    
           this.$bvModal.show('ModalDelete');
       },
       badingData(){
            let self=this; 
            self.isLoading=true;  
            let myCurrentPage=self.$refs.child.config.currentPage;
            let myPerPage=self.$refs.child.config.perPage;
            let mySearch=self.$refs.child.config.search;
            let myISO=self.isISO;

            this.$http.post(this.$parent.searchLink,{"page":myCurrentPage,"num_of_page":myPerPage,"search":mySearch,"iso":myISO})
                        .then(function(response){
                            let res=response.data;
                            self.$refs.child.rows = res.data
                            //self.isLoading=false;
                            self.$refs.child.config.totalPage=res.total_page;  
                            self.$refs.child.config.totalRows=res.records;
                            console.log(res.data);

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
        this.$refs.child.opColumn="item_id"//設置操作列
        this.$refs.child.opColumn2="img"//設置操作列
        this.$refs.child.config.title="資產管理"
        this.badingData();

        
    }

}
</script>
<style  lang="scss">

</style>
