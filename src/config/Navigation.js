// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login'
import Home from '../screens/Home'
import {Provider} from 'react-redux'
import store from '../store/index'
import FirstTimeUser from '../screens/FirstTimeUser'
import FindStudents from '../screens/FindStudents'
import StudentDetails from '../screens/StudentDetails';
import CompanyDetail from '../screens/CompanyDetail'
import JobPosting from '../screens/JobPosting';
import AdminDashboard from '../screens/AdminDashboard'
import AdminLogin from '../screens/AdminLogin'
import AllStudents from '../screens/AllStudents'
import CheckStudent from '../screens/CheckStudent'
import AllCompanies from '../screens/AllCompanies';
import CheckCompany from '../screens/CheckCompany';


const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}   options={{headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="FirstTimeUser" component={FirstTimeUser} />
        <Stack.Screen name="JobPosting" component={JobPosting} />
        <Stack.Screen name="FindStudents" component={FindStudents} />
        <Stack.Screen name="StudentDetails" component={StudentDetails} />
        <Stack.Screen name="CompanyDetail" component={CompanyDetail} />
        <Stack.Screen name="AdminLogin" component={AdminLogin}  options={{headerShown: false }} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="AllStudents" component={AllStudents} />
        <Stack.Screen name="CheckStudent" component={CheckStudent} />
        <Stack.Screen name="AllCompanies" component={AllCompanies} />
        <Stack.Screen name="CheckCompany" component={CheckCompany} />




      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;