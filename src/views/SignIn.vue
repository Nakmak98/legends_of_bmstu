<template>
    <div>
        <div v-if="validation_message">{{validation_message}}</div>
        <div><base-input type="text" placeholder="Логин" v-model="request_body.login"></base-input></div>
        <div><base-input type="password" placeholder="Пароль" v-model="request_body.password"></base-input></div>
        <base-button title="Войти" @click="sign_in"></base-button>
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
        validation_message: ''
    }
  },
  methods: {
      sign_in: function () {
          if(valid(this)){
              Axios
                  .post('/user/sign_in', this.request_body)
                  .then(response => {
                      console.log(response.data)
                      this.$store.commit('setUserData', response.data);
                      this.$router.push("/account")
                  })
                  .catch(error => {
                      if(error.response){
                          console.log(error.response.status)
                          if(error.response.status === 400){
                              this.validation_message = "Неверный логин/пароль"
                          } else {
                              this.$route.push('/error')
                          }
                      } else {console.log(error)}
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

    if(/[а-я]/g.test(obj.request_body.login)) {
        obj.validation_message = "Поля не должны содержать кириллицу"
        return false
    }
    obj.validation_message = ''
    return true
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
