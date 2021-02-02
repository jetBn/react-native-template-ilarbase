import React from 'react'
import { Modal, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { calc, sT } from '../../utils/sizeAdapt'
import RNExitApp from 'react-native-exit-app'
import { setPrivacyTag } from '../../utils/storage'

const PrivacyModal = React.memo(({ modalVisible, navigation, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
      visible={modalVisible}>
      <View style={styles.mainBox}>
        <View style={styles.content}>
          <View style={styles.topBox}>
            <Text style={styles.title}>服务协议和隐私政策</Text>
            <View style={styles.topTextBox}>
              <Text style={styles.contentText}>
                非常感谢您使用我们的产品。请阅读
                <Text
                  style={styles.link}
                  onPress={() => {
                    onClose()
                    navigation.navigate('WebView', {
                      url: 'http://wa.xiyiyi.com/doc/flowerrecgnize/privacy',
                      title: '隐私政策'
                    })
                  }}>
                  《隐私政策》
                </Text>
                <Text
                  style={styles.link}
                  onPress={() => {
                    onClose()
                    navigation.navigate('WebView', {
                      url: 'http://wa.xiyiyi.com/doc/flowerrecgnize/rule',
                      title: '服务协议'
                    })
                  }}>
                  《服务协议》
                </Text>
                和 了解详细信息，如您同意，请点击“同意"开始使用我们的产品与服务
              </Text>
            </View>
          </View>
          <View style={styles.sheet}>
            <TouchableOpacity
              style={styles.sheetItem}
              activeOpacity={1}
              onPress={() => {
                setPrivacyTag('true')
                onClose()
              }}>
              <Text style={{ fontSize: sT(16), color: '#38C2BB' }}>
                同意，开始使用
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sheetItem}
              activeOpacity={1}
              onPress={() => RNExitApp.exitApp()}>
              <Text style={{ fontSize: sT(16), color: '#666666' }}>
                我不同意，退出
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
})

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    width: calc(305),
    // height: calc(243, 'height'),
    backgroundColor: '#fff',
    borderRadius: calc(4)
  },
  topBox: {
    paddingBottom: calc(12),
    paddingHorizontal: calc(20)
  },
  title: {
    fontSize: sT(17),
    color: '#333',
    textAlign: 'center',
    marginTop: calc(19),
    marginBottom: calc(13)
  },
  topTextBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  contentText: {
    fontSize: sT(14),
    color: '#333',
    lineHeight: calc(19)
  },
  sheetItem: {
    paddingTop: calc(13),
    paddingBottom: calc(16),
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#E5E5E5'
  },
  link: {
    color: '#108EE9'
  }
})

export default PrivacyModal
