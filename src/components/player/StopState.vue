<template>
    <p>{{game.text}}</p>
</template>

<script>
    export default {
        name: "StopState",
        computed: {
            game() { return this.$store.state.game }
        }
    }
</script>

<style scoped>

</style>