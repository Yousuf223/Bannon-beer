import React from 'react'
import { View, Text, StyleSheet, TextInput, Image, Linking, TouchableOpacity } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
export default function QRScaner({
    navigation
}) {
    const onSuccess = (e) => {
        Linking.openURL(e.data).catch(err =>
            console.error('An error occured', err)
        );
    };
    return (
        <>
            <QRCodeScanner
                onRead={onSuccess}
                // onRead={onSuccess()}
                flashMode={RNCamera.Constants.FlashMode.torch}
                // topContent={
                //   <Text style={styles.centerText}>
                //     Go to
                //     <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                //     your computer and scan the QR code.
                //   </Text>
                // }
                bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                        <View style={{ flexDirection: "row",alignItems:"center" }}>
                            <Image style={{ width: 100, height: 100, resizeMode: "contain", }} source={require('../../assets/images/wine2.png')} />
                            <View >
                                <Text>02<Text></Text>Odell 90 Shilling</Text>
                                <View style={{ marginVertical: 6 }}>
                                    <View style={{ backgroundColor: "#f3e7db", borderRadius: 4, paddingHorizontal: 4, paddingVertical: 2, width: 50, height: 18, alignItems: "center" }}>
                                        <Text style={styles.text1}>Abv 4.2</Text>
                                    </View>
                                    <Text style={{
                                            color: '#e74a07', fontFamily: "Oswald-Bold",
                                            fontSize: 12,
                                            marginTop:1
                                        }}>$6.00</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                }
            />
        </>
    )
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    buttonTouchable: {
        backgroundColor: "#fff",
        top: 20,
        width: "85%",
        height: "50%",
        borderRadius: 10
    },
    text1: {
        color: "#7f705d",
        fontSize: 10,
        fontFamily: "Oswald-Regular"
    },
})