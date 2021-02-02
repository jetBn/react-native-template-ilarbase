import { BASE_URL } from '../config'
import RNFetchBlob from 'rn-fetch-blob'
import { getToken, getThemeType } from './storage'
import { Platform, Dimensions } from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";

export const uploadImage = (data) => {
  const { apiUrl, fileName, fileURI, filePath, fromLang, toLang } = data

  return new Promise(async (reslove, reject) => {
    const token = await getToken()
    const realPath = Platform.OS === 'ios' ? fileURI.replace('file://', '') : fileURI;
    RNFetchBlob.fetch(
      'POST',
      BASE_URL + apiUrl,
      {
        token,
        'Content-Type': 'multipart/form-data'
      },
      [
        {
          name: 'image',
          filename: fileName,
          type:'image/jpeg',
          // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
          // Or simply wrap the file path with RNFetchBlob.wrap().
          // data: RNFetchBlob.wrap(Platform.OS === 'ios' ? fileURI.replace("file://","") : filePath)
          data: RNFetchBlob.wrap(decodeURIComponent(realPath))
        },
        {name: 'from_lang', data: fromLang},
        {name: 'to_lang', data: toLang}
      ]
    )
      .uploadProgress((written, total) => {
        console.log('uploaded', written / total)
      })
      .then((response) => {
        reslove(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const checkIsLogin = () => {
  return new Promise(async(reslove, reject) => {
    const token = await getToken()
    if(token !== '') {
      reslove(true)
    } else {
      reject(false)
    }
  })
}

export const isIPhoneX = () => {
  const X_WIDTH = 375
  const X_HEIGHT = 812
  const XSMAX_WIDTH = 414
  const XSMAX_HEIGHT = 896
  const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window')
  return (
    (Platform.OS === 'ios' &&
      ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
        (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))) ||
    (D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
    (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT)
  )
}


export const checkedThemeType = async () => {
  const res = await getThemeType()
  if(res === 'auto-system' || res ==='') {
    return 'auto'
  } else {
    return 'manual'
  }
}


export const saveImg2Album = (img)=> {
  return new Promise((reslove, reject)=> {
      // if (Platform.OS === 'ios') {
        let promise = CameraRoll.save(img, { type:'photo' });
        promise.then(function (result) {
            reslove(result)
        }).catch(function (error) {
          reject(error)
        });
    // } else {
    //     // const RNFS = require('react-native-fs'); //文件处理
    //     const storeLocation = `${RNFS.DocumentDirectoryPath}`;
    //     let pathName = new Date().getTime() + Math.random(1000, 9999) + ".png";
    //     let downloadPath = `${storeLocation}/${pathName}`;
    //     const ret = RNFS.downloadFile({fromUrl: img, toFile: downloadPath});
    //     ret.promise.then(res => {
    //         if (res && res.statusCode === 200) {
    //             var promise = CameraRoll.saveToCameraRoll("file://" + downloadPath);
    //             promise.then(function (result) {
     
    //                 reslove(result)
    //             }).catch(function (error) {
                 
    //                 reject(error)
    //             })
    //         }
    //     })
    // }
  })
 
}
