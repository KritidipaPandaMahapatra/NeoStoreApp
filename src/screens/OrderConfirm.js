import React from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Appbar, Card, Divider, Button, Title} from 'react-native-paper';
import {hp, wp} from './style';
import {useIsFocused} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';


 const OrderConfirm = ({navigation}) => {
  const isUserFocus = useIsFocused();
  React.useEffect(() => {
    Refresh();
    createChannels();
  }, [isUserFocus]);
  const Refresh = () => {
    setModalVisible(!isModalVisible);
  };
  const [isModalVisible, setModalVisible] = React.useState(false);
  const createChannels = () => {
    PushNotification.createChannel({
      channelId:"test-channel",
      channelName:"Test Channel"
    })
  }
  return (
    <View>
      <Modal
        transparent={true}
        visible={isModalVisible}
        style={{width: wp('60%'), height: hp('40%')}}>
        <View style={{flex: 1}}>
          <Card style={ProductDetailStyl.modalCard}>
            <Card.Content>
              <Text style={ProductDetailStyl.topMsg}>ORDER CONFIRMED</Text>
              <Divider style={{marginTop: hp('42%')}} />
              <Text style={ProductDetailStyl.midMsg}>
                Thanks for Placing oreder with
              </Text>
              <Text style={ProductDetailStyl.midMsg}>NeoStore!</Text>
              <Text style={ProductDetailStyl.midMsg}>
                Your Order has been Confirmed
              </Text>

              <Button
                color="white"
                style={ProductDetailStyl.modalButton}
                onPress={() => {
                  navigation.navigate('Dashboard');
                }}>
                OK
              </Button>
            </Card.Content>
          </Card>
        </View>
      </Modal>
    </View>
  );
};
const ProductDetailStyl = StyleSheet.create({
  modalCard: {
    backgroundColor: 'white',
    marginTop: hp('12%'),
    marginBottom: hp('15%'),
    marginLeft: hp('5%'),
    marginRight: hp('5%'),
    flex: 1,
    borderRadius: wp('8%'),
    height: hp('50%'),
  },

  modalButton: {
    width: wp('25%'),
    marginTop: hp('2%'),
    borderRadius: 25,
    backgroundColor: 'dodgerblue',
    alignSelf: 'center',
    padding: hp('0.8%'),
    fontSize: 80,
  },
  topMsg: {
    alignSelf: 'center',
    paddingBottom: hp('2%'),
    fontSize: wp('6%'),
    marginTop: hp('3%'),
    fontWeight: '900',
    color: 'black',
  },
  midMsg: {
    fontSize: wp('4%'),
    fontWeight: 'normal',
    color: 'black',
    alignSelf: 'center',
  },
});
export default OrderConfirm;