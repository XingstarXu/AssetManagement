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
            containerName:null,
            addLink:"http://192.168.12.26:9090/asset-sys/cre-item/",
            updateLink:"http://192.168.12.26:9090/asset-sys/upd-item/",
            searchLink:"http://192.168.12.26:9090/asset-sys/sel-item/",
            checkCodeUnique:"http://192.168.12.26:9090/asset-sys/check-item-code/",
            getTypeLink:"http://192.168.12.26:9090/asset-sys/sel-all-item-type/",
            getUnitLink:"http://192.168.12.26:9090/asset-sys/sel-all-item-unit/",
            getVendonLink:"http://192.168.12.26:9090/asset-sys/sel-all-vdr/",

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