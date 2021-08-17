<template>
  <div id="app">
    <NavBar></NavBar>
    <div class="container">
      <div class="row">
        <div class="col-sm">

        </div>
        <div class="col-sm">
          <router-view />
        </div>
        <div class="col-sm">

        </div>
      </div>

      
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue"
export default {
  components: {
    NavBar
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>