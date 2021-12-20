import React from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
    Linking,
    ScrollView
} from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { Input } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign'
const Notification = ({ navigation, user }) => {
    const dispatch = useDispatch()
    const NotificatioCard = [
        {

        },
        {

        },
        {

        },
        {

        },
        {

        },
        {

        },
        {

        },
    ]
    return (
        <>
            <View style={styles.container}>
            <View style={styles.header}>
                    <AntDesign onPress={() => navigation.goBack()} name='arrowleft' size={23} color={'#85786f'} />
                    <Text style={styles.text}>Notifications</Text>
             </View>
             <ScrollView style={{marginTop:"6%"}}>
               {
                   NotificatioCard.map((item) => {
                       return(
                        <View style={styles.card}>
                        <View style={{flexDirection:"row"}}> 
                        <Image style={{width:30,height:30,resizeMode:"contain",alignSelf:"center",borderRadius:25}} source={require('../../assets/images/scan.png')} />
                       <View>
                        <View style={styles.btn}>
                            <Text style={styles.date}>23 May 2021</Text>
                        </View>
                        <View style={{width:"98%"}}>
                        <Text style={styles.text1}>You have scanned 21 Petrus Cherry Chocalate</Text>
                        </View>
                        </View>
                        </View>
                    </View>
                       )
                   })
               }
             </ScrollView>
             <View style={{paddingBottom:"10%"}}></View>
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
        paddingHorizontal: 18
    },
    header: {
        width: "100%",
        height: "10%",
        flexDirection:"row",
        alignItems:"flex-end"
    },
    text:{
        color:"#000000",
        fontWeight:"bold",
        fontSize:18,
        paddingLeft:15,
        paddingBottom:1
    },
    card:{
        backgroundColor:"#ffffff",
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:10,
        marginVertical:8
    },
    btn:{
        backgroundColor: "#e74a07",
        borderRadius: 4,
        width: 76, height: 20,
        justifyContent: "center",
        alignItems: "center",
        marginVertical:6,
        marginLeft:"3%"
    },
    date:{
        fontSize: 10,
        textAlign: "center",
        color: "#fff"
    },
    text1:{
        color:"#000000",
        paddingLeft:10,
        fontSize:13,
        fontWeight:"bold",
        lineHeight:18,
    },
})
export default connect(mapStateToProps, null)(Notification)