<template>
  <div class="app">
    <h1>Hello Vue.js!</h1>
    <sub-component message="My Counter for Vue.js with Babel"></sub-component>
  </div>
</template>

<script>
  import SubComponent from "./SubComponent.vue";
  // import MediaInfo from "mediainfo.js";

  export default {
    components: {
      SubComponent
    },
    mounted(){
      console.log('hello');
    }
  };
</script>

<style scoped>
  h1 {
    font-weight: normal;
  }
  .app {
    text-align: center;
    font-family: 'Roboto', sans-serif;
  }
</style>