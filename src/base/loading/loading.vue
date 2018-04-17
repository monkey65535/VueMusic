<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    props: {
      title: {
        type: String,
        default: '正在加载中~~~'
      }
    }
  }
</script>

<style scoped lang="stylus">
 @import './style.stylus'
</style>
