
import React,{Component} from 'react';

import {Text, View,Image} from 'react-native'
import { Container, Content, Icon, Form } from "native-base";

import {connect} from 'react-redux'

class Vacancy extends Component{
    constructor(props) {
        super(props);
      }
      
render(){
    return(
        <View style={{flex:1,backgroundColor:"red"}}>

                <View style={{flex:9,backgroundColor:"lightgrey"}}>
                    {
                    this.props.users.length>0 ? this.props.companypersonalinformation.map((e,i)=>{
        
                        //e.uid !== this.props.current_user.uid to display user other than you
                        return e.uid !==this.props.current_user.uid && <View onStartShouldSetResponder={() => this.props.navigation.navigate("CompanyDetail",{
                            current_user:this.props.current_user,
                            user:e
                        })}
        
        
                        key={i} style={{flexDirection:"row"}}>
                    <Image style={{width:50,height:50,margin:10,borderRadius:50,alignSelf:"center"}} source={{uri:e.profile}}/>
                    <View style={{alignSelf:"center"}}>
                    <Text style={{marginLeft:20,marginBottom:3,fontSize:17}}>{e.companyname}</Text>
                    
                    <View style={{flexDirection:"row"}}>
                        
                    <Text style={{marginLeft:20,fontSize:17,color:"#686868",alignSelf:"center"}}>{e.email}</Text>
                  
                    </View>
                    
                    
                    </View>
                    </View>
                    }):null    
                
                }
                    
                    </View>
        
                </View>
    )
}
}




const mapStateToProps=(state) => ({
    users:state.users,
    current_user:state.current_user,
    personalinformation:state.personalinformation,
    companypersonalinformation:state.companypersonalinformation
 })

export default connect(mapStateToProps,null)(Vacancy)


