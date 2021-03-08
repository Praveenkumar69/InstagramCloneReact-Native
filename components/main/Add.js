import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { launchImageLibrary} from 'react-native-image-picker';


export default function Add({ navigation }) {
  const [camp, setCamp] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(RNCamera.Constants.Type.back);


  const takePicture = async () => {
    if(camp){
    const data = await camp.takePictureAsync(null);
    setImage(data.uri);

    }
  }

  const pickImage = async () => {
    launchImageLibrary({title: "Pick an Image", maxWidth: 800, maxHeight: 600,mediaType:'photo',quality:1,}, result => {
      if (result.didCancel) {
        console.log("User cancelled!");
      } else if (result.error) {
        console.log("Error", result.error);
      } else if (!result.cancelled) {
        setImage(result.uri);
      }
    });
  }

  return (

    <View style={{flex:1}}>
      <View style={styles.cameraContainer}>
        <RNCamera 
        ref={ref => setCamp(ref)}
        style={styles.fixedRatio}
        type={type} 
        ratio={'1:1'}
        />
      </View>
      <Button
      title="Flip Image"
        onPress={() => {
          setType(
            type === RNCamera.Constants.Type.back
              ? RNCamera.Constants.Type.front
              : RNCamera.Constants.Type.back
          );
        }}>
      </Button>
      <Button title="Take Picture" onPress={() => takePicture()} />
      <Button title="Pick Image" onPress={() => pickImage()} />
      <Button title="Save" onPress={() => navigation.navigate('Save', {image})} />

      {image && <Image source={{uri: image}} style={{flex:1}} />}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex:1,
    flexDirection:'row'
  },
  fixedRatio: {
    flex:1,
    aspectRatio:1
  }
})