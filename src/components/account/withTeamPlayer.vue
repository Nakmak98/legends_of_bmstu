<template>
    <div>
        <h2>Команда № {{team.team_id}}</h2>
        <h2>{{team.team_name}}</h2>
        типа табличка
    </div>
</template>

<script>
    export default {
        name: "withTeamPlayer",
        props: {
            team: Object
        }
    }
</script>

<style scoped>

</style>