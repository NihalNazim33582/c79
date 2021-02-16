import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './screens/Welcome'
import Request from './screens/Request';
import Donate from './screens/Donate'
import {TabNavigator} from './componets/TabNavi'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'

export default class App extends React.Component{
  render(){
    return (
      <View>
        <AppContainer/>
      </View>
    );
  }
}

const switchNavigator=createSwitchNavigator({
  welcomeScreen:{screen:Welcome},
  BottomTab:{screen:TabNavigator},

})

const AppContainer=createAppContainer(switchNavigator)

/*const styles = StyleSheet.create({
  
});*/
