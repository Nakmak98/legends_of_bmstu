<template>
    <div id="nav" v-touch:swipe.right="open_by_swipe">
        <div class="burger">
            <span @click="show_menu = !show_menu"><i class="fas fa-bars"></i></span>
            <strong style="font-size: 21px;">Легенды Бауманки</strong>
            <i v-if="$route.fullPath === '/game' || $route.fullPath === '/game#error-message'"
               class="fas fa-sync"
               @click="sync_with_game_server">
            </i>
            <div v-else style="width: 24px;"></div>
        </div>
        <div v-if="show_menu" class="menu"
             @click="show_menu = !show_menu"
             v-touch:swipe.left="close_by_swipe">
            <div class="menu-content">
                <img src="@/assets/logo1.png">
                <div v-if="is('ADMIN')">
                    <router-link to="/admin_control_panel"><div>Панель администратора</div></router-link>
                </div>
                <div v-if="is('MODERATOR')">
                    <router-link to="/moderator/all_tasks"><div>Конструктор заданий</div></router-link>
                    <router-link to="/moderator/all_tooltips"><div>Конструктор подсказок</div></router-link>
                    <router-link to="/moderator/tasks_status"><div>Статус заданий</div></router-link>
                    <router-link to="/moderator/teams_status"><div>Cтатус команд</div></router-link>
                </div>
                <div v-if="is('REVISOR')">
                    <router-link to="/revisor/answers"><div>Ответы</div></router-link>
                    <router-link to="/revisor/team_list"><div>Список команд</div></router-link>
                    <router-link to="/revisor/keys_generator"><div>Генерация ключей</div></router-link>
                </div>
                <div v-if="is('PLAYER')">
                    <router-link to="/game"><div>Задания</div></router-link>
                    <router-link to="/ghosts"><div>Легенды</div></router-link>
                    <router-link to="/team"><div>Кабинет команды</div></router-link>
                </div>
                <div>
                    <router-link to="/account"><div>Личный кабинет</div></router-link>
                    <router-link to="/info"><div>Что такое Легенды?</div></router-link>
                    <router-link to="/partners"><div>Партнеры</div></router-link>
                    <a href="/images/Pravila_LB-2019.pdf" download><div>Методичка</div></a>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    import {ErrorHandler} from "../ErrorHandler";

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
            this.user = this.$store.state.user;
            if (!this.user) {
                this.request_user_data();
            }
        },
        beforeDestroy() {
            if(this.$store.state.error.message !== null)
                this.$store.commit('deleteErrorMessage')
        },
        methods: {
            sync_with_game_server() {
                this.$store.dispatch('updateTaskStatus', undefined, this)
            },
            close_by_swipe() {
                if(this.show_menu) {
                    this.show_menu = false;
                }
            },
            open_by_swipe() {
                if(!this.show_menu) {
                    this.show_menu = true;
                }
            },
            is(expected_role) {
                if(!this.user) {
                    return false
                }
                if(this.user.role === 'ADMIN'){
                    return true
                }

                if(expected_role === 'PLAYER') {
                    return this.user.role === 'PLAYER' || this.user.role === 'CAPTAIN'
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
                            if((this.$router.currentRoute.fullPath === '/info' || this.$router.currentRoute.fullPath === '/partners') && error.response.status === 401)
                                return
                           new ErrorHandler(error.response, this)
                        } else {
                            this.$router.push("/connection_error");
                        }
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>
    #nav {
        background-color: #f8e0be;
        height: 50px;
        padding: 10px;
        margin: 0 -10px;
        margin-bottom: 20px;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
        box-sizing: border-box;
    }
    .burger {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        max-width: 800px;
        padding-left: 10px;
        text-align: left;
    }
    .burger {
        color: black;
    }
    .burger>span>i {
        cursor: pointer;
        font-size: 30px;
        color: black;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        outline: none;
    }
    .fa-sync {
        margin-left: 6px;
        color: black;
        font-size: 25px;
    }
    .menu {
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,0.3);
    }
    .menu-content {
        width: 200px;
        height: 100%;
        box-shadow: 0 0 5px rgba(0,0,0,0.3);
        background-color: #f8e0be;
    }
    .menu-content > img {
        width: 100%;
    }
    .menu-content > img + div {
        border-top: 2px solid #e1bf92;
    }
    .menu-content > div > a{
        padding-top: 8px;
        font-style: none;
        box-sizing: border-box;
        text-decoration: none;
        display: block;
        color: black;
        height: 40px;
        border-bottom: 2px solid #e1bf92;
    }

    .router-link-exact-active {
        color: black !important;
        background-color: #ffedd4;
    }
</style>