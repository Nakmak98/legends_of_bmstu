<template>
    <div class="basic-block">
        <h1>Введите номер команды</h1>
        <p><base-input v-model="team_id"></base-input></p>
        <p><base-button title="Поиск" @click="request_keys"></base-button></p>
    </div>
</template>

<script>
    import Axios from 'axios'
    import {ErrorHandler} from "../../ErrorHandler";
    export default {
        name: "KeysGenerator",
        data() {
            return {
                team_id: null,
                data: null
            }
        },
        methods: {
            request_keys() {
                Axios
                    .get('')
                    .then(response => {
                        this.data = response.data
                    })
                    .catch(error => {
                        if(error.response) {
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push('/connection_error')
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>