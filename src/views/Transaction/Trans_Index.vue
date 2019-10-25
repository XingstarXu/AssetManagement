<template>
<div>

    <loading :active.sync="isLoading"
             :can-cancel="true"
             :is-full-page="fullPage"
             loader="Dots"
    
    >
    </loading>
    <TransTable ref="trTable"/>
    <TransDialog ref="trDialog"/>

    
</div>
</template>

<script>
import TransTable from "../../components/Transaction/Trans_Table";
import TransDialog from "../../components/Transaction/Trans_Dialog";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
    name:"sh_index",
    data(){
        return{
            isLoading: false,
            fullPage: true,
            containerName:null,
            addLink:"http://192.168.12.26:9090/asset-sys/",
            updateLink:"http://192.168.12.26:9090/asset-sys/",
            searchLink:"http://192.168.12.26:9090/asset-sys/",
            getWareHouseLink:"http://192.168.12.26:9090/asset-sys/sel-wh/"


        }
    },
    components:{
        TransTable,
        TransDialog,
        Loading

    }
}
</script>