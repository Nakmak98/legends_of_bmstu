<template>
    <div class="popup-container">
        <transition name="fade">
            <div v-if="popup.show" class="popup-bg">
                <div class="base-popup basic-block">
                    <h1 v-if="popup.header">Подтверждение</h1>
                    <p class="popup-message">
                        {{popup.message}}
                    </p>
                    <base-input
                            v-if="popup.input_field"
                            type="text"
                            v-model="input_value"
                            autocapitalize="off"
                            text_align="center">
                    </base-input>
                    <br>
                    <div v-if="popup.callback">
                        <base-button @click="handleAccess" title="ОК"></base-button>
                        <base-button @click="popup.show = false" title="Отмена"></base-button>
                    </div>
                    <div v-else>
                        <base-button @click="popup.show = false" title="ОК"></base-button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "BasePopup",
        data() {
            return {
                input_value: ''
            }
        },
        computed: {
            popup() {
                return this.$store.state.popup
            }
        },
        updated() {
          if(this.popup.input_value !== null){
              this.input_value = this.popup.input_value;
              this.popup.input_value = null;
          }
        },
        methods: {
            handleAccess (){
                if(this.input_value !== ''){
                    this.popup.callback(this.popup.args, this.input_value)
                } else {
                    this.popup.callback(this.popup.args)
                }
                this.$store.commit('deletePopupOptions')
            },
        }
    }
</script>

<style>
    .popup-container {
        position: relative;
        display: flex;
        justify-content: center;
    }
    .popup-bg {
        position: absolute;
        width: 100vw;
        height: 100vh;
    }
    .base-popup {
        margin: 0;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        border-radius: 10px;
        background-color: #e1bf92;
        border: 10px solid #e1bf92;
        max-width: 240px;
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