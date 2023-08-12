import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Advert from './Advert';
import Modal from 'react-native-modal';
import Details from './Details/Details';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
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

const Pending = ({ navigation, route }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async() => {
            const q = query(collection(db, "Items"), where("supplier", "==", route.params.id), where("status", "==", 'Pending'));
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
    }, [products]);

    async function deleteData(supplier, name, top, bottom, bra, cup) 
    {
        const q = query(collection(db, "Items"), where("supplier", "==", supplier), where("name", "==", name), where("top", "==", top),  where("bottom", "==", bottom), where("bra", "==", bra), where("cup", "==", cup), where("status", "==", 'Pending'));
        const querySnapShot = await getDocs(q);
        if(querySnapShot.empty)
        {
            //
        }
        else
        {
            querySnapShot.forEach(async (doc) => {
                try 
                {
                    await deleteDoc(doc.ref);
                } 
                catch (error) 
                {
                    console.error("Error deleting document: ", error);
                }
            });
            await deleteDoc(doc(db, 'Images'), where("name", "==", name), where("supplier", "==", supplier));
            alert("Product has been removed successfully!");
        }
    } 

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    
    if(products.length <= 0) //This one is if there is no result.
    {
        return (
            <View style = {styles.container}>
                <Advert/>
                <TouchableOpacity style = {styles.button}
                    onPress = {toggleModal}>
                    <Text style = {styles.buttonLabel}>Add Item</Text>
                </TouchableOpacity>
                <ScrollView style = {styles.scrollV}>
                    <View style = {styles.scroll}>
                        <Image style = {{ width: '100%', height: '100%', resizeMode: 'contain', marginTop: 35, paddingBottom: 7.5}}
                            source = {require('../images/NoProducts.png')}/>
                        <Text style = {styles.desc}> There are no items pending yet. We are on it!</Text>
                    </View>
                </ScrollView>
                <Modal
                    animationInTiming = {1000}
                    animationIn = {'slideInLeft'}
                    animationOutTiming = {1000}
                    animationOut = {'slideOutRight'}
                    isVisible = {isModalVisible}>
                    <View style = {styles.container}>
                        <Details id = {route.params.id}/>
                        <TouchableOpacity style = {styles.button2}
                            onPress = {toggleModal}>
                            <Text style = {styles.buttonLabel2}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
    else //This one is if there is a result.
    {
        return(
            <View style = {styles.container}>
                <Advert/>
                <ImageBackground source = {require('../images/cover9.png')} resizeMethod = 'scale'
                    style = {{flex: 1, justifyContent: 'center'}}>
                    <TouchableOpacity style = {styles.button}
                        onPress = {toggleModal}>
                        <Text style = {styles.buttonLabel}>Add Item</Text>
                    </TouchableOpacity>
                    <ScrollView style = {styles.scrollV}>
                    {products.map((item, key) => (
                        <TouchableOpacity style = {styles.hold}
                                key = {key}
                                onPress = { () => {navigation.navigate('Item', {name: item.name, top: item.top, bottom: item.bottom, bra: item.bra, cup: item.cup, collection: 'Pending'})}}>
                            <View style = {styles.row}>
                                <View style = {styles.first}>
                                    <TouchableOpacity style = {styles.delete}
                                        onPress = {() => {deleteData(item.supplier, item.name, item.top, item.bottom, item.bra, item.cup)}}>
                                        <Text style = {{ alignSelf: 'flex-end' }}>
                                            <AntDesign name = 'closecircle' size = {40} color = 'black'/>
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style = {styles.image}>
                                    <Photo id = {item.supplier} name = {item.name}/>
                                </View>
                                <View style = {styles.info}>
                                    <ScrollView>
                                        <Text style = {styles.text}>Name: {item.name}</Text>
                                        <Text style = {styles.text}>Quantity: {item.quantity}</Text>
                                        <Text style = {styles.text}>Size: Top Size - {item.top}, Bottom Size - {item.bottom}, Bra Size - {item.bra}{item.cup}</Text>
                                        <Text style = {styles.text}>Price: R {item.price}</Text>
                                        <Text style = {styles.text}>Gender: {item.gender}</Text>
                                        <Text style = {styles.text}>Category: {item.category}</Text>
                                        <Text style = {styles.text}>Sale: {item.sale}</Text>
                                        <Text style = {styles.text}>Saleprice: R {item.saleprice}</Text>
                                    </ScrollView>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <Text style = {styles.space}></Text>
                    </ScrollView>
                    <Modal
                        animationInTiming = {1000}
                        animationIn = {'slideInLeft'}
                        animationOutTiming = {1000}
                        animationOut = {'slideOutRight'}
                        isVisible = {isModalVisible}>
                        <View style = {styles.container}>
                            <Details id = {route.params.id}/>
                            <TouchableOpacity style = {styles.button2}
                                onPress = {toggleModal}>
                                <Text style = {styles.buttonLabel2}>Go Back</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
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