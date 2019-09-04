<template>
   <div>
       <vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
           <template slot="op" slot-scope="props">
                 
                     <!--v-b-modal.ModalDialog props.row.id-->
                     <b-button data-toggle="modal" data-target="#exampleModalEdit" type="button"  variant="primary" @click="showEditDialog([props.row.id,props.row.name.first_name,props.row.address.country])">
                         <i class="fas fa-edit" ></i>
                     </b-button>
                     &nbsp; | &nbsp;
                      <b-button data-toggle="modal" data-target="#exampleModalEdit" type="button" variant="danger"  >
                         <i class="fas fa-trash-alt"></i>
                     </b-button>                    
                 
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
            rows:[
                    {
                        "id": 1,
                        "name": {
                            "first_name": "Vladimir",
                            "last_name": "Nitzsche"
                        },
                        "address": {
                            "country": "Mayotte"
                        },
                        "email": "franecki.anastasia@gmail.com",
                    },
                    {
                        "id": 2,
                        "name": {
                            "first_name": "Irwin",
                            "last_name": "Bayer"
                        },
                        "age": 23,
                        "address": {
                            "country": "Guernsey"
                        },
                        "email": "rlittle@macejkovic.biz",
                    },
                    {
                        "id": 3,
                        "name": {
                            "first_name": "Don",
                            "last_name": "Herman"
                        },
                        "address": {
                            "country": "Papua New Guinea"
                        },
                        "email": "delia.becker@cormier.com",
                    }
                 ],
        columns: [{
                        label: "id",
                        name: "id",
                        sort: true,
                    },
                    {
                        label: "First Name",
                        name: "name.first_name",
                        sort: true,
                    },
                    {
                        label: "Email",
                        name: "email",
                        sort: true,
                    },
                    {
                        label: "Country",
                        name: "address.country",
                    },   

                    {
                        label:"OP",
                        name:"op"
                    }
                 ],
                 config:{
                     card_title: "Store Lset"
                 }                

        }
    },
    methods:{
       showEditDialog(ui){
           //this.$root.$emit('bv::show::modal', 'ModalDialog',ui)
           console.log(ui);
           this.$parent.$refs.shDialog.userid=ui[0];
           this.$parent.$refs.shDialog.email=ui[1];
           this.$parent.$refs.shDialog.country=ui[2];
           this.$bvModal.show('ModalDialog');

       }
    },
    components:{
        VueBootstrap4Table
    }
}
</script>
<style  lang="scss">

</style>
