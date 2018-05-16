import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Camera, Permissions } from 'expo';

import { Container, Content, Header, Item, Input, Button } from "native-base";
import { Octicons } from "@expo/vector-icons";


export default class CameraComponent extends React.Component {


  state = {
    hasCameraPermissions: null,
    whichCamera: Camera.Constants.Type.back
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
    const {whichCamera} = this.state

    if (hasCameraPermissions === null) {
      return ( <View> </View> )
    } else if(hasCameraPermissions === false) {
      return ( <Text> No access to Camera</Text> )
    } else {
      // return the Camera
      return <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={whichCamera}>
            <Header searchBar rounded style={{ position: "absolute", alignItems: "center", backgroundColor: "transparent", left: 0, top: 0, right: 0, zIndex: 100 }}>
              <View style={{ flexDirection: "row", flex: 4 }}>
                <Item style={{ backgroundColor: "transparent" }}>
                  <Octicons name="bug" style={{ color: "white", fontSize: 24, fontWeight: "bold" }} />
                  <Octicons name="search" style={{ color: "white", fontSize: 24, fontWeight: "bold" }} />
                  <Input placeholder="Search" placeholderTextColor="white" />
                </Item>
              </View>
              <View style={{ flexDirection: "row", flex: 2, justifyContent: "space-around" }}>
                <Item style={{ backgroundColor: "transparent", justifyContent: "space-around" }}>
                  <Octicons name="screen-full" style={{ color: "white", fontSize: 24, fontWeight: "bold" }} />
                  <Octicons name="device-camera-video" style={{ color: "white", fontSize: 24, fontWeight: "bold" }} onPress={() => {
                      this.setState({
                        whichCamera:
                          this.state.whichCamera ===
                          Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                      });
                    }} />
                </Item>
              </View>
            </Header>
          </Camera>
        </View>;
    }

    return (
      <View style={styles.container}>
        <Text>Camera Component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cameraView:{
    position:'absolute', 
    backgroundColor:'transparent',
    left: 0,
    top: 0,
    right: 0,
    zIndex:100
  }
});
