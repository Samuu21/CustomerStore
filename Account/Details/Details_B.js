import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, addDoc, setDoc } from 'firebase/firestore';
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

const Details_B = ({ id, c, ba, br, acc, doci }) => {
    const [card, cardValue] = useState(c);
    const [bank, bankValue] = useState(ba);
    const [branch, branchValue] = useState(br);
    const [account, accountValue] = useState(acc);

    const Banks = [{key: '1', value: 'Popular Banks', disabled: true},
                        {key: '2', value: 'Capitec Bank'},
                        {key: '3', value: 'ABSA Bank'},
                        {key: '4', value: 'First National Bank'},
                        {key: '5', value: 'Standard Bank'},
                        {key: '6', value: 'Nedbank'},
                        {key: '7', value: 'All Banks', disabled: true},
                        {key: '8', value: 'Access Bank LTD'},
                        {key: '9', value: 'African Bank'},
                        {key: '10', value: 'Albaraka Bank'},
                        {key: '11', value: 'BNP Parabas SA'},
                        {key: '12', value: 'Bank Zero'},
                        {key: '13', value: 'Bidvest Bank'},
                        {key: '14', value: 'CitiBank'},
                        {key: '15', value: 'Discovery Bank'},
                        {key: '16', value: 'FBC Fidelity Bank'},
                        {key: '17', value: 'Finbond Net1'},
                        {key: '18', value: 'Grindrod Bank'},
                        {key: '19', value: 'HBZ Bank'},
                        {key: '20', value: 'Habib Overseas Bank'},
                        {key: '21', value: 'Investec Bank'},
                        {key: '22', value: 'Ithala Bank'},
                        {key: '23', value: 'JP Morgan Chase Bank'},
                        {key: '24', value: 'MTN Banking'},
                        {key: '25', value: 'Mercantile Bank'},
                        {key: '26', value: 'Nedbank (Bond/Loan Accounts)'},
                        {key: '27', value: 'Nedbank Corporate Saver'},
                        {key: '28', value: 'Nedbank LTD INC BOE Bank'},
                        {key: '29', value: 'Nedbank LTD INC PEP Bank'},
                        {key: '30', value: 'Nedbank Peoples Mortages LTD'},
                        {key: '31', value: 'Olympus Mobile'},
                        {key: '32', value: 'Rand Merchant Bank'},
                        {key: '33', value: 'SA Reserve Bank'},
                        {key: '34', value: 'Sasfin Bank'},
                        {key: '35', value: 'South African Postbank SOC Ltd'},
                        {key: '36', value: 'Standard Chartered Bank'},
                        {key: '37', value: 'State Bank of India'},
                        {key: '38', value: 'TymeBank'},
                        {key: '39', value: 'Ubank LTD'},
                        {key: '40', value: 'VBS Mutual Bank'},];

    async function updateData(card, bank, branch, account, id, doci) 
    {
        try {
            await setDoc(doc(db, 'Bank', doci),
            {
                name: card,
                bank: bank,
                branch: branch,
                account: account,
                supplier: id
            });
            alert('Your bank details have been updated.');
        } catch (error) {
            console.error("Error adding document: ", error);
        }    
    }

    async function addData(card, bank, branch, account, id) 
    {
        try {
            const docRef = await addDoc(collection(db, 'Bank'),
            {
                name: card,
                bank: bank,
                branch: branch,
                account: account,
                supplier: id
            });
            alert('Your bank details have been inserted.');
        } catch (error) {
            console.error("Error adding document: ", error);
        }    
    }

    if(doci == '')
    {
        return (
            <View style = {styles.container}>
                <ScrollView style = {{ flex: 1, minHeight: '100%' }}>
                    <Text style = {styles.header}>Banking Details Form</Text>
                    <View style = {styles.form}>
                        <Text style = {styles.label}>Cardholder Name:</Text>
                        <TextInput style = {styles.input} 
                            placeholder = 'MS XYZ AAAAAAAA'
                            onChangeText = {cardValue}
                            value = {card}
                            defaultValue = {card}/>
                        <Text style = {styles.label}>Bank Name:</Text>
                        <SelectList
                            setSelected = { (val) => bankValue(val)}
                            data = {Banks}
                            save = 'value'/>
                        <Text style = {styles.label}>Branch Code:</Text>
                        <TextInput style = {styles.input} 
                            placeholder = '000000'
                            keyboardType = 'number-pad'
                            onChangeText = {branchValue}
                            value = {branch}
                            defaultValue = {branch}/>
                        <Text style = {styles.label}>Account Number:</Text>
                        <TextInput style = {styles.input}
                            keyboardType = 'number-pad' 
                            placeholder = '1234567890'
                            onChangeText = {accountValue}
                            value = {account}
                            defaultValue = {account}/>
                    </View>
                    <TouchableOpacity style = {styles.button}
                        onPress = { () => {addData(card, bank, branch, account, id)}}>
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
                    <Text style = {styles.header}>Banking Details Form</Text>
                    <View style = {styles.form}>
                        <Text style = {styles.label}>Cardholder Name:</Text>
                        <TextInput style = {styles.input} 
                            placeholder = 'MS XYZ AAAAAAAA'
                            onChangeText = {cardValue}
                            value = {card}
                            defaultValue = {card}/>
                        <Text style = {styles.label}>Bank Name:</Text>
                        <SelectList
                            setSelected = { (val) => bankValue(val)}
                            data = {Banks}
                            save = 'value'/>
                        <Text style = {styles.label}>Branch Code:</Text>
                        <TextInput style = {styles.input} 
                            placeholder = '000000'
                            keyboardType = 'number-pad'
                            onChangeText = {branchValue}
                            value = {branch}
                            defaultValue = {branch}/>
                        <Text style = {styles.label}>Account Number:</Text>
                        <TextInput style = {styles.input}
                            keyboardType = 'number-pad' 
                            placeholder = '1234567890'
                            onChangeText = {accountValue}
                            value = {account}
                            defaultValue = {account}/>
                    </View>
                    <TouchableOpacity style = {styles.button}
                        onPress = { () => {updateData(card, bank, branch, account, id, doci)}}>
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
        borderBottomWidth: 1,
        paddingBottom: 10,
    },

    header:
    {
        color: 'black',
        fontFamily: 'sans-serif',
        fontSize: 18,
        paddingBottom: 15,
        alignSelf: 'center',
        marginTop: 10
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
});

export default Details_B;