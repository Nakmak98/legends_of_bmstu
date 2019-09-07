<template>
    <div id="create-team">
        <h1>Создание команды</h1>
        <input type="text" v-model="teamName">
        <base-button title="Создать" @click="createTeam"></base-button>
    </div>
</template>

<script>
    export default {
        name: "CreateTeam",
        data(){
            return {
                teamName: ''
            }
        },
        methods: {
            createTeam: function () {
            //    TODO: написать запрос на создание команды
            }
        }
    }
</script>

<style scoped>

</style>