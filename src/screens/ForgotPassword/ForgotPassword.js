import React,{useState,useEffect} from 'react'
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
import { connect, useDispatch, useSelector } from 'react-redux'
import { Input } from 'react-native-elements';
import { ForgotPasswordAction } from '../../stores/actions/user.action';
import { bindActionCreators } from 'redux';
const ForgotPassword = ({ navigation, user,ForgotPasswordAction }) => {
    const dispatch = useDispatch()
    const newData = useSelector((state) => state.userReducer.users)
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState()

    // useEffect(() => {
    //     setEmail(newData?.email)
    // }, [])
    // console.log('forgotPassword',newData)
    const onSubmit = (data) => {
        setIsLoading(true);
        var data1 = new FormData();
        data1.append('email', email)
        console.log('forgot',email)
            ForgotPasswordAction(data1)
            .then(res => {
              // console.log("------------------------------")
                    console.log("res",res)
                    Alert.alert("O'Bannon's",'Please Valid email')
                    // alert(res.message)
                 setEmail('')
          //         //  onPress={() => navigation.goBack()}
          setIsLoading(false)
                // console.log('error', err);
                
                // console.log("res", res)
            })
            .catch(err => {
                
                console.log('error', err);
                setIsLoading(false)
            })
        
      
    }
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.textForgot}>Forgot Password</Text>
                <View>
                            <Image style={styles.inputLogo} source={require('../../assets/images/email.png')} />
                            <Input
                                inputContainerStyle={styles.borderdv}
                                //  onFocus={()=>setToggleUser4(1)}
                                //  onBlur={()=>setToggleUser4(0)}
                                style={styles.email}
                                labelStyle={styles.label}
                                label="Email"
                                placeholder='edwardd@gmail.com'
                                placeholderTextColor="#00000060"
                                onChangeText={(text) => setEmail(text)}
                            />
                            </View>
                <View>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={()=> onSubmit()}
                        activeOpacity={0.9}>
                        <Text style={{ color: "#fdf0ea", fontSize: 18, fontFamily: "Oswald-Bold" }}>Confirm</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.textDigit}>4 digit code well be send on your email address with further instructions</Text>
            </View>
        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.users
    }
}
const mapDispatchToProps = dispatch =>
    bindActionCreators({ForgotPasswordAction}, dispatch);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8ece0",
        paddingHorizontal: 20,
        justifyContent: "center",
    },
    btn: {
        padding: 12,
        backgroundColor: "#e74a07",
        alignItems: "center",
        borderRadius: 10,
    },
    inputLogo:{
        position: "absolute",
        top: 20,
        left: 10,
        height: 15,
        width: 15,
        resizeMode: "contain",
    },
    email: {
        paddingLeft: 1,
        fontSize: 12,
        color: "#000000",
        top:10,
        fontFamily:"Oswald-Regular"
    },
    label: {
        color: "#e84a03",
        paddingLeft: 25,
        fontSize: 12,
        top:20,
        fontFamily:"Oswald-Medium"
    },
    borderdv: {
        borderBottomColor: "#e1d5c9",
    },
    textForgot:{
        textAlign:"center",
        fontFamily:"Oswald-Medium",
        fontSize:32,
        bottom:25,
        color:"#000000"
    },
    textDigit:{
        textAlign:"center",
        fontFamily:"Oswald-Regular",
        fontSize:14,
        paddingHorizontal:20,
        marginTop:20,
        color:"#85796d",
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(ForgotPassword)
