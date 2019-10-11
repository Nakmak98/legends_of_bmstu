<template>
    <div>
        <div class="status_bar_container" v-bind:style="bar_container_style">
            <div v-bind:style="bar_element_style"></div>
        </div>
        <div class="status_bar_percentage">{{this.loaded}}/{{this.capacity}}</div>
    </div>
</template>

<script>
    export default {
        name: "TaskStatusBar",
        props: ['capacity', 'loaded'],
        computed: {
            bar_container_style() {
                return {
                    gridTemplateColumns: `repeat(${this.capacity}, 1fr)`,
                }
            },
            bar_element_style() {
                if(!this.loaded){
                    return
                }
                let progress = this.loaded / this.capacity;
                let color = 'green';
                if(progress >= 0.5 && progress <= 0.8){
                    color = 'orange'
                }
                if(progress >= 0.8){
                    color = 'red'
                }
                return {
                    gridColumn: `1 / ${ this.loaded + 1}`,
                    backgroundColor: color,
                }
            },
        },

    }
</script>

<style scoped>
    .status_bar_container{
        height: 30px;
        display: grid;
        border: 1px solid #e1bf92;
    }
    .status_bar_percentage {
        position: relative;
        bottom: 23px;
    }
</style>