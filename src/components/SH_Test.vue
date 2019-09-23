<template>
  <div>
                 <b-input-group prepend="倉庫編號" class="mt-3" >
                    <b-form-input v-model="$v.name.$model" ></b-form-input>               
                 </b-input-group>
                  <pre>{{ $v }}</pre>
  </div>
</template>

<script>

import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
    name:"test",
    data(){
        return{
            name:""
        }
    },
    validations: {
       name: {
          required,
          minLength: minLength(4)

      

       }
    },
}
</script>
