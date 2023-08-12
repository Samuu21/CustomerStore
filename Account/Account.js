import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { AntDesign } from '@expo/vector-icons';
import Advert from "./Advert";
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

const Account = ({ navigation }) => {
    const [id, setId] = useState('');
    const [a, setA] = useState(''); //Res
    const [b, setB] = useState(''); //Id

    useEffect(() => {
        const fetchStatus = async() => {
            const userid = await SecureStore.getItemAsync('supplier');
            const p = query(collection(db, "Res"), where("supplier", "==", userid));
            const pSnapShot = await getDocs(p);
            const q = query(collection(db, "Id"), where("supplier", "==", userid));
            const qSnapShot = await getDocs(q);
            if(qSnapShot.empty && pSnapShot.empty)
            {
                setA('Not submitted');
                setB('Not submitted');
            }
            else if(!pSnapShot.empty && qSnapShot.empty)
            {
                pSnapShot.forEach((doc) => {
                    setA(doc.data().status);
                });
                setB('Not submitted');
            }
            else if(!qSnapShot.empty && pSnapShot.empty)
            {
                qSnapShot.forEach((doc) => {
                    setB(doc.data().status);
                });
                setA('Not submitted');
            }
        };
        
        fetchStatus();
    });

    return(
            <View style = {styles.container}>
                <Advert/>
                <ImageBackground source = {require('../images/cover2.png')} resizeMethod = 'resize'
                    style = {{flex: 1, justifyContent: 'center'}}>
                    <ScrollView style = {styles.scrollV}>
                        <View style = {styles.row}>
                            <TouchableOpacity style = {styles.button}
                                onPress = {() => navigation.navigate('Res')}>
                                <Text style = {styles.label}>Proof of Residence</Text>
                                <AntDesign name = 'form' size = {30} color = 'black'/>
                                <Text style = {styles.number}>{a}</Text>
                            </TouchableOpacity>
                            <Text style = {styles.space}></Text>
                            <TouchableOpacity style = {styles.button}
                                onPress = {() => navigation.navigate('Id')}>
                                <Text style = {styles.label}>Proof of Identity</Text>
                                <AntDesign name = 'idcard' size = {30} color = 'black'/>
                                <Text style = {styles.number}>{b}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.button}
                                onPress = {() => navigation.navigate('Bank')}>
                                <Text style = {styles.label}>Banking Details</Text>
                                <AntDesign name = 'creditcard' size = {30} color = 'black'/>
                                <Text></Text>
                            </TouchableOpacity>
                            <Text style = {styles.space}></Text>
                            <TouchableOpacity style = {styles.button}
                                onPress = {() => navigation.navigate('Designer')}>
                                <Text style = {styles.label}>Designer Details</Text>
                                <AntDesign name = 'solution1' size = {30} color = 'black'/>
                                <Text></Text>
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
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 5,
        opacity: 0.90
    },

    welcome:
    {
        color: 'black',
        fontFamily: 'sans-serif-thin',
        fontSize: 17.5,
        padding: 2.5
    },

    space:
    {
        paddingRight: 20
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
        borderRadius: 20,
        marginBottom: 10
    },

    number:
    {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        backgroundColor: 'black',
        fontFamily: 'sans-serif-thin',
        fontSize: 15,
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 35,
        borderRadius: 20
    }
});

export default Account;