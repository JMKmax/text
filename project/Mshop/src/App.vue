<template>
  <div id="app">
    app
     <logo />
  </div>

</template>

<script>
import logo from './components/logo.vue'

export default {
  name: 'app',
  components: {
    logo
  }
}
</script>

<style lang="less">
#app{
  color: skyblue;
}
</style>
