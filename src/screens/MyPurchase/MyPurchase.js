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
const MyPurchase = ({ navigation, user }) => {
    const dispatch = useDispatch()
    const cardData = [
        {
            point:'$6.00',
        },
        {
            title: "Franziskaner Hefeweizen",
            number: '02',
            point:'$7.00',
        },
        {
            title: "8th wonder heaterade gose",
            number: '03',
            point:'$6.00',
        },
        {
            title: "Dogfish head punkin ale",
            number: '04',
            point:'$8.00',
        },
        {
            title: "Petrus Cherry Chocolate",
            number: '05',
            point:'$9.00',
        },
        {
            title: "Bwd border town",
            number: '06',
            point:'$12.00',
        },
        {
            title: "Lagunitas IPA",
            number: '06',
            point:'$6.00',
        },
    ]
    return (
        <>
        <View style={styles.container}>
            {/* <StatusBar barStyle="dark-content" backgroundColor={'#20382b'} /> */}
            <View style={styles.header}>
            <AntDesign onPress={() => navigation.goBack()} name='arrowleft' size={23} color={'#85786f'} />
            <Text style={styles.text1}>My Purchases</Text>
            </View>      
            <ScrollView showsVerticalScrollIndicator={false} >
            <View style={{ paddingHorizontal: 20,flex:1,flexGrow:1 }}>
                    { 
                    cardData.map((item) => {
                        return(
                            <View style={{ paddingVertical: 6 }}>
                            <PointCard
                                number={item.number}
                                title={item.title}
                                point={item.point}
                                image={item.image}
                            />
                        </View>
                        )
                    })
                    }
                   
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
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#f8ece0",
    },
    header:{
        flexDirection:"row",
        paddingVertical:"13%",
        paddingHorizontal:10
    },
    text1:{
        color:"#000000",
        paddingLeft:15,
        fontSize:16,
        fontFamily:"Oswald-Medium"
    },
    footer:{
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor:"#f8ece0",
        paddingVertical:10
    },
    text2:{
        fontSize:30,
        color:"#ffffff",
        fontWeight:"bold"
    },
    myPoint:{
        width:32,
        height:32,
        marginTop:8
    }
})
export default connect(mapStateToProps, null)(MyPurchase)