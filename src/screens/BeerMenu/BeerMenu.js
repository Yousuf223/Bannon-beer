import React, { Component, useState,useRef  } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
    PanResponder,
    Image,
    Animated
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { connect, useDispatch } from 'react-redux'
import { SearchBar } from 'react-native-elements'
import CardDetail from '../../components/CardDetail/CardDetail'
const BeerMenu = ({ navigation, user }) => {
    const [search, setSearch] = useState("");
    const cardData = [
        {
            number: '01'
        },
        {
            description: "Odell 90 Shilling",
            image: require('../../assets/images/wine2.png'),
            number: '02'
        },
        {
            description: "Ayinger Brauweisse",
            image: require('../../assets/images/wine2.png'),
            number: '03'
        },
        {
            description: "Lagunitas IPA",
            image: require('../../assets/images/wine6.png'),
            number: '04'
        },
        {
            description: "Sierra Nevada Pale Ale",
            image: require('../../assets/images/wine2.png'),
            number: '05'
        },
        {
            description: "Lagunitas IPA",
            image: require('../../assets/images/wine6.png'),
            number: '06'
        },
    ]
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          pan.setOffset({
            x: pan.x._value,
            y: pan.y._value
          });
        },
        onPanResponderMove: Animated.event(
          [
            null,
            { dx: pan.x, dy: pan.y }
          ]
        ),
        onPanResponderRelease: () => {
          pan.flattenOffset(
            {
              x: pan.x._value,
              y: pan.y._value
            }
          );
        }
      })
    ).current;
    
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="dark-content" backgroundColor={'#f8ece0'} />
                <View style={styles.row}>
                    <View style={{flexDirection:"row"}}>
                    <AntDesign onPress={() => navigation.goBack()} name='arrowleft' size={23} color={'#85786f'} />
                    <Text style={styles.text0}>Beer Menu</Text>
                    </View>
                    <Text style={styles.text1}>75 Items</Text>
                </View>
                <View style={{paddingVertical:10}}>
                <SearchBar
                    platform="ios"
                    placeholder="Search"
                    placeholderTextColor="#85786f"
                    searchIcon={{ iconStyle: { color: "#85786f" } }}
                    inputStyle={{ color: "#fff", fontSize: 14,fontFamily:"Oswald-Regular" }}
                    containerStyle={{ backgroundColor: "#f8ece0" }}
                    inputContainerStyle={{
                        backgroundColor: "#eaddcd",
                        borderRadius: 25
                    }}
                    onChangeText={setSearch}
                    value={search}
                />
                </View>
                <View style={{ paddingHorizontal: 20 }}>
                    { 
                    cardData.map((item) => {
                        return(
                            <View style={{ paddingVertical: 6 }}>
                            <CardDetail
                                number={item.number}
                                decription={item.description}
                                image={item.image}
                            />
                        </View>
                        )
                    })
                    }
                   
                </View>
            </ScrollView>
            <View 
         style={styles.posi}>
      <Animated.View
        style={{
          transform: [  { translateY: pan.y }]
        }}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
        >
        <Image 
        style={styles.beer} source={require('../../assets/images/beerCard.png')} />
        </TouchableOpacity>
      </Animated.View>
      </View >
        </View>
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
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: "16%"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    text0:{
        color:"#000000",
        fontSize:18,
        paddingLeft:16,
        fontFamily:"Oswald-Medium",
        bottom:5
    },
    text1:{
        color:"#c5b9ad",
        fontSize:16,
        fontFamily:"Oswald-Regular"
    },
    beer:{
        width:60,
        height:160,
      },
      posi:{
        position:"absolute",
        zIndex:20,
        top:"40%",
        left:"85%"
      },
})
export default connect(mapStateToProps, null)(BeerMenu)