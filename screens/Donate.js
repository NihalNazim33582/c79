import React from 'react';
import {
    View, 
    Text, 
    Modal, 
    TextInput, 
    TouchableOpacity, 
    Alert, 
    StyleSheet, 
    KeyboardAvoidingView,
    ScrollView,
    FlatList,
    ListItem
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../componets/Header';

export default class Donate extends React.Component{
    constructor(){
        super()

        this.request=null

        this.state={
            requestBookList:[],
        }
    }

    getRequestBookList=()=>{
        this.request=db.collection('RequestedBooks').onSnapshot((snapshot)=>{
            var requestBookList=snapshot.docs.map(document=>document.data())
            this.setState({
                requestBookList:requestBookList
            })
        })
        
    }

    componentDidMount=()=>{
        this.getRequestBookList()
    }

    keyExtractor=(item,index)=>index.toString()
        renderItem=({item,i})=>{
            return(
                <ListItem
                    key={
                        i
                    }

                    title={
                        item.BookName
                    }

                    subtitle={
                        item.ReasonOfRequest
                    }

                    textStyle={{
                        color:'black',
                        fontWeight:'bold',
                    }}
                    
                    rightElement={
                        <TouchableOpacity
                            style={styles.button}
                        >
                            <Text>
                                View
                            </Text>
                        </TouchableOpacity>
                    }

                    bottomDivider

                />
            )
        }

    render(){
        return(
            <SafeAreaProvider>
            <View style={{flex:1}}>
                <MyHeader title='Donate Books'/>
                    <View 
                    
                        style={{
                            flex:1
                        }}>{
                            this.state.requestBookList.length === 0?(
                                <View
                                style={styles.subContainer}>
                                    <Text>List of All Requested Books</Text>
                                </View>
                            ):(
                                <FlatList
                                    keyExtractor={
                                        this.keyExtractor
                                    }

                                    data={
                                        this.state.requestBookList
                                    }

                                    renderItem={
                                        this.renderItem
                                    }
                                />
                            )}
                    </View>
            </View>
            
            </SafeAreaProvider>
        )
    }

}


const styles=StyleSheet.create({
    button:{ width:100, height:30, justifyContent:'center', alignItems:'center', backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8 }},
    subContainer:{ flex:1, fontSize: 20, justifyContent:'center', alignItems:'center' },

})