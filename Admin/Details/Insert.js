import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from 'firebase/firestore';
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

const Insert = () => {
    const [name, setName] = useState('');
    const [app, setApp] = useState('');
    const [image, setImage] = useState(null);
        
    const Screen = [{key: '1', value: 'Home'},
                    {key: '2', value: 'Shop'},
                    {key: '3', value: 'Cart'},
                    {key: '4', value: 'Account'},
                    {key: '5', value: 'History'},
                    {key: '6', value: 'Previous'},
                    {key: '7', value: 'Orders'},
                    {key: '8', value: 'Products'},
                    {key: '9', value: 'Product'},
                    {key: '10', value: 'Customer'},];

    const App = [{key: '1', value: 'M'},
                    {key: '2', value: 'MB'},];

    async function addData(name, image, app) 
    {  
        try 
        {
            const docRef = await addDoc(collection(db, 'Adverts'),
            {
                screen: name,
                image: image,
                app: app,
            });
            alert('Your advert has been inserted.');
        } 
        catch (error) 
        {
            console.error("Error adding document: ", error);
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

        if (!result.canceled) 
        {
            setImage(result.assets[0].base64);
        }
    }

    return (
        <View style = {styles.container}>
            <ScrollView style = {{ flex: 1, minHeight: '100%' }}>
                <Text style = {styles.header}>Advert Details Form</Text>
                <View style = {styles.form}>
                    <Text style = {styles.label}>Screen Info:</Text>
                    <View style = {styles.row1}>
                        <SelectList
                            boxStyles = {{margin: 10, minWidth: '50%'}}
                            setSelected = { (val) => setName(val)}
                            data = {Screen}
                            save = 'value'/>
                        <SelectList
                            boxStyles = {{margin: 10, minWidth: '50%'}}
                            setSelected = { (val) => setApp(val)}
                            data = {App}
                            save = 'value'/>
                    </View>
                    <View style = {styles.row}>
                        <View style = {styles.hold}>
                        <Text style = {styles.label}>Image:</Text>
                            <TouchableOpacity
                                style = {styles.select}
                                onPress = {pickImage}>
                            <Text style = {styles.selectText}>Select File</Text>
                            </TouchableOpacity>
                            <Text style = {styles.desc}>Upload type image only.</Text>
                            {image && <Image source={{ uri: 'data:image/jpeg;base64,' + image }} style={{ width: 200, height: 200 }} /> }
                        </View>
                    </View>
                </View>
                <TouchableOpacity style = {styles.button}
                    onPress = {() => {addData(name, image, app)}}>
                    <Text style = {styles.buttonLabel}>Save</Text>
                </TouchableOpacity>
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
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingTop: 10,
    },

    header:
    {
        color: 'black',
        fontFamily: 'sans-serif',
        fontSize: 18,
        paddingBottom: 15,
        alignSelf: 'center'
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

    row: 
    {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    row1: 
    {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    hold: 
    {
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '45%',
        minWidth: '45%',
        marginHorizontal: 5
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
        minWidth: '100%',
        maxWidth: '100%',
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
        marginBottom: 5,
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

    select:
    {
        backgroundColor: 'black',
        borderColor: 'black',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal:  15,
        marginVertical: 15,
    },

    selectText:
    {
        color: '#e2c6bf',
        padding: 10,
        fontSize: 15,
    },

    desc:
    {
        color: 'black',
        fontFamily: 'sans-serif-light',
        fontSize: 10,
        alignSelf: 'center',
        paddingBottom: 15
    },
});

export default Insert;