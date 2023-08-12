import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore, where } from "firebase/firestore";
import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore';
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

const Item = ({ invoice, supplier }) => {
    const [bank, setBank] = useState([]);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchTotal = async() => {
            const q = query(collection(db, "Orders"), where("supplier", "==", supplier), where("status", "==", "Approved"), where("invoice", "==", invoice));
            const querySnapShot = await getDocs(q);
            if(querySnapShot.empty)
            {
                //
            }
            else
            {
                querySnapShot.forEach((doc) => {
                    setTotal(total += doc.data().price);
                    setProducts(arr => [...arr, doc.data()]);
                });
            }
        };
        
        fetchTotal();
    }, [total]);

    var com = total * 0.15;
    var subtotal = total - com;

    useEffect(() => {
        const fetchDetails = async() => {
            const q = query(collection(db, "Bank"), where("supplier", "==", supplier));
            const qSnapShot = await getDocs(q);
            if(qSnapShot.empty)
            {
                //
            }
            else
            {
                qSnapShot.forEach((doc) => {
                   setBank(doc.data()); 
                }); 
            }
        };
        
        fetchDetails();
    }, []);

    async function Paid(products) 
    {
        products.forEach(async (item) => {
            try 
            {
                await setDoc(doc(db, 'Orders', item.id),
                {
                    name: item.data().name,
                    price: item.data().price,
                    top: item.data().top,
                    bottom: item.data().bottom,
                    bra: item.data().bra,
                    cup: item.data().cup,
                    quantity: item.data().quantity,
                    user: item.data().user,
                    supplier: item.data().supplier,
                    status: 'Approved_Dealt',
                    invoice: item.data().invoice,
                });
            } 
            catch (error) 
            {
                console.error("Error adding document: ", error);
            } 
        });
        alert('Invoice has been paid successfully.');
        await deleteDoc(doc(db, 'Orders'), where("supplier", "==", supplier), where("invoice", "==", invoice), where("status", "==", "Rejected"));
    }

    return (
        <View style = {styles.container}>
            <ScrollView style = {{ flex: 1, minHeight: '100%' }}>
                <Text style = {styles.header}>Order Pay Form:</Text>
                <View style = {styles.form}>
                    <View style = {styles.bank}>
                        <Text style = {styles.label}>Supplier Bank Details:</Text>
                        {bank.map((item, key) => (
                        <View style = {styles.hold}
                            key = {key}>
                            <Text style = {styles.text}>Cardholder Name: {item.name}</Text>
                            <Text style = {styles.text}>Bank Name: {item.bank}</Text>
                            <Text style = {styles.text}>Branch Code: {item.branch}</Text>
                            <Text style = {styles.text}>Account Number: {item.account}</Text>
                            <Text style = {styles.text}>Email Address: {item.supplier}</Text>
                        </View>
                        ))}
                        <View style = {styles.hold}>
                            <Text style = {styles.text}>Commission: {com}</Text>
                            <Text style = {styles.text}>Subtotal: {subtotal}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style = {styles.paid}
                        onPress = {() => {Paid(products)}}>
                        <Text style = {styles.buttonLabel}>Paid</Text>
                    </TouchableOpacity>
                    <Text style = {styles.space}></Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },

    header:
    {
        color: 'black',
        justifyContent: 'center',
        alignSelf: 'center',
        fontFamily: 'sans-serif',
        fontSize: 18,
        paddingBottom: 15,
    },

    form:
    {
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: 1,
        borderTopColor: 'black',
        borderTopWidth: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    label:
    {
        color: 'black',
        fontFamily: 'sans-serif-thin',
        fontSize: 15,
        marginTop: 15,
        alignSelf: 'center',
    },

    bank:
    {
        flex: 1,
        alignSelf: 'center',
        paddingVertical: 3.25
    },

    text:
    {
        fontFamily: 'sans-serif',
        fontSize: 15,
        fontWeight:'bold'
    },

    hold:
    {
        alignSelf: 'center',
    },

    paid:
    {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 1,
        backgroundColor: 'black',
        marginTop: 17.5,
        paddingVertical: 5,
        minWidth: '75%',
        maxWidth: '75%'
    },

    buttonLabel:
    {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#e6c2bf',
        padding: 5
    },

});

export default Item;