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
import PointCard from '../../components/PointCard/PointCard';
const About = ({ navigation, user }) => {
    const dispatch = useDispatch()

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <AntDesign onPress={() => navigation.goBack()} name='arrowleft' size={23} color={'#85786f'} />
                </View>
                <View style={styles.row}>
                    <Image style={styles.About} source={require('../../assets/images/aboutApp.png')} />
                </View>
                <View style={styles.card}>
                    <Text style={styles.text}>About App</Text>
                    <Text style={styles.text1}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</Text>
                    <Text style={styles.text1}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</Text>
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
        paddingHorizontal: 20
    },
    header: {
        width: "100%",
        height: "10%",
        justifyContent: "flex-end"
    },
    About: {
        width: "55%",
        height: "80%",
    },
    row: {
        alignItems: "center",
        height:"25%"
    },
    card: {
        backgroundColor: "#fcf4e9",
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:8
    },
    text:{
        textAlign:"center",
        color:"#e74a07",
        fontSize:16,
        fontFamily:"Oswald-Medium"

    },
    text1:{
        textAlign:"center",
        fontSize:12,
        paddingVertical:10,
        color:"#85796d",
        fontFamily:"Oswald-Regular"
    }
})
export default connect(mapStateToProps, null)(About)