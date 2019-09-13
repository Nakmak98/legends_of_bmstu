<template>
  <div id="app">
    <base-popup></base-popup>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/account">Account</router-link> 
    </div>
    <router-view/>
    <base-error-message></base-error-message>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data: function () {
      return {
      }
    },
    updated() {
      this.$store.commit('deleteErrorMessage');
    },
    methods: {
    }
  }
</script>

<style lang="scss">
* {
  font-family: 'Neucha', cursive;
  font-weight: 300;
  font-size: 18px;
}
h1 {
  font-family: BemountLine;
  font-weight: 500;
  margin-top: 5px;
  font-size: 48px;
}
@font-face {
  font-family: BemountLine;
  src: url("assets/Bemount-Line.woff") format("woff"), url("assets/Bemount-Line.otf") format("truetype");
}
body {
  height: 100%;
  margin: 0;
  background: url("assets/bg.png");
  background-size: cover;

}

.basic-block {
  padding: 10px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f8e0be;
  border-radius: 20px;
  border: 10px solid #e1bf92; 
  box-shadow: 0 3px 5px rgba(0,0,0,0.3);
  color: black;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  background-color: #f8e0be;
  height: 50px;
  padding: 10px;
  margin-bottom: 20px;
  box-shadow: 0 3px 5px rgba(0,0,0,0.3);
  box-sizing: border-box;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#ornament-top {
  position: absolute;
  left: -15px;
  top:-55px;
  width: 310px;
}
#ornament-bottom {
  position: absolute;
  left: 0;
  bottom:-30px;
  width: 280px;
}
.auth {
  box-sizing: border-box;
  width: 300px;
  min-height: 300px;
  margin: 0 auto;
  margin-top: 50px;
  position: relative;
  max-width: 400px;
  padding: 20px 10px;
}
table {
  margin: 0 auto;
  background-color: #9b7c55;
  margin-bottom: 20px;
}
.table-cont {
  background-color: #ffedd4;

}
</style>
