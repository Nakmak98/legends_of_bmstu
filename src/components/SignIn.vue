<template>
    <div>
      <label for="login">Логин</label>
      <input v-model="login" type="text" name="login" requiered>
      <label for="password">Пароль</label>
      <input v-model="password" type="password" name="password" requiered>
    </div>
</template>

<script>
export default {
  name: 'SignIn',
  data: function() {
    return {
      login: '',
      password:''
    }
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
