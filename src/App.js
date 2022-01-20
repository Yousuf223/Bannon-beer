import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import MainNavigation from './navigation/navigation'
import { Provider } from 'react-redux'
import { store } from './stores'
import SplashScreen from 'react-native-splash-screen'
import messaging from '@react-native-firebase/messaging';


const App = () => {
  
  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
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
