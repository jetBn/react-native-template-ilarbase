/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import { Dimensions, PixelRatio, Platform} from 'react-native'

let screenW = 1, screenH = 1

let fontScale = 1

screenH = Dimensions.get('window').height
screenW = Dimensions.get('window').width
fontScale = PixelRatio.getFontScale()


// console.log('size', screenH, screenW)
if(screenW > screenH) {
    screenW = screenH
    screenH =  Dimensions.get('window').width
}


// 设计稿尺寸
const designWidth = 375.0
const designHeight = 667.0

/**
 * 设置text
 * @param size  px
 * @returns {Number} dp
 */
const sT =(size,  screenHeight = screenH, screenWidth = screenW) => {
    let scaleWidth = screenWidth / designWidth
    let scaleHeight = screenHeight / designHeight
    let scale = Math.min(scaleHeight, scaleWidth)
    // console.log(scale, fontScale)
    size = Math.round((size * scale + 0.5) * PixelRatio.get() / fontScale)
    // Platform.OS !== 'android' ?  console.log('ios', PixelRatio.get()) : console.log('android', PixelRatio.get())
    return  Platform.OS !== 'android'?  size / PixelRatio.get()  :size / PixelRatio.get() - 4
}

/**
 * 设置高度
 * @param size  px
 * @returns {Number} dp
 */
const scaleSizeH = (size, screenHeight = screenH) => {
    let scaleHeight = size * (screenHeight / designHeight)
    size = Math.round(scaleHeight)
    return size
}

/**
 * 设置宽度
 * @param size  px
 * @returns {Number} dp
 */
const scaleSizeW = (size, screenWidth = screenW) => {
    let scaleWidth = size * (screenWidth / designWidth)
    size = Math.round(scaleWidth)
    return size
}

const calc = (size, based= 'width', baseNum) => {
    if(based == 'height'){
        return scaleSizeH(size, baseNum)
    } else {
        return scaleSizeW(size, baseNum)
    }
}

export {
    sT,
    calc,
    screenW,
    screenH
}
