<template>
    <span>{{tick_tack}}</span>
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
        computed: {
            tick_tack() {
                let x = moment.unix(this.timer);
                return x.format('mm:ss')
            }
        },
        mounted() {
            this.start_timer()
        },
        methods: {
            start_timer() {
                    var time = this.duration - (moment([]).unix() - this.start_time);
                    let x = setInterval(() => {
                        if(time <= 0) {
                            clearInterval(x);
                            this.$store.dispatch('updateTaskStatus')
                        }
                        this.timer =  time--;
                    }, 1000)
            }
        }
    }
</script>

<style scoped>

</style>