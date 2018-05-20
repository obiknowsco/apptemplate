import React from "react";
import { 
  FileSystem, 
  View, Text, StyleSheet,
  LayoutAnimation,
  Alert,
  Linking,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import { SQLite, Camera, BarCodeScanner, Permissions } from 'expo';

import { Container, Content, Header, Item, Input, Button } from "native-base";
import { Octicons } from "@expo/vector-icons";

// UI Components
import Card from "react-native-modal";


// Database

export default class CameraComponent extends React.Component {

  // initial camera state
  state = {
    hasCameraPermissions: null,
    whichCamera: Camera.Constants.Type.back,
    photosTaken: 0,
    lastScannedUrl: null,
    isCardVisible: false,
  }

  async componentWillMount(){
    // HOW TO ASK FOR PERMISSIONS!! //
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    // if user said yes, set the state
    this.setState({hasCameraPermissions: status === 'granted'})

  }
  

  // filesystem funcs
  handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      Alert.alert('I cans Read!',`Data:${result.data} Type:${result.type}`,
        [
          {text: 'Save', onPress: () => 
            console.log('Save the code to the database')

          },
          {text: 'Search', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Clear', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
      LayoutAnimation.spring();
      this.setState({ lastScannedUrl: result.data });
    }
  };

  takePicture = async function() {
    if (this.camera) {
      this.camera.takePictureAsync().then(data => {
          console.log('took a pic');
        FileSystem.moveAsync({ 
          from: data.uri, 
          to: `${FileSystem.cacheDirectory}/facts-photos/${this.state.photoId}.jpg`
        }).then(() => {
          this.setState({ photosTaken: this.state.photoId + 1 });
          Vibration.vibrate();
        });
      });
    }
  };

  _toggleCard = () => {
    this.setState({ isCardVisible: !this.state.isCardVisible });
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
          <BarCodeScanner onBarCodeRead={this.handleBarCodeRead} style={{ height: Dimensions.get("window").height, width: Dimensions.get("window").width, backgroundColor: "transparent", justifyContent: "space-between" }}>
            <Header searchBar rounded style={{ position: "absolute", alignItems: "center", backgroundColor: "transparent", left: 0, top: 0, right: 0, zIndex: 100 }}>
              <View style={{ flexDirection: "row", flex: 4 }}>
                <Item style={{ backgroundColor: "transparent" }}>
                  <Octicons name="bug" style={{ color: "white", fontSize: 24, fontWeight: "bold" }} />
                  <Octicons name="search" style={{ color: "white", fontSize: 24, fontWeight: "bold" }} />
                  <Input placeholder="research" placeholderTextColor="white" />
                </Item>
              </View>
              <View style={{ flexDirection: "row", flex: 2, justifyContent: "space-around" }}>
                <Item style={{ backgroundColor: "transparent", justifyContent: "space-around" }}>
                  <Octicons name="diff-modified" style={{ color: "white", fontSize: 24, fontWeight: "bold" }} />
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

            <View>
              <Card 
                isVisible={this.state.isCardVisible}
                onSwipe={() => this.setState({ isCardVisible: false })}
                swipeDirection="down"
                animationIn="slideInUp"
                animationOut="slideOutRight"
                style={{flex:1/2, justifyContent:'flex-end',}}
              >
                <View style={{ flex: 1, backgroundColor:'white' }}>
                  <Text>Hello!</Text>
                  <Button onPress={this._toggleCard}>
                    <Text>Hide me!</Text>
                  </Button>
                </View>
              </Card>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, marginBottom: 15, alignItems: "flex-end" }}>
              <Octicons name="beaker" style={{ color: "white", fontSize: 28 }} />
              <View style={{ alignItems: "center" }}>
                <Octicons 
                name="screen-full" 
                style={{ color: "white", fontSize: 88 }} 
                onPress={() => {
                    this._toggleCard();
                    // this.takePicture();
                  }} />
              </View>
              <Octicons name="broadcast" style={{ color: "white", fontSize: 28 }} />
            </View>
          </BarCodeScanner>
        </View>;
    }

  }

  // UX functions



  _handlePressUrl = () => {
      Alert.alert(
        "Open this URL?",
        this.state.lastScannedUrl,
        [
          {
            text: "Yes",
            onPress: () => Linking.openURL(this.state.lastScannedUrl)
          },
          { text: "No", onPress: () => {} }
        ],
        { cancellable: false }
      );
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={styles.urlText}>
            {this.state.lastScannedUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };
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
  },
  barCodeView:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'transparent',
    zIndex:200
  }
});
