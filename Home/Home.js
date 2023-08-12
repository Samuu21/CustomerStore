import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { AntDesign } from '@expo/vector-icons'; 
import Advert from './Advert';
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

const Home = ({ navigation }) => {
    const [id, setId] = useState('');
    const [view, setV] = useState(0);
    const [sold, setS] = useState(0); 

    useEffect(() => {
        const fetchid = async() => {
            const userid = await SecureStore.getItemAsync('supplier');
            setId(userid);
            const p = query(collection(db, "Orders"), where("supplier", "==", userid), where("status", "==", "Sent"));
            const q = query(collection(db, "History"), where("supplier", "==", userid));
            const pSnapShot = await getDocs(p); //For sold products.
            const qSnapShot = await getDocs(q); //For viewed products.
            if(pSnapShot.empty && qSnapShot.empty)
            {
                setS(0);
                setV(0);
            }
            else if(pSnapShot && qSnapShot.empty)
            {
                pSnapShot.forEach((doc) => {
                    setS(sold + 1);
                });
                setV(0);
            }
            else if(qSnapShot && pSnapShot.empty)
            {
                qSnapShot.forEach((doc) => {
                    setV(view + 1);
                });
                setS(0);
            }
            else if(pSnapShot && qSnapShot)
            {
                pSnapShot.forEach((doc) => {
                    setS(sold + 1);
                });
                qSnapShot.forEach((doc) => {
                    setV(view + 1);
                });
            }
            else
            {
                console.log('Something is very very wrong and we do not know what.')
            }
        };
        
        fetchid();
    }, []);

    return(
            <View style = {styles.container}>
                <Advert/>
                <ImageBackground source = {require('../images/cover1.png')} resizeMethod = 'scale'
                    style = {{flex: 1, justifyContent: 'center'}}>
                    <ScrollView style = {styles.scrollV}>
                        <Text style = {styles.welcome}>
                            "Design creates culture. Culture shapes values. Values determine the future."
                            - Robert L. Peters
                        </Text>
                        <Text style = {styles.welcome}>
                            From Malgre family we urge that you continue creating so we may form 
                            part of your greatness!
                        </Text>
                        <View style = {styles.row}>
                            <TouchableOpacity style = {styles.button}
                                onPress = {() => navigation.navigate('Items', {id: id})}>
                                <Text style = {styles.label}>Products Sold</Text>
                                <AntDesign name = 'tags' size = {35} color = 'black'/>
                                <Text style = {styles.number}>{sold}</Text>
                            </TouchableOpacity>
                            <Text style = {styles.space}></Text>
                            <TouchableOpacity style = {styles.button}
                                onPress = {() => navigation.navigate('Views', {id: id})}>
                                <Text style = {styles.label}>Views On Items</Text>
                                <AntDesign name = 'eye' size = {35} color = 'black'/>
                                <Text style = {styles.number}>{view}</Text>
                            </TouchableOpacity>
                        </View>
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
        backgroundColor: 'white',
    },

    scrollV:
    {
        paddingBottom: 10,
    },

    row: 
    {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        flexWrap: "wrap",
        paddingBottom: 90,
        opacity: 0.90
    },

    welcome:
    {
        color: 'black',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 17.5,
        padding: 20,
        lineHeight: 20,
        backgroundColor: 'white',
        opacity: 0.75
    },

    space:
    {
        paddingRight: 25,
    },

    button:
    {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#E7E6E6',
        borderColor: '#E7E6E6',
        borderWidth: 2,
        borderRadius: 20,
        marginTop: 50,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: 
        {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 6.84,
        elevation: 10,
        minWidth: '45%',
        maxWidth: '45%',
    },

    label:
    {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        backgroundColor: 'black',
        fontFamily: 'sans-serif',
        fontSize: 15,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 20
    },

    number:
    {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        backgroundColor: 'black',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        paddingVertical: 10,
        paddingHorizontal: 37.5,
        borderRadius: 20
    }
});

export default Home;