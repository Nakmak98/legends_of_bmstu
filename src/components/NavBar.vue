<template>
    <div id="nav" v-touch:swipe.right="open_by_swipe">
        <div class="burger">
            <span @click="show_menu = !show_menu"><i class="fa fa-bars"></i></span>
        </div>
        <div v-if="show_menu" class="menu"
             @click="show_menu = !show_menu"
             v-touch:swipe.left="close_by_swipe">
            <div class="menu-content">
                <img src="@/assets/logo1.png">
                <router-link v-if="is('MODERATOR')" to="/moderator"><div>Конструктор заданий</div></router-link>
                <router-link v-if="is('PLAYER')" to="/team"><div>Кабинет команды</div></router-link>
                <router-link v-if="is('ADMIN')" to="/admin"><div>Перейти к власти!</div></router-link>
                <router-link to="/account"><div>Личный кабинет</div></router-link>
                <router-link to="/info"><div>Что такое Легенды?</div></router-link>
<!--                <router-link to="/metoda"><div>Методичка</div></router-link>-->
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
            if (!this.user) {
                this.request_user_data();
            }
        },
        beforeDestroy() {
            if(this.$store.state.error.message !== null)
                this.$store.commit('deleteErrorMessage')
        },
        methods: {
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
                            if(this.$router.currentRoute.fullPath === '/info' && error.response.status === 401)
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

<style scoped>
    #nav {
        background-color: #f8e0be;
        height: 50px;
        padding: 10px;
        margin: 0 -10px;
        margin-bottom: 20px;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
        box-sizing: border-box;

    a {
        font-weight: bold;
        color: #2c3e50;
    }
    }
    .burger {
        margin: 0 auto;
        max-width: 800px;
        padding-left: 10px;
        text-align: left;
    }
    .burger>span>i {
        cursor: pointer;
        font-size: 30px;
        color: black;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        outline: none;
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
    .menu-content>img {
        width: 100%;
    }
    .menu-content>img + a {
        border-top: 2px solid #e1bf92;
    }
    .menu-content>a {
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