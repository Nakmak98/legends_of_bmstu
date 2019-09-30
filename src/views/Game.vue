<template>
    <div class="basic-block">
        <play-state :game="game"></play-state>
        <pause-state :game="game"></pause-state>
        <stop-state :game="game"></stop-state>
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
              game: null
          }
        },
        mounted() {
            this.request_task_status();
        },
        methods: {
            request_task_status() {
                Axios
                    .get('/game/info')
                    .then(response => {
                        this.game = response.data;
                    })
                    .catch(error => {
                        if(error.response){
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push("/connection_error");
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>