import React, { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import Loading from './Loading';

const AuthLoading = ({navigation}) => {
    
    const checkLoginState = async() => {
        const userToken = await SecureStore.getItemAsync('supplier');
            navigation.navigate(userToken ? 'View' : 'Auth');
    };

    useEffect(() => {
        checkLoginState();
    });
    
    return <Loading />;

};
export default AuthLoading;