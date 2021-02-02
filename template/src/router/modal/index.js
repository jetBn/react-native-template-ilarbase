import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Record from '../../pages/record'

const ModalStack = createStackNavigator()

const ModalRouters = () => {
  return (
    <ModalStack.Navigator>
      <ModalStack.Screen name="MyModal" component={Record} />
    </ModalStack.Navigator>
  )
}

export default ModalRouters
