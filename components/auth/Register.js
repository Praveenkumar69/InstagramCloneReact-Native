import React, { Component } from 'react'
import { View, TextInput, Button } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
        }
        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp(){
        const {email, password, name} = this.state;
        auth().createUserWithEmailAndPassword(email, password)
        .then((result)=>{
            firestore().collection('users')
            .doc(auth().currentUser.uid)
            .set({
                name,
                email
            })
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
                    placeholder="name"
                    onChangeText={(name) => this.setState({ name })}
                />
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
                  title='Sign Up'
                />
            </View>
        )
    }
}
