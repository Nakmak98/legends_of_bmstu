<template>
    <div>
        <input v-bind="$attrs"
               :type="type"
               :placeholder="placeholder"
               @input="$emit('input', $event.target.value)"
        >
    </div>
</template>

<script>
    export default {
        name: "BaseInput",
        inheritAttrs: false,
        props: {
            type: String,
            placeholder: String
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
</style>