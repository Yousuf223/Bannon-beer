import React from 'react'
import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
export default function PointCard({
    number = "03",
    title = "Ayinger Brauweisse",
    point="125",
    image= ""
}) {
    return (
        <>
            <View style={styles.card}>
                <View style={{ flexDirection: "row",justifyContent:"space-between" }}>
                    <View style={{flex:2}}>
                        <View style={styles.btn}>
                            <Text style={styles.text}>23 May, 2021</Text>
                        </View>
                        <Text style={styles.title}> <Text style={styles.number}>{number}</Text> {title}</Text>
                        <View style={{ marginVertical: 6 }}>
                            <View style={{ backgroundColor: "#f3e7db", borderRadius: 4, paddingHorizontal: 4, paddingVertical: 2,alignItems:"center",width:50,height:20 }}>
                                <Text style={styles.text1}>Alc 4.2</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",}}>
                        <Image style={{width:38,height:38,marginTop:5}} source={image} />
                        <Text style={styles.text2}>{point}</Text>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        elevation: 2,
        shadowColor: "#fff",
        shadowOpacity: 0.9,
    },
    btn: {
        backgroundColor: "#e74a07",
        borderRadius: 4,
        width: 70, height: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 10,
        textAlign: "center",
        color: "#fff",
        fontFamily:"Oswald-Regular"
    },
    text1: {
        color: "#7f705d",
        fontSize: 10,
        fontFamily:"Oswald-Regular"
    },
    text2:{
        color:"#e84907",
        fontSize:22,
        fontFamily:"Oswald-Medium"
    },
    number:{
        color:"#c5b9ad",
       fontWeight:"bold",
       fontSize:16
    },
    title:{
        color:"#000000",
        fontSize:16,
        fontFamily:"Oswald-Medium"

    }
})