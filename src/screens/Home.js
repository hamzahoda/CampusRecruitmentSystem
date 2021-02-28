import React,{Component} from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
 
class Home extends Component{
       render(){
           console.log(this.props)
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Text style={{fontSize:28,color:"#000000",textShadowColor:"black", textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 5}}>Hi  {this.props.current_user.name}</Text>
           {this.props.route.params === 'student'? <TouchableOpacity activeOpacity={0.8}
             style={{
                    justifyContent:"center",
                    width: "50%",
                    height:"6%",
                    borderRadius: 20,
                    margin: 25,
                    backgroundColor: "purple",
             }} 
             onPress={() =>this.props.navigation.navigate("JobPosting")} 
             > 
             <Text style={{fontSize:16,color:"white",textAlign:"center",justifyContent:"center"}}>Job Postings</Text> 
             </TouchableOpacity> :

             <TouchableOpacity activeOpacity={0.8}
             style={{
                    justifyContent:"center",
                    width: "50%",
                    height:"6%",
                    borderRadius: 20,
                    margin: 25,
                    backgroundColor: "#b30753",
             }} 
             onPress={() =>this.props.navigation.navigate("FindStudents")} 
             > 
             <Text style={{fontSize:16,color:"white",textAlign:"center",justifyContent:"center"}}>Find Students</Text> 
             </TouchableOpacity>}

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
       current_user:state.current_user
     })
     

export default connect(mapStateToProps,null)(Home)
