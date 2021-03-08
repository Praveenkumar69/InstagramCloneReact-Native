import React,{useState,useEffect} from 'react'
import { View, Text,FlatList,TextInput,Button } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'

export default function Comment() {
    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState("")
    const [text, setText] = useState("")

    useEffect(() => {
        
    }, [props.route.params.postId])

    return (
        <View>
            
        </View>
    )
}
