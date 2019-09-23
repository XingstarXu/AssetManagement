<template>
<div>

    <loading :active.sync="isLoading"
             :can-cancel="true"
             :is-full-page="fullPage"
             loader="Dots"
    
    >
    </loading>
    <ItemTable ref="itTable"/>
    <ItemDialog ref="itDialog"/>
    <ItemDelete ref="itDelete"/>
    
</div>
</template>

<script>
import ItemTable from "../../components/Item/Item_Table";
import ItemDialog from "../../components/Item/Item_Dialog";
import ItemDelete from "../../components/Item/Item_Delete";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
    name:"sh_index",
    data(){
        return{
            isLoading: false,
            fullPage: true,
            containerName:null

        }
    },
    components:{
        ItemTable,
        ItemDialog,
        ItemDelete,
        Loading

    }
}
</script>