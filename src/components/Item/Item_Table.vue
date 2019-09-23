<template>
   <div>
       <vue-bootstrap4-table :rows="rows" :columns="columns" :config="config" :searching="false">
           <template slot="vbt-action-buttons" >
               <b-button variant="success" align="right" @click="showNewDialog">
                   <i class="far fa-plus-square"></i>
                   新增資產
               </b-button>
           </template>

           <template slot="op" slot-scope="props">
                    
                     <!--v-b-modal.ModalDialog props.row.id-->
                     <b-button data-toggle="modal" data-target="#exampleModalEdit" type="button"  variant="primary" @click="showEditDialog(props.row)">
                         <i class="fas fa-edit" ></i>
                     </b-button>
                     &nbsp; | &nbsp;
                      <b-button data-toggle="modal" data-target="#exampleModalEdit" type="button" variant="danger"  @click="showDelete(props.row.id)">
                         <i class="fas fa-trash-alt"></i>
                     </b-button>                    
                 
           </template>
       </vue-bootstrap4-table>
   </div>
</template>
<script>
import VueBootstrap4Table from 'vue-bootstrap4-table'
export default {
    name:'item',
    data(){
        return{
            rows:[
                    {
                        "id": 1,
                        "itName": "資產1",
                        "itType": "0",
                    },
                    {
                        "id": 2,
                        "itName": "資產2",
                        "itType": "1",
                    },
                    {
                        "id": 3,
                        "itName": "資產3",
                        "itType": "2",
                    }
                 ],
        columns: [{
                        label: "資產編號",
                        name: "id",
                        sort: true,
                    },
                    {
                        label: "資產名稱",
                        name: "itName",
                        sort: true,
                    },
                    {
                        label: "資產類型",
                        name: "itType",
                        sort: true,
                    }, 

                    {
                        label:"操作",
                        name:"op"
                    }
                 ],
                 config:{
                     card_title: "資產管理"
                 }              

        }
    },
    methods:{
       showEditDialog(editRow){
           //this.$root.$emit('bv::show::modal', 'ModalDialog',ui)
           console.log(editRow);
           this.$parent.$refs.itDialog.editData=editRow;
           this.$parent.$refs.itDialog.operation="update";
           this.$bvModal.show('ModalDialog');

           

       },
       showNewDialog(){
           //this.$root.$emit('bv::show::modal', 'ModalDialog',ui)
           //let newRow=[{id:"",shName:"",shLevel:""}]
           this.$parent.$refs.itDialog.operation="add"
           this.$bvModal.show('ModalDialog');



       },
       showDelete(myid){
           //this.$root.$emit('bv::show::modal', 'ModalDialog',ui)
           this.$parent.$refs.itDelete.id=myid;    
           this.$bvModal.show('ModalDelete');



       }
    },
    components:{
        VueBootstrap4Table
    }
}
</script>
<style  lang="scss">

</style>
