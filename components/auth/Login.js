import React, { Component } from 'react'
import { View, TextInput, Button } from 'react-native'
import auth from '@react-native-firebase/auth'
export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp(){
        const {email, password} = this.state;
        auth().signInWithEmailAndPassword(email, password)
        .then((result)=>{
            console.warn(result)
        })
        .catch((error)=>{
            console.warn(error)
        })
    }
    render() {
        return (
            <View>
                <TextInput
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                <Button 
                  onPress={() => this.onSignUp()}
                  title='Sign In'
                />
            </View>
        )
    }
}

