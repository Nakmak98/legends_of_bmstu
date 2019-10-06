<template>
    <div v-if="user.role === 'MODERATOR' || user.role === 'ADMIN'" class="basic-block">
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
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        },
        beforeDestroy() {
            if (this.$store.state.error.message !== null)
                this.$store.commit('deleteErrorMessage')
        },
    }
</script>