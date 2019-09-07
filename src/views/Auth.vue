<template>
    <div class="auth">
        <base-button @click="$router.push('/sign_in')" title="Войти"></base-button>
        <base-button @click="$router.push('/sign_up')" title="Зарегистрироваться"></base-button>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "Auth",
        methods: {
            // goToSignIn: function () { this.$router.push('/sign_in') }
        }
    }
</script>

<style scoped>

</style>