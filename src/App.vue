<template>
  <div id="app">
    <base-popup></base-popup>
    <nav-bar></nav-bar>
    <router-view/>
    <a id="error-anchor" href="#error-message"></a>
    <a name="error-message"></a>
    <base-error-message></base-error-message>
  </div>
</template>

<script>

  import NavBar from "./components/NavBar";
  export default {
    name: 'app',
    components: {NavBar},
    data: function () {
      return {
        show_menu: false
      }
    },
    computed: {
    //   error() {
    //     return this.$store.state.error
    //   }
    },
    updated() {
      // console.log("deleteError");
      // if(this.error.message !== null)
      // this.$store.dispatch('hide_error_message');
      // let caller = document.getElementById("error-anchor");
      // caller.click()
    },
    methods: {
      handle_swipe() {
         if(this.show_menu) {
           this.show_menu = false;
         }
      },
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
  height: 100vh;
  margin: 0;
  background-color: #fdf8ed;
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
  padding: 0 10px;
    background: url("assets/bg1.png") no-repeat;
  background-size: cover;
}
#nav {
  background-color: #f8e0be;
  height: 50px;
  padding: 10px;
  margin: 0 -10px;
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
button {
    height: 40px;
    border-radius: 10px;
    background: #fff;
    border: none;
    width: 200px;
    margin-bottom: 5px;
    font-size: 20px;
}
table {
  margin: 0 auto;
  background-color: #9b7c55;
  margin-bottom: 20px;
}
.table-cont {
  background-color: #ffedd4;

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
.menu-content>a {
  padding-top: 8px;
  font-style: none;
  box-sizing: border-box;
  text-decoration: none;
  display: block;
  color: black;
  height: 40px;
  border-top: 2px solid #e1bf92;
}
.router-link-exact-active {
  color: black !important;
  background-color: #ffedd4;
}
p>img {
  max-width: 100%;
}
</style>
