import React from 'react';
import {View  , StyleSheet, Image } from 'react-native';
function EmptycartScreen () {
    return (
    <View style={styles.container}>
      <Image source={require('../Image/emptycart.jpg')} style={styles.image} />
    </View>
    );
    }
    const styles = StyleSheet.create({
        container: {
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#ffffff',
        },
        image: {
            height:350,
            width:400
        },
    });
    export default EmptycartScreen;