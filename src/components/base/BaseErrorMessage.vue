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
.error-message-container {
    max-width: 800px;
    margin: 20px auto 0;
    background-color: #d66363;
    border-radius: 20px;
    border: 10px solid #ef8f8f; 
    box-shadow: 0 3px 5px rgba(0,0,0,0.3);
    color: white;
}
</style>