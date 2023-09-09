import React from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native";

const Refund = () => {
    return (
      <View style = {styles.container}>
        <ImageBackground source = {require('../images/background.png')} resizeMethod = 'resize'
          style = {{flex: 1, justifyContent: 'center'}}>
          <ScrollView style = {styles.scrollV}>
            <Text style = {styles.text}>
              Below, is set out and detailed the Refund Policy of this app. An individual who creates an 
              account on this app 'Malgré Business' agrees to the Refund Policy that will be stipulated 
              below.
            </Text>
            <Text style = {styles.space}></Text>
            <Text style = {styles.text}>
              The Refund Policy of 'Malgré Business' outlines that upon payment by the consumer for the 
              products of the user, 'Malgré Business' will proceed to paying the user on behalf of the 
              consumer, with a 15% service fee deducted already. The user will be expected to declare 
              which ordered products are available on stock, if a particular product is not available 
              on stock, the user must click 'Reject' on the product, that is on 'Pending Orders' 
              collection. This is to unsure that a consumer receives a refund on unavailable products 
              speedingly. Failure to do so may result in the user's account being placed on review and 
              subsequent suspension. 
            </Text>
          </ScrollView>
        </ImageBackground>
      </View>
    );
}

const styles = StyleSheet.create({
  container:
  {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
  },

  scrollV:
  {
      paddingBottom: 10,
      marginBottom: 15,
      paddingHorizontal: 10
  },

  space:
  {
    paddingBottom: 10,
  },

  text:
  {
    fontFamily: 'sans-serif',
    fontSize: 15,
    color: 'black'
  }
});

export default Refund;