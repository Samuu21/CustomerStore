//This is where the views of the supplier's product shows.
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import Advert from "./Advert";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from 'firebase/firestore';
import Photo from "./Photo";
import { decode } from 'base-64';

if(typeof atob === 'undefined') {
  global.atob = decode;
}

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

const Views = ({ route }) => { 
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async() => {
            const q = query(collection(db, "History"), where("supplier", "==", route.params.id));
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
    }, []);
    
    if(products.length <= 0) //This one is if there is no result.
    {
        return (
            <View style = {styles.container}>
                <Advert/>
                <View style = {styles.scroll}>
                    <Image style = {{ width: 175, height: 175, resizeMode: 'center', marginTop: 35, paddingBottom: 7.5}} 
                        source = {require('../images/NoProducts.png')}/>
                    <Text style = {styles.desc}> There are no items viewed yet.</Text>
                </View>
            </View>
        );
    }
    else //This one is if there is a result.
    {
        return(
            <View style = {styles.container}>
                {products.map((item, key) => (
                    <View style = {styles.hold}
                        key = {key}>
                        <View style = {styles.row}>
                            <View style = {styles.image}>
                                <Photo name = {item.name}/>
                            </View>
                            <View style = {styles.info}>
                                <ScrollView>
                                    <Text style = {styles.text}>Product name: {item.name}</Text>
                                    <Text style = {styles.text}>Product quantity:{item.quantity}</Text>
                                </ScrollView>
                            </View>
                        </View>
                        <View style = {styles.price}>
                            <Text style = {styles.label}>{item.price}</Text>
                        </View>
                    </View>
                    )
                )}
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container:
    {
        backgroundColor: 'white',
        minWidth: '100%',
        maxWidth: '100%',
        flex: 1,
    },

    scroll:
    {
        justifyContent: 'center',
        alignItems: 'center',
    },

    desc:
    {
        paddingTop: 17.5,
        color: 'black',
        fontFamily: 'sans-serif-light',
        fontSize: 15
    },


    row: 
    {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 10,
    },

    hold:
    {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        minWidth: '100%',
        maxWidth: '100%',
        margin: 0,
        padding: 0,
    },

    image:
    {
        padding: 2,
    },
    
    info:
    {
        padding: 2.5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    text:
    {
        color: 'black',
        fontFamily: 'sans-serif-thin',
        fontSize: 15,
    },

    button:
    {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 0,
        margin: 0
    },

    price:
    {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 0,
        margin: 0,
    },

    label:
    {
        color: 'black',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingVertical: 2
    },

    amount:
    {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 2.5,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        backgroundColor: '#e6c2bf',
    },

    header:
    {
        color: 'black',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 17.5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 2,
    },

    total:
    {
        color: 'black',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 17.5,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingVertical: 2,
    }
});

export default Views;