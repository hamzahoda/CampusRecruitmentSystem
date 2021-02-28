import React,{useEffect,useState} from 'react'
import {View,Text,Image,Linking, Platform} from 'react-native'
import {connect} from 'react-redux'
import { Container, Content, List, ListItem, Button, Icon, Spinner } from 'native-base'; 
import database from '@react-native-firebase/database';

const CheckStudent = (props)=>{

              let user = props.route.params.user
              let current_user =props.route.params.current_user
              let [personalinformation,setpersonalinformation] = useState("")
              useEffect(()=>{
                     let information = []
                     database().ref("/").child(`studentpersonalinformation/${user.uid}`).once('value',  (snapshot) =>{
                          
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
                database().ref("/").child(`studentpersonalinformation/${student.uid}`).remove()
             database().ref("/").child(`student/${student.uid}`).remove().then(()=>{
                alert("Student Deleted")  
                props.get_users()
                props.navigation.navigate("AdminDashboard")
             })
   
            }


              return (
                    <Container>
                      <Content>

                        {personalinformation.length>0?personalinformation.map((e,i)=>
                        <List key={i}>
                          <ListItem itemDivider>
                            <Text style={{fontSize:15,fontWeight:"bold"}}>Student Information</Text>
                          </ListItem>
                                <ListItem itemDivider>
                                  <Text style={{fontSize:15,fontWeight:"bold"}}>Name:</Text>
                                </ListItem>
                                <ListItem >
                                  <Text>{e.name}</Text>
                                </ListItem>
                               <ListItem itemDivider>
                                  <Text style={{fontSize:15,fontWeight:"bold"}}>Email:</Text>
                                </ListItem>
                                <ListItem >
                               <Text>{e.email}</Text>
                               </ListItem>
                               <ListItem itemDivider>
                                  <Text style={{fontSize:15,fontWeight:"bold"}}>Address:</Text>
                                </ListItem>
                                <ListItem>
                               <Text>{e.address}</Text>
                               </ListItem>
                               <ListItem itemDivider>
                                  <Text style={{fontSize:15,fontWeight:"bold"}}>Age:</Text>
                                </ListItem>
                                <ListItem>
                               <Text>{e.age}</Text>
                               </ListItem>
                               <ListItem itemDivider>
                                  <Text style={{fontSize:15,fontWeight:"bold"}}>Grade:</Text>
                                </ListItem>
                                <ListItem>
                               <Text>{e.grade}</Text>
                               </ListItem>
                               <ListItem itemDivider>
                                  <Text style={{fontSize:15,fontWeight:"bold"}}>University Name:</Text>
                                </ListItem>
                                <ListItem>
                               <Text>{e.universityname}</Text>
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



const mapStateToProps=(state) => ({
       current_user:state.current_user
     })
     
const mapDispatchToProps=(dispatch) => ({
get_users:() => dispatch(get_users()),

})     

export default connect(mapStateToProps,mapDispatchToProps)(CheckStudent)
