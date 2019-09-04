 <template>
  <div class="home">
    <img alt="Vue logo" v-on:click="$emit('hi')" src="../assets/logo.png">
      {{ info }}
  </div>
</template>

<script>
// @ is an alias to /src
import SignIn from '@/views/SignIn.vue'
import Axios from 'axios'

export default {
  name: 'home',
  components: {
    SignIn
  },
  data: function(){
    return{
      info: 'hi'
    }
  },

}

// function checkUser(){

// }
</script>
