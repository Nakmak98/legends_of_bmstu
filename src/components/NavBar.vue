<template>
    <div id="nav" v-touch:swipe.right="handle_swipe_2">
        <div class="burger">
            <span @click="show_menu = !show_menu"><i class="fa fa-bars"></i></span>
        </div>
        <div v-if="show_menu" class="menu"
             @click="show_menu = !show_menu"
             v-touch:swipe.left="handle_swipe">
            <div class="menu-content">
                <img src="@/assets/logo1.png">
                <router-link to="/account"><div>Личный кабинет</div></router-link>
                <router-link v-if="is('MODERATOR')" to="/moderator"><div>Конструктор заданий</div></router-link>
                <router-link v-if="is('PLAYER')" to="/team"><div>Кабинет команды</div></router-link>
                <router-link v-if="is('ADMIN')" to="/admin"><div>Перейти к власти!</div></router-link>
                <router-link to="/rules"><div>Правила</div></router-link>
                <router-link to="/metoda"><div>Методичка</div></router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    export default {
        name: "NavBar",
        data: function () {
            return {
                show_menu: false
            }
        },
        computed: {
            user(){
                return this.$store.state.user;
            }
        },
        mounted(){
            if (!this.user) {
                this.request_user_data();
            }
        },
        beforeDestroy() {
            if(this.$store.state.error.message !== null)
                this.$store.commit('deleteErrorMessage')
        },
        methods: {
            handle_swipe() {
                if(this.show_menu) {
                    this.show_menu = false;
                }
            },
            handle_swipe_2() {
                if(!this.show_menu) {
                    this.show_menu = true;
                }
            },
            is(expected_role) {
                if(!this.user) {
                    return false
                }
                if(expected_role === 'PLAYER') {
                    return this.user.role === 'PLAYER' || this.user.role === 'TESTER' || this.user.role === 'CAPTAIN'
                }
                if(this.user.role === expected_role){
                    return true
                }
            },
            request_user_data: function () {
                Axios
                    .get('/user/info')
                    .then(response => {
                        this.$store.commit('setUserData', response.data);
                    })
                    .catch(error => {
                        if (error.response) {
                            if (error.response.status === 401) {
                                this.$router.push("/auth");
                                this.$store.commit('setErrorMessage', {
                                    header: "Ошибка авторизации",
                                    message: error.response.data.message
                                });
                            }
                        }
                    });
            },
        }
    }
</script>

<style scoped>
</style>