import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, doc, setDoc, where, getDocs } from 'firebase/firestore';
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

const Item = ({ route }) => {
    const [i, setI] = useState(''); //Product id is here.
    const [reason, setReason] = useState('');
    const [id, setId] = useState(''); //Image of id
    const [res, setRes] = useState(''); //Image of res
    const [name, setName] = useState(route.params.name); //Name of product
    const [price, setPrice] = useState(route.params.price); //Price of product
    const [top, setTop] = useState(route.params.top); //Size top of product
    const [bottom, setBottom] = useState(route.params.bottom); //Size bottom of product
    const [bra, setBra] = useState(route.params.bra); //Size bra of product
    const [cup, setCup] = useState(route.params.cup); //Size cup of product
    const [quantity, setQuantity] = useState(route.params.quantity); //Quantity of product
    const [gender, setGender] = useState(route.params.gender); //Gender of product
    const [category, setCategory] = useState(route.params.category); //Category of product
    const [sale, setSale] = useState(route.params.sale); //Sale of product
    const [saleprice, setSaleP] = useState(route.params.saleprice); //Sale price of product
    const [status, setStatus] = useState(route.params.status); //Status of product
    const [supplier, setSupplier] = useState(route.params.supplier); //Supplier of product

    useEffect(() => {
        const fetchStatus = async() => {
            const p = query(collection(db, "Res"), where("supplier", "==", supplier));
            const pSnapShot = await getDocs(p);
            const q = query(collection(db, "Id"), where("supplier", "==", supplier));
            const qSnapShot = await getDocs(q);
            if(qSnapShot.empty && pSnapShot.empty)
            {
                console.log('Both empty');
            }
            else if(!pSnapShot.empty && qSnapShot.empty)
            {
                pSnapShot.forEach((doc) => {
                    setRes(doc.data().image);
                });
                console.log('Id empty');
            }
            else if(!qSnapShot.empty && pSnapShot.empty)
            {
                qSnapShot.forEach((doc) => {
                    setId(doc.data().image);
                });
                console.log('Res empty');
            }
            else
            {
                pSnapShot.forEach((doc) => {
                    setRes(doc.data().image);
                });
                qSnapShot.forEach((doc) => {
                    setId(doc.data().image);
                }); 
                console.log('All good');
            }
        };
        
        fetchStatus();
    }, []);

    if(top != '' && bottom != '' && cup != '')
    {
        useEffect(() => {
            const fetchid = async() => {
                const q = query(collection(db, 'Items'), where("supplier", "==", supplier), where("name", "==", name), where("top", '==', top), where("bottom", '==', bottom), where("bra", "==", bra), where("cup", '==', cup), where("status", "==", status));
                const querySnapShot = await getDocs(q);
                if(querySnapShot.empty)
                {
                    //
                }
                else
                {
                    querySnapShot.forEach((doc) => {
                        setI(doc.id);
                        setName(doc.data().name);
                        setPrice(doc.data().price);
                        setTop(doc.data().top);
                        setBottom(doc.data().bottom);
                        setBra(doc.data().bra);
                        setCup(doc.data().cup);
                        setQuantity(doc.data().quantity);
                        setGender(doc.data().gender);
                        setCategory(doc.data().category);
                        setSale(doc.data().sale);
                        setSaleP(doc.data().saleprice);
                        setStatus(doc.data().status);
                        setSupplier(doc.data().supplier);
                    });
                }
            };

            fetchid();
        }, []);
    }
    else if(top != '' && bottom != '' && cup == '')
    {
        useEffect(() => {
            const fetchid = async() => {
                const q = query(collection(db, 'Items'), where("supplier", "==", supplier), where("name", "==", name), where("top", "==", top), where("bottom", "==", bottom), where("status", "==", status));
                const querySnapShot = await getDocs(q);
                if(querySnapShot.empty)
                {
                    //
                }
                else
                {
                    querySnapShot.forEach((doc) => {
                        setI(doc.id);
                        setName(doc.data().name);
                        setPrice(doc.data().price);
                        setTop(doc.data().top);
                        setBottom(doc.data().bottom);
                        setQuantity(doc.data().quantity);
                        setGender(doc.data().gender);
                        setCategory(doc.data().category);
                        setSale(doc.data().sale);
                        setSaleP(doc.data().saleprice);
                        setStatus(doc.data().status);
                        setSupplier(doc.data().supplier);
                    });
                }
            };
            fetchid();
        }, []);
    }
    else if(top != '' && bottom == '' && cup != '')
    {
        useEffect(() => {
            const fetchid = async() => {
                const q = query(collection(db, 'Items'), where("supplier", "==", supplier), where("name", "==", name), where("top", "==", top), where("cup", "==", cup), where("bra", "==", bra), where("status", "==", status));
                const querySnapShot = await getDocs(q);
                if(querySnapShot.empty)
                {
                    //
                }
                else
                {
                    querySnapShot.forEach((doc) => {
                        setI(doc.id);
                        setName(doc.data().name);
                        setPrice(doc.data().price);
                        setTop(doc.data().top);
                        setBra(doc.data().bra);
                        setCup(doc.data().cup);
                        setQuantity(doc.data().quantity);
                        setGender(doc.data().gender);
                        setCategory(doc.data().category);
                        setSale(doc.data().sale);
                        setSaleP(doc.data().saleprice);
                        setStatus(doc.data().status);
                        setSupplier(doc.data().supplier);
                    });
                }
            };

            fetchid();
        }, []);
    }
    else if(top != '' && bottom == '' && cup == '')
    {
        useEffect(() => {
            const fetchid = async() => {
                const q = query(collection(db, 'Items'), where("supplier", "==", supplier), where("name", "==", name), where("top", "==", top), where("status", "==", status));
                const querySnapShot = await getDocs(q);
                if(querySnapShot.empty)
                {
                    //
                }
                else
                {
                    querySnapShot.forEach((doc) => {
                        setI(doc.id);
                        setName(doc.data().name);
                        setPrice(doc.data().price);
                        setTop(doc.data().top);
                        setQuantity(doc.data().quantity);
                        setGender(doc.data().gender);
                        setCategory(doc.data().category);
                        setSale(doc.data().sale);
                        setSaleP(doc.data().saleprice);
                        setStatus(doc.data().status);
                        setSupplier(doc.data().supplier);
                    });
                }
            };

            fetchid();
        }, []);
    }
    else if(top == '' && bottom != '' && cup == '')
    {
        useEffect(() => {
            const fetchid = async() => {
                const q = query(collection(db, 'Items'), where("supplier", "==", supplier), where("name", "==", name), where("bottom", "==", bottom), where("status", "==", status));
                const querySnapShot = await getDocs(q);
                if(querySnapShot.empty)
                {
                    //
                }
                else
                {
                    querySnapShot.forEach((doc) => {
                        setI(doc.id);
                        setName(doc.data().name);
                        setPrice(doc.data().price);
                        setBottom(doc.data().bottom);
                        setQuantity(doc.data().quantity);
                        setGender(doc.data().gender);
                        setCategory(doc.data().category);
                        setSale(doc.data().sale);
                        setSaleP(doc.data().saleprice);
                        setStatus(doc.data().status);
                        setSupplier(doc.data().supplier);
                    });
                }
            };
            
            fetchid();
        }, []);
    }
    else
    {
        useEffect(() => {
            const fetchid = async() => {
                const q = query(collection(db, 'Items'), where("supplier", "==", supplier), where("name", "==", name), where("bottom", "==", bottom), where("bra", "==", bra), where("cup", "==", cup), where("status", "==", status));
                const querySnapShot = await getDocs(q);
                if(querySnapShot.empty)
                {
                    //
                }
                else
                {
                    querySnapShot.forEach((doc) => {
                        setI(doc.id);
                        setName(doc.data().name);
                        setPrice(doc.data().price);
                        setBottom(doc.data().bottom);
                        setBra(doc.data().bra);
                        setCup(doc.data().cup);
                        setQuantity(doc.data().quantity);
                        setGender(doc.data().gender);
                        setCategory(doc.data().category);
                        setSale(doc.data().sale);
                        setSaleP(doc.data().saleprice);
                        setStatus(doc.data().status);
                        setSupplier(doc.data().supplier);
                    });
                }
            };
            
            fetchid();
        }, []);
    }

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

    async function Reject(name, price, top, bottom, bra, cup, quantity, gender, category, sale, saleprice, reason, supplier, i) 
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
                <ScrollView style = {styles.hold}>
                    <Text style = {styles.header}>Product Order Form:</Text>
                    <Text style = {styles.label}>Identification:</Text>
                    {id && <Image 
                        source = {{ uri: 'data:image/jpeg;base64,' + id}}
                        style = {{ width: 225, height: 225, alignSelf: 'center', resizeMode: 'contain' }}/>}
                    <Text style = {styles.label}>Residence:</Text>
                    {res && <Image 
                        source = {{ uri: 'data:image/jpeg;base64,' + res}}
                        style = {{ width: 225, height: 225, alignSelf: 'center', resizeMode: 'contain' }}/>}
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
                        onPress = {() => {Reject(name, price, top, bottom, bra, cup, quantity, gender, category, sale, saleprice, reason, supplier, i)}}>
                        <Text style = {styles.buttonLabel}>Reject Product</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
    else if(status == 'Rejected')
    {
        return (
            <View style = {styles.container}>
                <ScrollView style = {styles.hold}>
                    <Text style = {styles.header}>
                        Product Order Form:
                    </Text>
                    <Text style = {styles.label}>Identification:</Text>
                    {id && <Image 
                        source = {{ uri: 'data:image/jpeg;base64,' + id}}
                        style = {{ width: 225, height: 225, alignSelf: 'center', resizeMode: 'contain' }}/>}
                    <Text style = {styles.label}>Residence:</Text>
                    {res && <Image 
                        source = {{ uri: 'data:image/jpeg;base64,' + res}}
                        style = {{ width: 225, height: 225, alignSelf: 'center', resizeMode: 'contain' }}/>}
                    <TouchableOpacity style = {styles.approve}
                        onPress = {() => {Approve(name, price, top, bottom, bra, cup, quantity, gender, category, sale, saleprice, supplier, i)}}>
                        <Text style = {styles.buttonLabel}>Approve Product</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
    else if (status == 'Approved')
    {
        return (
            <View style = {styles.container}>
                <ScrollView style = {styles.hold}>
                    <Text style = {styles.header}>
                        Product Order Form:
                    </Text>
                    <Text style = {styles.label}>Identification:</Text>
                    {id && <Image 
                        source = {{ uri: 'data:image/jpeg;base64,' + id}}
                        style = {{ width: 225, height: 225, alignSelf: 'center', resizeMode: 'contain' }}/>}
                    <Text style = {styles.label}>Residence:</Text>
                    {res && <Image 
                        source = {{ uri: 'data:image/jpeg;base64,' + res}}
                        style = {{ width: 225, height: 225, alignSelf: 'center', resizeMode: 'contain' }}/>}
                    <TextInput style = {styles.input}
                        onChangeText = {setReason}
                        value = {reason}/>
                    <TouchableOpacity style = {styles.reject}
                        onPress = {() => {Reject(name, price, top, bottom, bra, cup, quantity, gender, category, sale, saleprice, reason, supplier, i)}}>
                        <Text style = {styles.buttonLabel}>Reject Product</Text>
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
        backgroundColor: 'white',
    },

    hold:
    {
        minWidth: '100%',
        maxWidth: '100%',
    },

    header:
    {
        color: 'black',
        fontFamily: 'sans-serif',
        fontSize: 17.5,
        alignSelf: 'center'
    },

    label:
    {
        color: 'black',
        fontFamily: 'sans-serif-light',
        fontSize: 15,
        paddingTop: 15,
        alignSelf: 'center',
    },

    input:
    {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        minWidth: '90%',
        maxWidth: '90%',
        marginVertical: 12.5,
        marginHorizontal: 15
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
        marginVertical: 15,
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
        marginVertical: 15,
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
        color: 'white',
        padding: 5
    },
});

export default Item;