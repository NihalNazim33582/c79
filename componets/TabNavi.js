import React from 'react';
import {View, Text, Modal,TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native'
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Request from '../screens/Request';
import Donate from '../screens/Donate'

export const TabNavigator=createBottomTabNavigator({
    DonateBooks:{screen:Donate,
    navigationOptions:{
        tabBarIcon:<Image source={require('../assets/request-list.png')} style={{width:20,height:20}}/>,
        tabBarLabel:'Donate Books'
        
    }},
    RequestBooks:{screen:Request,
        navigationOptions:{
            tabBarIcon:<Image source={require('../assets/request-book.png')} style={{width:20,height:20}}/>,
            tabBarLabel:'Request Books'
            
        }}
})