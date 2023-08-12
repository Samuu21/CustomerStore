import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import Advert from './Advert';
import Update from "./Details/Update";

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

const Item = ({ route }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [product, setProduct] = useState(''); //Product id boy
    const [name, setName] = useState(route.params.name); //Name of product
    const [price, setPrice] = useState(0); //Price of product
    const [top, setTop] = useState(route.params.top); //Size top of product
    const [bottom, setBottom] = useState(route.params.bottom); //Size bottom of product
    const [cup, setCup] = useState(route.params.cup); //Size cup of product
    const [quantity, setQuantity] = useState(0); //Quantity of product
    const [gender, setGender] = useState(''); //Gender of product
    const [category, setCategory] = useState(''); //Category of product
    const [sale, setSale] = useState(''); //Sale of product
    const [saleprice, setSaleP] = useState(0); //Sale price of product

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    if(route.params.top != '' && route.params.bottom != '' && route.params.cup != '')
    {
        useEffect(() => {
            const fetchid = async() => {
                const userid = await SecureStore.getItemAsync('supplier');
                setId(userid);
                const q = query(collection(db, 'Items'), where("supplier", "==", userid), where("name", "==", name), where("top", '==', top), where("bottom", '==', bottom), where("cup", '==', cup), where("status", "==", route.params.collection));
                const querySnapShot = await getDocs(q);
                if(querySnapShot.empty)
                {
                    //
                }
                else
                {
                    querySnapShot.forEach((doc) => {
                        setProduct(doc.id);
                        setName(doc.data().name);
                        setPrice(doc.data().price);
                        setTop(doc.data().top);
                        setBottom(doc.data().bottom);
                        setCup(doc.data().cup);
                        setQuantity(doc.data().quantity);
                        setGender(doc.data().gender);
                        setCategory(doc.data().category);
                        setSale(doc.data().sale);
                        setSaleP(doc.data().saleprice);
                    });
                }
            };

            fetchid();
        });
    }
    else if(route.params.top != '' && route.params.bottom != '' && route.params.cup == '')
    {
        useEffect(() => {
            const fetchid = async() => {
                const userid = await SecureStore.getItemAsync('supplier');
                setId(userid);
                const q = query(collection(db, 'Items'), where("supplier", "==", userid), where("name", "==", route.params.name), where("top", '==', route.params.top), where("bottom", '==', route.params.bottom), where("status", "==", "Pending"));
                const querySnapShot = await getDocs(q);
                if(querySnapShot.empty)
                {
                    //
                }
                else
                {
                    querySnapShot.forEach((doc) => {
                        setProduct(doc.id);
                        setName(doc.data().name);
                        setPrice(doc.data().price);
                        setTop(doc.data().top);
                        setBottom(doc.data().bottom);
                        setQuantity(doc.data().quantity);
                        setGender(doc.data().gender);
                        setCategory(doc.data().category);
                        setSale(doc.data().sale);
                        setSaleP(doc.data().saleprice);
                    });
                }
            };
            fetchid();
        });
    }
    else if(route.params.top != '' && route.params.bottom == '' && route.params.cup != '')
    {
        useEffect(() => {
            const fetchid = async() => {
                const userid = await SecureStore.getItemAsync('supplier');
                setId(userid);
                const q = query(collection(db, 'Items'), where("supplier", "==", userid), where("name", "==", route.params.name), where("top", '==', route.params.top), where("cup", '==', route.params.cup), where("status", "==", "Pending"));
                const querySnapShot = await getDocs(q);
                if(querySnapShot.empty)
                {
                    //
                }
                else
                {
                    querySnapShot.forEach((doc) => {
                        setProduct(doc.id);
                        setName(doc.data().name);
                        setPrice(doc.data().price);
                        setTop(doc.data().top);
                        setCup(doc.data().cup);
                        setQuantity(doc.data().quantity);
                        setGender(doc.data().gender);
                        setCategory(doc.data().category);
                        setSale(doc.data().sale);
                        setSaleP(doc.data().saleprice);
                    });
                }
            };

            fetchid();
        });
    }
    else if(route.params.top != '' && route.params.bottom == '' && route.params.cup == '')
    {
        useEffect(() => {
            const fetchid = async() => {
                const userid = await SecureStore.getItemAsync('supplier');
                setId(userid);
                const q = query(collection(db, 'Items'), where("supplier", "==", userid), where("name", "==", route.params.name), where("top", '==', route.params.top), where("status", "==", "Pending"));
                const querySnapShot = await getDocs(q);
                if(querySnapShot.empty)
                {
                    //
                }
                else
                {
                    querySnapShot.forEach((doc) => {
                        setProduct(doc.id);
                        setName(doc.data().name);
                        setPrice(doc.data().price);
                        setTop(doc.data().top);
                        setQuantity(doc.data().quantity);
                        setGender(doc.data().gender);
                        setCategory(doc.data().category);
                        setSale(doc.data().sale);
                        setSaleP(doc.data().saleprice);
                    });
                }
            };

            fetchid();
        });
    }
    else if(route.params.top == '' && route.params.bottom != '' && route.params.cup == '')
    {
        useEffect(() => {
            const fetchid = async() => {
                const userid = await SecureStore.getItemAsync('supplier');
                setId(userid);
                const q = query(collection(db, 'Items'), where("supplier", "==", userid), where("name", "==", route.params.name), where("bottom", '==', route.params.bottom), where("status", "==", "Pending"));
                const querySnapShot = await getDocs(q);
                if(querySnapShot.empty)
                {
                    //
                }
                else
                {
                    querySnapShot.forEach((doc) => {
                        setProduct(doc.id);
                        setName(doc.data().name);
                        setPrice(doc.data().price);
                        setBottom(doc.data().bottom);
                        setQuantity(doc.data().quantity);
                        setGender(doc.data().gender);
                        setCategory(doc.data().category);
                        setSale(doc.data().sale);
                        setSaleP(doc.data().saleprice);
                    });
                }
            };
            
            fetchid();
        });
    }

    const i = {
        name: name,
        price: price,
        top: top,
        bottom: bottom,
        cup: cup,
        quantity: quantity,
        gender: gender,
        category: category,
        sale: sale,
        saleprice: saleprice,
    } 

    return(
        <View style = {styles.container}>
            <Advert/>
            <ImageBackground source = {require('../images/cover4.png')} resizeMethod = 'scale'
                style = {{flex: 1, justifyContent: 'center'}}>
                <ScrollView style = {styles.scrollV}>
                <View style = {styles.user}>
                    <Ionicons name = 'person' size = {75} color = 'black' style = {{ paddingBottom: 17.5 }}/>
                    <View style = {styles.row}>
                        <View style = {styles.hold}>
                            <Text style = {styles.header}>Name:</Text>
                            <Text style = {styles.text}>{name}</Text>
                        </View>
                        <View style = {styles.hold}>
                            <Text style = {styles.header}>Price:</Text>
                            <Text style = {styles.text}>{price}</Text>
                        </View>
                        <View style = {styles.hold}>
                            <Text style = {styles.header}>Size Top:</Text>
                            <Text style = {styles.text}>{top}</Text>
                        </View>
                        <View style = {styles.hold}>
                            <Text style = {styles.header}>Size Bottom:</Text>
                            <Text style = {styles.text}>{bottom}</Text>
                        </View>
                        <View style = {styles.hold}>
                            <Text style = {styles.header}>Size Cup:</Text>
                            <Text style = {styles.text}>{cup}</Text>
                        </View>
                        <View style = {styles.hold}>
                            <Text style = {styles.header}>Quantity:</Text>
                            <Text style = {styles.text}>{quantity}</Text>
                        </View>
                        <View style = {styles.hold}>
                            <Text style = {styles.header}>Gender:</Text>
                            <Text style = {styles.text}>{gender}</Text>
                        </View>
                        <View style = {styles.hold}>
                            <Text style = {styles.header}>Category:</Text>
                            <Text style = {styles.text}>{category}</Text>
                        </View>
                        <View style = {styles.hold}>
                            <Text style = {styles.header}>Sale:</Text>
                            <Text style = {styles.text}>{sale}</Text>
                        </View>
                        <View style = {styles.hold}>
                            <Text style = {styles.header}>Sale Price:</Text>
                            <Text style = {styles.text}>{saleprice}</Text>
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
                        <Update supplier = {id} product = {product} item = {i} col = {route.params.collection}/>
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
        backgroundColor: 'white',
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
        marginVertical: 45,
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

export default Item;