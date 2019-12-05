<template>
<div>

    <loading :active.sync="isLoading"
             :can-cancel="true"
             :is-full-page="fullPage"
             loader="Dots"
    
    >
    </loading>
    <TransTable ref="ttTable"/>
    <TransDialog ref="ttDialog"/>
    <TransDelete ref="ttDelete"/>

    
</div>
</template>

<script>
import TransTable from "../../components/TransferTransaction/Transfer_Table";
import TransDialog from "../../components/TransferTransaction/Transfer_Dialog";
import TransDelete from "../../components/TransferTransaction/Transfer_Delete";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
    name:"sh_index",
    data(){
        return{
            isLoading: false,
            fullPage: true,
            containerName:null,
            addLink:"http://192.168.12.26:9090/asset-sys/cre-trans/",
            updateLink:"http://192.168.12.26:9090/asset-sys/upd-trans/",
            voidLink:"http://192.168.12.26:9090/asset-sys/void-trans/",
            searchLink:"http://192.168.12.26:9090/asset-sys/sel-trans-for-table/",
            getWareHouseLink:"http://192.168.12.26:9090/asset-sys/sel-wh/",          
            getItemLink:"http://192.168.12.26:9090/asset-sys/sel-item/"


        }
    },
    components:{
        TransTable,
        TransDialog,
        TransDelete,
        Loading

    }
}
</script>