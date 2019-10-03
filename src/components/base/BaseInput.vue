<template>
    <div>
        <input class="base-input" v-bind="$attrs"
               :type="type"
               :placeholder="placeholder"
               :text_align="text_align"
               @input="$emit('input', $event.target.value)"
               @focusin="$emit('focusin', $event.target.value)"
               @focusout="$emit('focusout', $event.target.value)"
               @focus="$emit('focus', $event.target.value)"
        >
    </div>
</template>

<script>
    export default {
        name: "BaseInput",
        inheritAttrs: false,
        props: {
            type: String,
            text_align: {
                type: String,
                default: "left"
            },
            required: {
                type: Boolean,
                default: false,
            },
            placeholder: {
                type: String,
            },
        },
        mounted() {
            let inputs = document.getElementsByClassName(`base-input`);
            for(let i of inputs){
                i.style.textAlign=this.text_align;
            }
        }
    }
</script>

<style scoped>
input[type="text"], input[type="password"] {
  border: none;
  height: 30px;
  width: 200px;
  padding-left: 10px;
  margin-bottom: 10px;
}
.requered-sign{
    position: relative;
    left: 5px;
    color: red;
}
</style>