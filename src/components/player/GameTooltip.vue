<template>
    <div class="popup-container">
        <transition name="fade">
            <div v-if="show" class="popup-bg">
                <div class="base-popup basic-block tooltips">
                    <div style="text-align: right"><i @click="$emit('close-tooltip')" class="fas fa-times"></i></div>
                    <p style="font-size: 30px">Подсказки</p>
                    <p><i>(покупаются за экстра-баллы)</i></p>
                    <br>
                    <div v-if="hints.length">
                        <div class="game-tooltip" v-for="(hint, index) in hints_list">
                            <div v-if="hint.html" class="ql-editor" v-html="hint.html"></div>
                            <base-button v-else @click="buy_hint(hint.hint_id, index)" :title=show_tooltip_cost(hint.cost)></base-button>
                            <br>
                        </div>
                    </div>
                    <div v-else>
                        <p>Для этого задания отсутствуют подсказки.</p>
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
                hints: null
            }
        },
        computed: {
            hints_list() {
                return this.hints.sort((a,b) => a.cost - b.cost)
            }
        },
        watch: {
            show() {
                this.$store.commit('deleteErrorMessage')
                this.request_hints()
            }
        },
        methods: {
            buy_hint(hint_id, id){
                Axios
                    .get('/hint/buy', {
                        params: {
                            hint_id: hint_id
                        }
                    })
                    .then(response => {
                        let temp = this.hints.slice();
                        temp[id] = response.data;
                        this.hints = temp
                    })
                    .catch(error => {
                        this.$emit('close-tooltip')
                        if(error.response) {
                            new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push('/connection_error')
                        }
                    })
            },
            request_hints() {
                Axios
                    .get('/hint/team')
                    .then(response => {
                        this.hints = response.data
                    })
                    .catch(error => {
                        this.$emit('close-tooltip')
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
        position: fixed;
        min-width: 250px;
    }
</style>