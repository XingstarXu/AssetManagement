<template>
<div>

    <loading :active.sync="isLoading"
             :can-cancel="true"
             :is-full-page="fullPage"
             loader="Dots"
    
    >
    </loading>
    <StoreHouseTable/>
    <StoreHouseDialog ref="shDialog"/>
    
</div>
</template>

<script>
import StoreHouseTable from "../../components/StoreHouse/StoreHouse_Table";
import StoreHouseDialog from "../../components/StoreHouse/StoreHouse_Dialog";
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
        StoreHouseTable,
        StoreHouseDialog,
        Loading

    }
}
</script>