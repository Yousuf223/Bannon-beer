import React, { useState, useRef } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity as TORN,
  StyleSheet,
  Image,
  PanResponder,
  Platform,
  Animated,
  ImageBackground
} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import { connect, useDispatch } from 'react-redux'
import Modal from 'react-native-modal';
import { fetchDataUser } from '../../stores/actions/user.action'
import Card from '../../components/Card/Card'
import CardDetail from '../../components/CardDetail/CardDetail'
import { CustomScrollView } from '../../components/CustomScrollView/CustomScrollView'
import { ScrollView } from 'react-native-gesture-handler'
import * as Progress from 'react-native-progress';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IOS } from 'react-native-permissions/lib/typescript/constants';
const Home = (props) => {
  const { navigation } = props
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false);
  const cardData = [
    {
      number: '01'
    },
    {
      description: "Odell 90 Shilling",
      image: require('../../assets/images/wine2.png')

    },
    {
      description: "Ayinger Brauweisse",
    },
    {
      description: "Lagunitas IPA",
      image: require('../../assets/images/wine2.png')
    },
    {

    }
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

  // const {Count} = props;
  //     let list =  Count=== undefined?10:Count;
  var jsx = [];
  for (var i = 1; i <= 75; i++) {
    jsx.push(i)
  }
  
  const [select, setSelect] = useState([])
  const count = (index) => {

    // setSelect(index)

    var arr = []
    const isSelected = select.findIndex((e) => e == index)
    if (isSelected == -1) {
      arr.push(index)
      setSelect([...select, ...arr])

    } else {
      var newArr = select
      newArr.splice(isSelected, 1)
      setSelect(e => [...newArr])
    }

  }
  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor={'#f8ece0'} />
      <SafeAreaView style={styles.container}>
      <View style={styles.header}>
              <TORN
                activeOpacity={0.8}
                onPress={() => navigation.toggleDrawer()}
              >
                <Image style={styles.menu} source={require('../../assets/images/menu.png')} />
              </TORN>
              <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
              <TORN
                onPress={() => navigation.navigate('Notification')}
                activeOpacity={0.8}
              >
                <Image style={styles.notification} source={require('../../assets/images/notification.png')} />
              </TORN>
            </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 20 }}>
            <View style={styles.row2}>
              <View>
                <Text style={{fontFamily:'Oswald-Medium'}}>Top Beers</Text>
                <View style={{ width: 20, height: 1, backgroundColor: "#e74a07", marginTop: 6 }}></View>
              </View>
              <TORN
                onPress={() => navigation.navigate('BeerMenu')}
                activeOpacity={0.9}
                style={styles.btn}>
                <Text style={styles.textView}>View All</Text>
              </TORN>
            </View>
            {/* <Image style={styles.beer} source={require('../../assets/images/beerCard.png')} /> */}


            <View style={{ flexDirection: "row", justifyContent: "space-around", position: "relative", zIndex: 10 }}>
              {/*              
             <Card/> */}
              <Card 
                    onPress={()=>navigation.navigate('QRScaner')}
                    />
              <Card 
              onPress={()=>navigation.navigate('QRScaner')}
              />
            </View>
            <View style={styles.row2}>
              <View>
                <Text style={{fontFamily:'Oswald-Medium'}}>All Beers</Text>
                <View style={{ width: 20, height: 1, backgroundColor: "#e74a07", marginTop: 6 }}></View>
              </View>
              <TORN
                onPress={() => navigation.navigate('BeerMenu')}
                activeOpacity={0.9}
                style={styles.btn}>
                <Text style={styles.textView}>View All</Text>
              </TORN>
            </View>
            {
              cardData.map((item) => {
                return (
                  <View style={{ marginVertical: 6, }}>
                    <CardDetail
                      number={item.number}
                      image={item.image}
                      decription={item.description} 
                      onPress={() => navigation.navigate('QRScaner')}
                      />
                    {/* {number} */}
                    
                  </View>
                )

              })
            }

          </View>
        </ScrollView>

        <TORN 
        activeOpacity={0.9}
          onPress={() => setModalVisible(true)}
          style={styles.posi}>
          <Animated.View
            style={{
              transform: [{ translateY: pan.y }]
            }}
            {...panResponder.panHandlers}
          >
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              activeOpacity={0.9}
            >
              <Image
                style={styles.beer} source={require('../../assets/images/beerCard.png')} />
            </TouchableOpacity>
          </Animated.View>
        </TORN>
        <Modal
          animationIn="slideInRight"
          animationOut="slideOutLeft"
          animationInTiming={600}
          animationOutTiming={600}
          backdropColor="#f8ece0"
          backdropOpacity={1}
          transparent={false}
          isVisible={modalVisible}
          onBackButtonPress={() => setModalVisible(!modalVisible)}
          onBackdropPress={() => setModalVisible(!modalVisible)}>
          <View style={{height: '100%', width: '100%',}}>
            <View style={styles.modalView}>
              <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <View style={styles.rowModal}>
                  <Text style={styles.beerCard}>Beer Card</Text>
                  <View style={{ flexDirection: "row" }}>
                    <TORN
                     onPress={() => setSelect([])}
                    activeOpacity={0.9}
                    style={styles.reset}>
                      <Text style={styles.resetText}>Reset</Text>
                    </TORN>
                    <Entypo onPress={() => setModalVisible(!modalVisible)} name='cross' size={25} color={'#85786f'} />
                  </View>
                </View>
                <View style={styles.rowProgress}>
                  <Progress.Bar progress={select.length/100}
                    animated={true} width={260}
                    height={24}
                    color={"#e74a07"}
                    borderRadius={12}
                    borderWidth={0}
                    unfilledColor={"#e4d8cc"}
                  />
                  <Text style={{ color: "#867970", fontSize: 14, paddingLeft: 6, fontFamily: "Oswald-Medium" }}>75-75</Text>
                </View>
                {/* <View >
            <Text>1</Text>
          </View> */}
                <View style={styles.count}>
                  {jsx.map((jsx, index) => {
                    return (
                      <TORN
                        activeOpacity={0.8}
                        onPress={() =>
                          count(index)
                        }
                        style={styles.loop}>
                        {select.findIndex((e) => e == index) != -1 ? <Image
                          style={styles.cross} source={require('../../assets/images/stamp.png')} /> : <Text style={styles.textNum}>{jsx}</Text>}
                      </TORN>
                    )
                  }
                  )
                  }
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
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
    // paddingHorizontal:20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "6%",
    marginHorizontal:20
  },
  menu: {
    width: 20,
    height: 15,
    resizeMode: "contain",
  },
  logo: {
    width: "70%",
    height: 35,
    resizeMode: "contain"
  },
  notification: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingTop: 16,
    position: "relative",
    zIndex: 10
  },
  btn: {
    borderWidth: 1,
    borderColor: "#e74a07",
    width: "16%",
    height: "75%",
    borderRadius: 4,
    alignItems: "center",

  },
  textView: {
    color: "#e74a07",
    fontSize: 10,
    fontFamily: "Oswald-Medium",
    paddingTop: 2
  },
  beer: {
    width: 60,
    height: 160,
  },
  posi: {
    position: "absolute",
    zIndex: 20,
    top: "40%",
    left: "85%",
    // backgroundColor:"red",
    // padding:20
  },
  modalView: {
    backgroundColor: '#f8ece0',
    borderRadius: 15,
    paddingVertical: 10,
    marginTop: Platform.OS == "android" ? 0 : 30,
  },
  count: {
    flexDirection: "row",
    flexWrap: 'wrap',
    marginHorizontal: 10
  },
  loop: {
    width: "12%", height: 38,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center", margin: 3, borderRadius: 10
  },
  textNum: {
    color: "#c5b9ab",
    fontFamily: "Oswald-Medium"
  },
  rowModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  rowProgress: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: 20
  },
  reset: {
    backgroundColor: "#d9cdc1",
    width: 50,
    height: 26,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    right: 12
  },
  beerCard: {
    color: "#000000", fontSize: 16, fontFamily: "Oswald-Medium"
  },
  resetText: {
    color: "#fcf2e9",
    fontSize: 12,
    fontFamily: "Oswald-Regular"
  },
  cross: {
    width: 24,
    height: 24
  }
})
export default connect(mapStateToProps, null)(Home)
