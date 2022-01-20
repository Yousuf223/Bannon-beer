import React, { Component, useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity as TORN,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  PanResponder,
  Animated,
  FlatList
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect, useDispatch, useSelector } from 'react-redux'
import { SearchBar } from 'react-native-elements';
import CardDetail from '../../components/CardDetail/CardDetail';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import * as Progress from 'react-native-progress';
import { ListDataAction } from '../../stores/actions/user.action';
const BeerMenu = ({ navigation, user }) => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data1, setData1] = useState([]);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(ListDataAction())
  }, [])

  const data = useSelector(state => state.userReducer.ListDataAction)
  // const cardData = [
  //   {
  //     number: '01',
  //   },
  //   {
  //     description: 'Odell 90 Shilling',
  //     image: require('../../assets/images/wine2.png'),
  //     number: '02',
  //   },
  //   {
  //     description: 'Ayinger Brauweisse',
  //     image: require('../../assets/images/wine2.png'),
  //     number: '03',
  //   },
  //   {
  //     description: 'Lagunitas IPA',
  //     image: require('../../assets/images/wine6.png'),
  //     number: '04',
  //   },
  //   {
  //     description: 'Sierra Nevada Pale Ale',
  //     image: require('../../assets/images/wine2.png'),
  //     number: '05',
  //   },
  //   {
  //     description: 'Lagunitas IPA',
  //     image: require('../../assets/images/wine6.png'),
  //     number: '06',
  //   },
  // ];
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        pan.flattenOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
    }),
  ).current;
  var jsx = [];
  for (var i = 1; i <= 75; i++) {
    jsx.push(i);
  }

  const [select, setSelect] = useState([]);
  const count = index => {
    // setSelect(index)

    var arr = [];
    const isSelected = select.findIndex(e => e == index);
    if (isSelected == -1) {
      arr.push(index);
      setSelect([...select, ...arr]);
    } else {
      var newArr = select;
      newArr.splice(isSelected, 1);
      setSelect(e => [...newArr]);
    }
  };



 const  searchFilterFunction = text => {    
setSearch(text)

    const newData = data.data.filter((item) => {      
      const itemData = `${item.name.toUpperCase()}`;
      console.log("itemDataitemData",itemData)  
       const textData = text.toUpperCase();
       return itemData.indexOf(textData) > -1; 
    });
    setData1(newData)
  };

  console.log(data1,"data1data1data1data1data1data1data1data1data1data1")
  const buyArray = data?.data?.filter((e) => e.buy)
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        // value={query}
        autoCorrect={false}  
        backgroundColor={'#f8ece0'} />
      <View style={styles.row}>
        <View style={{ flexDirection: 'row' }}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={23}
            color={'#85786f'}
          />
          <Text style={styles.text0}>Beer Menu</Text>
        </View>
        <Text style={styles.text1}>{data.data.length} Items</Text>
      </View>
      <View style={{ paddingVertical: 10 }}>
        <SearchBar
          platform="ios"
          placeholder="Search"
          placeholderTextColor="#85786f"
          searchIcon={{ iconStyle: { color: '#85786f' } }}
          inputStyle={{
            color: '#fff',
            fontSize: 14,
            fontFamily: 'Oswald-Regular',
          }}
          containerStyle={{ backgroundColor: '#f8ece0' }}
          inputContainerStyle={{
            backgroundColor: '#eaddcd',
            borderRadius: 25,
          }}
          // onChangeText={setSearch}ssss
        onChangeText={text => searchFilterFunction(text)
        
    
        }

          value={search}
        />
      </View>
        <View style={{ paddingHorizontal: 20 }}>
              <FlatList
                       keyExtractor={(item, index) => index}
                       
                       data={data1?.length > 0 ? data1 : data.data}
                       renderItem={({ item }) => {
                           return (
                            <View style={{ paddingVertical: 6 }}>
                            <CardDetail
                              number={item.id}
                              decription={item.name}
                              image={item.image}
                              price={item.price}
                              alocoal={item.alcohol_percentage}
                              onPress={() => navigation.navigate('QRScaner')}
                            />
                        
                          </View>
                           )
                       }}
                />
        </View>
      <View style={styles.posi}>
        <Animated.View
          style={{
            transform: [{ translateY: pan.y }],
          }}
          {...panResponder.panHandlers}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            activeOpacity={0.9}>
            <Image
              style={styles.beer}
              source={require('../../assets/images/beerCard.png')}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
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
        <View style={{ height: '100%', width: '100%' }}>
          <View style={styles.modalView}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <View style={styles.rowModal}>
                <Text style={styles.beerCard}>Beer Card</Text>
                <View style={{ flexDirection: 'row' }}>
                  <TORN
                    onPress={() => setSelect([])}
                    activeOpacity={0.9}
                    style={styles.reset}>
                    <Text style={styles.resetText}>Reset</Text>
                  </TORN>
                  <Entypo
                    onPress={() => setModalVisible(!modalVisible)}
                    name="cross"
                    size={25}
                    color={'#85786f'}
                  />
                </View>
              </View>
              <View style={styles.rowProgress}>
                <Progress.Bar
                  progress={buyArray?.length / data?.data?.length}
                  animated={true}
                  width={260}
                  height={24}
                  color={'#e74a07'}
                  borderRadius={12}
                  borderWidth={0}
                  unfilledColor={'#e4d8cc'}
                />
                <Text
                  style={{
                    color: '#867970',
                    fontSize: 14,
                    paddingLeft: 6,
                    fontFamily: 'Oswald-Medium',
                  }}>
                  75-75
                </Text>
              </View>
              {/* <View >
            <Text>1</Text>
          </View> */}
               <View style={styles.count}>
                  {data?.data?.map((jsx, index) => {
                    return (
                      <TORN
                        activeOpacity={0.8}
                        onPress={() =>
                          count(index)
                        }
                        style={styles.loop}>
                        {jsx.buy ? <Image
                          style={styles.cross} source={require('../../assets/images/stamp.png')} /> : <Text style={styles.textNum}>{index + 1}</Text>}
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
    </View>
  );
};
const mapStateToProps = state => {
  return {
    user: state.userReducer.users,
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8ece0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: '16%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text0: {
    color: '#000000',
    fontSize: 18,
    paddingLeft: 16,
    fontFamily: 'Oswald-Medium',
    bottom: 5,
  },
  text1: {
    color: '#c5b9ad',
    fontSize: 16,
    fontFamily: 'Oswald-Regular',
  },
  beer: {
    width: 60,
    height: 160,
  },
  posi: {
    position: 'absolute',
    zIndex: 20,
    top: '40%',
    left: '85%',
  },
  modalView: {
    backgroundColor: '#f8ece0',
    borderRadius: 15,
    paddingVertical: 10,
    marginTop: Platform.OS == 'android' ? 0 : 30,
  },
  count: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
  },
  loop: {
    width: '12%',
    height: 38,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    borderRadius: 10,
  },
  textNum: {
    color: '#c5b9ab',
    fontFamily: 'Oswald-Medium',
  },
  rowModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  rowProgress: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  reset: {
    backgroundColor: '#d9cdc1',
    width: 50,
    height: 26,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    right: 12,
  },
  beerCard: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Oswald-Medium',
  },
  resetText: {
    color: '#fcf2e9',
    fontSize: 12,
    fontFamily: 'Oswald-Regular',
  },
  cross: {
    width: 24,
    height: 24,
  },
});
export default connect(mapStateToProps, null)(BeerMenu);
