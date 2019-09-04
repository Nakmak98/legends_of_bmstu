<template>
    <div>
        <input type="text" placeholder="Логин" v-model="login">
        <input type="password" placeholder="Пароль" v-model="password">
        <button @click="signIn">Войти</button>
    </div>
</template>

<script>

    // import Axios from 'axios';
export default {
  name: 'SignIn',
  data: function() {
    return {
      login: '',
      password:''
    }
  },
  methods: {
      signIn: function () {
        // Axios('/auth/sign_in')
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
