import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Index from '../../pages/index'
import WebViewPage from '../../pages/webview'

const MainStack = createStackNavigator()

const MainPages = () => {
  return (

    <MainStack.Navigator>
      <MainStack.Screen
        name="Index"
        component={Index}
        options={{
          headerShown: false
        }}
      />
      <MainStack.Screen name="WebView" component={WebViewPage} options={{}} />
    </MainStack.Navigator>
  )
}

export default MainPages
