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
                <View style={{marginTop:"18%",flexDirection:"row"}}>    
                    <AntDesign onPress={() => navigation.goBack()} name='arrowleft' size={23} color={'#85786f'} />
                <Text style={styles.textForgot}>Edit Profile</Text>
                </View>
               <View style={styles.row}>
               <Image style={styles.profile} source={require('../../assets/images/profilePicture.png')} />
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
                                    label="Email Address"
                                    placeholder='adwardg@gmail.com'
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
                                    placeholder='adwardg@gmail.com'
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
                                    placeholder='adwardg@gmail.com'
                                />
                            </View>
               </View>
               <View style={{marginTop:"20%"}}>
               <View style={styles.btn}>
                   <Text>Save Changes</Text>
               </View>
               </View>
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
        fontSize:24,
        paddingLeft:10,
        bottom:5
    },
    profile:{
        width:75,
        height:75
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
    }
})
export default connect(mapStateToProps, null)(EditProfile)