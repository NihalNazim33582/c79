import React from 'react';
import {View, Text, Modal,TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import {Header} from 'react-native-elements'

const MyHeader=props=>{
    return(
        <Header centerComponent={{
            text:props.title, style:{color:'black',fontSize: 35, fontWeight: 'bold'}
        }}
        
        backgroundColor={'orange'}/>
    )
}

export default MyHeader