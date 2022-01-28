import React, {useState,useEffect} from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from 'react-native'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Input } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import Feather from 'react-native-vector-icons/Feather'
import { ChangePasswordAction } from '../../stores/actions/user.action';
const ChangePassword = ({ navigation, user,ChangePasswordAction }) => {
    const newData = useSelector((state) => state.userReducer.users)
    const dispatch = useDispatch()
    const [hideEye, setHideEye] = useState()
    const [hideEye1, setHideEye1] = useState()
    const [password,setPassword] = useState()
    const [confirmPassword,setContirmPassword] = useState()
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setPassword(newData?.old_password)
        setContirmPassword(newData?.new_password);
    }, [])

    const onSubmit = (data) => {
        setIsLoading(true);
        var data1 = new FormData();
        data1.append('old_password', password);
        data1.append('new_password', confirmPassword);
        
        if (typeof password !== 'undefined' || typeof confirmPassword !== 'undefined'){
            
            ChangePasswordAction(data1)
            .then(res => {
              // console.log("------------------------------")
                    console.log("res",res)
                    navigation.navigate('AppStackNavigator', {
                        screen: 'Home'
                    })
                    alert(res.message)
                    setContirmPassword('')
                    setPassword('')
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
        else{
            alert('please fill all fields')
            setIsLoading(false)
        }
      
    }
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.textForgot}>Change Password</Text>
                <View>
                    <Image style={styles.inputLogo} source={require('../../assets/images/password.png')} />
                    <Input
                        inputContainerStyle={styles.borderdv}
                        //  onFocus={()=>setToggleUser4(1)}
                        //  onBlur={()=>setToggleUser4(0)}
                        onChangeText={(text) => setPassword(text)}
                        style={styles.email}
                        labelStyle={styles.label}
                        placeholderTextColor="#00000060"
                        label="Old Password"
                        placeholder='************'
                        secureTextEntry={hideEye ? false : true}
                        value={password}
                    />
                          <Feather
                    style={styles.eyeIcon}
                    name={hideEye ? 'eye' : 'eye-off'} 
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
                        onChangeText={(text) => setContirmPassword(text)}
                        style={styles.email}
                        labelStyle={styles.label}
                        placeholderTextColor="#00000060"
                        label="New Password"
                        placeholder='************'
                        secureTextEntry={hideEye1 ? false : true}
                        value={confirmPassword}
                    />
                    <Feather
                    style={styles.eyeIcon}
                    name={hideEye ? 'eye' : 'eye-off'} 
                    size={18} color={'#c8bcb0'}
                    onPress={() => setHideEye1(!hideEye1)}
                     />
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => onSubmit()}
                        activeOpacity={0.9}>
                       {isLoading? <ActivityIndicator size="small" color="#ffffff" />:<Text style={{ color: "#fdf0ea", fontSize: 18, fontFamily: "Oswald-Bold" }}>Confirm</Text>} 
                    </TouchableOpacity>
                </View>
                <Text style={styles.textDigit}>Set a new and strong password</Text>
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
    bindActionCreators({ChangePasswordAction}, dispatch);

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
    inputLogo: {
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
        top: 10,
        fontFamily: "Oswald-Regular"
    },
    label: {
        color: "#e84a03",
        paddingLeft: 25,
        fontSize: 12,
        top: 20,
        fontFamily: "Oswald-Medium"
    },
    borderdv: {
        borderBottomColor: "#e1d5c9",
    },
    textForgot: {
        textAlign: "center",
        fontFamily: "Oswald-Medium",
        fontSize: 32,
        bottom:25,
        color:"#000000"
    },
    textDigit: {
        textAlign: "center",
        fontFamily: "Oswald-Regular",
        fontSize: 14,
        paddingHorizontal: 20,
        marginTop: 20,
        color: "#85796d",
    },
    eyeIcon:{
        position:"absolute",
        left: "83%",
        bottom: "39%",
        paddingHorizontal: "6%",
        paddingVertical: "2%",
      
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)