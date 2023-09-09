import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, addDoc } from 'firebase/firestore';
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

const Item_M = ({ route }) => {
    const [i, setI] = useState(''); //Product id is here.
    const [name, setName] = useState(route.params.name); //Name of product
    const [price, setPrice] = useState(route.params.price); //Price of product
    const [top, setTop] = useState(route.params.top); //Size top of product
    const [bottom, setBottom] = useState(route.params.bottom); //Size bottom of product
    const [bra, setBra] = useState(route.params.bra); //Size bra of product
    const [cup, setCup] = useState(route.params.cup); //Size cup of product
    const [quantity, setQuantity] = useState(route.params.quantity); //Quantity of product
    const [status, setStatus] = useState(route.params.status); //Status of product
    const [user, setuser] = useState(route.params.user); //User of product
    const [supplier, setSupplier] = useState(route.params.supplier); //Supplier of product
    const [invoice, setInvoice] = useState(route.params.invoice); //Invoice of product


    useEffect(() => {
        const fetchProducts = async() => {
            const q = query(collection(db, "Orders"), where("name", "==", name), where("price", "==", price), where("top", "==", top), where("bottom", "==", bottom), where("bra", "==", bra), where("cup", "==", cup), where("quantity", "==", quantity), where("user", "==", user), where("supplier", "==", supplier), where("status", "==", status), where("invoice", "==", invoice));
            const querySnapShot = await getDocs(q);
            if(querySnapShot.empty)
            {
                //
            }
            else
            {
                querySnapShot.forEach((doc) => {
                    setI(doc.id);
                });
            }
        };
        
        fetchProducts();
    }, []);

    async function Approve(name, price, top, bottom, bra, cup, quantity, user, supplier, invoice, i) 
    {
        try {
            await setDoc(doc(db, 'Orders', i),
            {
                name: name,
                price: price,
                top: top,
                bottom: bottom,
                bra: bra,
                cup: cup,
                quantity: quantity,
                user: user,
                supplier: supplier,
                status: 'Approved',
                invoice: invoice
            });
            alert('Product has been approved.');
        } catch (error) {
            console.error("Error adding document: ", error);
        }    
    }

    async function Complete(name, price, top, bottom, bra, cup, quantity, user, supplier, invoice, i) 
    {
        try {
            await setDoc(doc(db, 'Orders', i),
            {
                name: name,
                price: price,
                top: top,
                bottom: bottom,
                bra: bra,
                cup: cup,
                quantity: quantity,
                user: user,
                supplier: supplier,
                status: 'Complete',
                invoice: invoice
            });
            alert('Product has been approved.');
        } catch (error) {
            console.error("Error adding document: ", error);
        }    
    }

    async function Reject(name, price, top, bottom, bra, cup, quantity, user, supplier, invoice, i) 
    {
        try {
            await setDoc(doc(db, 'Orders', i),
            {
                name: name,
                price: price,
                top: top,
                bottom: bottom,
                bra: bra,
                cup: cup,
                quantity: quantity,
                user: user,
                supplier: supplier,
                status: 'Rejected',
                invoice: invoice
            });
            alert('Product has been rejected.');
        } catch (error) {
            console.error("Error adding document: ", error);
        }    
    }

    if(status == 'Pending')
    {
        return (
            <View style = {styles.container}>
                <ScrollView style = {styles.hold}>
                    <Text style = {styles.header}>
                        Product Order Form:
                    </Text>
                    <TouchableOpacity style = {styles.approve}
                        onPress = {() => {Approve(name, price, top, bottom, bra, cup, quantity, user, supplier, invoice, i)}}>
                        <Text style = {styles.buttonLabel}>Approve</Text>
                    </TouchableOpacity>
                    <Text style = {styles.space}></Text>
                    <TouchableOpacity style = {styles.reject}
                        onPress = {() => {Reject(name, price, top, bottom, bra, cup, quantity, user, supplier, invoice, i)}}>
                        <Text style = {styles.buttonLabel}>Reject</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
    else if(status == 'Rejected')
    {
        return (
            <View style = {styles.container}>
                <ScrollView style = {styles.hold}>
                    <Text style = {styles.header}>
                        Product Order Form:
                    </Text>
                    <TouchableOpacity style = {styles.approve}
                        onPress = {() => {Approve(name, price, top, bottom, bra, cup, quantity, user, supplier, invoice, i)}}>
                        <Text style = {styles.buttonLabel}>Approve</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
    else if (status == 'Approved')
    {
        return (
            <View style = {styles.container}>
                <ScrollView style = {styles.hold}>
                    <Text style = {styles.header}>
                        Product Order Form:
                    </Text>
                    <TouchableOpacity style = {styles.complete}
                        onPress = {() => {Complete(name, price, top, bottom, bra, cup, quantity, user, supplier, invoice, i)}}>
                        <Text style = {styles.blabel}>Complete/Packaged</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    hold:
    {
        minWidth: '100%',
        maxWidth: '100%',
    },

    header:
    {
        color: 'black',
        fontFamily: 'sans-serif',
        fontSize: 18,
        alignSelf: 'center'
    },

    label:
    {
        color: 'black',
        fontFamily: 'sans-serif-thin',
        fontSize: 15,
        marginBottom: 1,
    },

    approve:
    {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 1,
        backgroundColor: 'green',
        marginVertical: 15,
        paddingVertical: 5,
        minWidth: '75%',
        maxWidth: '75%'
    },

    reject:
    {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 1,
        backgroundColor: 'red',
        marginVertical: 15,
        paddingVertical: 5,
        minWidth: '75%',
        maxWidth: '75%'
    },

    complete:
    {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 1,
        backgroundColor: 'black',
        marginVertical: 15,
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
        color: 'white',
        padding: 5
    },

    blabel:
    {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        padding: 5
    },
});

export default Item_M;