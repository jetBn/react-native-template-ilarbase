import React, { useEffect, useState, Fragment, useRef } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Platform,
  StatusBar,
} from 'react-native'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import PrivacyModal from '../../components/PrivacyModal'
import { getPrivacyTag } from '../../utils/storage'

Text.defaultProps = Object.assign({}, Text.defaultProps, {
  allowFontScaling: false
})

const MainContent = React.memo(({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Text>Hello</Text>
    </SafeAreaView>
  )
})

const Index = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    const deviceType = Platform.OS === 'android' ? 2 : 1
    StatusBar.setBarStyle('dark-content')
    Platform.OS === 'android' && StatusBar.setBackgroundColor('#fff')
    const unsubscribe = navigation.addListener('focus', async () => {
      getPrivacyTag().then((res) => {
        if (res !== 'true') {
          setModalVisible(true)
        }
      })
    })
    return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation])

  return (
    <Fragment>
      <FocusAwareStatusBar hidden></FocusAwareStatusBar>
      <MainContent navigation={navigation} />
      <PrivacyModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
      />
    </Fragment>
  )
}

const styles = StyleSheet.create({

})

export default Index
