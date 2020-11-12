<template>
  <div class="app">
    <h1>Hello Vue.js!</h1>
    <sub-component message="My Counter for Vue.js with Babel"></sub-component>
    <input type="file" @change="handleChange" />
  </div>
</template>

<script>
  import SubComponent from "./SubComponent.vue";
  import MediaInfo from "mediainfo.js";

  const readChunk = (file) => (chunkSize, offset) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target.error) {
          reject(event.target.error)
        }
        resolve(new Uint8Array(event.target.result))
      }
      reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize))
    })

  export default {
    components: {
      SubComponent
    },
    mounted(){
      /* MediaInfo().then((mediainfo) => {
        console.log(mediainfo);
      })
      console.log('hello'); */
    },
    methods: {
      handleChange(event){
        const file = event.target.files[0];
        console.log(file);
        MediaInfo().then((mediainfo) => {
          mediainfo
          .analyzeData(() => file.size, readChunk(file))
          .then((result) => {
            console.log('result:', result);
          })
        })
        console.log("hello!");
      }
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