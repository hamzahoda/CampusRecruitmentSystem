import React,{Component} from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
 
class AdminDashboard extends Component{
       render(){
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Text style={{fontSize:28,color:"#000000",textShadowColor:"black", textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 5}}>Hi  Admin</Text>
          <TouchableOpacity activeOpacity={0.8}
             style={{
                    justifyContent:"center",
                    width: "50%",
                    height:"6%",
                    borderRadius: 20,
                    margin: 25,
                    backgroundColor: "#b30753",
             }} 
             onPress={() =>this.props.navigation.navigate("AllStudents")} 
             > 
             <Text style={{fontSize:16,color:"white",textAlign:"center",justifyContent:"center"}}>Students</Text> 
             </TouchableOpacity> 

             <TouchableOpacity activeOpacity={0.8}
             style={{
                    justifyContent:"center",
                    width: "50%",
                    height:"6%",
                    borderRadius: 20,
                    margin: 25,
                    backgroundColor: "#b30753",
             }} 
             onPress={() =>this.props.navigation.navigate("AllCompanies")} 
             > 
             <Text style={{fontSize:16,color:"white",textAlign:"center",justifyContent:"center"}}>Companies</Text> 
             </TouchableOpacity>

             {/* <TouchableOpacity activeOpacity={0.8}
             style={{
                    justifyContent:"center",
                    width: "50%",
                    height:"6%",
                    borderRadius: 20,
                    margin: 25,
                    backgroundColor: "purple",
             }} 
             onPress={() =>this.props.navigation.navigate("DonateBlood")} 
             > 
             <Text style={{fontSize:16,color:"white",textAlign:"center",justifyContent:"center"}}>Find Vacancy</Text> 
             </TouchableOpacity>  */}



             
        </View>
}
}


const mapStateToProps=(state) => ({
       current_user:state.current_user,
       personalinformation:state.personalinformation,
       companypersonalinformation:state.companypersonalinformation
     })
     

export default connect(mapStateToProps,null)(AdminDashboard)
