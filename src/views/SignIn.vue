<template>
    <div>
        <div v-if="validationMessage">{{validationMessage}}</div>
        <div><input type="text" placeholder="Логин" v-model="request_body.login"></div>
        <div><input type="password" placeholder="Пароль" v-model="request_body.password"></div>
        <button @click="signIn">Войти</button>
    </div>
</template>

<script>

    import Axios from 'axios'
export default {
  name: 'SignIn',
  data: function() {
    return {
        request_body:{
            login: '',
            password:''
        },
        validationMessage: ''
    }
  },
  methods: {
      signIn: function () {
          if(valid(this)){
              Axios
                  .post('/user/sign_in', this.request_body)
                  .then(response => {
                      console.log(response.data)
                      console.log(response.headers['set-cookie'])
                      this.$store.commit('setUserData', response.data);
                      this.$router.push("/account")
                  })
                  .catch(error => {
                      this.validationMessage = "Поля заполнены неверно, пожалуйста заполните их соответсвенно подсказкам(которых пока нет)"
                  })
          }

      }
  }
}

function valid(obj) {
    //TODO: имплементировать цикл в функциюx
    for(let field in obj.request_body){
        if (obj.request_body[field] === '') {
            obj.validationMessage = "Заполните все поля формы"
            return false
        }
    }

    if(/[а-я]/g.test(obj.request_body.login)) {
        obj.validationMessage = "Поля не должны содержать кириллицу"
        return false
    }
    obj.validationMessage = ''
    return true
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
