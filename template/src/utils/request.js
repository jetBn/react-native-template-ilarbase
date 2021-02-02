/*
 * @Descripttion:
 * @version:
 * @Author: WGQ
 * @Date: 2020-07-02 21:02:04
 * @LastEditors: WGQ
 * @LastEditTime: 2020-12-11 13:55:56
 */

/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import axios from 'axios'
import { getToken } from './storage'
import Qs from 'qs'
import { Platform } from 'react-native'
import config from "../common/config"
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-root-toast'
// let Platform = require('Platform');
var md5 = require('md5');
const random = require('random')
import {BASE_URL} from '../config/index'


// 创建axios实例
// axios.defaults.withCredentials = false
const service = axios.create({
  baseURL: BASE_URL, // api 的 base_url
  // baseURL: 'http://192.168.1.235:8100', // api 的 base_url
  timeout: 5000, // 请求超时时间
  header: {
    'Content-Type':'application/x-www-form-urlencoded',
  }
})

getToken().then(res => {
  service.defaults.headers.common['token'] = res;
})


const setHeader = ()=>{
  var timestamp = Date.parse(new Date())/1000;
  var appCode = "translatecamera"
  var appKey = "68088eb56ca4d4fa9323f7322fecee13"
  var appSecret = "429892dc9a64ed6ad7a2733829c81caa"
  var nonce = md5(random.float()+"nonce")
  var sign = md5(appCode+timestamp+appKey+appSecret+nonce)
  service.defaults.headers.common['cb-client-code'] = appCode;
  service.defaults.headers.common['cb-client-type'] = Platform.OS;
  service.defaults.headers.common['cb-timestamp'] = timestamp;
  service.defaults.headers.common['cb-nonce'] = nonce;
  service.defaults.headers.common['cb-sign'] = sign;
}
setHeader()

// request拦截器
service.interceptors.request.use(
  async config => {
    if(config.method === 'post') {
      config.data = Qs.stringify(config.data)
    }
    NetInfo.fetch().then(state => {
      if(!state.isConnected) {
        Toast.show('网络连接失败', {
          duration: Toast.durations.LONG,
          position: 0,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 1000
        })
      }
    });
    // console.log(config)
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    if(response.data.status !== 100000500){
      return response.data.data
    }
      return response
  },
  error => {
    // console.log('errr', error)
    return Promise.reject(error)
  }
)

export default service