<template>
    <div class="basic-block auth centred">
    	<img src="../assets/orn_top.png" id="ornament-top">
    	<h1>Легенды Бауманки 2019</h1>
        <base-button @click="$router.push('/sign_in')" title="Войти"></base-button>
        <base-button @click="$router.push('/sign_up')" title="Зарегистрироваться"></base-button>
        <router-view></router-view>
        <img src="../assets/orn_bot.png" id="ornament-bottom">
    </div>
</template>

<script>
    export default {
        name: "Auth",
    }
</script>

<style scoped>
.centred {
position: absolute;
  top: 50%;
  left: 50%;

  margin: -150px 0 0 -150px;
}
</style>