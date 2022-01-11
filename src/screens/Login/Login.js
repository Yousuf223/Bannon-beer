import React, { useState } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    ScrollView
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { connect,useSelector, useDispatch } from 'react-redux'
import { Input } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather'
import { useForm, Controller } from "react-hook-form";
// import { userLogin } from '../../stores/actions/user.action';
import { bindActionCreators } from 'redux';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { userLogin } from '../../stores/actions/user.action';
import AsyncStorage from '@react-native-async-storage/async-storage';

// var email = "yousuf@gmail.com";
// var password = "111111"
const Login = ({ navigation, user,userLogin }) => {
    const dispatch = useDispatch()
    const [hideEye, setHideEye] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm();
    const count = useSelector((state) => state.userReducer.users)
    const onSubmit  = (data) => {
        // console.log(data,"****DATA****");
        var data1 = new FormData();

      data1.append('email', data.Email);
      data1.append('password', data.Password);
      
        userLogin(data1)
        .then(res => {
            if(res.success){
                // console.log("hdhchdf",res)
                saveToken(res.access_token);
                navigation.navigate('AppStackNavigator', {
                    screen: 'Home'
                  })

                 
            }
            else{
                alert(res.message)
            }
            // console.log('error', err);
            
            // console.log("res", res)
        })
        .catch(err => {
            alert(err.message)
            console.log('error', err);
        })

        // alert(data)
        // navigation.navigate('AppStackNavigator', {
        //     screen: 'Home'
        //   })
        // setIsLoading(true);
        // auth().signInWithEmailAndPassword(data.Email, data.Password).then(async (userCredential) => {
        //     setIsLoading(false);
        //     const token = await userCredential.user.getIdToken(true);
        //     await saveToken(token);
        //     await userLogin(token);
        //     navigation.navigate('AppStackNavigator', {
        //         screen: 'Home',
        //     })
        // })
        //     .catch(error => {
        //         setIsLoading(false);
        //         if (error.code === 'auth/email-already-in-use') {
        //             alert('That email address is already in use!');
        //         }

        //         if (error.code === 'auth/invalid-email') {
        //             alert('That email address is invalid!');
        //         }

        //         if (error.code === 'auth/wrong-password') {
        //             alert('The password is invalid');
        //         }

        //         //console.error(error);
        //     });
    };

    const saveToken = async (token) => {
        try {
            await AsyncStorage.setItem("token", token);
        } catch (e) {
            console.log(e,"saving token failed");
        }
    };

      //Geogle Login
      GoogleSignin.configure({
        webClientId: '576462266383-ic93bk345jcfhbjtsrtls5k28kfk0a19.apps.googleusercontent.com',
      });

      async function onGoogleButtonPress() {
        // Get the users ID token
    
    
        const { idToken } = await GoogleSignin.signIn();
    
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
        // Sign-in the user with the credential
        auth().signInWithCredential(googleCredential).then(async (userCredential) => {
            const token = await userCredential.user.getIdToken(true);
            await saveToken(token);
            await userLogin(token);
          navigation.navigate('AppStackNavigator', {
            screen: 'Home',
        })
        }).catch(error => {
            console.log("google login error", error)
        });
      }

      

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={'#f8ece0'} />
            <SafeAreaView style={styles.container} >
                <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={styles.text1}>Login</Text>
                        <Text style={styles.text2}>Quiz ipsum suspendisses ultrices gravida.Risus commodo viverra maecenas accumsam lacus,facilisis</Text>
                        <View style={{ paddingHorizontal: 20 }}>
                            <View>
                                <Image style={styles.inputLogo} source={require('../../assets/images/email.png')} />
                                <Controller
                                    control={control}
                                    rules={{
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "invalid email address"
                                        }
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            inputContainerStyle={styles.borderdv}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            style={styles.email}
                                            labelStyle={styles.label}
                                            placeholderTextColor="#000000"
                                            label="Email"
                                            placeholder='edwardd@gmail.com'
                                        />
                                    )}
                                    name="Email"
                                    defaultValue=""
                                />
                                {errors.Email && <Text style={{ color: "#d73a49", position: "relative", bottom: "20%", fontSize: 14, paddingLeft: 15 }}>Enter valid Email</Text>}
                            </View>
                            <View>
                                <Image style={styles.inputLogo} source={require('../../assets/images/password.png')} />
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                    inputContainerStyle={styles.borderdv}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    style={styles.email}
                                    labelStyle={styles.label}
                                    placeholderTextColor="#000000"
                                    label="Password"
                                    placeholder='************'
                                    secureTextEntry={hideEye ? true : false}
                                />
                                    )}
                                    name="Password"
                                    defaultValue=""
                                />
                                {errors.Password && <Text style={{ color: "#d73a49", position: "relative", bottom: "30%", fontSize: 14, paddingLeft: 15 }}>Emter Password</Text>}
                                <Feather
                                    style={styles.eyeIcon}
                                    name={hideEye ? 'eye-off' : 'eye'}
                                    size={18} color={'#c8bcb0'}
                                    onPress={() => setHideEye(!hideEye)}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            {/* <Text style={{color:"#ada097",fontWeight:"bold",fontSize:12,fontFamily:"Oswald-Regular"}}>Remember</Text> */}
                            <Text onPress={() => navigation.navigate('ForgotPassword')} style={{ color: "#ada097", fontWeight: "bold", fontSize: 12, fontFamily: "Oswald-Regular" }}>Forgot Password?</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                      style={styles.btn}
                                      activeOpacity={0.9}
                                      onPress={handleSubmit(onSubmit)}
                                >
                                    {isLoading?<ActivityIndicator size="small" color="#ffffff"></ActivityIndicator>: <Text style={{ color: "#fdf0ea", fontSize: 18, fontFamily: "Oswald-Bold" }}>Login</Text>}
                               
                            </TouchableOpacity>
                        </View>
                        <View style={styles.orLoginContainer}>
                            <View style={styles.linedv}></View>
                            <Text style={{ paddingHorizontal: "1.5%", color: "#8895a3", fontSize: 12, fontFamily: "Oswald-Regular" }}>Or Login with</Text>
                            <View style={styles.linedv}></View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center", }}>
                            <View style={styles.iconBg}>
                                <Image style={styles.googleLogo} source={require('../../assets/images/FB.png')} />
                            </View>
                            <TouchableOpacity 
                            onPress={() => onGoogleButtonPress()}
                            activeOpacity={0.9}
                            style={styles.iconBg}>
                                <Image style={styles.googleLogo} source={require('../../assets/images/google.png')} />
                            </TouchableOpacity>
                            <View style={styles.iconBg}>
                                <AntDesign name='twitter' size={25} color={'#1da1f3'} />
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => navigation.navigate('SignUp')}
                            style={{ marginVertical: "14%", alignItems: "center" }}>
                            <Text style={styles.text3}>Not a member?  <Text style={{ color: "#e64902" }}>Sign Up</Text></Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView >
        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.users
    }
};
const mapDispatchToProps = dispatch =>
    bindActionCreators({ userLogin }, dispatch);
 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f8ece0",
        justifyContent: "center",
        paddingHorizontal: 20
    },
    btn: {
        padding: 12,
        backgroundColor: "#e74a07",
        alignItems: "center",
        borderRadius: 10,
        marginHorizontal: 20
    },
    text1: {
        color: "#000000",
        fontSize: 30,
        fontWeight: "900",
        textAlign: "center",
        paddingVertical: "4%",
        marginTop: "6%",
        fontFamily: 'Oswald-Bold',
    },
    text2: {
        color: "#aca094",
        fontSize: 12,
        textAlign: "center",
        lineHeight: 18,
        paddingBottom: "12%",
        fontFamily: 'Oswald-Regular',
        paddingHorizontal: 20
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
    borderdv: {
        borderBottomColor: "#e1d5c9",
    },
    label: {
        color: "#e84a03",
        paddingLeft: 25,
        fontSize: 12,
        top: 20,
        fontFamily: "Oswald-Medium"
    },
    row: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 20,
        paddingHorizontal: 20
    },
    iconBg: {
        backgroundColor: "#efe3d7",
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 8
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
        fontFamily: "Oswald-Regular",
        marginTop: 14,
    },
    googleLogo: {
        width: 25,
        height: 25
    },
    eyeIcon: {
        position: "absolute",
        left: "83%",
        bottom: "39%",
        paddingHorizontal: "6%",
        paddingVertical: "2%",

    }
})
export default connect(mapStateToProps,mapDispatchToProps)(Login)