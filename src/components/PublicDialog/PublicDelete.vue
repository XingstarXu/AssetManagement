<template>
<div>
  
  <b-modal id="ModalDelete" content-class="shadow" :title="modal_titel" @show="beforeOpen" @hide="cardCloseDo" 
                            @close="closeDialog" 
                            :cancel-disabled="cancelDisabled"
                            :cancel-title="cancelText"
                            :hide-header-close="isHideCloseButten"
                            footer-bg-variant="light"
                            header-bg-variant="danger"
                            header-text-variant="light"
                            >
    
      <slot name="body"></slot>

     <div slot="modal-footer" class="w-100"  >
        <b-button
          variant="primary"
          size="sm"
          class="float-left"
          :disabled="cancelDisabled"
          @click="closeDialog"
          >
            關閉
        </b-button>
        <slot name="okbutten" :confirmData="confirmData">
          
        </slot>
      </div>

  </b-modal>
</div>
</template>
<script>

export default {
  name:"publicDelete",
  data(){
    return{
      modal_titel:"",
      isAoutoClose:false,//手動關閉標志。
      isHideCloseButten:true,
      cancelDisabled:false,
      cancelText:"Cancel"

    }
  },
  methods:{
    //打開對話框前
    beforeOpen () {    
       this.isAoutoClose=false;//設置為手動關閉標識（false:手動關閉）
       this.cancelDisabled=false;//禁用Cancel制標識
       this.isHideCloseButten=false;//顯示關閉制標識

    },
     //關閉對話框前時的處理
     cardCloseDo(bvModalEvt){

         if(!this.isAoutoClose)//如果不是手動關閉即不會關閉對話框（即防止點擊背景時自動關閉）
         {
             bvModalEvt.preventDefault();
             return;
         }

    },
    //手動關閉對話框
     closeDialog(){

         this.isAoutoClose=true//標志為手動關閉。
         this.$root.$emit('bv::hide::modal', 'ModalDelete')
     },

     closeConfirm(){

                   this.cancelDisabled=false;
                   this.isHideCloseButten=false;
     },

     confirmData(){
         this.isHideCloseButten=true
         this.cancelDisabled=true

     }
  }
  
}
</script>