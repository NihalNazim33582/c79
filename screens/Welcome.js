import React from 'react';
import {View, Text, Modal,TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView,
ScrollView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {TabNavigator} from '../componets/TabNavi'
import firebase from 'firebase';
import db from '../config';
import SantaAnimation from '../componets/santa'

export default class Welcome extends React.Component{
  constructor(){
      super()

      this.state={
          emailId:'',
          password:'',
          confrimPassword:'',
          firstName:'',
          lastName:'',
          address:'',
          contact:'',
          isModelVisable:false,
      }
  }

  userSignUp=(emailId,password,confrimPassword)=>{
      if(password !== confrimPassword){
          return(Alert.alert('This password does not match your orginal password'))
      }else{
        firebase.auth().createUserWithEmailAndPassword(emailId,password)
        
        .then(()=>{
            db.collection('Users').add({
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                contact:this.state.contact,
                address:this.state.address,
                password:this.state.password,
                emailId:this.state.emailId
            })
            return Alert.alert('User Added Successfully','',
            [{text:'okay',onPress:()=>this.setState({isModelVisable:false})}])
            
        })
        .catch(function(error){
            var errorCode = error.code
            var errorMessage = error.Message
    
            return Alert.alert(errorMessage)
        })
      }

  }

  userLogin=(emailId,password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId,password)
    .then(()=>{
        //return Alert.alert('Welcome You were successfully logged in.')
        this.props.navigation.navigate('DonateBooks')
        
    })
    .catch(function(error){
        var errorCode = error.code
        var errorMessage = error.Message

        return Alert.alert(errorMessage)
    })
  }

  showModal=()=>{
    return(
        <Modal 
            animationType='fade'
            transparent={true}
            visible={this.state.isModelVisable}
        >
            <View style={styles.showModalContainer}>
                <ScrollView style={{width:'100%'}}>
                    <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                        <Text style={styles.modalTitle}>
                            Registration
                        </Text>
                            <TextInput 
                                placeholder={'First Name'}
                                placeholderTextColor={'black'}
                                maxLength={10}
                                    onChangeText={(text)=>{
                                        this.setState({
                                            firstName:text
                                        })
                                    }} 
                                style={styles.formTextInput}/>

                            <TextInput 
                                placeholder={'Last Name'}
                                placeholderTextColor={'black'}
                                maxLength={10}
                                    onChangeText={(text)=>{
                                        this.setState({
                                            lastName:text
                                        })
                                    }} 
                                style={styles.formTextInput}/>

                            <TextInput 
                                placeholder={'Contact Info'}
                                placeholderTextColor={'black'}
                                keyboardType={'numeric'}
                                maxLength={10}
                                    onChangeText={(text)=>{
                                        this.setState({
                                            contact:text
                                        })
                                    }} 
                                style={styles.formTextInput}/>

                            <TextInput 
                                placeholder={'Address'}
                                placeholderTextColor={'black'}
                                multiline={true}
                                    onChangeText={(text)=>{
                                        this.setState({
                                            address:text
                                        })
                                    }} 
                                style={styles.formTextInput}/>

                            <TextInput 
                                placeholder={'Email Id'}
                                placeholderTextColor={'black'}
                                keyboardType={'email-address'}
                                    onChangeText={(text)=>{
                                        this.setState({
                                            emailId:text
                                        })
                                    }} 
                                style={styles.formTextInput}/>

                            <TextInput 
                                placeholder={'Password'}
                                placeholderTextColor={'black'}
                                maxLength={8}
                                    onChangeText={(text)=>{
                                        this.setState({
                                            password:text
                                        })
                                    }} 
                                style={styles.formTextInput}/>

                            <TextInput 
                                placeholder={'Confrim Password'}
                                placeholderTextColor={'black'}
                                maxLength={8}
                                    onChangeText={(text)=>{
                                        this.setState({
                                            confrimPassword:text
                                        })
                                    }} 
                                style={styles.formTextInput}/>

                                <View>
                                    <TouchableOpacity onPress={()=>{
                                        this.userSignUp(
                                            this.state.emailId,
                                            this.state.password,
                                            this.state.confrimPassword,
                                        )
                                    }} 
                                    style={styles.registerButton}>
                                        <Text style={styles.registerButtonText}>
                                            You were registered!!
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View>
                                    <TouchableOpacity onPress={()=>{
                                        this.setState({
                                            isModelVisable:false
                                        })
                                    }}
                                    style={styles.cancelButton}>
                                        <Text style={{color:'#ff5722'}}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </Modal>
    )
  }

    render(){

        return(
            <SafeAreaProvider>
            <View style={styles.container}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    {this.showModal()}
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.title}>
                    Book Santa!
                </Text>

                </View>
                <TextInput 
                placeholder={'EXAMPLEABC@gmail.com'}
                placeholderTextColor={'black'}
                keyboardType={'email-address'}
                onChangeText={(text)=>{
                    this.setState({
                        emailId:text
                    })
                }} 
                style={styles.loginBox}>

                </TextInput>

                <TextInput 
                placeholder={'Password123'}
                placeholderTextColor={'black'}
                secureTextEntry={true}
                onChangeText={(text)=>{
                    this.setState({
                        password:text
                    })
                }}
                style={styles.loginBox}>

                </TextInput>

                <TouchableOpacity 
                onPress={()=>{
                    this.userLogin(this.state.emailId,this.state.password)

                }}
                style={[styles.button,{marginBottom:20, marginTop:20}]}>
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={()=>{
                    this.setState({
                        isModelVisable:true
                    })
                }}
                style={styles.button}>
                    <Text style={styles.buttonText}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaProvider>
        )
    }
}

const styles=StyleSheet.create({
    title :{ 
        fontSize:65, fontWeight:'300', paddingBottom:30, color:'Red'},
    loginBox:{ 
        width: 300, height: 40, borderBottomWidth: 1.5, borderColor : '#ff8a65',
        fontSize: 20, margin:10, paddingLeft:10 },
        button:{ width:300, height:50, justifyContent:'center', alignItems:'center',
        borderRadius:25, backgroundColor:"#ff9800", shadowColor: "#000", shadowOffset:
        { width: 0, height: 8, }, shadowOpacity: 0.30, shadowRadius: 10.32, elevation: 16, 
        marginBottom:20, marginTop:20},
        buttonText:{ color:'#ffff', fontWeight:'200', fontSize:20, },
        container:{ flex:1, backgroundColor:'#F8BE85', alignItems: 'center', justifyContent: 'center' },
        profileContainer:{ flex:1, justifyContent:'center', alignItems:'center', },
        KeyboardAvoidingView:{ flex:1, justifyContent:'center', alignItems:'center' },
        modalTitle :{ justifyContent:'center', alignSelf:'center', fontSize:30, color:'#ff5722', margin:50 },
        showModalTextInput:{ flex:1, borderRadius:20, justifyContent:'center', alignItems:'center', backgroundColor:"#ffff", marginRight:30, marginLeft : 30, marginTop:80, marginBottom:80, },
        formTextInput:{ width:"75%", height:35, alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10 },
        registerButton:{ width:200, height:40, alignItems:'center', justifyContent:'center', borderWidth:1, borderRadius:10, marginTop:30 },
        registerButtonText:{ color:'#ff5722', fontSize:15, fontWeight:'bold' },
        cancelButton:{ width:200, height:30, justifyContent:'center', alignItems:'center', marginTop:5, }
})