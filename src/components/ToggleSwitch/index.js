import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  Alert,
  Modal,
  Pressable,
  Animated,
  Easing,
  TouchableOpacity
} from 'react-native'
import { Images } from '../../constants/images'
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')
import LinearGradient from 'react-native-linear-gradient'

export const ToggleSwitch = ({ 
  navigation, 
  isOn = true,
  onSwitch = (e) => {}
 }) => {
  const animatedValue = React.useRef(new Animated.Value(isOn ? 1 : 0)).current



  const left = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 140],
    extrapolate: 'clamp'
  })

  const [isOnToggle, setIsOn] = useState(isOn)

  const updatedSwitchData = () => {
    if(isOnToggle) {
      setIsOn(false)
      onSwitch(false)
      startAnimation(0)
    }else {
      setIsOn(true)
      onSwitch(true)
      startAnimation(1)
    }
  }

  const startAnimation = toValue => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 275,
      easing: Easing.linear,
      useNativeDriver: false
    }).start()
  }

  return (



      <TouchableOpacity
      style={{
        width: 250,
        height: 120,        
      }}
      activeOpacity={.9}
        onPress={() => {updatedSwitchData()}}
      >
        <LinearGradient
          colors={
            !isOnToggle
              ? ['#E0E5F2', '#E0E5F2']
              : ['#FE0000', '#680000']
          }
          start={{ x: 0.55, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.sliderContainer}>
          <Animated.View style={[styles.slider, { backgroundColor: isOnToggle ? 'pink' : '#fff', left }]}/>          
          <View style={styles.clickableArea}></View>
          <View style={styles.clickableArea}></View>
        </LinearGradient>
      </TouchableOpacity>

      

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'green'
  },
  sliderContainer: {
    // width: 250,
    // height: 120,
    borderRadius: 125,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  clickableArea: {
    width: 115,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sliderText: {
    fontSize: 15,
    fontWeight: '500'
  },
  slider: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
  }
})

