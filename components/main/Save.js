import React, { useState } from 'react'
import { View, TextInput, Image, Button } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'

// require('@react-native-firebase/firestore')

export default function Save(props) {
    // console.warn(props.route.params.image)
    const [caption, setCaption] = useState('')

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const childPath = `post/${auth().currentUser.uid}/${Math.random().toString(36)}`;

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = storage()
                    .ref()
                    .child(childPath)
                    .put(blob);
        const taskProgress = snapshot =>{
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        } 
        
        const taskCompleted = () =>{
            task.snapshot.ref.getDownloadURL().then((snapshot) =>{ 
                savePostData(snapshot)
                console.log(snapshot)

            })
        }
        
        const taskError = snapshot =>{
            console.log(snapshot)
        }

        task.on('state_changed', taskProgress,taskError,taskCompleted)
    }

    const savePostData = (downloadURL) => {
         firestore()
        .collection('posts')
        .doc(auth().currentUser.uid)
        .collection('userPosts')
        .add({
            downloadURL,
            caption,
            creation: firestore.FieldValue.serverTimestamp()
        }).then((function (){
            props.navigation.popToTop()
        }))
    }
    return (
        <View style={{ flex: 1 }}>
            <Image source={{ uri: props.route.params.image }} />
            <TextInput
                placeholder='Write a Caption . . . '
                onChangeText={(caption) => setCaption(caption)}
            />
            <Button title='Save' onPress={() => uploadImage()} />
        </View>
    )
}
