<template>
  <div id="app">
    <base-popup popup="popup_options"></base-popup>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/account">Account</router-link> 
    </div>
    <router-view/>
  </div>
</template>

<script>

  export default {

    name: 'app',
    data: function () {
      return {
        popup_options: {
          message: '',
          placeholder: '',
          input_field: false,
          show: false,
          callback: () => {}
        }
      }
    },
    mounted (){
      this.$on('popup', this.pass_options)
    },
    methods: {
      pass_options(options){
        console.log("asdasdas");
        this.popup_options = options;
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
