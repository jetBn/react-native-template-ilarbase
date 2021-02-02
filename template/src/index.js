import React from 'react'
import Router from './router'
import { Provider } from '@ant-design/react-native'


const App = () => {
    return (
      <Provider>
          <Router />
      </Provider>
    )
  
}

export default App
