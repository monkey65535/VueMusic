<template>
  <div class="singer">
    <ListView :data="single"></ListView>
  </div>
</template>

<script>
import { getSingleList } from 'api/single'
import { ERR_OK } from 'api/config'
import ListView from 'base/listView/listView'

const HOT_NAME = '热门'
const HOT_LENGTH = 10

export default {
    name: 'single',
    data() {
        return {
            single: []
        }
    },
    created() {
        this._getSingleList()
    },
    components: {
        ListView
    },
    methods: {
        _getSingleList() {
            getSingleList().then(res => {
                if (res.code === ERR_OK) {
                    let { list } = res.data
                    this.single = this._normalizeSingle(list)
                }
            })
        },
        _normalizeSingle(list) {
            let map = {
                hot: {
                    title: HOT_NAME,
                    items: []
                }
            }

            list.forEach((item, index) => {
                const itemData = {
                    name: item.Fsinger_name,
                    id: item.Fsinger_mid,
                    avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${
                        item.Fsinger_mid
                    }.jpg?max_age=2592000`
                }
                const key = item.Findex
                if (index < HOT_LENGTH) {
                    map.hot.items.push(itemData)
                }
                if (!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    }
                }
                map[key].items.push(itemData)
            })
            //  处理map，进行排序
            let hot = []
            let ret = []
            for (let key in map) {
                let val = map[key]
                if (val.title.match(/[a-zA-Z]/)) {
                    ret.push(map[key])
                } else if (val.title === HOT_NAME) {
                    hot.push(map[key])
                }
            }
            ret = ret.sort(
                (a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0)
            )
            return [...hot, ...ret]
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import './style.stylus';
</style>
