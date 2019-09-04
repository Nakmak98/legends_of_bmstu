<template>
  <div class="about">
  </div>
</template>
<script>
  import Axios from 'axios'
  // import {api} from 'api'

  export default {
    name: "account",
    data: function () {
      return {
        type: 'text',
        name: '',
        value: '',
        placeholder: '',
        required: true
      }
    },
    beforeCreate() {
      if (!this.$store.getters.checkUserData) {
        Axios
                .get('/auth/info')
                .then(response => {
                  this.$store.commit('setUserData', response.data)
                })
                .catch(error => {
                  if (error.response) {
                    this.$router.push("/auth")
                  }
                })
      }
    }
  }

</script>