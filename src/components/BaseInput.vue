<template>
    <div>
        <input :type="type" :name="name" :value="value" :placeholder="placeholder">
    </div>

</template>

<script>
    export default {
        name: "BaseInput",
        data: function () {
            return {
                type: 'text',
                name: '',
                value: '',
                placeholder: '',
                required: true
            }
        },
    }
</script>

<style scoped>

</style>