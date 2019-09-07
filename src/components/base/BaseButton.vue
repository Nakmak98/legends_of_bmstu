<template>
    <div>
        <button @click="$emit('click')">{{title}}</button>
    </div>
</template>

<script>

    export default {
        name: "baseButton",
        props:{
            title: String,
        }
    }
</script>

<style scoped>

</style>