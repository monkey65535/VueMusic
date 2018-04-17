<template>
  <Scroll class="listview" :data="data" ref="listView">
    <ul>
      <li v-for="group in data" class="list-group" :key="group.title" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item" :key="item.id">
            <img class="avatar" v-lazy="item.avatar" alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart.prevent.stop="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(val,index) in shortcutList" class="item" :data-index="index" :key="index"
            :class="{'current':focusIndex === index}">
          {{val}}
        </li>
      </ul>
    </div>
    <div class="last-fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
  </Scroll>
</template>
<script>
  import Scroll from '../scroll/scroll'
  const ANCHOR_HEIGHT = 18
  export default {
    name: 'listView',
    created() {
      this.touch = {}
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        focusIndex: 0
      }
    },
    components: {
      Scroll
    },
    methods: {
      onShortcutTouchStart(ev) {
        let index = ev.target.getAttribute('data-index')
        this.focusIndex = parseInt(index)
        let firstTouch = ev.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = parseInt(index)
        this._scrollTo(index)
      },
      onShortcutTouchMove(e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        this._scrollTo(anchorIndex)
      },
      _scrollTo(index) {
        this.$refs['listView'].scrollToElement(this.$refs['listGroup'][index], 400)
      }
    },
    computed: {
      shortcutList() {
        return this.data.map(e => e.title.substr(0, 1))
      },
      fixedTitle() {
        return this.data[this.focusIndex] ? this.data[this.focusIndex].title : ''
      }
    }
  }
</script>
<style lang="stylus">
  @import './style.styl';
</style>
