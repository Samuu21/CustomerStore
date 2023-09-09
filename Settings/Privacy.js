import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";

const Privacy = () => {
    return (
      <View style = {styles.container}>
        <ImageBackground source = {require('../images/background.png')} resizeMethod = 'resize'
          style = {{flex: 1, justifyContent: 'center'}}>
          <ScrollView style = {styles.scrollV}>
            <Text style = {styles.text}>
              Below, is set out and detailed the Privacy Policy of this app. An individual who creates an 
              account on this app 'Malgré Business' agrees to the Privacy Policy that will be stipulated 
              below.
            </Text>
            <Text style = {styles.space}></Text>
            <Text style = {styles.text}>
              'Malgré Business' initially receives the user's email address, which is used to create an 
              account and subsequently the possibility to retrieve the user's password if it is forgotten.
              The email address is also used internally for communication on Updates about the different 
              policies and terms of service with in the app. It is also used for communique about any 
              app changes and features either added or removed. Email addresses will be stored on Google 
              Servers, specifically on Firebase. Email addresses will not be distributed to third parties.
            </Text>
            <Text style = {styles.space}></Text>
            <Text style = {styles.text}>
              1. We request the insertion of the user's Proof of Residence and Proof of Identification. 
              This is to first verify the authenticity of the user and to have a proper path to whom is 
              responsible for the products uploaded and orders handled by this user account. We also gather 
              this information to prevent from any fraudalent activities, and to further be able to take 
              appropriate action if it happens that a user has committed fraud and has been dishonest. The 
              documents, or information contained in the documents is not aavailable to third parties, this 
              information will only be made available to the relevant authorities upon their request or if 
              need be.
            </Text>
            <Text style = {styles.space}></Text>
            <Text style = {styles.text}>
              2. We request the insertion of 'Designer Details' and also 'Bank Details'. This is the user's 
              name, surname, cellphone number, bank name, cardholder name, branch code and account number. This 
              is so we can be able to make the appropriate payment to the user for a particular order, this is 
              to also provide the relevant Proof of Payment to the user in multiple forms of communication. 
            </Text>
            <Text style = {styles.space}></Text>
            <Text style = {styles.text}>
              3. Data analytics will be performed on the amount of items/products sold by the user, as well as 
              the amount of times the items of the user has been viewed on the app. This will be for user and 
              internal purposes. This information may be sold, or packaged, or shared with third parties, third 
              parties being other companies and apps.
            </Text>
            <Text style = {styles.space}></Text>
            <Text style = {styles.text}>
              All information gathered, as stipulated above is being stored on Google Servers, on Firebase.
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

export default Privacy;