<template>
    <div>
        <div v-if="validationMessage">{{validationMessage}}</div>
        <div><input type="text" placeholder="Имя" v-model="request_body.first_name"></div>
        <div><input type="text" placeholder="Фамилия"  v-model="request_body.last_name"></div>
        <div><input type="text" placeholder="Группа" v-model="request_body.group"></div>
        <div><input type="text" placeholder="Логин" v-model="request_body.login"></div>
        <div><input type="text" placeholder="vk.сom/id" v-model="request_body.vk_ref"></div>
        <div><input type="password" placeholder="Пароль" v-model="request_body.password"></div>
        <div><input type="password" placeholder="Подтверждение пароля" v-model="confirm_password"></div>
        <div><button  @click="signUp">Зарегистрироваться</button></div>
    </div>
</template>

<script>
    import Axios from 'axios'
    export default {
        name: "signUp",
        data: function(){
            return {
                request_body: {
                    first_name: '',
                    last_name: '',
                    login: '',
                    password: '',
                    group: '',
                    vk_ref: 'vk.com/',
                },

                confirm_password: '',
                validationMessage: ''
            }
        },
        methods: {
            signUp: function () {
               if(valid(this)){
                   this.validationMessage = '';
                   Axios
                       .post('/user/sign_up', this.request_body)
                       .then(response => {
                           console.log(response.data)
                           console.log(response.status)
                           this.$store.commit('setUserData', response.data);
                           this.$router.push("/sign_in")
                       })
                       .catch(error => {
                           console.log(error)
                           this.validationMessage = "Поля заполнены неверно, пожалуйста заполните их соответсвенно подсказкам(которых пока нет)"
                       })
               }
            }
        }
    }

    function valid(obj) {
       for(let field in obj.request_body){
            if (obj.request_body[field] === '') {
                obj.validationMessage = "Заполните все поля формы"
                return false
            }
        }
        if (obj.request_body.password === obj.confirm_password){
            return true
        }
       obj.validationMessage = "Пароли не совпадают!";
        return obj.valid
    }
</script>

<style scoped>

</style>