import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";

const Terms = () => {
    return (
      <View style = {styles.container}>
        <ImageBackground source = {require('../images/background.png')} resizeMethod = 'resize'
          style = {{flex: 1, justifyContent: 'center'}}>
          <ScrollView style = {styles.scrollV}>
            <Text style = {styles.text}>
              Below, is set out and detailed the terms and conditions of using this app.
              An individual who wishes to use the app Malgré Business agrees to the terms 
              and conditions by creating an account. The use of the app and it's features 
              will be given in great detail within this text as well.
            </Text>
            <Text style = {styles.space}></Text>
            <Text style = {styles.text}>
              Upon the creation of an account, the user agrees to the following terms:

              1. The user will be required to insert a proof of residence and a proof of 
              identification, and for it to be verified, before any of the user's products 
              could be sold on the platform, so automatically the user's products will be 
              placed into the Rejected Collection of products, and a reason will be provided 
              as to why, in this instance it will be that the proof of residence and the 
              proof of identification have not yet been provided. If, however, they have been 
              provided, we, 'Malgré Business', will proceed to verifying the legitimacy of 
              the provided documents. Upon conclusion of verification, the user will be allowed 
              to upload products that will now be under review by other conditions.
            </Text>
            <Text style = {styles.space}></Text>
            <Text style = {styles.text}>
              2. Once the proof of residence and proof of identification have been submitted and 
              thus verified, the product that a user uploads will be reviewed to meet the conditions 
              of sale, in the app itself. The app must have clear images of the product that's being 
              sold, if the images aren't clear and if the images display false advertising, the 
              products will be banned and rejected from the product's collection and subsquently 
              the user's account will be put under review. If the product meets all conditions and, 
              the user has inserted all the necessary user details, which are:
              --- Designer Details.
              --- Bank Details. 
              , then the product will be placed in the Approved Products collection, where it must 
              meet all product conditions which are:
              --- Clear Images.
              --- Clear Product Description.
            </Text>
            <Text style = {styles.space}></Text>
            <Text style = {styles.text}>
              3. The user has 4 size charts to work with so as to provide a definitive description 
              and outline of their product, as well as the product's details that are necessary for 
              a consumer to purchase  the product. Each product that is in the Approved Products 
              collection, will be shown to the consumer in the adjacent app 'Malgré', for purchase.
            </Text>
            <Text style = {styles.space}></Text>
            <Text style = {styles.text}>
              4. Once a user has purchased a product that belongs to the user who created and 
              uploaded the product, the order will be placed on the Pending Orders collection, where 
              it will wait for the approval of the user, once they have checked that the ordered product 
              is in stock. If a user finds that the requested product order is not in stock, they will 
              be required to 'Reject' the order, this will lead to the speedy transfer of funds to 
              consumers if a product is unavailable. If a product is available, then, the user will 'Accept' 
              the order and it will be placed in the 'Approved' Order collection, where 'Malgré Business' 
              will pay the user for that product, or subsequent orders. Upon payment, the specific order 
              by invoice number will change status to 'Paid', and a user will receive proof of payment, 
              so as to verify this change. Proof of payment will either be sent on sms, or email, or 
              both forms of communication.
            </Text>
            <Text style = {styles.space}></Text>
            <Text style = {styles.text}>
              5. Once an order has been 'Paid' by 'Malgré Business', the user can proceed to use the 
              features available to handle their supply side of things. The user can the, click and show 
              if a product has been packaged or not, the user can also now click to show that an item or 
              package has been sent to 'Malgré Business' for delivery to the consumer. 
            </Text>
            <Text style = {styles.space}></Text>
            <Text style = {styles.text}>
              6. Malgré Business will take a service fee of 15% of every item of clothing sold and processed 
              by Malgré Business, the use will be given a subtotal and total of the service fee deducted by 
              Malgré Business. The services offered by Malgré Business are that not only of facilitaing the 
              secure transfer of payment to the user, but to also advertise and deliver the product on 
              behalf of the user.
            </Text>
            <Text style = {styles.space}></Text>
            <Text style = {styles.text}>
              7. Please take note that users will only be sent the amount of money that is for Approved Orders 
              that are relative to the user.
            </Text>
            <Text style = {styles.space}></Text>
            <Text style = {styles.text}>
              8. The user will make use of PEP store to send the Approved Order, the details of where to send 
              the package/order/product/item, will be provided on the app.
            </Text>
            <Text style = {styles.space}></Text>
            <Text style = {styles.text}>
              9. If a user is found to be deceitful and untrue about the availability of a certain item that 
              'Malgré Business' has paid for, the user's account will subsquently be placed on review.
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

export default Terms;