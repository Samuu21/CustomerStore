import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs, } from 'firebase/firestore';
import Photo from './Photo';

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

const Desc = ({ invoice, supplier }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async() => {
            const q = query(collection(db, "Orders"), where("supplier", "==", supplier), where("status", "==", "Complete"), where("invoice", "==", invoice));
            const querySnapShot = await getDocs(q);
            if(querySnapShot.empty)
            {
                //
            }
            else
            {
                querySnapShot.forEach((doc) => {
                    setProducts(arr => [...arr, doc.data()]);
                });
            }
        };
        
        fetchProducts();
    }, [products]);

    return(
        <View style = {styles.container}>
            <ScrollView style = {styles.scrollV}>
                {products.map((item, key) => (
                    <View
                        key = {key} 
                        style = {styles.row}>
                        <View style = {styles.image}>
                            <Photo id = {item.supplier} name = {item.name}/>
                        </View>
                        <View style = {styles.info}>
                            <ScrollView>
                                <Text style = {styles.text}>Name: {item.name}</Text>
                                <Text style = {styles.text}>Quantity: {item.quantity}</Text>
                                <Text style = {styles.text}>Size: Top Size - {item.top}, Bottom Size - {item.bottom}, Cup Size - {item.cup}</Text>
                                <Text style = {styles.text}>Price: R {item.price}</Text>
                            </ScrollView>
                        </View>
                    </View>
                    ))}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({

});

export default Desc;