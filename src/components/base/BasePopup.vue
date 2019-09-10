<template>
    <div class="popup-container">
        <transition name="fade">
            <div v-if="popup.show" class="base-popup">
                <h1>Подтверждение</h1>
                <div class="popup-message">
                    {{popup.message}}
                </div>
                <base-input
                        v-if="popup.input_field"
                        type="text"
                        v-model="value">
                </base-input>
                <base-button @click="handleAccess" title="ОК"></base-button>
                <base-button @click="popup.show = false" title="Отмена"></base-button>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "base-popup",
        data() {
            return {
                value: ''
            }
        },
        computed: {
            popup() {
                return this.$store.state.popup
            }
        },
        methods: {
            handleAccess (){
                if(this.value !== ''){
                    // this.$store.commit('setPopupInputValue', this.value);
                    this.popup.callback(this.popup.args, this.value)
                } else {
                    this.popup.callback(this.popup.args)
                }
                this.$store.commit('deletePopupOptions')
            },
        }
    }
</script>

<style scoped>
    .popup-container {
        display: flex;
        justify-content: center;
    }
    .base-popup {
        background-color: #888;
        border-radius: 10px;
        max-width: 350px;
        box-shadow: 0 0 8px black;
        position: fixed;
        z-index: 100;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>