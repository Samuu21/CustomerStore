import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { SelectList } from 'react-native-dropdown-select-list';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, getDocs, setDoc, addDoc, deleteDoc, doc, where } from 'firebase/firestore';
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

const Update = ({ supplier, product, item, col }) => { // supplier has supplier_id, product has product_id, item has item components
    const [name, setName] = useState(item.name); //Name of product
    const [price, setPrice] = useState(item.price); //Price of product
    const [top, setTop] = useState(item.top); //Size top of product
    const [bottom, setBottom] = useState(item.bottom); //Size bottom of product
    const [bra, setBra] = useState(item.bra); //Size bra of product
    const [cup, setCup] = useState(item.cup); //Size cup of product
    const [quantity, setQuantity] = useState(item.quantity); //Quantity of product
    const [gender, setGender] = useState(item.gender); //Gender of product
    const [category, setCategory] = useState(item.category); //Category of product
    const [sale, setSale] = useState(item.sale); //Sale of product
    const [saleprice, setSaleP] = useState(item.saleprice); //Sale new price of product
    const [images, setImages] = useState([]); //Set of images of product

    var check1 = false; //Id
    var check2 = false; //Res

    useEffect(() => {
        const fetchid = async() => {
            const userid = await SecureStore.getItemAsync('supplier');
            const q = query(collection(db, "Id"), where("supplier", "==", userid));
            const p = query(collection(db, "Res"), where("supplier", "==", userid));
            const querySnapShot = await getDocs(q);
            const puerySnapShot = await getDocs(p);
            if(querySnapShot.empty && puerySnapShot.empty)
            {
                //
            }
            else if(!querySnapShot.empty && puerySnapShot.empty)
            {
                check1 = true;
            }
            else if(querySnapShot.empty && !puerySnapShot.empty)
            {
                check2 = true
            }
            else(!querySnapShot.empty && !puerySnapShot.empty)
            {
                check1 = true;
                check2 = true;
            }
        };
        
        fetchid();

    }, []);

    const TopChart = [{key: '0', value: 'Top Size Chart', disabled: true},
                        {key: '1', value: 'XS'},
                        {key: '2', value: 'S'},
                        {key: '3', value: 'M'},
                        {key: '4', value: 'L'},
                        {key: '5', value: 'XL'},
                        {key: '6', value: 'XXL'},
                        {key: '7', value: '26'},
                        {key: '8', value: '28'},
                        {key: '9', value: '30'},
                        {key: '10', value: '32'},
                        {key: '11', value: '34'},
                        {key: '12', value: '36'},
                        {key: '13', value: '38'},
                        {key: '14', value: '40'},
                        {key: '15', value: '42'},
                        {key: '16', value: '44'},];

    const BottomChart = [{key: '0', value: 'Bottom Size Chart', disabled: true},
                        {key: '1', value: '26'},
                        {key: '2', value: '28'},
                        {key: '3', value: '30'},
                        {key: '4', value: '32'},
                        {key: '5', value: '34'},
                        {key: '6', value: '36'},
                        {key: '7', value: '38'},
                        {key: '8', value: '40'},
                        {key: '9', value: '42'},
                        {key: '10', value: '44'},];

    const BraCupChart = [{key: '0', value: 'Bra Size Chart', disabled: true},
                        {key: '1', value: '26'},
                        {key: '2', value: '28'},
                        {key: '3', value: '30'},
                        {key: '4', value: '32'},
                        {key: '5', value: '34'},
                        {key: '6', value: '36'},
                        {key: '7', value: '38'},
                        {key: '8', value: '40'},
                        {key: '9', value: '42'},
                        {key: '10', value: '44'},];
    
    const CupChart = [{key: '0', value: 'Bra Cup Size Chart', disabled: true},
                        {key: '1', value: 'A'},
                        {key: '2', value: 'AA'},
                        {key: '3', value: 'B'},
                        {key: '4', value: 'BB'},
                        {key: '5', value: 'C'},
                        {key: '6', value: 'CC'},
                        {key: '7', value: 'D'},
                        {key: '8', value: 'DD'},];

    const Categories = [{key: '1', value: 'Women Clothing Categories', disabled: true},
                        {key: '2', value: 'Dresses'},
                        {key: '3', value: 'Sets'},
                        {key: '4', value: 'Tops'},
                        {key: '5', value: 'T_Shirts'},
                        {key: '6', value: 'Shirts'},
                        {key: '7', value: 'Skirts'},
                        {key: '8', value: 'Swimwear'},
                        {key: '9', value: 'Jeans'},
                        {key: '10', value: 'Pants'},
                        {key: '11', value: 'Jumpsuits'},
                        {key: '12', value: 'Hoodies'},
                        {key: '13', value: 'Jackets'},
                        {key: '14', value: 'Knitwear'},
                        {key: '15', value: 'Joggers'},
                        {key: '16', value: 'Leggings'},
                        {key: '17', value: 'Activewear'},
                        {key: '18', value: 'Sleepwear'},
                        {key: '19', value: 'Socks'},
                        {key: '20', value: 'Bras'},
                        {key: '21', value: 'Panties'},
                        {key: '24', value: 'Bodysuits'},
                        {key: '25', value: 'Bags'},
                        {key: '26', value: 'Accessories'},
                        {key: '27', value: 'Men Clothing Categories', disabled: true},
                        {key: '28', value: 'T_Shirts'},
                        {key: '29', value: 'Golfers'},
                        {key: '30', value: 'Vests'},
                        {key: '31', value: 'Shirts'},
                        {key: '32', value: 'Jeans'},
                        {key: '33', value: 'Shorts'},
                        {key: '34', value: 'Chinos'},
                        {key: '35', value: 'Pants'},
                        {key: '36', value: 'Underwear'},
                        {key: '37', value: 'Socks'},
                        {key: '38', value: 'Joggers'},
                        {key: '39', value: 'Swimwear'},
                        {key: '40', value: 'Activewear'},
                        {key: '41', value: 'Sleepwear'},
                        {key: '42', value: 'Tops'},
                        {key: '43', value: 'Hoodies'},
                        {key: '44', value: 'Jackets'},
                        {key: '45', value: 'Knitwear'},
                        {key: '46', value: 'Sleepwear'},
                        {key: '47', value: 'Sets'},
                        {key: '48', value: 'Accessories'}];
        
    const Gender = [{key: '1', value: 'Men'},
                    {key: '2', value: 'Women'},];

    const Sale = [{key: '1', value: 'Yes'},
                {key: '2', value: 'No'},];

    async function updateData(name, price, top, bottom, bra, cup, quantity, gender, category, sale, saleprice, supplier, product, col) 
    {
        if(check1 != true || check2 != true)
        {
            try 
            {
                await deleteDoc(doc(db, 'Items', product), where("status", "==", col));
                await setDoc(doc(db, 'Items', product),
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
                    status: 'Rejected',
                    reason: 'Either your proof of residence or proof of identification has not been submitted.',
                    supplier: supplier
                });
                alert('Your product has been updated.');
            } 
            catch (error) 
            {
                console.error("Error adding document: ", error);
            }
        } 
        else 
        {
            try 
            {
                await deleteDoc(doc(db, 'Items', product), where("status", "==", col));
                await setDoc(doc(db, 'Items', product),
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
                    status: 'Rejected',
                    reason: 'Either your proof of residence or proof of identification has not been submitted.',
                    supplier: supplier
                });
                alert('Your product has been updated.');
            } 
            catch (error) 
            {
                console.error("Error adding document: ", error);
            }   
        } 
    }

    async function updateImages(name, ...images)
    {
        const fetchName = async() => {
            const q = query(collection(db, "Images"), where("name", "==", name));
            const querySnapShot = await getDocs(q);
            if(querySnapShot.empty)
            {
                for (let i = 0; i < images.length; i++) 
                {
                    try 
                    {
                        const docRef = await addDoc(collection(db, 'Images'),
                        {
                            name: name,
                            image: images[i],
                            supplier: id
                        });
                        console.log('Image is entered in database.');
                    } 
                    catch (error) 
                    {
                        console.error("Error adding document: ", error);
                    }
                }
            }
            else
            {
                await deleteDoc(doc(db, 'Images'), where("name", "==", name));
                for (let i = 0; i < images.length; i++) 
                {
                    try 
                    {
                        const docRef = await addDoc(collection(db, 'Images'),
                        {
                            name: name,
                            image: images[i],
                            supplier: id
                        });
                        console.log('Image is entered in database.');
                    } 
                    catch (error) 
                    {
                        console.error("Error adding document: ", error);
                    }
                }
            }
        };

        if(images.length > 0)
        {
            fetchName();
        }
        else
        {
            //
        }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
            base64: true,
        });

        if(!result.canceled) 
        {
            const selectedImages = result.assets.map(asset => asset.base64 );
            setImages(selectedImages);
        }
    }

    return (
        <View style = {styles.container}>
            <ScrollView style = {{ flex: 1, minHeight: '100%' }}>
                <Text style = {styles.header}>Product Details Form</Text>
                <View style = {styles.form}>
                    <View style = {styles.row}>
                        <View style = {styles.hold}>
                            <Text style = {styles.label}>Name:</Text>
                            <TextInput style = {styles.input} 
                                placeholder = 'Name'
                                onChangeText = {setName}
                                value = {name}
                                defaultValue = {name}/>
                        </View>
                        <View style = {styles.hold}>
                            <Text style = {styles.label}>Price:</Text>
                            <TextInput style = {styles.input} 
                                keyboardType = 'numbers-and-punctuation'
                                placeholder = '0.00'
                                onChangeText = {setPrice}
                                value = {price}
                                defaultValue = {price}/>
                        </View>
                    </View>
                    <Text style = {styles.label}>Size:</Text>
                    <View style = {styles.row1}>
                        <SelectList
                            disabledItemStyles = {{backgroundColor: 'black'}}
                            disabledTextStyles = {{color: 'white'}}
                            boxStyles = {{margin: 10, minWidth: '40%'}}
                            setSelected = { (val) => setTop(val)}
                            data = {TopChart}
                            save = 'value'/>
                        <SelectList
                            disabledItemStyles = {{backgroundColor: 'black'}}
                            disabledTextStyles = {{color: 'white'}}
                            boxStyles = {{margin: 10, minWidth: '40%'}}
                            setSelected = { (val) => setBottom(val)}
                            data = {BottomChart}
                            save = 'value'/>
                        <SelectList
                            disabledItemStyles = {{backgroundColor: 'black'}}
                            disabledTextStyles = {{color: 'white'}}
                            boxStyles = {{margin: 10, minWidth: '27.5%'}}
                            setSelected = { (val) => setBra(val)}
                            data = {BraCupChart}
                            save = 'value'/>
                        <SelectList
                            disabledItemStyles = {{backgroundColor: 'black'}}
                            disabledTextStyles = {{color: 'white'}}
                            boxStyles = {{margin: 10, minWidth: '40%'}}
                            setSelected = { (val) => setCup(val)}
                            data = {CupChart}
                            save = 'value'/>
                    </View>
                    <View style = {styles.row}>
                        <View style = {styles.hold}>
                            <Text style = {styles.label}>Quantity:</Text>
                            <TextInput style = {styles.input} 
                                keyboardType = 'number-pad'
                                placeholder = '3'
                                onChangeText = {setQuantity}
                                value = {quantity}
                                defaultValue = {quantity}/>
                        </View>
                        <View style = {styles.hold}>
                            <Text style = {styles.label}>Gender:</Text>
                            <SelectList
                                boxStyles = {{minWidth: '80%'}}
                                setSelected = {(val) => setGender(val)}
                                data = {Gender}
                                save = 'value'/>
                        </View>
                    </View>
                    <Text style = {styles.label}>Category:</Text>
                    <SelectList
                        disabledItemStyles = {{backgroundColor: 'black'}}
                        disabledTextStyles = {{color: 'white'}}
                        setSelected = { (val) => setCategory(val)}
                        data = {Categories}
                        save = 'value'/>
                    <View style = {styles.row}>
                        <View style = {styles.hold}>
                            <Text style = {styles.label}>Sale:</Text>
                            <SelectList
                                boxStyles = {{minWidth: '80%'}}
                                setSelected = {(val) => setSale(val)}
                                data = {Sale}
                                save = 'value'/>
                        </View>
                        <View style = {styles.hold}>
                            <Text style = {styles.label}>Sale Price:</Text>
                            <TextInput style = {styles.input} 
                                keyboardType = 'numbers-and-punctuation'
                                placeholder = '0.00'
                                onChangeText = {setSaleP}
                                value = {saleprice}
                                defaultValue = {saleprice}/>
                        </View>
                    </View>
                    <View style = {styles.row}>
                        <View style = {styles.hold}>
                        <Text style = {styles.label}>Image:</Text>
                            <TouchableOpacity
                                style = {styles.select}
                                onPress = {pickImage}>
                            <Text style = {styles.selectText}>Select File</Text>
                            </TouchableOpacity>
                            <Text style = {styles.desc}>Upload type image only nothing else.</Text>
                            {images && images.map((image, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: 'data:image/jpeg;base64,' + image }}
                                    style={{ width: 200, height: 200, alignSelf: 'center', resizeMode: 'contain' }}/>
                            ))}
                        </View>
                    </View>
                </View>
                <TouchableOpacity style = {styles.button}
                    onPress = {() => {updateData(name, price, top, bottom, bra, cup, quantity, gender, category, sale, saleprice, supplier, product, col); updateImages(name, ...images)}}>
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

export default Update;