<template>
   <timer :start_time="game.task.start_time"
          :duration="game.task.duration">
   </timer>
</template>

<script>
    import Timer from "./Timer";
    import {ErrorHandler} from "../ErrorHandler";
    import Axios from 'axios';
    export default {
        name: "PlayState",
        components: {Timer},
        data() {
            return {
                timer: null
            }
        },
        mounted() {
            this.start_timer()
        },
        methods: {
            start_timer() {}
        }
    }
</script>

<style scoped>

</style>