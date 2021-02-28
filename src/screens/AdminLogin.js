import React,{useState,useEffect} from 'react';

import {Text, View,TouchableOpacity,ImageBackground,TextInput } from 'react-native'


const AdminLogin = (props) =>{

    const [username, changeUsername] = useState('');
    const [password, changePassword] = useState('');




    const AdminLogin = () =>{
        if(username === 'admin' && password === 'admin'){
            props.navigation.replace("AdminDashboard")
        }
        else{
            alert("Invalid Password Username = admin and Password = admin")
        }
    }


    return (
        <ImageBackground style={{width:"100%",height:"100%"}} source={require('../photo2.jpg')} >
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:28,color:"white"}}>Admin Login</Text>
            <TextInput placeholder="Enter Username" placeholderTextColor="white" 
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 ,width:"80%",marginTop:20,color:"white"}}
      onChangeText={text => changeUsername(text)}
      value={username}
    />
    <TextInput placeholder="Enter Password" placeholderTextColor="white" 
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 ,width:"80%",marginTop:20,color:"white"}}
      onChangeText={text => changePassword(text)}
      value={password}
    />
            <TouchableOpacity activeOpacity={0.8}
             style={{
                    justifyContent:"center",
                    width: "50%",
                    height:"6%",
                    borderRadius: 20,
                    margin: 25,
                    backgroundColor: "#3B5998",
             }} 
             onPress={() => AdminLogin()} 
             > 
             <Text style={{fontSize:16,color:"white",textAlign:"center",justifyContent:"center"}}>Admin Sign-In</Text> 
             </TouchableOpacity> 
           
            
        </View>
        </ImageBackground>
    )
}


 
 export default AdminLogin

