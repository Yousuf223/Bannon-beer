import React, { useState } from 'react'
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
import { useForm, Controller } from "react-hook-form";
import { bindActionCreators } from 'redux';
import auth from '@react-native-firebase/auth';
import { SignUpAction, userLogin } from '../../stores/actions/user.action';
const SignUp = ({ navigation, user,userLogin,SignUpAction }) => {
    const dispatch = useDispatch()
    const [hideEye, setHideEye] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // console.log("it works");
        var data1 = new FormData();
        data1.append('email', data.Email);
        data1.append('password', data.Password);
        data1.append('first_name', data.FirstName );
        data1.append('last_name', data.LastName);
        
          SignUpAction(data1)
          .then(res => {
            // console.log("------------------------------")
                  console.log("res",res)
                  navigation.navigate('AppStackNavigator', {
                    screen: 'Home'
                  })
        //         //  onPress={() => navigation.goBack()}
              
              // console.log('error', err);
              
              // console.log("res", res)
          })
          .catch(err => {
              alert(err.message)
              console.log('error', err);
          })
        setIsLoading(true);
        // auth()
        //     .createUserWithEmailAndPassword(data.Email, data.Password, data.firstName, data.LastName)
        //     .then(() => {
        //         console.log("it works in then")
        //         setIsLoading(true);
        //         Login(() => navigation.goBack())
        //         //  onPress={() => navigation.goBack()}
        //     })
        //     .catch(error => {
        //         if (error.code === 'auth/email-already-in-use') {
        //             setIsLoading(false);
        //             alert('That email address is already in use!');
        //         }

        //         if (error.code === 'auth/invalid-email') {
        //             setIsLoading(false);
        //             alert('That email address is invalid!');
        //         }
        //         setIsLoading(false);
        //         console.error(error);
        //     });
    };

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
                                            placeholderTextColor="#000000"
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
                                            placeholderTextColor="#000000"
                                        />
                                        )}
                                        name="LastName"
                                        defaultValue=""
                                    />
                                    {errors.LastName && <Text style={{ color: "#d73a49", position: "relative", bottom: "20%", fontSize: 14, paddingLeft: 15 }}>Enter Last Name</Text>}
                                </View>
                            </View>
                            {/* <View>

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
                            </View> */}
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
                                            placeholderTextColor="#000000"
                                        />
                                        )}
                                        name="Email"
                                        defaultValue=""
                                    />
                                    {errors.Email && <Text style={{ color: "#d73a49", position: "relative", bottom: "20%", fontSize: 14, paddingLeft: 15 }}>Enter Email</Text>}
                            </View>
                            <View>
                                <Image style={styles.inputLogo} source={require('../../assets/images/password.png')} />
                                {/* <Input
                                    inputContainerStyle={styles.borderdv}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    style={styles.email}
                                    labelStyle={styles.label}
                                    placeholderTextColor="#000000"
                                    label="Password"
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
                                            placeholderTextColor="#000000"
                                            label="Password"
                                            placeholder='************'
                                            secureTextEntry={hideEye ? true : false}
        
                                        />
                                        )}
                                        name="Password"
                                        defaultValue=""
                                    />
                                    {errors.Password && <Text style={{ color: "#d73a49", position: "relative", bottom: "20%", fontSize: 14, paddingLeft: 15 }}>Enter Password</Text>}
                                <Feather
                                    style={styles.eyeIcon}
                                    name={hideEye ? 'eye-off' : 'eye'}
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
                                            placeholderTextColor="#000000"
                                            label="Confirm Password"
                                            placeholder='************'
                                            secureTextEntry={hideEye ? true : false}
        
                                        />
                                        )}
                                        name="Password"
                                        defaultValue=""
                                    />
                                    {errors.Password && <Text style={{ color: "#d73a49", position: "relative", bottom: "20%", fontSize: 14, paddingLeft: 15 }}>Enter Confirm Password</Text>}
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
                                onPress={handleSubmit(onSubmit) }
                                // onPress={() => {
                                //     navigation.navigate('AppStackNavigator', {
                                //         screen: 'Home',
                                //     })
                                // }}
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
    bindActionCreators({ userLogin,SignUpAction }, dispatch);


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