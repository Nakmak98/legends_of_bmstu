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
    button {
        height: 40px;
        border-radius: 10px;
        background: #fff;
        border: none;
        width: 200px;
        box-shadow: 0 0 3px black;
    }
</style>