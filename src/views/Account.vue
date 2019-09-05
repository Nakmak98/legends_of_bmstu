<template>
    <div class="about">
        <ul v-for="item in $store.getters.getUserData">
            <p>{{item}}</p>
        </ul>
        <div v-if="$store.getters.checkUserData">
            <button @click="deleteAccount">Удалить аккаунт</button>
            <button @click="logout">Выйти</button>
        </div>
    </div>
</template>
<script>
    import Axios from 'axios'

    export default {
        name: "account",
        data: function () {
            return {
                user: {}
            }
        },
        beforeCreate() {
            if (this.$store.getters.checkUserData) {
                this.user = this.$store.getters.getUserData
            } else {
                Axios
                    .get('/user/info')
                    .then(response => {
                        this.$store.commit('setUserData', response.data)
                    })
                    .catch(error => {
                        if (error.response) {
                            error.response.status === 401 ? this.$router.push("/auth") : this.$router.push("/error")
                        }
                    })
            }
        },
        methods: {
            logout: function () {
                Axios
                    .get('/user/logout')
                    .then(response => {
                        console.log(response.status)
                        this.$store.commit('deleteUserData')
                        this.$router.push('/auth')
                    })
            },
            deleteAccount: function () {
                Axios
                    .delete('/user/delete')
                    .then(response => {
                        console.log(response.status)
                        this.$store.commit('deleteUserData')
                        this.$router.push('/auth')
                    })
                    .catch(error => {
                        console.log(error.response.status)
                        if (error.response.status === 401) {
                            error.message
                        }
                    })
            },
        }
    }
</script>