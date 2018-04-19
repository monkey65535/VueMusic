<template>
  <div class="scroll-view" ref="scrollView">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'scroll',
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      listenScroll: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    methods: {
      _initScroll() {
        const scrollWarpper = this.$refs.scrollView
        if (!scrollWarpper) return
        this.scroll = new BScroll(scrollWarpper, {
          probeType: this.probeType,
          click: this.click
        })
        if (this.listenScroll) {
          let _this = this
          this.scroll.on('scroll', pos => {
            _this.$emit('scroll', pos)
          })
        }
      },
      enable() {
        // && 如果前面为true，则执行后面内容
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    }
  }
</script>
