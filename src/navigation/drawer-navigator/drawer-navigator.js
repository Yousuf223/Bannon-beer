import React, {Children, useContext, useState} from 'react';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  useDrawerProgress,
  useDrawerStatus,
} from '@react-navigation/drawer';

import {
  Image,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  // Animated
} from 'react-native';
// import {Switch} from 'react-native-elements';
const {width, height} = Dimensions.get('window');
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useSelector, connect, useDispatch, } from 'react-redux'
import Animated from 'react-native-reanimated';
import Home from '../../screens/Home/Home.screen';
import MyPurchase from '../../screens/MyPurchase/MyPurchase';
import About from '../../screens/About/About';
import EditProfile from '../../screens/EditProfile/EditProfile';
import Notification from '../../screens/Notification/Notification';
import ChangePassword from '../../screens/ChangePassword/ChangePassword';
import QRScaner from '../../screens/QRScaner/QRScaner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppFeedback from '../../screens/AppFeedback/AppFeedback';
import ToggleSwich from '../../components/ToggleSwich/ToggleSwich';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { userLogout } from '../../stores/actions/user.action';
const DrawerContent = props => {

  const dispatch =useDispatch()
  const draweritem = [
    // {
    //   // image: '',
    //   title: 'Home',
    //   navigateTo: 'Home',
    // },

  ];

  const newData = useSelector((state) => state.userReducer.users)
  console.log("newDatanewDatanewData",newData)
  const [untilToday, setUntilToday] = useState(false)
  const [quality , setQuality] = useState(false)
  const [smart, setSmart] = useState(false);
  const {navigation}=props
  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{flex: 1, }}>
          <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
       
        <View style={styles.top}>
        <Image style={styles.profile}  source={{
          uri:newData?.profile_picture,
        }} />
          <View style={{flexDirection:"row"}}>
          <Text style={styles.profileName}>{newData?.first_name} {newData?.last_name}</Text>
          <TouchableOpacity 
          onPress={() => navigation.navigate('EditProfile')}
          activeOpacity={0.9}
          >
          <Image style={styles.editProfile} source={require('../../assets/images/editProfile.png')} />
          </TouchableOpacity>
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Text style={styles.textNum}>{newData?.contact}</Text>
            <Text style={styles.textNum1}>{newData?.email}</Text>
          </View>
        </View>
        <View style={{paddingLeft:15,paddingTop:"18%"}}>
          <TouchableOpacity 
        
                onPress={() => {
                  // navigation.navigate('MyDrawer', {
                  //     screen: 'Home',
                  // })
                  // navigation.navigate('MyDrawer', {
                  //     screen: 'Home',
                  // })
                  navigation.navigate('HomeDrawer')
              }}
          activeOpacity={0.8}
          style={styles.row1}
          >
             <Image style={styles.menuHome} source={require('../../assets/images/menuHome.png')} />
          <Text style={styles.text1}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.8}
          style={styles.row1}
      
          onPress={() => navigation.navigate('MyPurchase')}
          >
             <Image style={styles.menuHome} source={require('../../assets/images/menuPurchases.png')} />
          <Text style={styles.text1}>My Purchases</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            activeOpacity={0.8}
          style={styles.row1}
          >
             <Image style={styles.menuHome} source={require('../../assets/images/menuMy-Points.png')} />
          <Text style={styles.text1}>My Point</Text>
          </TouchableOpacity> */}
        <TouchableOpacity 
        activeOpacity={0.8}
        style={styles.row2}
        onPress={() => setQuality(!quality)}
        >
           <Image style={styles.menuHome} source={require('../../assets/images/menuSettings.png')} />
           <View style={{flexDirection:"row",}}>
          <Text style={styles.text1}>Settings</Text>
          <AntDesign style={styles.arrowIcon} name='right' size={17} color={'#ffffff'} />
          </View>
        </TouchableOpacity>
        {
          quality &&(
            <View>
              <View style={{flexDirection:"row",paddingLeft:"12%",justifyContent:"space-between",alignItems:"center",paddingVertical:10}}>
                <Text onPress={() => navigation.navigate('ChangePassword')} style={styles.text3}>Change Password</Text>
                <AntDesign  name='right' size={16} color={'#eb4909'} />
              </View>
              <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}
              activeOpacity={0.8}
              style={{flexDirection:"row",paddingLeft:"12%",justifyContent:"space-between",alignItems:"center"}}>
                <Text style={styles.text3}>Notification</Text>
                <ToggleSwich
                   selectionMode={1}
                   onSelectSwitch={e => {
                     setUntilToday(e)
                   }}
                />
              </TouchableOpacity>
            </View>
          )
        }
          <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AppFeedback')}
          style={styles.row1}
          >
             <Image style={styles.menuHome} source={require('../../assets/images/menuApp-Feedback.png')} />
          <Text style={styles.text1}>App Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          activeOpacity={0.8}
          style={styles.row1}
          onPress={() => navigation.navigate('About')}
          >
            <Image style={styles.menuHome} source={require('../../assets/images/menuAbout-App.png')} />
          <Text style={styles.text1}>About App</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
        activeOpacity={0.8}
        style={styles.logout}
        onPress={()=>{
          AsyncStorage.clear();
dispatch(userLogout(navigation))
        }}
        >
           <Image style={styles.menuHome} source={require('../../assets/images/menuLogout.png')} />
          <Text style={styles.textLogout}>Logout</Text>
        </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Screens = ({navigation, style}) => {
  const progress = useDrawerProgress();
  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  });
  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 30],
  });

  const animatedStyle = {borderRadius, transform: [{scale}]};
  return (
    <Animated.View
      style={StyleSheet.flatten([styles.stack, animatedStyle])}
    >
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTitle: null,
          headerShown: false,
        }}
        headerMode="none">
 

        <Stack.Screen name="HomeDrawer">{props => <Home {...props} />}</Stack.Screen>
        <Stack.Screen name="MyPurchase">{props => <MyPurchase {...props} />}</Stack.Screen>
        <Stack.Screen name="AppFeedback">{props => <AppFeedback {...props} />}</Stack.Screen>
        <Stack.Screen name="About">{props => <About {...props} />}</Stack.Screen>
        <Stack.Screen name="ChangePassword">{props => <ChangePassword {...props} />}</Stack.Screen>
        <Stack.Screen name="QRScaner">{props => <QRScaner {...props} />}</Stack.Screen>
        <Stack.Screen name="Notification">{props => <Notification {...props} />}</Stack.Screen>
        <Stack.Screen name="EditProfile">{props => <EditProfile {...props} />}</Stack.Screen>
      </Stack.Navigator>
    </Animated.View>
  );
};



export default props => {
  // const [progress, setProgress] = React.useState(new Animated.Value(0));

  return (
      <Drawer.Navigator
        screenOptions={{
          drawerType: "slide",
          drawerStyle: {
            flex: 1,
            width: '65%',
            backgroundColor: '#20382b',
          },
          overlayColor: 'transparent',
          sceneContainerStyle: {
            backgroundColor: '#20382b',
          },
        }}
        drawerContent={props => {
          // setProgress(props.progress);
          return <DrawerContent {...props} />;
        }}>
        <Drawer.Screen name="Screens" options={{headerShown: false}}>
          {props => <Screens {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    width: '100%',
    shadowColor: 'black',

    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,

    // backgroundColor: 'white',
    overflow: 'hidden',
    // borderWidth: 1,
  },
  drawerStyles: {flex: 1, width: '60%', backgroundColor: 'transparent'},
  drawerItem: {alignItems: 'flex-start', marginVertical: 0},
  drawerLabel: {color: 'white', marginLeft: 0},
  avatar: {
    width: width * 0.4,
    height: height * 0.1,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginRight: 10,
  },
  top:{
    paddingTop:"10%",
    paddingLeft:15
  },
  textNum:{
    fontSize:12,
    color:"#949a96",
    paddingTop:8,
    fontFamily:"Oswald-Regular"
  },
  textNum1:{
    fontSize:12,
    color:"#949a96",
    paddingTop:8,
    fontFamily:"Oswald-Regular",
    paddingRight:25
  },
  row1:{
    paddingVertical:14,
    flexDirection:"row"
  },
  row2:{
    flexDirection:"row"
  },
  text1:{
    color:"#fff",
    fontSize:16,
    paddingLeft:8,
    fontFamily:"Oswald-Medium",
    bottom:4
  },
  logout:{
    paddingTop:"22%",
    paddingLeft:15,
    flexDirection:"row"
  },
  textLogout:{
    color:"#ffffff",
    fontSize:16,
    paddingLeft:8,
    fontFamily:"Oswald-Medium",
    bottom:4
  },
  profile:{
    width:55,
    height:55,
    borderRadius:15
  },
  editProfile:{
    width:20,
    height:20,
    marginTop:4
  },
  profileName:{
    color:"#ffffff",
    fontSize:18,
    paddingRight:8,
    fontFamily:"Oswald-Medium"
  },
  menuHome:{
    width:20,
    height:20
  },
  text3:{
    color:"#b1aea5",
    fontWeight:"bold",
    fontSize:12
  },
  arrowIcon:{
    transform: [
      { rotateX: "45deg" },
      { rotateZ: "90deg" }
    ],
    left:Platform.OS == "android" ? 120:130
  }
});
