import React,{useState,useEffect} from 'react';

import {Text, View,TouchableOpacity,ImageBackground} from 'react-native'

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import {connect} from 'react-redux'

const Login = (props) =>{

// let [username,setusername] = useState("")

  // const sendtofirebase = () =>{
  //   let User = {username}
  //   database().ref("/").child("Username").push(User)
  // }

  useEffect(()=>{
    props.get_users()
    props.get_company_users()
  },[])

  async function onFacebookButtonPressStudent() {
    // Attempt login with permissions
    LoginManager.logOut() 

    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  
    // Sign-in the user with the credential
    auth().signInWithCredential(facebookCredential)
    .then((result) => {
        let newuser = result.user
        let createuser = {
                name: newuser.displayName,
                email: newuser.email,
                profile: newuser.photoURL,
                uid: newuser.uid
        }
        // set current user in redux
        props.set_current_user(createuser)


        database().ref("/").child(`students/${newuser.uid}`).set(createuser).then(()=>{
          database().ref("/").child(`studentpersonalinformation/${newuser.uid}`).once("value").then(function(snapshot) {
            var a = snapshot.exists();  // true)
            if(a==true){
              props.navigation.replace("Home", "student")
              alert("User Login Successful")
            }
            else{props.navigation.replace("FirstTimeUser", "student")}
            alert("User Login Successful"
          )})
        }).catch(function(error) {
            // Handle Errors here.
            console.log(error)
        });
      })
    .catch((error) => {
      console.log(error)
    })
  }

  async function onFacebookButtonPressCompany() {
    // Attempt login with permissions
    LoginManager.logOut() 

    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  
    // Sign-in the user with the credential
    auth().signInWithCredential(facebookCredential)
    .then((result) => {
        let newuser = result.user
        let createuser = {
                name: newuser.displayName,
                email: newuser.email,
                profile: newuser.photoURL,
                uid: newuser.uid
        }
        // set current user in redux
        props.set_current_user(createuser)


        database().ref("/").child(`company/${newuser.uid}`).set(createuser).then(()=>{
          database().ref("/").child(`companypersonalinformation/${newuser.uid}`).once("value").then(function(snapshot) {
            var a = snapshot.exists();  // true)
            if(a==true){
              props.navigation.replace("Home", "company")
              alert("User Login Successful")
            }
            else{props.navigation.replace("FirstTimeUser", "company")}
            alert("User Login Successful"
          )})
        }).catch(function(error) {
            // Handle Errors here.
            console.log(error)
        });
      })
    .catch((error) => {
      console.log(error)
    })
  }





    return (
        <ImageBackground style={{width:"100%",height:"100%"}} source={require('../photo1.jpg')} >
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:28,color:"white"}}>Welcome To Campus</Text>
            <TouchableOpacity activeOpacity={0.8}
             style={{
                    justifyContent:"center",
                    width: "50%",
                    height:"6%",
                    borderRadius: 20,
                    margin: 25,
                    backgroundColor: "#3B5998",
             }} 
             onPress={() => {props.navigation.replace("AdminLogin"); alert("Username = admin and Password = admin")}} 
             > 
             <Text style={{fontSize:16,color:"white",textAlign:"center",justifyContent:"center"}}>Admin Sign-In</Text> 
             </TouchableOpacity> 
             <TouchableOpacity activeOpacity={0.8}
             style={{
                    justifyContent:"center",
                    width: "50%",
                    height:"6%",
                    borderRadius: 20,
                    margin: 25,
                    backgroundColor: "#3B5998",
             }} 
             onPress={() => onFacebookButtonPressStudent().then(() => console.log('Signed in with Facebook!'))} 
             > 
             <Text style={{fontSize:16,color:"white",textAlign:"center",justifyContent:"center"}}>Student Sign-In</Text> 
             </TouchableOpacity> 
             <TouchableOpacity activeOpacity={0.8}
             style={{
                    justifyContent:"center",
                    width: "50%",
                    height:"6%",
                    borderRadius: 20,
                    margin: 25,
                    backgroundColor: "#3B5998",
             }} 
             onPress={() => onFacebookButtonPressCompany().then(() => console.log('Signed in with Facebook!'))} 
             > 
             <Text style={{fontSize:16,color:"white",textAlign:"center",justifyContent:"center"}}>Company Sign-In</Text> 
             </TouchableOpacity> 
        </View>
        </ImageBackground>
    )
}

const get_users=()=>{
  return (dispatch)=>{
      let users=[]

      database().ref("/").child("students").once('value',  (snapshot) =>{
        snapshot.forEach((childSnapshot)=> {
          users.push(childSnapshot.val())
        });
        dispatch({type:"SETFIREBASEUSERS",payload:users})
      })

      let personalinformation = []
      database().ref("/").child("studentpersonalinformation").once('value',  (snapshot) =>{
        snapshot.forEach((childSnapshot)=> {
          personalinformation.push(childSnapshot.val())
        });
        dispatch({type:"SETFIREBASEPERSONALINFORMATION",payload:personalinformation})
      })
    
  }
}

const get_company_users=()=>{
    return (dispatch)=>{
        let users=[]
  
        database().ref("/").child("company").once('value',  (snapshot) =>{
          snapshot.forEach((childSnapshot)=> {
            users.push(childSnapshot.val())
          });
          dispatch({type:"SETCOMPANYUSERS",payload:users})
        })
  
        let personalinformation = []
        database().ref("/").child("companypersonalinformation").once('value',  (snapshot) =>{
          snapshot.forEach((childSnapshot)=> {
            personalinformation.push(childSnapshot.val())
          });
          dispatch({type:"SETCOMPANYPERSONALINFORMATION",payload:personalinformation})
        })
      
    }
  }

const set_current_user=(create_user)=>{
  return(dispatch)=>{
    dispatch({type:"SETUSER",payload:create_user})

  }
}

const mapStateToProps=(state) => ({
    users:state.users
 })
 
 const mapDispatchToProps=(dispatch) => ({
     get_users:() => dispatch(get_users()),
     get_company_users:() => dispatch(get_company_users()),
     
     //parameter mei dena lazmi hai warna undefined 
     set_current_user:(create_user) => dispatch(set_current_user(create_user))
 })
 
 
 export default connect(mapStateToProps,mapDispatchToProps)(Login)

