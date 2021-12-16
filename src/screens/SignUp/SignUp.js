import React,{useState} from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { connect, useDispatch } from 'react-redux'
import { Input } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather'
const SignUp = ({ navigation, user }) => {
    const dispatch = useDispatch()
    const [hideEye, setHideEye] = useState()
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={'#f8ece0'} />

            <View style={styles.container} >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={styles.text1}>Sign up</Text>
                        <View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ width: "50%" }}>
                                    <Image style={styles.inputLogo} source={require('../../assets/images/name.png')} />
                                    <Input
                                        inputContainerStyle={styles.borderdv}
                                        //  onFocus={()=>setToggleUser4(1)}
                                        //  onBlur={()=>setToggleUser4(0)}
                                        // style={styles.email}
                                        style={{
                                            paddingLeft: 1,
                                            fontSize: 12,
                                            color: "#000002",
                                            top: 12,
                                            fontFamily: "Oswald-Regular"
                                        }}
                                        labelStyle={styles.label}
                                        label="First Name"
                                        placeholder='Edward Davidson'
                                        placeholderTextColor="#000000"
                                    />
                                </View>
                                <View style={{ width: "50%" }}>
                                    <Image style={styles.inputLogo} source={require('../../assets/images/name.png')} />
                                    <Input
                                        inputContainerStyle={styles.borderdv}
                                        //  onFocus={()=>setToggleUser4(1)}
                                        //  onBlur={()=>setToggleUser4(0)}
                                        style={{
                                            flex: 1, paddingLeft: 1,
                                            fontSize: 12,
                                            color: "#000002",
                                            top: 12,
                                            fontFamily: "Oswald-Regular"
                                        }}
                                        labelStyle={styles.label}
                                        label="Last Name"
                                        placeholder='Edward Davidson'
                                        placeholderTextColor="#000000"
                                    />
                                </View>
                            </View>
                            <View>

                                <Image style={styles.inputLogo} source={require('../../assets/images/date.png')} />
                                <Input
                                    inputContainerStyle={styles.borderdv}
                                    //  onFocus={()=>setToggleUser4(1)}
                                    //  onBlur={()=>setToggleUser4(0)}
                                    style={styles.email}
                                    labelStyle={styles.label}
                                    placeholderTextColor="#000000"
                                    label="Date of Birth"
                                    placeholder='25 Oct, 1985'
                                />
                            </View>
                            <View>

                                <Image style={styles.inputLogo} source={require('../../assets/images/email.png')} />
                                <Input
                                    inputContainerStyle={styles.borderdv}
                                    //  onFocus={()=>setToggleUser4(1)}
                                    //  onBlur={()=>setToggleUser4(0)}
                                    style={styles.email}
                                    labelStyle={styles.label}
                                    placeholderTextColor="#000000"
                                    label="Email Address"
                                    placeholder='adwardg@gmail.com'
                                />
                            </View>
                            <View>
                                <Image style={styles.inputLogo} source={require('../../assets/images/password.png')} />
                                <Input
                                    inputContainerStyle={styles.borderdv}
                                    //  onFocus={()=>setToggleUser4(1)}
                                    //  onBlur={()=>setToggleUser4(0)}
                                    style={styles.email}
                                    labelStyle={styles.label}
                                    placeholderTextColor="#000000"
                                    label="Password"
                                    placeholder='************'
                                    secureTextEntry={hideEye ? true : false}

                                />
                                <Feather
                                    style={styles.eyeIcon}
                                    name={hideEye ? 'eye-off' : 'eye'}
                                    size={18} color={'#c8bcb0'}
                                    onPress={() => setHideEye(!hideEye)}
                                />
                            </View>
                            <View>
                                <Image style={styles.inputLogo} source={require('../../assets/images/password.png')} />
                                <Input
                                    inputContainerStyle={styles.borderdv}
                                    //  onFocus={()=>setToggleUser4(1)}
                                    //  onBlur={()=>setToggleUser4(0)}
                                    style={styles.email}
                                    labelStyle={styles.label}
                                    placeholderTextColor="#000000"
                                    label="Confirm Password"
                                    placeholder='************'
                                    secureTextEntry={hideEye ? true : false}
                                />
                                <Feather
                                    style={styles.eyeIcon}
                                    name={hideEye ? 'eye-off' : 'eye'}
                                    size={18} color={'#c8bcb0'}
                                    onPress={() => setHideEye(!hideEye)}
                                />
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={styles.btn}
                                activeOpacity={0.9}
                            >
                                <Text style={{ color: "#fdf0ea", fontSize: 18, fontFamily: "Oswald-Bold" }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.orLoginContainer}>
                            <View style={styles.linedv}></View>
                            <Text style={{ paddingHorizontal: "1.5%", color: "#8895a3", fontSize: 12, fontFamily: 'Raleway-Regular' }}>Or Sign Up with</Text>
                            <View style={styles.linedv}></View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center", }}>
                            <View style={styles.iconBg}>
                                <AntDesign name='facebook-square' size={25} color={'#254ba0'} />
                            </View>
                            <View style={styles.iconBg}>
                                <Image style={styles.googleLogo} source={require('../../assets/images/google.png')} />
                            </View>
                            <View style={styles.iconBg}>
                                <AntDesign name='twitter' size={25} color={'#1da1f3'} />
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => navigation.navigate('Login')}
                            style={{ marginVertical: "14%", alignItems: "center" }}>
                            <Text style={styles.text3}>Already a member?<Text style={{ color: "#e64902" }}>Login</Text></Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.users
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8ece0",
        paddingHorizontal: 20,
    },
    btn: {
        padding: 12,
        backgroundColor: "#e74a07",
        alignItems: "center",
        borderRadius: 10,

    },
    text1: {
        color: "#000000",
        fontSize: 30,
        fontWeight: "900",
        textAlign: "center",
        paddingVertical: "4%",
        marginTop: "12%",
        fontFamily: "Oswald-Bold"
    },
    text2: {
        color: "#aca094",
        fontSize: 12,
        textAlign: "center",
        lineHeight: 18,
        paddingBottom: "12%",
        fontFamily: "Oswald-Regular"
    },
    email: {
        paddingLeft: 1,
        fontSize: 12,
        color: "#000002",
        top: 12,
        fontFamily: "Oswald-Regular"
    },
    inputLogo: {
        position: "absolute",
        top: 20,
        left: 10,
        height: 15,
        width: 15,
        resizeMode: "contain",
    },
    borderdv: {
        borderBottomColor: "#e1d5c9",
    },
    label: {
        color: "#e84a03",
        paddingLeft: 25,
        fontSize: 12,
        top: 20,
        fontFamily: "Oswald-Regular"
    },
    iconBg: {
        backgroundColor: "#efe3d7",
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 8
    },
    googleLogo: {
        width: 25,
        height: 25
    },
    orLoginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 14
    },
    linedv: {
        width: 25,
        backgroundColor: "#8895a3",
        height: 1,
    },
    text3: {
        color: "#85786f",
        fontFamily: "Oswald-Regular"
    },
    eyeIcon: {
        position: "absolute",
        left: "83%",
        bottom: "39%",
        paddingHorizontal: "6%",
        paddingVertical: "2%",

    }
})
export default connect(mapStateToProps, null)(SignUp)