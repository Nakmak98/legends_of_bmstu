<template>
    <div class="auth">
        <BaseButton button-text="Войти"></BaseButton>
        <BaseButton button-text="Зарегистрироваться"></BaseButton>
    </div>
</template>

<script>
    import BaseButton from "@/components/BaseButton";
    export default {
        name: "Auth",
        components: {
            BaseButton
        },

    }


</script>

<style scoped>

</style>