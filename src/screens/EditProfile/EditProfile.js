import React, { useState, useEffect } from 'react'
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
import { useSelector, connect, useDispatch, } from 'react-redux'
import { Input } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { imagePicker } from '../../helper/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EditProfileAction } from '../../stores/actions/user.action';
import { bindActionCreators } from 'redux';

// import { useState } from 'react'
const EditProfile = ({ navigation, user, EditProfileAction }) => {
    const newData = useSelector((state) => state.userReducer.users)
console.log('ddggsd',newData)
    // const [data, setData] = useState([]);
    useEffect(() => {
        AsyncStorage.getItem('data')
            .then(res => {
                setData(JSON.parse(res))
            })
    }, [])

    useEffect(() => {
        setFName(newData?.first_name)
        setLName(newData?.last_name);
        setEmail(newData?.email);
        setImage(newData?.profile_picture)
    }, [])

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const [fName, setFName] = useState();
    const [lName, setLName] = useState();
    const [email, setEmail] = useState();
    const [image, setImage] = useState()
    const [name, setName] = useState()

    const imageSelector = async () => {
        try {
            const url = await imagePicker(false)
            setImage(url[0].path)
            setName(url[0].path.substring(url[0].path.lastIndexOf('/') + 1))
        } catch (error) {

        }
    }


    const onSubmit = (data) => {

        var data1 = new FormData();
        data1.append('first_name', fName);
        data1.append('last_name', lName);
        data1.append('email', email);
        data1.append('_method', 'put');
        data1.append('profile_picture', {
            uri: image,
            type: 'image/jpg',
            name: name,
        });
        // console.log(data,"---------fffh--------")


        EditProfileAction(data1)
            .then(res => {
                //         //  onPress={() => navigation.goBack()}
                // console.log('error', err);
                // console.log("res", res)
            })
            .catch(err => {
                // alert(err.message)
                console.log('error', err);
            })

        setIsLoading(true);
    };

    return (
        <>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: "18%", flexDirection: "row" }}>
                        <AntDesign onPress={() => navigation.goBack()} name='arrowleft' size={23} color={'#85786f'} />
                        <Text style={styles.textForgot}>Edit Profile</Text>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={imageSelector}
                        >
                            <Image style={styles.profile} source={image ? { uri: image } : require('../../assets/images/profilePicture.png')} />
                        </TouchableOpacity>
                        <Image style={styles.camera} source={require('../../assets/images/editCamera.png')} />
                    </View>
                    <View>
                        <View>

                            <Image style={styles.inputLogo} source={require('../../assets/images/email.png')} />
                            <Input
                                inputContainerStyle={styles.borderdv}
                                // onBlur={onBlur}
                                onChangeText={(text) => setFName(text)}
                                style={styles.email}
                                labelStyle={styles.label}
                                label="First Name"
                                placeholder='First Name'
                                placeholderTextColor="#000000"
                                value={fName}

                            />
                            <Image style={styles.inputLogo} source={require('../../assets/images/email.png')} />
                        </View>
                        <View>

                            <Image style={styles.inputLogo} source={require('../../assets/images/email.png')} />
                            <Input
                                inputContainerStyle={styles.borderdv}
                                //  onFocus={()=>setToggleUser4(1)}
                                //  onBlur={()=>setToggleUser4(0)}
                                onChangeText={(text) => setLName(text)}
                                style={styles.email}
                                labelStyle={styles.label}
                                label="Last Name"
                                placeholder='First Name'
                                placeholderTextColor="#000000"
                                value={lName}

                            />
                        </View>
                        <View>

                            <Image style={styles.inputLogo} source={require('../../assets/images/email.png')} />
                            <Input
                                inputContainerStyle={styles.borderdv}
                                //  onFocus={()=>setToggleUser4(1)}
                                //  onBlur={()=>setToggleUser4(0)}
                                onChangeText={(text) => setEmail(text)}
                                style={styles.email}
                                labelStyle={styles.label}
                                label="Email Address"
                                placeholder='Email'
                                placeholderTextColor="#000000"
                                value={email}

                            />
                        </View>
                    </View>
                    <View style={{ marginVertical: "20%" }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => onSubmit(image)}
                            style={styles.btn}>
                            <Text style={{ color: "#fdf0ea", fontSize: 16, fontFamily: "Oswald-Bold" }}>Save Changes</Text>
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

const mapDispatchToProps = dispatch =>
    bindActionCreators({ EditProfileAction }, dispatch);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8ece0",
        paddingHorizontal: 20,
    },
    textForgot: {
        fontFamily: "Oswald-Medium",
        fontSize: 18,
        paddingLeft: 10,
        bottom: 4,
        color: "#000000"
    },
    profile: {
        width: 88,
        height: 88,
        borderRadius:20
    },
    row: {
        alignItems: "center",
        paddingVertical: 20,
        marginTop: 10
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
    btn: {
        padding: 12,
        backgroundColor: "#e74a07",
        alignItems: "center",
        borderRadius: 10,
    },
    camera: {
        width: 25,
        height: 25,
        position: "absolute",
        top: "100%",
        right: "34%"
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)