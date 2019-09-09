<template>
    <div @error="showMessage" id="error-message">
        <p>{{message}}</p>
    </div>
</template>

<script>
    export default {
        name: "ErrorMessage",
        props: {
            message: String
        },
        methods: {
            showMessage (errorMessage){
                this.message = errorMessage
            }
        }
    }
</script>

<style scoped>

</style>