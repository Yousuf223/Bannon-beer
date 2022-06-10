import React, { useEffect } from 'react'
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
import AntDesign from 'react-native-vector-icons/AntDesign'
import PointCard from '../../components/PointCard/PointCard';
import { AboutAction } from '../../stores/actions/user.action';
const About = ({ navigation, user }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(AboutAction())
    }, [])
    const data = useSelector(state => state.userReducer.AboutAction)

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
                    <Text style={styles.text1}>{data?.about}</Text>
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
        width: "80%",
        height: "80%",
        resizeMode: "contain"
    },
    row: {
        alignItems: "center",
        height: "25%"
    },
    card: {
        backgroundColor: "#fcf4e9",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8
    },
    text: {
        textAlign: "center",
        color: "#e74a07",
        fontSize: 16,
        fontFamily: "Oswald-Medium"

    },
    text1: {
        textAlign: "center",
        fontSize: 12,
        paddingVertical: 10,
        color: "#85796d",
        fontFamily: "Oswald-Regular"
    }
})
export default connect(mapStateToProps, null)(About)