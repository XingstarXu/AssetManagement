<template>
<div>

    <loading :active.sync="isLoading"
             :can-cancel="true"
             :is-full-page="fullPage"
             loader="Dots"
    
    >
    </loading>
    <StoreHouseTable ref="shTable"/>
    <StoreHouseDialog ref="shDialog"/>
    <StoreHouseDelete ref="shDelete"/>
    
</div>
</template>

<script>
import StoreHouseTable from "../../components/StoreHouse/StoreHouse_Table";
import StoreHouseDialog from "../../components/StoreHouse/StoreHouse_Dialog";
import StoreHouseDelete from "../../components/StoreHouse/StoreHouse_Delete";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
    name:"sh_index",
    data(){
        return{
            isLoading: false,
            fullPage: true,
            containerName:null,
            addLink:"http://192.168.12.26:9090/asset-sys/cre-wh/",
            updateLink:"http://192.168.12.26:9090/asset-sys/upd-wh/",
            searchLink:"http://192.168.12.26:9090/asset-sys/sel-wh/",
            checkCodeUnique:"http://192.168.12.26:9090/asset-sys/check-wh-code/",
            textLink:"http://192.168.12.26:9090/asset-sys/tst-sel-wh/"

        }
    },
    components:{
        StoreHouseTable,
        StoreHouseDialog,
        StoreHouseDelete,
        Loading

    }
}
</script>