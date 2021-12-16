import React from 'react'
import { View, Text, StyleSheet,TextInput,Image,TouchableOpacity } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler'
export default function Card({
    decription='Lagunitas ipa ',
navigation ,
onPress
}) {
  return (
    <>
    <View
    style={styles.card}>
    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <Text style={{fontSize:20,color:"#c3b9ad",fontFamily:"Oswald-Medium"}}>23</Text>    
        <Image style={{width:30,height:100,resizeMode:"contain"}} source={require('../../assets/images/wine6.png')} />
        <TouchableOpacity
        
        activeOpacity={0.9}
        onPress= {onPress}>
        <Image style={{width:30,height:30,resizeMode:"contain"}} source={require('../../assets/images/scan.png')} />
        </TouchableOpacity>
    </View>   
    <Text style={styles.text0}>{decription}<Text style={{color:'#e74a07'}}>$6.00</Text ></Text>
    <View style={{marginVertical:6}}>
        <View style={{backgroundColor:"#f3e7db",borderRadius:4,paddingHorizontal:4,paddingVertical:2,width:50,height:22,alignItems:"center"}}>
            <Text style={styles.text1}>Abv 4.2</Text>
        </View>
    </View>
    </View>     
    </>
  )
}

const styles = StyleSheet.create({
    card:{
        backgroundColor:"#ffffff",
        paddingHorizontal:22,
        paddingVertical:10,
        borderRadius:10,
        // elevation:2,
        // shadowColor:"#000",
        // shadowOpacity:0.9,
    },
    text1:{
        color:"#7f705d",
        fontSize:10,
        fontFamily:"Oswald-Regular"
    },
    text0:{
        color:"#000000",
        paddingTop:10,
        fontFamily:"Oswald-Bold",
        fontSize:12,
    },
})