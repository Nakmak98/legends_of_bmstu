<template>
  <div class="about">
    <ul v-for="item in requestUserData">
      <p>{{item}}</p>
    </ul>
    <button @click="delete_account">Удалить аккаунт</button>
    <button @click="logout">Выйти</button>
  </div>
</template>
<script>
  import Axios from 'axios'

  export default {
    name: "account",
    data: function () {
      return {
        user: {}
      }
    },
    beforeCreate(){
      if(!this.$store.getters.checkUserData) {
        Axios
                .get('/user/info')
                .then(response => {
                  console.log(response.data)
                  this.$store.commit('setUserData', response.data)
                })
                .catch(error => {
                  if (error.response.status === 401) {
                    this.$router.push("/auth")
                  } else {
                    this.$router.push("/error")
                  }
                })
      } else {
        this.user = this.$store.getters.getUserData
      }
    },
    computed: {
      requestUserData: function () {
        return this.$store.getters.getUserData
      }
    },
    methods: {
      logout: function () {
        Axios
                .get('/user/logout')
                .then(response => {
                  console.log(response.status)
                    this.$store.commit('deleteUserData')
                    this.$router.push('/auth')
                })
      },
      delete_account: function () {
        Axios
                .delete('/user/delete')
                .then(response => {
                  console.log(response.status)
                  this.$store.commit('deleteUserData')
                  this.$router.push('/auth')
                })
                .catch(error => {
                  console.log(error.response.status)
                  if(error.response.status === 401){
                    error.message
                  }
                })
      }
      }
  }

</script>