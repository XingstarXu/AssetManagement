<template>
   <div>
        <b-container fluid class="bv-example-row">
        <b-row >
                <b-col md="12"  class="p-3 bg-info text-center" >{{this.config.title}}</b-col>
        </b-row>

        <b-row class="mb-3">
            <b-col md="4" style="text-align: left">
                <b-container fluid >
                    <b-row>
                        <b-col >
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
                </b-container>
             </b-col>

        </b-row>
        <b-row class="mb-3">
                <b-col md="12" style="text-align: right">
                    <b-container fluid >
                        <b-row>
                            <b-col>
                                <slot name="buttenAdd">
                                </slot>
                            </b-col>
                        </b-row>
                    </b-container>  
                </b-col>
              

        </b-row>

        <b-row class="align-content">
            <b-col md="12">
                <b-table :items="rows" :fields="columns"  
                :sort-by.sync="config.sortBy"
                :sort-desc.sync="config.sortDesc"
                sortClass="sort-icon-left"
                :tbody-tr-class="rowClass"
                no-border-collapse:true
                selectable
                select-mode="single"
                ref="publicTable"
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
                <template v-slot:cell(opColumn)="data" >
                        <slot name="diyColumn" v-bind="{data}">

                        </slot>
                        
                </template>


                <template v-slot:cell(photoColumn)="data">
                        <slot name="photoColumn" v-bind="{data}">

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
        }
    },
    methods:{
            rowClass(item) {
                return this.$parent.rowClass(item);//調用父級的綁定數據方法，以應用不同的處理。
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

            },
            selectRow(index){
                this.$refs.publicTable.selectRow(index);

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
