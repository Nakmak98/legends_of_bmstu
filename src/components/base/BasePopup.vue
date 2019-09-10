<template>
    <transition name="fade">
    <div v-if="show">
        <h1>Подтверждение</h1>
        <div class="popup-message">
            {{message}}
        </div>
        <base-input
                v-if="input"
                type="text"
                v-model="value"
                @input="$emit('input', value)"></base-input>
        <base-button @click="$emit('access')" title="ОК"></base-button>
        <base-button @click="$emit('cancel')" title="Отмена"></base-button>
    </div>
    </transition>
</template>

<script>
    export default {
        name: "base-popup",
        props: {
            message: String,
            placeholder: String,
            input: Boolean,
            show: Boolean,
            callback: Function
        },
        data() {
            return {
                value: ''
            }
        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>