import JSONP from '../common/js/jsonp'
import {commonParams, options} from './config'
import Axios from 'axios'

// 获取轮播图数据
export function getRecommend() {
  const URL =
    'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = {
    playform: 'h5',
    uin: 0,
    needNewCode: 1,
    ...commonParams
  }
  return JSONP(URL, data, options)
}

// 获取歌单数据
export function getDiscList() {
  const url = '/api/getDiscList'
  const data = {
    ...commonParams,
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  }
  return Axios.get(url, {params: data}).then(res => res.data)
}
