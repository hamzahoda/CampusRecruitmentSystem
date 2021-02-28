import React,{useEffect,useState} from 'react'
import {View,Text,Image,Linking, Platform} from 'react-native'
import {connect} from 'react-redux'
import { Container, Content, List, ListItem, Button, Icon, Spinner } from 'native-base'; 
import database from '@react-native-firebase/database';

const CheckCompany = (props)=>{

              let user = props.route.params.user
              let current_user =props.route.params.current_user
              let [personalinformation,setpersonalinformation] = useState("")
              useEffect(()=>{
                     let information = []
                     database().ref("/").child(`companypersonalinformation/${user.uid}`).once('value',  (snapshot) =>{
                          
                            information.push(snapshot.val())
                            setpersonalinformation(information)
                     })
              },[])

              React.useLayoutEffect(() => {
                props.navigation.setOptions({
          
                  headerTitle:<View style={{flexDirection:"row"}}>
                    <Image style={{width:50,height:50,borderRadius:50,resizeMode:"contain",alignSelf:"center"}} source={{uri:user.profile}}/>
                    <Text style={{alignSelf:"center",marginLeft:20,fontSize:15,fontWeight:'bold'}}>{user.name}</Text>
                    </View>
                });
              }, [props.navigation]);
          

              
            const deleteStudent = (student)=>{
                console.log(student.uid)
                database().ref("/").child(`companypersonalinformation/${student.uid}`).remove()
             database().ref("/").child(`company/${student.uid}`).remove().then(()=>{
                alert("company Deleted")  
                props.get_company_users()
                props.navigation.navigate("AdminDashboard")
             })
   
            }



              return (
                    <Container>
                      <Content>

                        {personalinformation.length>0?personalinformation.map((e,i)=>
                        <List key={i}>
                          <ListItem itemDivider>
                            <Text style={{fontSize:15,fontWeight:"bold"}}>Company Information</Text>
                          </ListItem>
                                <ListItem itemDivider>
                                  <Text style={{fontSize:15,fontWeight:"bold"}}>Company Name:</Text>
                                </ListItem>
                                <ListItem >
                                  <Text>{e.companyname}</Text>
                                </ListItem>
                               <ListItem itemDivider>
                                  <Text style={{fontSize:15,fontWeight:"bold"}}>Email:</Text>
                                </ListItem>
                                <ListItem >
                               <Text>{e.email}</Text>
                               </ListItem>
                               <ListItem itemDivider>
                                  <Text style={{fontSize:15,fontWeight:"bold"}}> Address:</Text>
                                </ListItem>
                                <ListItem>
                               <Text>{e.address}</Text>
                               </ListItem>
                               <ListItem itemDivider>
                                  <Text style={{fontSize:15,fontWeight:"bold"}}>Job Position:</Text>
                                </ListItem>
                                <ListItem>
                               <Text>{e.jobposition}</Text>
                               </ListItem>
                               <ListItem itemDivider>
                                  <Text style={{fontSize:15,fontWeight:"bold"}}>Company Representative:</Text>
                                </ListItem>
                                <ListItem>
                               <Text>{e.name}</Text>
                               </ListItem>
                               <ListItem itemDivider>
                                  <Text style={{fontSize:15,fontWeight:"bold"}}>Contact:</Text>
                                </ListItem>
                                <ListItem>
                               <Text>{e.contact}</Text>
                               </ListItem>
                               <Button style={{backgroundColor:"red"}} iconLeft block onPress={()=>deleteStudent(e)}>
                            <Icon name='trash' />
                            <Text style={{color:"white",marginLeft:10}}>Delete Student</Text>
                        </Button>
                             </List>
                      ):<Spinner color='blue' />}

                          




                      </Content>
                    </Container>
                  );
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
 
 
 export default connect(mapStateToProps,mapDispatchToProps)(CheckCompany)
                