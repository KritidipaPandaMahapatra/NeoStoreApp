// import React from 'react';
// import {View ,Text,StyleSheet} from 'react-native';
// //import MapView  from 'react-native-maps';
// function StorelocatorScreen() {
//     return (
//         <View>
//                 <Text>This is Store locator</Text>
//                 {/* <View style={styles.container}>
//      <MapView
      
//        style={styles.map}
//        region={{   
//          latitude: 37.78825,
//          longitude: -122.4324,
//          latitudeDelta: 0.015,
//          longitudeDelta: 0.0121,
//        }}
//      >
//      </MapView> 
//    </View> */}
//             </View>
//         )
// }
// const styles = StyleSheet.create({
//     container: {
//     //  ...StyleSheet.absoluteFillObject,
//       height: 400,
//       width: 400,
//       justifyContent: 'flex-end',
//       alignItems: 'center',
//     },
//     // map: {
//     //   ...StyleSheet.absoluteFillObject,
//     // },
//    });
// export default StorelocatorScreen;
import React from 'react';
import {View,  StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
//import Icon from 'react-native-vector-icons/Ionicons';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Appbar} from 'react-native-paper';

 const StorelocatorScreen = () => {
  return (
    <View>
      <Appbar.Header style={storeLocatorStyl.appbarstyl}>
        
        <Appbar.Content title="Store Locator" />
      </Appbar.Header>
      <MapView
        initialRegion={{
          latitude: 19.07609,
          longitude: 72.877426,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{height: '90%', width: '100%'}}
    >
      <Marker
        coordinate={{
          latitude: 19.07609,
          longitude: 72.877426,
        }}
        icon={<Icon name="map-marker" size={25} color="red" />}
      />
       {/* <Marker
        coordinate={{
          latitude: 18.5204,
          longitude: 73.8567,
        }}
        icon={<Icon name="map-marker" size={25} color="red" />}
      /> */}
      </MapView>
    </View>
  );
};

const storeLocatorStyl = StyleSheet.create({
  appbarstyl: {
    backgroundColor: 'white',
  },
});
export default StorelocatorScreen;