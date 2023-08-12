import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection } from 'firebase/firestore';
import { decode } from 'base-64';

if(typeof atob === 'undefined') {
  global.atob = decode;
}
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBz1NwWgjC9U4CU7nRcWtwVp6aBkOIhN_Q",
    authDomain: "malgre-business.firebaseapp.com",
    projectId: "malgre-business",
    storageBucket: "malgre-business.appspot.com",
    messagingSenderId: "9807951283",
    appId: "1:9807951283:web:b841f4d997e169da6e87c6",
    measurementId: "G-3JJFPCV0H6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Status = ({ name, price, top, bottom, bra, cup, quantity, user, supplier, invoice }) => {
    const [paid, setPaid] = useState([]);

    useEffect(() => {
        const fetchPaid = async() => {
            const q = query(collection(db, "Orders"), where("name", "==", name), where("price", "==", price), where("top", "==", top), where("bottom", "==", bottom), where("bra", "==", bra), where("cup", "==", cup), where("quantity", "==", quantity), where("user", "==", user), where("supplier", "==", supplier), where("invoice", "==", invoice), where("status", "array-contains", 'Approved'));
            const querySnapShot = await getDocs(q);
            if(querySnapShot.empty)
            {
                //
            }
            else
            {
                querySnapShot.forEach((doc) => {
                    setPaid(arr => [...arr, doc.data().status]);
                });
            }
        };
        
        fetchPaid();
    }, [product]); 

    if(paid == 'Approved_Dealt')
    {
        return(
            <View style = {styles.container1}>
                <Text style = {styles.text1}>Paid</Text>
            </View>
        );
    }
    else
    {
        return(
            <View style = {styles.container2}>
                <Text style = {styles.text2}>Unpaid</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({ 
    container1:
    {
        marginLeft: 5,
        marginVertical: 5,
        flex: 1,
        minWidth: '25%',
        maxWidth: '25%',
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
    },

    text1:
    {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#e6c2bf',
        textAlign: 'center',
        paddingVertical: 2.5
    },

    container2:
    {
        marginLeft: 5,
        marginVertical: 5,
        flex: 1,
        minWidth: '25%',
        maxWidth: '25%',
        backgroundColor: '#e6c2bf',
        borderWidth: 1,
        borderColor: '#e6c2bf',
        borderRadius: 20,
    },

    text2:
    {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        textAlign: 'center',
        paddingVertical: 2.5
    },
});

export default Status;