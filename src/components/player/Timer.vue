<template>
    <p>{{timer}}</p>
</template>

<script>
    import moment from 'moment'
    export default {
        name: "Timer",
        props: {
          start_time: Number,
          duration: Number
        },
        data() {
            return {
                timer: null
            }
        },
        mounted() {
            this.start_timer()
        },
        methods: {
            start_timer() {
                if(this.start_time){
                    this.timer = this.duration - (moment([]).unix - this.start_time);
                    setTimeout(function () {
                        if(this.timer <= 0) this.timer = 'Время истекло';
                        this.timer--;
                    }, 1000)
                }
            }
        }
    }
</script>

<style scoped>

</style>