<template>
  <Scroll class="listview" :data="data" ref="listView" :listenScroll="listenScroll" @scroll="scroll" :probeType="probeType">
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
    <div class="list-shortcut" @touchstart.prevent.stop="onShortcutTouchStart"
         @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(val,index) in shortcutList" class="item" :data-index="index" :key="index"
            :class="{'current':currentIndex === index}">
          {{val}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle">
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
      this.listenScroll = true
      this.listHeight = []
      this.probeType = 3
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        scrollY: -1,
        currentIndex: 0
      }
    },
    components: {
      Scroll
    },
    methods: {
      onShortcutTouchStart(ev) {
        let index = ev.target.getAttribute('data-index')
        this.currentIndex = parseInt(index)
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
      scroll(pos) {
        this.scrollY = pos.y
      },
      _scrollTo(index) {
        this.$refs['listView'].scrollToElement(this.$refs['listGroup'][index], 0)
      },
      _calculateHeight() {
        this.listHeight = []
        const list = this.$refs['listGroup']
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    computed: {
      shortcutList() {
        return this.data.map(e => e.title.substr(0, 1))
      },
      fixedTitle() {
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      scrollY(newY) {
        const listHeight = this.listHeight
        for (let i = 0; i < listHeight.length; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (!height2 || (-newY > height1 && -newY < height2)) {
            this.currentIndex = i
            return
          }
        }
        this.currentIndex = 0
      }
    }
  }
</script>
<style lang="stylus">
  @import 'style.styl';
</style>
