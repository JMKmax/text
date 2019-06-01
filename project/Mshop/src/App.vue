<template>
  <div id="app">  
     <router-view></router-view>
     <TabBar />
  </div>

</template>

<script>
import TabBar from './components/TabBar/TabBar'
export default {
  name: 'app',
  components:{
  	TabBar
  }
}
</script>

<style lang="less">
#app{
  color: skyblue;
}
</style>
