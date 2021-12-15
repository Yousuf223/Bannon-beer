import React from 'react'
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

const SignUp = ({ navigation, user }) => {
    const dispatch = useDispatch()
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={'#f8ece0'} />
          
                <View style={styles.container} >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={styles.text1}>Sign up</Text>
                        <Text style={styles.text2}>Quiz ipsum suspendisses ultrices gravida.Risus commodo viverra maecenas accumsam lacus,facilisis</Text>
                        <View>
                            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                <View style={{width:"50%"}}>
                                    <Image style={styles.inputLogo} source={require('../../assets/images/name.png')} />
                                    <Input
                                        inputContainerStyle={styles.borderdv}
                                        //  onFocus={()=>setToggleUser4(1)}
                                        //  onBlur={()=>setToggleUser4(0)}
                                        // style={styles.email}
                                        style={{    paddingLeft: 1,
                                        fontSize: 12,
                                        color: "#000002",
                                        top: 12,
                                        fontFamily: "Oswald-Regular"}}
                                        labelStyle={styles.label}
                                        label="Full Name"
                                        placeholder='Edward Davidson'
                                    />
                                </View>
                                <View style={{width:"50%"}}>
                                    <Image style={styles.inputLogo} source={require('../../assets/images/name.png')} />
                                    <Input
                                        inputContainerStyle={styles.borderdv}
                                        //  onFocus={()=>setToggleUser4(1)}
                                        //  onBlur={()=>setToggleUser4(0)}
                                        style={{flex:1,         paddingLeft: 1,
                                        fontSize: 12,
                                        color: "#000002",
                                        top: 12,
                                        fontFamily: "Oswald-Regular"}}
                                        labelStyle={styles.label}
                                        label="Last Name"
                                        placeholder='Edward Davidson'
                                    />
                                </View>
                                </View>
                                <View>
                                
                                <Image style={styles.inputLogo} source={require('../../assets/images/email.png')} />
                                <Input
                                    inputContainerStyle={styles.borderdv}
                                    //  onFocus={()=>setToggleUser4(1)}
                                    //  onBlur={()=>setToggleUser4(0)}
                                    style={styles.email}
                                    labelStyle={styles.label}
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
                                    label="Password"
                                    placeholder='************'
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
                                    label="Confirm Password"
                                    placeholder='************'
                                />
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={styles.btn}
                                //   activeOpacity={0.9}
                                onPress={() => {
                                    navigation.navigate('AppStackNavigator', {
                                        screen: 'Home',
                                    })
                                }}>
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
                        <View style={{ marginVertical: "14%", alignItems: "center" }}>
                            <Text style={styles.text3}>Already a member?<Text style={{ color: "#e64902" }}>Login</Text></Text>
                        </View>
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
        marginTop: "18%",
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
    }
})
export default connect(mapStateToProps, null)(SignUp)