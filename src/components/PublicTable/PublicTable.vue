<template>
   <div>
        <b-container fluid class="text-light text-center">
        <b-row >
                <b-col  class="p-3 bg-info">{{this.config.title}}</b-col>
        </b-row>

        <b-row >
                <b-col md="4"  class="p-3">
                <b-input-group prepend="搜索" class="mt-3">
                        <b-form-input v-model="config.search" @input="setValue($event)"></b-form-input>
                        <b-input-group-append>
                        <b-button variant="outline-success" @click="textSearch" >Search</b-button>
                        </b-input-group-append>

                </b-input-group>
                    <slot name="searchAdd">

                    </slot>
                </b-col>

        </b-row>
        <b-row >
                <b-col md="4"  class="p-3">
                    <slot name="buttenAdd">

                    </slot>
                </b-col>

        </b-row>

        <b-row class="align-content">
            <b-col>
            <b-table :items="rows" :fields="columns"  
            :sort-by.sync="config.sortBy"
            :sort-desc.sync="config.sortDesc"
            sortClass="sort-icon-left"
            :tbody-tr-class="rowClass"
            no-border-collapse="true"
            >
            <template v-slot:table-caption>
                <b-pagination
                v-model="config.currentPage"
                :total-rows="config.totalRows"
                :per-page="config.perPage"
                @change="pageChange"
                align="left"
                size="sm"
                class="my-0"
                first-text="First"
                prev-text="Prev"
                next-text="Next"
                last-text="Last"
                >
                </b-pagination>
                    <div>
                    總頁數  <b>{{config.totalPage}}</b>頁， 
                    每頁顯示 <b>{{config.perPage}}</b>條記錄，
                    總記錄數  <b>{{config.totalRows}}</b>條
                    </div>
            </template>
            <template :slot="opColumn" slot-scope="{value,item}">
                    <slot name="diyColumn" v-bind="{value,item}">

                     </slot>
                     
            </template>


            <template :slot="opColumn2" slot-scope="{value,item}">
                    <slot name="photoColumn" v-bind="{value,item}">

                     </slot>
            </template>

            </b-table>      
            </b-col>

        </b-row>
        </b-container>
   </div>
</template>
<script>

export default {
    name:'StoreHouse',
    data(){
        return{
            rows:[],
            columns: [],
            config:{
                sortBy:"",
                sortDesc:false,
                totalRows:0,
                currentPage:1,
                perPage: 5,
                pageOptions: [5, 10, 15],
                title:"",
                search:"",
                isDisable:0,
                totalPage:0
            },
            opColumn:"",
            opColumn2:""
        }
    },
    methods:{
            rowClass(item) {
                if (!item) return
                if (item.disable === 1){
                    return 'table-danger'
                } 
            },

            pageChange (page) {
                this.config.currentPage = page;
                this.$parent.badingData(); //調用父級的綁定數據方法，以應用不同的處理。
            },

            textSearch(){
                this.$parent.textSearch();//調用父級的數據查詢方法，以應用不同的處理。
            },
            setValue(value){
                //this.config.search=value.toUpperCase();
                this.config.search=value;

            }

    },
    components:{

    },

}
</script>
<style lang="scss">

#columnDispay{
  display: none
}
</style>
