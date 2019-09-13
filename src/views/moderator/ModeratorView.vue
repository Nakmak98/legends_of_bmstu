<template>
    <div>
        <h2>Главная страница модератора</h2>
        <base-button title="Создать задание"
                     @click="$router.push('/moderator/create_task')">
        </base-button>
        <all-tasks></all-tasks>
    </div>
</template>

<script>
    import AllTasks from "../../components/moderator/AllTasks";
    export default {
        name: "ModeratorView",
        components: {
            AllTasks
        }
    }
</script>

<style scoped>
</style>