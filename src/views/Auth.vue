<template>
    <div class="basic-block auth centred">
        <img src="../assets/orn_top.png" id="ornament-top">
        <h1>Легенды Бауманки 2019</h1>
        <base-button @click="$router.push('/sign_in')" title="Войти"></base-button>
        <base-button @click="$router.push('/sign_up')" title="Зарегистрироваться"></base-button>
        <img src="../assets/orn_bot.png" id="ornament-bottom">
    </div>
</template>

<script>
    export default {
        name: "Auth",
        beforeDestroy() {
            if(this.$store.state.error.message !== null)
                this.$store.commit('deleteErrorMessage')
        },
    }

</script>

<style scoped>
.centred {
  margin-top: 100px;
}
</style>