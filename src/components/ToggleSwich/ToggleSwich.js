import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'

const ToggleSwich = ({
  navigation,
  selectionMode,
  onSelectSwitch
  //   selectionColor,
  //   roundCorner,
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode)
  //   const [getRoundCorner, setRoundCorner] = useState(roundCorner)

  const updatedSwitchData = val => {
    setSelectionMode(val)
    onSelectSwitch(val)
  }

  return (
    <TouchableOpacity
      onPress={() => updatedSwitchData(getSelectionMode == 1 ? 2 : 1)}
      activeOpacity={.9}
    >
      <View
        style={{
          width: 36,
          height: 18,
          borderRadius: 30,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 2,
          backgroundColor:"#de4907",
          borderRadius:20
        }}>
        <View
          style={{
            height: 14,
            width: 14,
            borderRadius: 7,
            backgroundColor: getSelectionMode == 1 ? '#fff' : 'transparent'
          }}
          // onPress={() => updatedSwitchData(1)}
          ></View>

        <View
          style={{
            height: 14,
            width: 14,
            borderRadius: 7,
            backgroundColor: getSelectionMode == 2 ? '#fff' : 'transparent'
          }}
          // onPress={() => updatedSwitchData(2)}
        ></View>
      </View>
    </TouchableOpacity>
  )
}
export default ToggleSwich