import JSONP from '../common/js/jsonp'
import {commonParams, options} from './config'

// 获取歌手列表
export function getSingleList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = {
    ...commonParams,
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  }
  return JSONP(url, data, options)
}

// 获取歌手详情
export function getSingleDetail(singermid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = {
    ...commonParams,
    singermid,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1
  }
  return JSONP(url, data, options)
}
