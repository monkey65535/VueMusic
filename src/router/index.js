import Vue from 'vue'
import Router from 'vue-router'
// 引用组件
import Rank from 'components/rank/rank'
import Recommend from 'components/recommend/recommend'
import Single from 'components/single/single'
import Search from 'components/search/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/single',
      component: Single
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
