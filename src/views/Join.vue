<template>
    <div>
        <h1>Поиск команды</h1>

        <div><base-input type="" placeholder="Название команды" v-model="TeamName"></base-input></div>
        <base-popup :placeholder="Placeholder" :show="showPopup" :message="popupMessage" :input="request_body.invite_code" @access="checkCode" @cancel="showPopup=false" ></base-popup>
        <H1>Название команды</H1>
            <select v-model="request_body.team_id" size="5">
                <option disabled value=""></option>
                <option v-for="team of teams" v-bind:value="team.team_id">{{team.team_name}}</option>

            </select>

        <base-button title="Вступить в команду" @click="enterCode"></base-button>
    </div>
</template>

<script>
    import Axios from 'axios'
    export default {
        name: "Join",
        data() {
            return {
                request_body:{
                    team_id: '',
                    invite_code:''
                },
                showPopup: false,
                TeamName:'',
                popupMessage:"Введите инвайт-код",
                Placeholder:"12wq234",
                teams:[]
            }
        },
        mounted() {
            this.requestTeams();
        },
        methods:{
            // TODO:Regexp
            requestTeams(){
                Axios
                    .get('/team/all')
                    .then(response => {
                        console.log(response.data)
                        this.teams = response.data
                    })
                    .catch(error =>{                                            // ну допустим какие то коды ошибок
                        if (error.response) {
                            console.log(error.response.status)
                            console.log(error.message)
                            if (error.response.status === 401) {
                                this.$route.push('/auth')
                            } else if (error.response.status === 403) {
                                this.$route.push('/auth')
                            } else if (error.response.status === 404) {
                                this.$route.push('/auth')
                            } else {
                                this.$emit('error', error.message)
                            }
                        }
                    })
            },
            joinTeam:function(){
                Axios
                    .post('/team/join', this.request_body)
                    .then(response => {
                        console.log(response.data)
                        this.$store.commit('setUserData', response.data);
                        this.$route.push("/account");
                        this.showPopup = false;

                    })
                    .catch(error => {
                        if(error.response){
                            console.log(error.response.status)
                            if(error.response.status === 401){
                                this.$route.push('/auth')
                            } else if(error.response.status === 404){
                                this.showPopup = false;
                                console.log(error.response.status)
                            } else {
                                this.$route.push('/error')
                            }
                        }

                    })
            },
            enterCode:function ()
            {
                this.showPopup = true;
            },
            checkCode:function () {
                if (this.request_body.invite_code==this.team.invite_code){
                    this.joinTeam
                }
               //TODO else{}
            }

        }

    }
</script>

<style scoped>

</style>