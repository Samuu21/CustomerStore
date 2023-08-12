import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc } from 'firebase/firestore';
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

const Item = ({ name, price, top, bottom, bra, cup, quantity, gender, category, sale, saleprice, supplier, status }) => {
    const [i, setI] = useState(''); //Product id is here.
    const [reason, setReason] = useState('');
    const [id, setId] = useState(''); //Image of id
    const [res, setRes] = useState(''); //Image of res

    useEffect(() => {
        const fetchProducts = async() => {
            const q = query(collection(db, "Items"), where("name", "==", name), where("price", "==", price), where("top", "==", top), where("bottom", "==", bottom), where("bra", "==", bra), where("cup", "==", cup), where("quantity", "==", quantity), where("gender", "==", gender), where("categpry", "==", category), where("sale", "==", sale), where("saleprice", "==", saleprice), where("supplier", "==", supplier), where("status", "==", status));
            const querySnapShot = await getDocs(q);
            if(querySnapShot.empty)
            {
                //
            }
            else
            {
                querySnapShot.forEach((doc) => {
                    setI(doc.id);
                });
            }
        };
        
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchStatus = async() => {
            const p = query(collection(db, "Res"), where("supplier", "==", supplier));
            const pSnapShot = await getDocs(p);
            const q = query(collection(db, "Id"), where("supplier", "==", supplier));
            const qSnapShot = await getDocs(q);
            if(qSnapShot.empty && pSnapShot.empty)
            {
                //
            }
            else if(!pSnapShot.empty && qSnapShot.empty)
            {
                pSnapShot.forEach((doc) => {
                    setRes(doc.data().image);
                });
            }
            else if(!qSnapShot.empty && pSnapShot.empty)
            {
                qSnapShot.forEach((doc) => {
                    setId(doc.data().image);
                });
            }
            else
            {
                pSnapShot.forEach((doc) => {
                    setRes(doc.data().image);
                });
                qSnapShot.forEach((doc) => {
                    setId(doc.data().image);
                }); 
            }
        };
        
        fetchStatus();
    }, []);

    async function Approve(name, price, top, bottom, bra, cup, quantity, gender, category, sale, saleprice, supplier, i) 
    {
        try {
            await setDoc(doc(db, 'Items', i),
            {
                name: name,
                price: price,
                top: top,
                bottom: bottom,
                bra: bra,
                cup: cup,
                quantity: quantity,
                gender: gender,
                category: category,
                sale: sale,
                saleprice: saleprice,
                supplier: supplier,
                status: 'Approved',
            });
            alert('Product has been approved.');
        } catch (error) {
            console.error("Error adding document: ", error);
        }    
    }

    async function Reject(name, price, top, bottom, cup, quantity, gender, category, sale, saleprice, reason, supplier, i) 
    {
        try {
            await setDoc(doc(db, 'Items', i),
            {
                name: name,
                price: price,
                top: top,
                bottom: bottom,
                bra: bra,
                cup: cup,
                quantity: quantity,
                gender: gender,
                category: category,
                sale: sale,
                saleprice: saleprice,
                supplier: supplier,
                status: 'Rejected',
                reason: reason,
            });
            alert('Product has been rejected.');
        } catch (error) {
            console.error("Error adding document: ", error);
        }    
    }

    if(status == 'Pending')
    {
        return (
            <View style = {styles.container}>
                <ScrollView style = {{ flex: 1, minHeight: '100%' }}>
                    <Text style = {styles.header}>Product Order Form:</Text>
                    <View style = {styles.form}>
                        <View style = {styles.image}>
                            <Text style = {styles.label}>Identification:</Text>
                            <Image 
                                source = {{ uri: 'data:image/jpeg;base64,' + id}}
                                style = {{ width: '100%', height: '100%', alignSelf: 'center', resizeMode: 'stretch' }}/>
                        </View>
                        <View style = {styles.image}>
                            <Text style = {styles.label}>Residence:</Text>
                            <Image 
                                source = {{ uri: 'data:image/jpeg;base64,' + res}}
                                style = {{ width: '100%', height: '100%', alignSelf: 'center', resizeMode: 'stretch' }}/>
                        </View>
                        <TouchableOpacity style = {styles.approve}
                            onPress = {() => {Approve(name, price, top, bottom, bra, cup, quantity, gender, category, sale, saleprice, supplier, i)}}>
                            <Text style = {styles.buttonLabel}>Approve Product</Text>
                        </TouchableOpacity>
                        <Text style = {styles.space}></Text>
                        <Text style = {styles.label}>Reject Reason:</Text>
                        <TextInput style = {styles.input}
                            onChangeText = {setReason}
                            value = {reason}/>
                        <TouchableOpacity style = {styles.reject}
                            onPress = {() => {Reject(name, price, top, bottom, cup, quantity, gender, category, sale, saleprice, reason, supplier, i)}}>
                            <Text style = {styles.buttonLabel}>Reject Product</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
    else if(status == 'Rejected')
    {
        return (
            <View style = {styles.container}>
                <ScrollView style = {{ flex: 1, minHeight: '100%' }}>
                    <Text style = {styles.header}>Product Order Form:</Text>
                    <View style = {styles.form}>
                        <View style = {styles.image}>
                            <Text style = {styles.label}>Identification:</Text>
                            <Image 
                                source = {{ uri: 'data:image/jpeg;base64,' + id}}
                                style = {{ width: '100%', height: '100%', alignSelf: 'center', resizeMode: 'stretch' }}/>
                        </View>
                        <View style = {styles.image}>
                            <Text style = {styles.label}>Residence:</Text>
                            <Image 
                                source = {{ uri: 'data:image/jpeg;base64,' + res}}
                                style = {{ width: '100%', height: '100%', alignSelf: 'center', resizeMode: 'stretch' }}/>
                        </View>
                        <TouchableOpacity style = {styles.approve}
                            onPress = {() => {Approve(name, price, top, bottom, bra, cup, quantity, gender, category, sale, saleprice, supplier, i)}}>
                            <Text style = {styles.buttonLabel}>Approve Product</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
    else if (status == 'Approved')
    {
        return (
            <View style = {styles.container}>
                <ScrollView style = {{ flex: 1, minHeight: '100%' }}>
                    <Text style = {styles.header}>Product Order Form:</Text>
                    <View style = {styles.form}>
                        <View style = {styles.image}>
                            <Text style = {styles.label}>Identification:</Text>
                            <Image 
                                source = {{ uri: 'data:image/jpeg;base64,' + id}}
                                style = {{ width: '100%', height: '100%', alignSelf: 'center', resizeMode: 'stretch' }}/>
                        </View>
                        <View style = {styles.image}>
                            <Text style = {styles.label}>Residence:</Text>
                            <Image 
                                source = {{ uri: 'data:image/jpeg;base64,' + res}}
                                style = {{ width: '100%', height: '100%', alignSelf: 'center', resizeMode: 'stretch' }}/>
                        </View>
                        <Text style = {styles.label}>Reject Reason:</Text>
                        <TextInput style = {styles.input}
                            onChangeText = {setReason}
                            value = {reason}/>
                        <TouchableOpacity style = {styles.reject}
                            onPress = {() => {Reject(name, price, top, bottom, cup, quantity, gender, category, sale, saleprice, reason, supplier, i)}}>
                            <Text style = {styles.buttonLabel}>Reject Product</Text>
                        </TouchableOpacity>
                    </View>
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
        marginTop: 15,
        alignSelf: 'center',
    },

    input:
    {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        minWidth: '95%',
        maxWidth: '95%',
        marginVertical: 5,
    },

    approve:
    {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 1,
        backgroundColor: 'green',
        marginTop: 17.5,
        paddingVertical: 5,
        minWidth: '75%',
        maxWidth: '75%'
    },

    reject:
    {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 1,
        backgroundColor: 'red',
        marginTop: 17.5,
        paddingVertical: 5,
        minWidth: '75%',
        maxWidth: '75%'
    },

    image:
    {
        minHeight: '90%',
        maxHeight: '90%',
        minWidth: '90%',
        maxWidth: '90%',
        paddingVertical: 3.25
    },

    buttonLabel:
    {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
        padding: 5
    },

    blabel:
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

export default Item;