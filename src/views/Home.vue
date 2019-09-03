 <template>
  <div class="home">
    <img alt="Vue logo" v-on:click="$emit('hi')" src="../assets/logo.png">
      {{ info }}
  </div>
</template>

<script>
// @ is an alias to /src
import SignIn from '@/views/SignIn.vue'
import {api} from "../api";
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
  beforeCreate() {
    Axios
            .get('http://5.23.54.233:8080/auth/info', {
              // mode: 'cors',
              // crossdomain: true
              // headers: {'Access-Control-Allow-Origin': '*'}
            })
            .then(response => {
              this.$store.commit('setUserData', response.data)
            })
            .catch(error => {
              if (error.response) {
                this.$router.push("/auth")
              }

    })
  },
}

// function checkUser(){

// }
</script>
