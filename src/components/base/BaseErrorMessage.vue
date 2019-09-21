<template>
    <transition name="fade">
        <div v-if="error.message" class="error-message-container">
            <a name="error-message"></a>
            <a id="error-anchor" href="#error-message"></a>
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
        updated() {
            if(this.error.message)
                this.scroll_to_message()
        },
        methods: {
            scroll_to_message() {
                let caller = document.getElementById("error-anchor");
                caller.click()
            }
        }
    }
</script>

<style scoped>
.error-message-container {
    max-width: 800px;
    margin: 20px auto 0;
    padding: 0 5px;
    background-color: #d66363;
    border-radius: 20px;
    border: 10px solid #ef8f8f; 
    box-shadow: 0 3px 5px rgba(0,0,0,0.3);
    color: white;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
}
</style>