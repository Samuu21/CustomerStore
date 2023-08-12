import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
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

const Details_S = ({ id, na, s, nu, doci }) => {
    const [name, nameValue] = useState(na);
    const [surname, surnameValue] = useState(s);
    const [number, numValue] = useState(nu);

    async function updateData(name, surname, number, id, doci) 
    {
        try {
            await setDoc(doc(db, 'Designer', doci),
            {
                name: name,
                surname: surname,
                number: number,
                supplier: id
            });
            alert('Your personal details have been updated.');
        } catch (error) {
            console.error("Error adding document: ", error);
        }    
    }

    async function addData(name, surname, number, id) 
    {
        try {
            const docRef = await addDoc(collection(db, 'Designer'),
            {
                name: name,
                surname: surname,
                number: number,
                supplier: id
            });
            alert('Your personal details have been inserted.');
        } catch (error) {
            console.error("Error adding document: ", error);
        }    
    }
    
    if(doci == '')
    {
        return (
            <View style = {styles.container}>
                <ScrollView style = {{ flex: 1, minHeight: '100%' }}>
                    <Text style = {styles.header}>Designer Details Form</Text>
                    <View style = {styles.form}>
                        <Text style = {styles.label}>Designer Name:</Text>
                        <TextInput style = {styles.input} 
                            placeholder = 'Name'
                            onChangeText = {nameValue}
                            value = {name}
                            defaultValue = {name}/>
                        <Text style = {styles.label}>Designer Surname:</Text>
                        <TextInput style = {styles.input} 
                            placeholder = 'Surname'
                            onChangeText = {surnameValue}
                            value = {surname}
                            defaultValue = {surname}/>
                        <Text style = {styles.label}>Designer Phone Number:</Text>
                        <TextInput style = {styles.input} 
                            keyboardType = 'number-pad'
                            placeholder = '0123456789'
                            onChangeText = {numValue}
                            value = {number}
                            defaultValue = {number}/>
                    </View>
                    <TouchableOpacity style = {styles.button}
                        onPress = {() => {addData(name, surname, number, id)}}>
                        <Text style = {styles.buttonLabel}>Save</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
    else
    {
        return (
            <View style = {styles.container}>
                <ScrollView style = {{ flex: 1, minHeight: '100%' }}>
                    <Text style = {styles.header}>Designer Details Form</Text>
                    <View style = {styles.form}>
                        <Text style = {styles.label}>Designer Name:</Text>
                        <TextInput style = {styles.input} 
                            placeholder = 'Name'
                            onChangeText = {nameValue}
                            value = {name}
                            defaultValue = {name}/>
                        <Text style = {styles.label}>Designer Surname:</Text>
                        <TextInput style = {styles.input} 
                            placeholder = 'Surname'
                            onChangeText = {surnameValue}
                            value = {surname}
                            defaultValue = {surname}/>
                        <Text style = {styles.label}>Designer Phone Number:</Text>
                        <TextInput style = {styles.input} 
                            keyboardType = 'number-pad'
                            placeholder = '0123456789'
                            onChangeText = {numValue}
                            value = {number}
                            defaultValue = {number}/>
                    </View>
                    <TouchableOpacity style = {styles.button}
                        onPress = {() => {updateData(name, surname, number, id, doci)}}>
                        <Text style = {styles.buttonLabel}>Save</Text>
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
        marginBottom: 1,
    },

    input:
    {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 1,
        paddingTop: 7.5,
        paddingBottom: 7.5,
        paddingLeft: 10,
        margin: 10,
        minWidth: '80%',
        maxWidth: '80%',
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
        color: 'black',
        padding: 5
    },
});

export default Details_S;