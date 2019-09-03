<template>
    <div>
        <BaseInput type="text" placeholder="Логин"></BaseInput>
        <BaseInput type="password" placeholder="Пароль"></BaseInput>
    </div>
</template>

<script>
    import BaseInput from "../components/BaseInput";
export default {
  name: 'SignIn',
    components: {
      BaseInput
    },
  data: function() {
    return {
      login: 'asd',
      password:''
    }
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
