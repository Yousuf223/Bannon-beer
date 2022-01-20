import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Linking,
  TouchableOpacity,
  Alert,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {connect, useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {QRCodeAction} from '../../stores/actions/user.action';
import {RNCamera} from 'react-native-camera';
const QRScaner = ({navigation, route, QRCodeAction}) => {
  const [state, setstate] = useState();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const newData = useSelector(state => state.userReducer.users);
  useEffect(() => {
    setstate(newData?.state);
  }, []);
  const onSuccess = e => {
    var data1 = new FormData();
    data1.append('barcode_id', e?.data);
    console.log('Yousuf', e?.data, e);
    // Linking.openURL(e.data).catch(err =>
    //     console.error('An error occured', err)
    // );
    QRCodeAction(data1)
      .then(res => {
        //
        Alert.alert('Alert', res?.message);
        console.log(
          'res------------------==============',
          res,
          res?.success == false,
        );
        if (res?.success == false) {
          // MyPurchase
          navigation.goBack()
        } else {
          navigation.navigate('MyPurchase');
        }

        //
      })
      .catch(err => {
        console.log('error catch', err.message);
      });
    setIsLoading(true);
  };
  const {item} = route.params;

  return (
    <>
      <QRCodeScanner
        onRead={onSuccess}
        // onRead={onSuccess()}
        flashMode={RNCamera.Constants.FlashMode.torch}
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{width: 30, height: 88}}
                source={{uri: item.image}}
              />
              <View>
                <Text>
                  02<Text></Text>
                  {item.name}{' '}
                </Text>
                <View style={{marginVertical: 6}}>
                  <View
                    style={{
                      backgroundColor: '#f3e7db',
                      borderRadius: 4,
                      paddingHorizontal: 4,
                      paddingVertical: 2,
                      width: 50,
                      height: 18,
                      alignItems: 'center',
                    }}>
                    <Text style={styles.text1}>
                      Abv {item.alcohol_percentage}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#e74a07',
                      fontFamily: 'Oswald-Bold',
                      fontSize: 12,
                      marginTop: 1,
                    }}>
                    ${item.price}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        }
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.userReducer.users,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({QRCodeAction}, dispatch);

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  buttonTouchable: {
    backgroundColor: '#fff',
    top: 20,
    width: '85%',
    height: '70%',
    borderRadius: 10,
  },
  text1: {
    color: '#7f705d',
    fontSize: 10,
    fontFamily: 'Oswald-Regular',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(QRScaner);
