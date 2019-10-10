<template>
    <div class="popup-container">
        <transition name="fade">
            <div v-if="show" class="popup-bg">
                <div class="base-popup basic-block tooltips">
                    <div style="text-align: right"><i @click="$emit('close-tooltip')" class="fas fa-times"></i></div>
                    <p style="font-size: 30px">Подсказки</p>
                    <p><i>(покупаются за экстра-баллы)</i></p>
                    <br>
                    <div class="game-tooltip" v-for="tooltip in tooltips">
                        <div v-if="tooltip.text" class="ql-editor" v-html="tooltip.html"></div>
                        <base-button v-else @click="buy_tooltip" :title=show_tooltip_cost(tooltip.cost)></base-button>
                        <br>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {ErrorHandler} from "../../ErrorHandler";
    import Axios from 'axios'
    export default {
        name: "GameTooltip",
        props: ['show'],
        data() {
            return {
                tooltips: [
                    {
                        cost: 50,
                        text: null
                    },
                    {
                        cost: 50,
                        text: null
                    },
                    {
                        cost: 50,
                        text: "Подсказка",
                        html: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquam consequuntur deserunt error fugiat harum magnam maxime quibusdam quisquam repellendus, tempora, ut velit. Aperiam delectus dolores ex mollitia nemo nisi.</p>"
                    }
                ]
            }
        },
        methods: {
            buy_tooltip(){
                Axios
                    .post('', {})
                    .then(response => {
                        this.tooltips = response.data
                    })
                    .catch(error => {
                        if(error.response) {
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push('/connection_error')
                        }
                    })
            },
            show_tooltip_cost(cost) {
                return 'Купить за ' + cost
            },
        }
    }
</script>

<style scoped>
    .game-tooltip > .ql-editor {
        border: 1px solid #9b7c55;
    }
    .tooltips {
        position: absolute;
        min-width: 250px;
    }
</style>