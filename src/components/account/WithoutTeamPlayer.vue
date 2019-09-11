<template>
    <div id="account-menu" class="account-menu-container">
        Вы ещё не состоите в команде.<span @click="$router.push('/team/create')">Создайте её</span>
        или <span @click="$router.push('/team/join')">присоединитесь</span> к существующей.
    </div>
</template>

<script>
    export default {
        name: "withoutTeamPlayer",
    }
</script>

<style lang="scss" scoped>
    .account-menu-container {
        span {
            text-decoration: underline;
        }
    }
</style>