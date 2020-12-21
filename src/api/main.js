/*
 * @Descripttion: 
 * @version: 
 * @Author: WGQ
 * @Date: 2020-11-30 18:27:33
 * @LastEditors: WGQ
 * @LastEditTime: 2020-12-11 16:39:09
 */
import fetch from '../utils/request'

export const createTempUser = (params) => {
  return fetch({
    url: '/appapi/auth/create_temp_user',
    method: 'GET',
    params
  })
}


export const reqinAppPurchase = (params) => {
  return fetch({
    url: '/appapi/user/translatecamera/inapppurchase',
    method: 'POST',
    data: params
  })
}

export const reqUserMemberShip = (params) => {
  return fetch({
    url: '/appapi/user/translatecamera/merbership',
    method: 'GET',
    params
  })
}