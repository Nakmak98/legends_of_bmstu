<template>
    <div class="basic-block">
        Не удалось загрузить данные, пожалуйста, перейдите на <span style="text-decoration: underline" @click="$router.push('/game')">эту страницу</span>.
    </div>
</template>

<script>
    export default {
        name: "Error",
    }
</script>

<style scoped>

</style>