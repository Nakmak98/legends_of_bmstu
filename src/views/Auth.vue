<template>
    <div class="auth">
        <BaseInput type="text" placeholder="Логин"></BaseInput>
        <BaseInput type="password" placeholder="Пароль"></BaseInput>
        <BaseButton button-text="Войти"></BaseButton>
    </div>
</template>

<script>
    import BaseInput from "../components/BaseInput";
    import BaseButton from "../components/BaseButton";
    export default {
        name: "Auth",
        components: {
            BaseInput,
            BaseButton
        }
    }
</script>

<style scoped>
.auth{

}
</style>