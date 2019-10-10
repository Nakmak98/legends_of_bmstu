<template>
    <div class="basic-block">
        <h1>Легенды</h1>
        <base-input type="text" placeholder="Кодовое слово" v-model="keyword"></base-input>
        <br>
        <base-button title="Отправить" @click="send_keyword"></base-button>
        <div v-if="ghosts" class="history-container">
            <div class="ghost-history" v-for="(ghost, index) in ghosts" v-bind:key="ghost.ghost_id">
                <p v-if="ghost.history" :class="'history' + index">{{ghost.history}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    import {ErrorHandler} from "../../ErrorHandler";
    export default {
        name: "Ghosts",
        data() {
            return {
                ghosts: null,
                keyword: ''
            }
        },
        mounted() {
            this.requests_ghosts()
        },
        beforeDestroy() {
            if (this.$store.state.error.message !== null)
                this.$store.commit('deleteErrorMessage')
        },
        methods: {
            requests_ghosts() {
                Axios
                    .get('/ghost')
                    .then(response => {
                        this.ghosts = response.data
                    })
                    .catch(error => {
                        if(error.response) {
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push('/connection_error')
                        }
                    })
            },
            send_keyword() {
                if(this.keyword === ''){
                    this.$store.commit('setErrorMessage', {
                        header: "Ошибка",
                        message: 'Нельзя отослать пустое кодовое слово.'
                    });
                    return
                }
                Axios
                    .post('/ghost', {
                        keyword: this.keyword
                    })
                    .then(response => {
                        for (let ghost of this.ghosts) {
                            if (ghost.ghost_id === response.data.ghost_id) {
                                ghost.history = response.data.history;
                            }
                        }
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
    @import url('https://fonts.googleapis.com/css?family=Andika|Bad+Script|Caveat|Marck+Script|Pacifico|Pattaya&display=swap');
    .history-container{}
    .ghost-history{
        min-width: 200px;
        min-height: 100px;
        background-color: #ffedd4;
        border: 1px solid #9b7c55;
        margin: 10px 0;
    }
    .ghost-history > .history0  {
        font-family: 'Pacifico', cursive;
        font-size: 18px;
        font-weight: lighter;

    }
    .ghost-history > .history1{
        font-family: 'Caveat', cursive;
        font-size: 24px;
        font-weight: 300;

    }
    .ghost-history > .history2{
        font-family: 'Bad Script', cursive;

    }
    .ghost-history > .history3{
        font-family: 'Marck Script', cursive;
        font-size: 23px;
    }
    .ghost-history > .history4{
        font-family: 'Neucha', sans-serif;
        font-style: oblique;
        font-size: 21px;

    }
    .ghost-history > .history5{
        font-family: 'Pattaya', sans-serif;
        font-size: 21px;
    }

    .ghost-history > p {
        padding: 17px;
    }
</style>