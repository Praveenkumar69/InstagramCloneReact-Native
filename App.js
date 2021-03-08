import React, { Component } from 'react'
import { Text, View } from 'react-native'

import Firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import {Provider} from 'react-redux'
// import thunk from 'react-thunk'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers'
const store = createStore(rootReducer, applyMiddleware(thunk));
const firebaseConfig = {
  apiKey: "AIzaSyB6rqHW2D7W2mnPkel_Nhdxkua9iJbba7M",
  authDomain: "instagram-demo-a6687.firebaseapp.com",
  projectId: "instagram-demo-a6687",
  storageBucket: "instagram-demo-a6687.appspot.com",
  messagingSenderId: "915478049445",
  appId: "1:915478049445:web:6fc4d4c6f9a567774f134c",
  measurementId: "G-8QNZ824C8J"
};
if (!Firebase.apps.length) {
  Firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
// import TestScreen from './components/auth/Test'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'
import CommentScreen from './components/main/Comment'

const Stack = createStackNavigator();

export class App extends Component {

  constructor(props) {
    super();
    this.state={
    loaded: true
      }
  }

  componentDidCatch(){
    auth().onAuthStateChanged((user) =>{
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true
        })
      }else{
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded} = this.state;
    if(!loaded){
      return(
        <View style={{flex:1, justifyContent:'center'}}> 
          <Text>Loading</Text>
        </View>
      )
    }
    // if(!loggedIn){
    //   return (
    //     <NavigationContainer>
    //       <Stack.Navigator initialRouteName="Landing">
    //         <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
    //         <Stack.Screen name="Register" component={RegisterScreen} />
    //         <Stack.Screen name="Login" component={LoginScreen} />
    //       </Stack.Navigator>
    //     </NavigationContainer>
  
    //   )
    // }

    return(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation} />
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation} />
            <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation} />
          </Stack.Navigator>
          </NavigationContainer>
      </Provider>
    )
  }
}

export default App
