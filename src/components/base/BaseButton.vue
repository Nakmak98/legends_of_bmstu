<template>
    <div>
        <button @click="$emit('click')">{{title}}</button>
    </div>
</template>

<script>

    export default {
        name: "BaseButton",
        props:{
            title: String,
        }
    }
</script>

<style scoped>

</style>