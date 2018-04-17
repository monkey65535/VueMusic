<template>
  <div id="app">
    <MHheader></MHheader>
    <Tab></Tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHheader from './components/m-header/m-header'
import Tab from './components/tab/tab'

export default {
  name: 'App',
  components: {
    MHheader,
    Tab
  }
}
</script>

<style lang="stylus" scoped type="stylesheet/stylus">
</style>