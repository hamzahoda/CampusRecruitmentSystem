
import React,{Component} from 'react';

import {Text, View,Image} from 'react-native'
import { Container, Content, Icon, Picker, Form } from "native-base";

import {connect} from 'react-redux'

class FindStudents extends Component{
    constructor(props) {
        super(props);
        this.state = {
          selected: "studentgrade",
          filteredusers: this.props.personalinformation
        };
      }
      onValueChange(value: string) {

        if(value === "A+"){
            let filteruser = []
            this.props.personalinformation.map((e)=> e.grade ==="A+" ?filteruser.push(e):null )
            this.setState({filteredusers:filteruser,selected:value})
        }
        else if(value === "A"){
            let filteruser = []
            this.props.personalinformation.map((e)=> e.grade ==="A" ?filteruser.push(e):null )
            this.setState({filteredusers:filteruser,selected:value})
        }
        else if(value === "B"){
            let filteruser = []
            this.props.personalinformation.map((e)=> e.grade ==="B" ?filteruser.push(e):null )
            this.setState({filteredusers:filteruser,selected:value})
        }
        else if(value === "C"){
            let filteruser = []
            this.props.personalinformation.map((e)=> e.grade ==="C"?filteruser.push(e):null )
            this.setState({filteredusers:filteruser,selected:value})
        }
        else if(value === "studentgrade"){
            this.setState({filteredusers:this.props.personalinformation,selected:value})
        }

      }
render(){
    console.log(this.props)
    return(
        <View style={{flex:1,backgroundColor:"red"}}>

      <Container>
        <Content>
          <Form>
            <Picker
              mode="dropdown"
              iosHeader="Select your SIM"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Select Student Grade" value="studentgrade" /> 
              <Picker.Item label="Student Grade A+" value="A+" />
              <Picker.Item label="Student Grade A" value="A" />
              <Picker.Item label="Student Grade B" value="B" />
              <Picker.Item label="Student Grade C" value="C" />

            </Picker>
          </Form>
        </Content>
      </Container>

                    <View style={{flex:9,backgroundColor:"lightgrey"}}>
                    {
                    this.props.users.length>0 ? this.state.filteredusers.map((e,i)=>{
        
                        //e.uid !== this.props.current_user.uid to display user other than you
                        return e.uid !==this.props.current_user.uid && <View onStartShouldSetResponder={() => this.props.navigation.navigate("StudentDetails",{
                            current_user:this.props.current_user,
                            user:e
                        })}
        
        
                        key={i} style={{flexDirection:"row"}}>
                    <Image style={{width:50,height:50,margin:10,borderRadius:50,alignSelf:"center"}} source={{uri:e.profile}}/>
                    <View style={{alignSelf:"center"}}>
                    <Text style={{marginLeft:20,marginBottom:3,fontSize:17}}>{e.name}</Text>
                    
                    <View style={{flexDirection:"row"}}>
                        
                    <Text style={{marginLeft:20,fontSize:17,color:"#686868",alignSelf:"center"}}>Grade: {e.grade}</Text>
                  
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
    personalinformation:state.personalinformation
 })

export default connect(mapStateToProps,null)(FindStudents)


