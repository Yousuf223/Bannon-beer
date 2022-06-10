import React, { useState } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    ActivityIndicator,
    Alert,
    Platform
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { connect, useDispatch } from 'react-redux';
import { Input } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather'
import { useForm, Controller } from "react-hook-form";
import { bindActionCreators } from 'redux';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SignUpAction, userLogin, SocialLoginAction } from '../../stores/actions/user.action';
import DatePicker from 'react-native-date-picker'
import messaging from '@react-native-firebase/messaging';
import { LoginManager, AccessToken, Profile } from 'react-native-fbsdk-next';
import { appleAuth } from '@invertase/react-native-apple-authentication'
const SignUp = ({ navigation, user, userLogin, SignUpAction, SocialLoginAction }) => {
    const dispatch = useDispatch()
    const [hideEye, setHideEye] = useState();
    const [hideEye1, setHideEye1] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [date, setDate] = useState(null)
    const [open, setOpen] = useState(false)


    const onSubmit = (data) => {
        var letters = /^[A-Za-z]+$/;
        if (data.Email != "" || data.FirstName != "" || data.LastName != "" || data.Password != "" || data.Confirm_Password !== "") {
            if (data.Password != data.Confirm_Password) {
                Alert.alert("O'Bannon's", 'Password does not match')

                setIsLoading(false)
            }
            else if (!data.FirstName.match(letters) || !data.LastName.match(letters)) {
                Alert.alert("O'Bannon's", 'Please enter a valid name')
                setIsLoading(false)
            }
            else if (date == null) {
                Alert.alert("O'Bannon's", "Please select Date Of Birth")
            }
            else {
                setIsLoading(true);
                var data1 = new FormData();
                data1.append('email', data.Email);
                data1.append('password', data.Password);
                data1.append('password', data.Confirm_Password);
                data1.append('first_name', data.FirstName);
                data1.append('last_name', data.LastName);
                data1.append('dob', moment(date).format('YYYY-MM-DD'))
                SignUpAction(data1)
                    .then(res => {
                        saveToken(null)
                        // console.log("------------------------------")
                        //console.log("res", res)
                        navigation.navigate('Login')
                        //         //  onPress={() => navigation.goBack()}
                        setIsLoading(false)
                    })
                    .catch(err => {

                        if (err.response.status == 422) {
                            Alert.alert("O'Bannon's", 'This email has already been taken')
                        }
                        setIsLoading(false)
                        // console.log('error', err.response.data.errors);
                    })
            }
        } else {
            Alert.alert("O'Bannon's", 'Please fill all the fields', null, 'error')
            setIsLoading(false)
        }


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
                data1.append('first_name', userCredential.additionalUserInfo.profile.given_name);
                data1.append('last_name', userCredential.additionalUserInfo.profile.family_name);
                data1.append('profile_picture', userCredential.additionalUserInfo.profile.picture);
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
            })
            .catch((error) => {
                console.log('error google', error)
            })
    }
    // facebook Login

    async function onFacebookButtonPress() {
        LoginManager.logInWithPermissions(["public_profile"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled")
                } else {
                    console.log('resultresultresult', result)

                    Profile.getCurrentProfile().then(async function (currentProfile) {
                        console.log('user facebook------======', currentProfile)
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
                        email = currentProfile.email
                        if (email == null) {
                            email = currentProfile.userID
                        }
                        data1.append('email', email);

                        data1.append('profile_picture', currentProfile.imageURL);
                        console.log("data1data1data1---data1", currentProfile)
                        SocialLoginAction(data1)
                            .then(res => {
                                console.log("res----------", res)
                                saveToken(res?.data?.access_token);
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



    async function onAppleButtonPress() {
        setIsLoading(true);
        // alert('guyuyguyguyg')
        // Start the sign-in request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
        })

        return;

        // Ensure Apple returned a user identityToken
        if (!appleAuthRequestResponse.identityToken) {
            throw new Error('Apple Sign-In failed - no identify token returned')
        }
        // Create a Firebase credential from the response
        const { identityToken, nonce } = appleAuthRequestResponse
        const appleCredential = auth.AppleAuthProvider.credential(
            identityToken,
            nonce
        )
        // Sign the user in with the credential
        return auth()
            .signInWithCredential(appleCredential)
            .then(e => {
                setIsLoading(false);


                // let userData = {
                //   email: e.user.email,
                //   name: e.user.displayName ? e.user.displayName : '',
                //   photo: '',
                //   device_id: fcmToken,
                //   provider: 'apple'
                // }
                //console.log('userData', userData)
                dispatch(SocialLoginAction(e?.data?.socialMediaLogin?.data))
                //console.log('e?.data?.socialMediaLogin?.data', e?.data?.socialMediaLogin?.data)
            })

            .catch(error => {
                setIsLoading(false);
                console.log('error', error)
            })
    }
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
                                                style={{
                                                    paddingLeft: 1,
                                                    fontSize: 12,
                                                    color: "#000002",
                                                    top: 12,
                                                    fontFamily: "Oswald-Regular"
                                                }}
                                                labelStyle={styles.label}
                                                label="First Name"
                                                placeholder='Edward'
                                                placeholderTextColor="#00000060"
                                            />
                                        )}
                                        name="FirstName"
                                        defaultValue=""
                                    />
                                    {errors.FirstName && <Text style={{ color: "#d73a49", position: "relative", bottom: "20%", fontSize: 14, paddingLeft: 15 }}>Enter First Name</Text>}
                                </View>
                                <View style={{ width: "50%" }}>
                                    <Image style={styles.inputLogo} source={require('../../assets/images/name.png')} />
                                    {/* <Input
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
                                        placeholder='Davidson'
                                        placeholderTextColor="#000000"
                                    /> */}
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
                                                style={{
                                                    paddingLeft: 1,
                                                    fontSize: 12,
                                                    color: "#000002",
                                                    top: 12,
                                                    fontFamily: "Oswald-Regular"
                                                }}
                                                labelStyle={styles.label}
                                                label="Last Name"
                                                placeholder='Davidson'
                                                placeholderTextColor="#00000060"
                                            />
                                        )}
                                        name="LastName"
                                        defaultValue=""
                                    />
                                    {errors.LastName && <Text style={{ color: "#d73a49", position: "relative", bottom: "20%", fontSize: 14, paddingLeft: 15 }}>Enter Last Name</Text>}
                                </View>
                            </View>
                            <TouchableOpacity
                                hitSlop={{ top: 20, left: 20, bottom: 50, right: 20 }}
                                activeOpacity={0.9}
                                onPress={() => setOpen(true)}
                            >
                                <Image style={styles.inputLogo} source={require('../../assets/images/date.png')} />
                                <Input
                                    inputContainerStyle={styles.borderdv}
                                    //  onFocus={()=>setToggleUser4(1)}
                                    //  onBlur={()=>setToggleUser4(0)}
                                    style={styles.email}
                                    labelStyle={styles.label}
                                    placeholderTextColor="#00000060"
                                    onChangeText={(text) => setDate(text)}
                                    label="Date of Birth"
                                    placeholder='25 Oct, 1985'
                                    value={date ? date?.toDateString() : new Date().toDateString()}
                                    disabled={true}
                                    onPressIn={() => setOpen(true)}
                                />
                                <DatePicker
                                    maximumDate={new Date()}
                                    modal
                                    open={open}
                                    date={date ? date : new Date()}
                                    // onDateChange={setDate}
                                    mode='date'
                                    onConfirm={(date) => {
                                        setOpen(false)
                                        setDate(date)
                                    }}
                                    onCancel={() => {
                                        setOpen(false)
                                    }}
                                />
                            </TouchableOpacity>
                            <View>

                                <Image style={styles.inputLogo} source={require('../../assets/images/email.png')} />
                                {/* <Input
                                    inputContainerStyle={styles.borderdv}
                                    //  onFocus={()=>setToggleUser4(1)}
                                    //  onBlur={()=>setToggleUser4(0)}
                                    style={styles.email}
                                    labelStyle={styles.label}
                                    placeholderTextColor="#000000"
                                    label="Email Address"
                                    placeholder='edwardd@gmail.com'
                                /> */}
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
                                            style={{
                                                paddingLeft: 1,
                                                fontSize: 12,
                                                color: "#000002",
                                                top: 12,
                                                fontFamily: "Oswald-Regular"
                                            }}
                                            labelStyle={styles.label}
                                            label="Email Address"
                                            placeholder='edwardd@gmail.com'
                                            placeholderTextColor="#00000060"
                                            autoCapitalize="none"
                                        />
                                    )}
                                    name="Email"
                                    defaultValue=""
                                />
                                {errors.Email && <Text style={{ color: "#d73a49", position: "relative", bottom: "20%", fontSize: 14, paddingLeft: 15 }}>Enter Email</Text>}
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
                                    name={hideEye ? 'eye' : 'eye-off'}
                                    size={18} color={'#c8bcb0'}
                                    onPress={() => setHideEye(!hideEye)}
                                />
                            </View>
                            <View>
                                <Image style={styles.inputLogo} source={require('../../assets/images/password.png')} />
                                {/* <Input
                                    inputContainerStyle={styles.borderdv}
                                    //  onFocus={()=>setToggleUser4(1)}
                                    //  onBlur={()=>setToggleUser4(0)}
                                    style={styles.email}
                                    labelStyle={styles.label}
                                    placeholderTextColor="#000000"
                                    label="Confirm Password"
                                    placeholder='************'
                                    secureTextEntry={hideEye ? true : false}
                                /> */}
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
                                            label="Confirm Password"
                                            placeholder='************'
                                            secureTextEntry={hideEye1 ? false : true}

                                        />
                                    )}
                                    name="Confirm_Password"
                                    defaultValue=""
                                />
                                {errors.Confirm_Password && <Text style={{ color: "#d73a49", position: "relative", bottom: "20%", fontSize: 14, paddingLeft: 15 }}>Enter Confirm Password</Text>}
                                <Feather
                                    style={styles.eyeIcon}
                                    name={hideEye1 ? 'eye' : 'eye-off'}
                                    size={18} color={'#c8bcb0'}
                                    onPress={() => setHideEye1(!hideEye1)}
                                />
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={styles.btn}
                                activeOpacity={0.9}
                                onPress={handleSubmit(onSubmit)}
                                disabled={isLoading}
                            // onPress={() => {
                            //     navigation.navigate('AppStackNavigator', {
                            //         screen: 'Home',
                            //     })
                            // }}
                            >
                                {isLoading ? <ActivityIndicator size="small" color="#ffffff" /> : <Text style={{ color: "#fdf0ea", fontSize: 18, fontFamily: "Oswald-Bold" }}>Sign Up</Text>}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.orLoginContainer}>
                            <View style={styles.linedv}></View>
                            <Text style={{ paddingHorizontal: "1.5%", color: "#8895a3", fontSize: 12, fontFamily: 'Oswald-Regular' }}>Or Sign Up with</Text>
                            <View style={styles.linedv}></View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center", }}>
                            {/* <TouchableOpacity
                                onPress={() => onFacebookButtonPress()}
                                activeOpacity={0.9}
                                style={styles.iconBg}
                            >
                                <AntDesign name='facebook-square' size={25} color={'#254ba0'} />
                            </TouchableOpacity> */}
                            {/* {Platform.OS == 'ios' ? <TouchableOpacity
                                onPress={() => onAppleButtonPress()}
                                activeOpacity={0.9}
                                style={styles.iconBg}
                            >
                                <AntDesign name='apple1' size={25} />
                            </TouchableOpacity> : <View></View>} */}

                            {/* <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => onGoogleButtonPress()}
                                style={styles.iconBg}>
                                <Image style={styles.googleLogo} source={require('../../assets/images/google.png')} />
                            </TouchableOpacity> */}
                            {/* <View style={styles.iconBg}>
                                <AntDesign name='twitter' size={25} color={'#1da1f3'} />
                            </View> */}
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => navigation.navigate('Login')}
                            style={{ marginVertical: "14%", alignItems: "center" }}>
                            <Text style={styles.text3}>Already a member?  <Text style={{ color: "#e64902" }}>Login</Text></Text>
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
};
const mapDispatchToProps = dispatch =>
    bindActionCreators({ userLogin, SignUpAction, SocialLoginAction }, dispatch);


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
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)