import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import Advert from './Advert';
import Details_S from "./Details/Details_S";
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

const Designer = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [number, setNumber] = useState('');
    const [docId, setDocId] = useState('');

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    useEffect(() => {
        const fetchid = async() => {
            const userid = await SecureStore.getItemAsync('supplier');
            setId(userid);
            const q = query(collection(db, "Designer"), where("supplier", "==", userid));
            const querySnapShot = await getDocs(q);
            if(querySnapShot.empty)
            {
                //
            }
            else
            {
                querySnapShot.forEach((doc) => {
                    setName(doc.data().name);
                    setSurname(doc.data().surname);
                    setNumber(doc.data().number);
                    setDocId(doc.id);
                });
            }
        };
        
        fetchid();
    });

    return(
        <View style = {styles.container}>
            <Advert/>
            <ImageBackground source = {require('../images/cover4.png')} resizeMethod = 'scale'
                style = {{flex: 1, justifyContent: 'center'}}>
                <ScrollView style = {styles.scrollV}>
                    <View style = {styles.user}>
                        <Ionicons name = 'shirt' size = {75} color = 'black' style = {{ paddingBottom: 17.5 }}/>
                        <View style = {styles.row}>
                            <View style = {styles.hold}>
                                <Text style = {styles.header}>Name:</Text>
                                <Text style = {styles.text}>{name}</Text>
                            </View>
                            <View style = {styles.hold}>
                                <Text style = {styles.header}>Surname:</Text>
                                <Text style = {styles.text}>{surname}</Text>
                            </View>
                            <View style = {styles.hold}>
                                <Text style = {styles.header}>Phone Number:</Text>
                                <Text style = {styles.text}>{number}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style = {styles.button}
                            onPress = {toggleModal}>
                            <Text style = {styles.label}> Change details </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Modal
                    animationInTiming = {1000}
                    animationIn = {'slideInLeft'}
                    animationOutTiming = {1000}
                    animationOut = {'slideOutRight'}
                    isVisible = {isModalVisible}>
                    <View style = {styles.container}>
                        <Details_S id = {id} na = {name} s = {surname} nu = {number} doci = {docId}/>
                        <TouchableOpacity style = {styles.button2}
                            onPress = {toggleModal}>
                            <Text style = {styles.label2}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                </Modal> 
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    space:
    {
        paddingTop: 5,
    },

    scrollV:
    {
        paddingBottom: 10,
    },

    user:
    {
        paddingVertical: 12.5,
        alignItems: 'center',
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
        minWidth: '100%',
        maxWidth: '100%',
        opacity: 0.85
    },

    row: 
    {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: 'white',
        paddingVertical: 10
    },

    hold:
    {
        minWidth: '45%',
        maxWidth: '45%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingBottom: 20,
    },

    header:
    {
        color: 'black',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        paddingBottom: 1.5,
    },

    text:
    {
        color: 'black',
        fontFamily: 'sans-serif-light',
        fontSize: 15,
        paddingBottom: 1.5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },

    button:
    {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: '#e6c2bf',
        borderWidth: 2,
        borderRadius: 1,
        backgroundColor: '#e6c2bf',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },

    label:
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
        marginVertical: 80,
    },

    label2:
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

export default Designer;