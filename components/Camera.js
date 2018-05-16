import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Camera, Permissions } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default class CameraComponent extends React.Component {

  state = {
    hasCameraPermissions: null,
    cameraView: Camera.Constants.Type.back
  }

  async componentWillMount(){
    // HOW TO ASK FOR PERMISSIONS!! //
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    // if user said yes, set the state
    this.setState({hasCameraPermissions: status === 'granted'})
  }

  render() {

    // link the state hasCameraPermissions as a constant
    const {hasCameraPermissions} = this.state
    const {cameraView} = this.state

    if (hasCameraPermissions === null) {
      return ( <View> </View> )
    } else if(hasCameraPermissions === false) {
      return ( <Text> No access to Camera</Text> )
    } else {
      // return the Camera
      return ( <View style={{flex:1}}>
        <Camera style={{flex:1}} type={cameraView}/>
      </View> )
    }

    return (
      <View style={styles.container}>
        <Text>Camera Component</Text>
      </View>
    );
  }
}

