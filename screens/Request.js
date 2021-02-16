import React from 'react';
import {View, Text, Modal,TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView,
ScrollView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../componets/Header'

export default class Request extends React.Component{
    constructor(){
        super()
        this.state={
            UserId:firebase.auth().currentUser.email,
            BookName:'',
            Reason:''

        }
    }

    createUserId=()=>{
        return Math.round(random()).toString(35).substring(7)
    }

    addRequest=(BookName,Reason,UserId)=>{
        var UserId=this.state.UserId
        var randomRequestId= this.createUserId()
        db.collection('RequestedBooks').add({
            User:UserId,
            BookName:BookName,
            ReasonOfRequest:Reason,
            RequestId:randomRequestId
        })
        this.setState=({
            BookName:'',
            Reason:''
        })
        return Alert.alert('Your Book Was successfully requested.')
    }

    render(){
        return(
            <SafeAreaProvider>
            <View style={{flex:1}}>
                <MyHeader title='Request A Book' />
                    <KeyboardAvoidingView style={styles.keyBoardStyle}>
                        <TextInput 
                            placeholder='Enter The Book Name.'
                                onChangeText={(text)=>{
                                    this.setState=({
                                        BookName:text
                                    })
                                }}
                                value={
                                    this.state.BookName
                                }
                                style={styles.formTextInput}>
                        </TextInput>

                        <TextInput 
                            placeholder='Enter The Reason For Your Request.'
                                onChangeText={(text)=>{
                                    this.setState=({
                                        Reason:text
                                    })
                                }}
                                multiline={true}
                                numberOfLines={10}
                                value={
                                    this.state.Reason
                                }
                                style={styles.formTextInput}>
                        </TextInput>

                        <TouchableOpacity style={styles.button}
                        
                            onPress={()=>{
                                this.addRequest(this.state.BookName,this.state.ReasonOfRequest)
                            }}>
                            <Text>
                                Request
                            </Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
            </View>
            </SafeAreaProvider>
        )
    }

}

const styles=StyleSheet.create({
    keyBoardStyle : { flex:1, alignItems:'center', justifyContent:'center' },
    formTextInput:{ width:"75%", height:35, alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10, },
    button:{ width:"75%", height:50, justifyContent:'center', alignItems:'center', borderRadius:10, backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop:20 },

})