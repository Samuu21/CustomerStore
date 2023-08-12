import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Advert from './Advert';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs, addDoc, setDoc, deleteDoc, doc, } from "firebase/firestore";
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

const Res = () => {
    const [image, setImage] = useState('');
    const [product, setProduct] = useState('');
    const [id, setId] = useState('')
    const sub = 'Submitted';
    var check = false;

    useEffect(() => {
        const fetchid = async() => {
            const userid = await SecureStore.getItemAsync('supplier');
            setId(userid);
            const q = query(collection(db, "Res"), where("supplier", "==", userid));
            const querySnapShot = await getDocs(q);
            if(querySnapShot.empty)
            {
                //
            }
            else
            {
                querySnapShot.forEach((doc) => {
                    setImage(doc.data().image);
                    setProduct(doc.id);
                });
                check = true;
            }
        };
        
        fetchid();
    }, []);

    async function addData(sub, image, id, product) 
    {
        if(check == true)
        {
            await deleteDoc(doc(db, 'Res', product));
            await setDoc(doc(db, 'Res', product),
            {
                status: sub,
                image: image,
                supplier: id
            });
        }
        else
        {
            try {
                const docRef = await addDoc(collection(db, 'Res'),
                {
                    status: sub,
                    image: image,
                    supplier: id
                });
                alert('Your proof of identification has been inserted.');
            } catch (error) {
                console.error("Error adding document: ", error);
            } 
        }   
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base64: true,
            
        });

        if (!result.canceled) {
            setImage(result.assets[0].base64);
        }
    };

    return (
        <View style = {styles.container}>
            <Advert/>
            <ScrollView style = {styles.hold}>
                <Text style = {styles.header}>
                    Proof of Identification Upload
                </Text>
                <TouchableOpacity
                    style = {styles.button}
                    onPress = {pickImage}>
                    <Text style = {styles.buttonText}>Select File</Text>
                </TouchableOpacity>
                <Text style = {styles.desc}>Upload an image/photo only.</Text>
                <Text></Text>
                    {image && <Image source={{ uri: 'data:image/png;base64,' + image }} 
                        style={{ width: 225, height: 225, alignSelf: 'center', resizeMode: 'contain' }}/>}
                    {image && 
                        <TouchableOpacity
                            style = {styles.button}
                            onPress = {() => {addData(sub, image, id, product)}}>
                            <Text style = {styles.buttonText}>Upload File</Text>
                        </TouchableOpacity>}
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
        backgroundColor: 'white',
    },

    hold:
    {
        flex: 3,
        paddingTop: 50,
        minWidth: '100%',
        maxWidth: '100%'
    },

    header:
    {
        color: 'black',
        fontFamily: 'sans-serif',
        fontSize: 17.5,
        alignSelf: 'center'
    },

    desc:
    {
        color: 'black',
        fontFamily: 'sans-serif-light',
        fontSize: 12,
        alignSelf: 'center'
    },

    button:
    {
        backgroundColor: 'black',
        borderColor: 'black',
        alignItems: 'center',
        borderRadius: 40,
        marginHorizontal:  35,
        marginVertical: 15,
    },

    buttonText:
    {
        color: '#e2c6bf',
        padding: 10,
        fontSize: 15,
    },

    text:
    {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 15,
        marginHorizontal: 35,
        textAlign: 'center',
    }
});

export default Res;