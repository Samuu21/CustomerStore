import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { Entypo } from '@expo/vector-icons';
import Advert from "./Advert";

const Orders = ({ navigation }) => {
    const [id, setId] = useState('');

    useEffect(() => {
        const fetchid = async() => {
            const userid = await SecureStore.getItemAsync('supplier');
            setId(userid);
        };
        
        fetchid();
    });

    return(
        <View style = {styles.container}>
            <Advert/>
            <ImageBackground source = {require('../images/cover8.png')} resizeMethod = 'scale'
                    style = {{flex: 1, justifyContent: 'center'}}>
                <ScrollView style = {styles.scrollV}>
                    <View style = {styles.row}>
                        <TouchableOpacity style = {styles.icon}
                            onPress = {() => navigation.navigate('Approved', {id: id})}>
                            <Text style = {styles.label}>Approved Orders</Text>
                            <Entypo name = 'clipboard' size = {30} color = 'black'/>
                            <Text style = {styles.number}></Text>
                        </TouchableOpacity>
                        <Text style = {styles.space}></Text>
                        <TouchableOpacity style = {styles.icon}
                            onPress = {() => navigation.navigate('Complete', {id: id})}>
                            <Text style = {styles.label}>Complete/Packaged Orders</Text>
                            <Entypo name = 'check' size = {30} color = 'black'/>
                            <Text style = {styles.number}></Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.icon}
                            onPress = {() => navigation.navigate('Pending', {id: id})}>
                            <Text style = {styles.label}>Pending Orders</Text>
                            <Entypo name = 'cycle' size = {30} color = 'black'/>
                            <Text style = {styles.number}></Text>
                        </TouchableOpacity>
                        <Text style = {styles.space}></Text>
                        <TouchableOpacity style = {styles.icon}
                            onPress = {() => navigation.navigate('Rejected', {id: id})}>
                            <Text style = {styles.label}>Rejected Orders</Text>
                            <Entypo name = 'block' size = {30} color = 'black'/>
                            <Text style = {styles.number}></Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground> 
        </View>
    );
};

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white'
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

    icon:
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

export default Orders;