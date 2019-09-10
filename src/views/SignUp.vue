<template>
    <div>
        <div v-if="validation_message">{{validation_message}}</div>
        <div><base-input type="text" placeholder="Имя" v-model="request_body.first_name"></base-input></div>
        <div><base-input type="text" placeholder="Фамилия"  v-model="request_body.last_name"></base-input></div>
        <div><base-input type="text" placeholder="Группа" v-model="request_body.group"></base-input></div>
        <div><base-input type="text" placeholder="Логин" v-model="request_body.login"></base-input></div>
        <div><base-input type="text" placeholder="vk.сom/id" v-model="request_body.vk_ref"></base-input></div>
        <div><base-input type="password" placeholder="Пароль" v-model="request_body.password"></base-input></div>
        <div><base-input type="password" placeholder="Подтверждение пароля" v-model="confirm_password"></base-input></div>
        <div><base-button title="Зарегистрироваться" @click="sign_up"></base-button></div>
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
                validation_message: ''
            }
        },
        methods: {
            sign_up: function () {
               if(valid(this)){
                   this.validation_message = '';
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
                           this.validation_message = "Поля заполнены неверно, пожалуйста заполните их соответсвенно подсказкам(которых пока нет)"
                       })
               }
            }
        }
    }

    function valid(obj) {
       for(let field in obj.request_body){
            if (obj.request_body[field] === '') {
                obj.validation_message = "Заполните все поля формы"
                return false
            }
        }
        if((/[0-9]/g.test(obj.request_body.first_name)) || (/[0-9]/g.test(obj.request_body.last_name))) {
            obj.validation_message = "Имя или фамилия не должны содержать цифр"
            return false
        }
        var exp = /^([а-яА-Я]{1,3})(\d{1,2})(-{1})(\d{2})([мМ]?)$/g
        if(exp.test(obj.request_body.group)) {
            obj.validation_message = ''
        } else {
            obj.validation_message = "Неверно введена группа"
            return false
        }

        if(/[а-я]/g.test(obj.request_body.login)) {
            obj.validation_message = "Логин не должен содержать кириллицу"
            return false
        }

        if (obj.request_body.password === obj.confirm_password){
            return true
        }
       obj.validation_message = "Пароли не совпадают!";
        return obj.valid
    }
</script>

<style scoped>

</style>