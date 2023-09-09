import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs, } from 'firebase/firestore';
import Photo from './Photo';
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

const Pending = ({ navigation }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async() => {
            const q = query(collection(db, "Items"), where("status", "==", 'Pending'));
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
                <ScrollView style = {styles.scrollV}>
                    <View style = {styles.scroll}>
                        <Image style = {{ width: 175, height: 175, resizeMode: 'contain', marginTop: 35, paddingBottom: 7.5}}
                            source = {require('../images/NoProducts.png')}/>
                        <Text style = {styles.desc}> There are no products pending yet.</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
    else //This one is if there is a result.
    {
        return(
            <View style = {styles.container}>
                <ImageBackground source = {require('../images/cover6.png')} resizeMethod = 'scale'
                    style = {{flex: 1, justifyContent: 'center'}}>
                    <ScrollView style = {styles.scrollV}>
                    {products.map((item, key) => (
                        <TouchableOpacity style = {styles.hold}
                            key = {key}
                            onPress = {() => {navigation.navigate('Item', {name: item.name, price: item.price, top: item.top, bottom: item.bottom, bra: item.bra, cup: item.cup, quantity: item.quantity, gender: item.gender, category: item.category, sale: item.sale, saleprice: item.saleprice, supplier: item.supplier, status: item.status})}}>
                            <View style = {styles.row}>
                                <View style = {styles.image}>
                                    <Photo id = {item.supplier} name = {item.name}/>
                                </View>
                                <View style = {styles.info}>
                                    <ScrollView>
                                        <Text style = {styles.text}>Name: {item.name}</Text>
                                        <Text style = {styles.text}>Quantity: {item.quantity}</Text>
                                        <Text style = {styles.text}>Size: Top Size - {item.top}, Bottom Size - {item.bottom}, Bra Size - {item.bra}{item.cup}</Text>
                                        <Text style = {styles.text}>Price: R {item.price}</Text>
                                    </ScrollView>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <Text style = {styles.space}></Text>
                    </ScrollView>
                </ImageBackground>
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
        paddingBottom: 75
    },

    scrollV:
    {
        paddingVertical: 10,
    },

    space:
    {
        paddingBottom: 15,
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
        paddingVertical: 2.5,
    },

    hold:
    {
        marginLeft: 7.5,
        marginBottom: 10,
        paddingVertical: 12.5,
        paddingHorizontal: 2.75,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: 
        {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 6.84,
        elevation: 10,
        minWidth: '95%',
        maxWidth: '95%',
        opacity: 0.85
    },

    image:
    {
        maxwidth: 175,
        maxheight: 175,
        minwidth: 175,
        minheight: 175

    },

    first:
    {
        paddingBottom: 2.5,
        paddingTop: 7.5,
        paddingLeft: '85%',
        maxWidth: '100%',
        minWidth: '100%',
    },
    
    info:
    {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 10,
        paddingBottom: 15
    },

    text:
    {
        color: 'black',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 13,
    },

    delete:
    {
        justifyContent: 'center',
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
    },

    button:
    {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: '#e6c2bf',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#e6c2bf',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 10,
    },

    buttonLabel:
    {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        padding: 5
    },

    button2:
    {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 1,
        backgroundColor: 'black',
        minWidth: '50%',
        maxWidth: '50%',
        padding: 5,
        marginVertical: 45,
    },

    buttonLabel2:
    {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#e6c2bf',
        padding: 5,
    },
});

export default Pending;