import React from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { Input } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign'
const EditProfile = ({ navigation, user }) => {
    const dispatch = useDispatch()

    return (
        <>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginTop:"18%",flexDirection:"row"}}>    
                    <AntDesign onPress={() => navigation.goBack()} name='arrowleft' size={23} color={'#85786f'} />
                <Text style={styles.textForgot}>Edit Profile</Text>
                </View>
               <View style={styles.row}>
               <Image style={styles.profile} source={require('../../assets/images/profilePicture.png')} />
               <Image style={styles.camera} source={require('../../assets/images/editCamera.png')} />
               </View>
               <View>
               <View>
                                
                                <Image style={styles.inputLogo} source={require('../../assets/images/email.png')} />
                                <Input
                                    inputContainerStyle={styles.borderdv}
                                    //  onFocus={()=>setToggleUser4(1)}
                                    //  onBlur={()=>setToggleUser4(0)}
                                    style={styles.email}
                                    labelStyle={styles.label}
                                    label="First Name"
                                    placeholder='Edward'
                                    placeholderTextColor="#000000"
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
                                    label="Last Name"
                                    placeholder='Davidson'
                                    placeholderTextColor="#000000"
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
                                    label="Email Address"
                                    placeholder='edwardd@gmail.com'
                                    placeholderTextColor="#000000"
                                />
                            </View>
               </View>
               <View style={{marginVertical:"20%"}}>
               <View style={styles.btn}>
                   <Text style={{ color: "#fdf0ea",  fontSize: 16,fontFamily:"Oswald-Bold" }}>Save Changes</Text>
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
         backgroundColor: "#f8ece0",
        paddingHorizontal: 20,
    },
    textForgot:{
        fontFamily:"Oswald-Medium",
        fontSize:18,
        paddingLeft:10,
        bottom:6,
        color:"#000000"
    },
    profile:{
        width:85,
        height:85
      },
      row:{
          alignItems:"center",
          paddingVertical:20,
          marginTop:10
      },
      email: {
        paddingLeft: 1,
        fontSize: 12,
        color: "#000002",
        top: 10,
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
        top: 18,
        fontFamily: "Oswald-Regular"
    },
    btn:{
        padding: 12,
        backgroundColor: "#e74a07",
        alignItems: "center",
        borderRadius: 10,
    },
    camera:{
        width:25,
        height:25,
        position:"absolute",
        top:"100%",
        right:"34%"
    }
})
export default connect(mapStateToProps, null)(EditProfile)