import React from "react";
import { Image } from "react-native";

const Advert = () => {
    return (
        <Image style = {{ width: '100%', height: '30%', resizeMode: 'stretch' }} source = {require('../adverts/advert.png')}/>
    ); 
};

export default Advert;