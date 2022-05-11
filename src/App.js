import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import MainNavigation from './navigation/navigation'
import { Provider } from 'react-redux'
import { store } from './stores'
import SplashScreen from 'react-native-splash-screen'
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native'

const App = () => {
  
  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(remoteMessage.notification.title,remoteMessage.notification.body);
      console.log('remoteMessageremoteMessage',remoteMessage)
      });
    setTimeout(
      () => {
        SplashScreen.hide()
      },
      Platform.OS == 'ios' ? 1000 : 1000
    )

    return unsubscribe;
  }, [])



  return (
    <>
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </>
  )
}

export default App
