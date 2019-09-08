<template>
    <div id="error-message">
        <p>{{message}}</p>
    </div>
</template>

<script>
    export default {
        name: "ErrorMessage",
        props: {
            message: String
        }
    }
</script>

<style scoped>

</style>