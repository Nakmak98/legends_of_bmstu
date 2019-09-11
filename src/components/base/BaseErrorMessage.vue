<template>
    <transition>
        <div v-if="error.message" class="error-message-container">
            <div class="error-content">
                <h3>{{error.header}}</h3>
                <p>{{error.message}}</p>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "ErrorMessage",
        computed: {
            error() {
                return this.$store.state.error;
            }
        },
    }
</script>

<style scoped>

</style>