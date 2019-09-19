<template>
    <div class="basic-block moderator-block">
        <h1>Конструктор заданий</h1>
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