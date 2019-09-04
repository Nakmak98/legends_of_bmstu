<template>
    <div class="auth">
        <button @click="$router.push('/sign_in')">Войти</button>
        <button @click="$router.push('/sign_up')">Зарегистрироваться</button>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "Auth"
    }
</script>

<style scoped>

</style>