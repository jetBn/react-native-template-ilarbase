import React, { useEffect, useState } from 'react'
import { WebView } from 'react-native-webview'

const WebViewPage = ({ route, navigation }) => {
  const [url, setUrl] = useState('')
  useEffect(() => {
    setUrl(route.params.url)
    navigation.setOptions({
      title: route.params.title
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <WebView source={{ uri: url }} />
}
export default WebViewPage
