import AsyncStorage from '@react-native-community/async-storage'

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token)
  } catch (error) {
    // Error saving data
  }
}

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token')
    if (value !== null) {
      return value
    }
    return ''
  } catch (error) {
    console.log(error)
    // Error saving data
  }
}

export const setPrivacyTag = async (data) => {
  try {
    await AsyncStorage.setItem('privacy-tag', data)
  } catch (error) {
    // Error saving data
  }
}

export const getPrivacyTag = async () => {
  try {
    const value = await AsyncStorage.getItem('privacy-tag')
    if (value !== null) {
      return value
    }
    return ''
  } catch (error) {
    console.log(error)
    // Error saving data
  }
}

export const rmPrivacyTag = async () => {
  try {
    await AsyncStorage.removeItem('privacy-tag')
  } catch (e) {
    // remove error
  }
}
