import React, { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const Logout = ({navigation}) => {

    useEffect(() => {
        const LogoutState = async() => {
            const userToken = await SecureStore.deleteItemAsync('supplier');
            navigation.navigate('Auth');
        };

        LogoutState();
    });
    
};
export default Logout;