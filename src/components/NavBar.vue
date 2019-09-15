<template>
    <div id="nav">
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
        methods: {
            handle_swipe() {
                if(this.show_menu) {
                    console.log("asd");
                    this.show_menu = false;
                }
            },
            is(expected_role) {
                if(!this.user) {
                    return false
                }
                if(expected_role === 'PLAYER') {
                    return this.user.role === 'PLAYER' || this.user.role === 'TESTER' || this.user.role === 'CAPTAIN'
                }
                if(this.user.role !== expected_role){
                    return false
                }
            },
        }
    }
</script>

<style scoped>

</style>