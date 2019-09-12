<template>
    <h2>{{edit_mode_header}}</h2>
    <TaskEditor></TaskEditor>
</template>

<script>
    import TaskEditor from "./TaskEditor";
    export default {
        name: "Task",
        props: {
            edit_mode_header: String
        },
        components: {
            TaskEditor
        }
    }
</script>

<style scoped>

</style>