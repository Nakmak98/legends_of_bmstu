<template>
    <div class="basic-block">
        <play-state v-if="game.status === 'PLAY'"
                    :game="game"
                    :status="status">
        </play-state>
        <pause-state v-if="game.status === 'PAUSE'"
                     :game="game"
                     :status="status">
        </pause-state>
        <stop-state v-if="game.status === 'STOP'"
                    :game="game"
                    :status="status">
        </stop-state>
    </div>
</template>

<script>
    import PauseState from "../components/player/PauseState";
    import StopState from "../components/player/StopState";
    import PlayState from "../components/player/PlayState";
    import {ErrorHandler} from "../ErrorHandler";
    import Axios from 'axios'
    export default {
        name: "Game",
        components: {
            PauseState,
            PlayState,
            StopState
        },
        data() {
          return {
              status: null
          }
        },
        computed: {
          game() { return this.$store.state.game }
        },
        mounted() {
            this.request_game_status();
            this.$store.dispatch('updateTaskStatus')
        },
        methods: {
            request_game_status() {
                Axios
                    .get('/game/status')
                    .then(response => {
                        this.$store.commit('deleteErrorMessage');
                        this.status = response.data;
                    })
                    .catch(error => {
                        if(error.response){
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push("/connection_error");
                        }
                    })
            },
        }
    }
</script>

<style scoped>
</style>