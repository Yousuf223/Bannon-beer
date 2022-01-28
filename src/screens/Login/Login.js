import React, { useState, useEffect } from 'react'
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
import { connect, useSelector, useDispatch } from 'react-redux'
import { Input } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather'
import { useForm, Controller } from "react-hook-form";
// import { userLogin } from '../../stores/actions/user.action';
import { bindActionCreators } from 'redux';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { userLogin, SocialLoginAction } from '../../stores/actions/user.action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { LoginManager, AccessToken, Profile } from 'react-native-fbsdk-next';

// var email = "yousuf@gmail.com";
// var password = "111111"
const Login = ({ navigation, userLogin, SocialLoginAction }) => {
    const dispatch = useDispatch()
    const [hideEye, setHideEye] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm();
    const count = useSelector((state) => state.userReducer.users)



    // useEffect(()=>{
    // if(Object.keys(count).length > 0 ){
    //     console.log('user login and save ')
    // }
    // else {
    //     console.log('data not found ')
    // }



    // },[])



    const onSubmit = (data) => {

        setIsLoading(true);

        // console.log(data,"****DATA****");
        var data1 = new FormData();

        data1.append('email', data.Email);
        data1.append('password', data.Password);
        userLogin(data1)
            .then(res => {
                if (res.success) {
                    setIsLoading(false);
                    console.log("res.access_token on LOGIN",res)
                    saveToken(res.access_token);
                    console.log('abcder----#', res)
                }

                else {
                     alert(res.message)
                     setIsLoading(false);
                }
                // console.log('error', err);

                // console.log("res", res)
            })
            .catch((e)=>{
                console.log('error',e)
                alert('Please enter a valid email')
                setIsLoading(false)
            })
      
    };



    const saveToken = async (token) => {
        try {
            await AsyncStorage.setItem("token", token);
        } catch (e) {
            console.log(e, "saving token failed");
        }
    };

    //Geogle Login
    GoogleSignin.configure({
        webClientId: '576462266383-ic93bk345jcfhbjtsrtls5k28kfk0a19.apps.googleusercontent.com',
    });



    async function onGoogleButtonPress() {
        const { idToken } = await GoogleSignin.signIn();

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        auth().signInWithCredential(googleCredential)
            .then(async (userCredential) => {
                console.log('userdata from google', userCredential)

                var data1 = new FormData();
                data1.append('key', 'aaaabbbbcccc');
                data1.append('email', userCredential.additionalUserInfo.profile.email);
                // var data12 = new FormData();
                // data12.append('key', '$2a$12$Ae/ROvNF9R3e.Sbc7PwLne/yGWn1GJOY.jb7HYXZR9mwS72LwscP6');
                // data12.append('email', 'abcd123@gmail.com');


                data1.append('first_name', userCredential.additionalUserInfo.profile.given_name);
                data1.append('last_name', userCredential.additionalUserInfo.profile.family_name);


                data1.append('profile_picture', userCredential.additionalUserInfo.profile.picture);

                console.log('data12', data1)

                // const token = await userCredential.user.getIdToken(true);
                // console.log('token from google', token)
                // await saveToken(token);
                // navigation.navigate('AppStackNavigator', {
                //     screen: 'Home',
                // })
                SocialLoginAction(data1)
                    .then(res => {
                        saveToken(res?.data?.access_token);
                        // navigation.navigate('AppStackNavigator', {
                        //                 screen: 'Home',
                        //             })
                        console.log("res", res)

                    })
                    .catch(err => {
                        alert(err.message)
                        console.log('error', err);
                    })
                console.log('Yousuf--------------------jjjjj', data1)
                //                    .then( (res)=>{
                //                        console.log('res' , res)
                //                    })
                //                    .catch((error)=>{
                // console.log('error from api', error)
                //                    })

            })
            .catch((error) => {
                console.log('error google', error)
            })
    }

    // async function onGoogleButtonPress() {
    //     // Get the users ID token


    //     const { idToken } = await GoogleSignin.signIn();

    //     // Create a Google credential with the token
    //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    //     // Sign-in the user with the credential
    //     auth().signInWithCredential(googleCredential).then(async (userCredential) => {
    //                     var data1 = new FormData();
    //             data1.append('email', userCredential.additionalUserInfo.profile.email);
    //             data1.append('first_name', userCredential.additionalUserInfo.profile.given_name);
    //             data1.append('last_name', userCredential.additionalUserInfo.profile.family_name);
    //             data1.append('profile_picture', userCredential.additionalUserInfo.profile.picture);
    //             console.log("user---------------------", data1)
    //             //   SocialLoginAction(data1).then((res)=>{
    //             //       console.log('res from api', res)
    //             //   }).catch((e)=>{
    //             //       console.log('error api',e)
    //             //   })
    //         //        .then(res => {
    //         //     // saveToken(res.access_token);
    //         //     // console.log("------------------------------")
    //         //     console.log("res---------------------", res)

    //         // })
    //         .catch(err => {
    //             alert(err)
    //             console.log('error google', err);
    //         })
    //         console.log('userCredentialuserCredentialuserCredentialuserCredential',userCredential)
    //         const token = await userCredential.user.getIdToken(true);
    //         await saveToken(token);
    //         navigation.navigate('AppStackNavigator', {
    //             screen: 'Home',
    //         })
    //     }).catch(error => {
    //         console.log("google login error", error)
    //     });
    // }

    messaging().getToken()
        .then(token => {
            console.log("token", token)
            // alert('Notification send',token)
        })


    // facebook Login

    async function onFacebookButtonPress() {
        // Attempt login with permissions
        // const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        // if (result.isCancelled) {
        //   throw 'User cancelled the login process';
        // }

        // // Once signed in, get the users AccesToken
        // const data = await AccessToken.getCurrentAccessToken();

        // if (!data) {
        //   throw 'Something went wrong obtaining access token';
        // }

        // // Create a Firebase credential with the AccessToken
        // const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // // Sign-in the user with the credential
        // auth().signInWithCredential(facebookCredential).then(async () => {
        //     console.log("facebookCredential FACEBOOK SIGNED IN", facebookCredential)
        //   await  saveToken(facebookCredential.token);
        // }).catch(error => {
        //   console.error(error);
        // });


        LoginManager.logInWithPermissions(["public_profile"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled")
                } else {
                    console.log('resultresultresult', result)

                    Profile.getCurrentProfile().then(async function (currentProfile) {
                        console.log('user facebook------======',currentProfile)
                        var data1 = new FormData();
                data1.append('key', 'aaaabbbbcccc');
                // data1.append('email', currentProfile);
                // var data12 = new FormData();
                // data12.append('key', '$2a$12$Ae/ROvNF9R3e.Sbc7PwLne/yGWn1GJOY.jb7HYXZR9mwS72LwscP6');
                // data12.append('email', 'abcd123@gmail.com');


                data1.append('first_name', currentProfile.firstName);
                data1.append('last_name', currentProfile.lastName);
                data1.append('userID', currentProfile.userID);

                var email;
                email=currentProfile.email
                if(email==null){
                    email=currentProfile.userID
                }
                data1.append('email', email);

                data1.append('profile_picture', currentProfile.imageURL);

                        // console.log('------------------------------------------------------------------',currentProfile)
                        // navigation.navigate('AppStackNavigator', {
                        //     screen: 'Home',
                        // })
                        console.log("data1data1data1---data1", currentProfile)
                        SocialLoginAction(data1)
                        .then(res => {
                            console.log("res----------", res)
                            saveToken(res?.data?.access_token);
                            // navigation.navigate('AppStackNavigator', {
                            //                 screen: 'Home',
                            //             })
                          
    
                        })
                        .catch(err => {
                            alert(err.message)
                            console.log('error', err);
                        })
                    })
                }
            },
            function (error) {
                console.log("facbook error", error)
            }
        )
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
                                        required: true,
                                        pattern: {
                                            // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
                                            placeholderTextColor="#00000060"
                                            label="Email"
                                            placeholder='edwardd@gmail.com'
                                        />
                                    )}
                                    name="Email"
                                    defaultValue=""
                                />
                                {errors.Email && <Text style={{ color: "#d73a49", position: "relative", bottom: "20%", fontSize: 14, paddingLeft: 15 }}>Enter  Email</Text>}
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
                                            placeholderTextColor="#00000060"
                                            label="Password"
                                            placeholder='************'
                                            secureTextEntry={hideEye ? false : true}
                                        />
                                    )}
                                    name="Password"
                                    defaultValue=""
                                />
                                {errors.Password && <Text style={{ color: "#d73a49", position: "relative", bottom: "20%", fontSize: 14, paddingLeft: 15 }}>Enter Password</Text>}
                                <Feather
                                    style={styles.eyeIcon}
                                    // name={hideEye ? 'eye-off' : 'eye'} 
                                    name={hideEye ? 'eye' : 'eye-off'}
                                    size={18} color={'#c8bcb0'}
                                    onPress={() => setHideEye(!hideEye)}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            {/* <Text style={{color:"#ada097",fontWeight:"bold",fontSize:12,fontFamily:"Oswald-Regular"}}>Remember</Text> */}
                            <Text onPress={() => navigation.navigate('ForgotPassword')} style={{ color: "#ada097", fontWeight: "bold", fontSize: 12, fontFamily: "Oswald-Regular", }}>Forgot Password?</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                            disabled={isLoading}
                                style={styles.btn}
                                activeOpacity={0.9}
                                onPress={handleSubmit(onSubmit)}
                            >
                                {isLoading ? <ActivityIndicator size="small" color="#ffffff" /> : <Text style={{ color: "#fdf0ea", fontSize: 18, fontFamily: "Oswald-Bold" }}>Login</Text>}

                            </TouchableOpacity>
                        </View>
                        <View style={styles.orLoginContainer}>
                            <View style={styles.linedv}></View>
                            <Text style={{ paddingHorizontal: "1.5%", color: "#8895a3", fontSize: 12, fontFamily: "Oswald-Regular" }}>Or Login with</Text>
                            <View style={styles.linedv}></View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center", }}>
                            <TouchableOpacity
                                onPress={() => onFacebookButtonPress()}
                                style={styles.iconBg}>
                                <Image style={styles.googleLogo} source={require('../../assets/images/FB.png')} />
                            </TouchableOpacity>
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
    bindActionCreators({ userLogin, SocialLoginAction }, dispatch);


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
export default connect(mapStateToProps, mapDispatchToProps)(Login)