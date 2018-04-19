<template>
  <div class="recommend">
    <Scroll ref="scroll" :data="discList" class="recommend-content">
      <div>
        <div class="slider-warpper">
          <Slider v-if="recommends.length">
            <div v-for="(item,i) in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img class="needsclick" :src="item.picUrl" alt="item.id" @onload="_imgLoad(i)">
              </a>
            </div>
          </Slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌曲推荐</h1>
          <ul v-if="discList.length > 0">
            <li class="item" v-for="item in discList" :key="item.dissid">
              <div class="icon">
                <img v-lazy="item.imgurl" :alt="item.creator.name" width="60" height="60">
              </div>
              <div class="text">
                <div class="name" v-html="item.dissname"></div>
                <div class="desc" v-html="item.creator.name"></div>
              </div>
            </li>
          </ul>
        </div>
        <div class="loading-container">
          <Loading></Loading>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
  import {getRecommend, getDiscList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'

  export default {
    name: 'Recommend',
    data() {
      return {
        recommends: [],
        discList: []
      }
    },
    components: {
      Slider,
      Scroll,
      Loading
    },
    created() {
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      _getRecommend() {
        getRecommend().then(res => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        }).catch(err => {
          console.log(err)
        })
      },
      _getDiscList() {
        getDiscList().then(res => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        }).catch(err => {
          console.log(err)
        })
      },
      _imgLoad(i) {
        if (i === 0) {
          this.$refs.scroll.refresh()
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import 'style.styl'
</style>
