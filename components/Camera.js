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
import Modal from "react-native-modal";


// Database

export default class CameraComponent extends React.Component {

  // initial camera state
  state = {
    hasCameraPermissions: null,
    whichCamera: Camera.Constants.Type.back,
    photosTaken: 0,
    lastScannedUrl: null,
    isModalVisible: false,
    isCameraModalVisible: false,
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
      // Alert.alert('I cans Read!',`Data:${result.data} Type:${result.type}`,
      //   [
      //     {text: 'Save', onPress: () => 
      //       console.log('Save the code to the database')

      //     },
      //     {text: 'Search', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      //     {text: 'Clear', onPress: () => console.log('OK Pressed')},
      //   ],
      //   { cancelable: false }
      // );

      // Open the Bar Code Modal
      this._toggleBarCodeModal(result)



      // LayoutAnimation.spring();
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

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  _toggleBarCodeModal = (result) => {
    this.setState({ isModalVisible: !this.state.isModalVisible });

    
  }
  _toggleCameraModal = () => {
    this.setState({ isCameraModalVisible: !this.state.isCameraModalVisible });
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
            <Header noShadow searchBar rounded style={{ position: "absolute", justifyContent: "center", alignItems: "center", backgroundColor: "transparent", left: 0, top: 0, right: 0, zIndex: 100 }}>
              <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-around" }}>
                <Item style={{ backgroundColor: "transparent" }}>
                  <Octicons name="beaker" style={{ color: "white", fontSize: 24, fontWeight: "bold" }} />
                </Item>
              </View>
              <View style={{ flexDirection: "row", flex: 6 }}>
                <Item style={{ justifyContent: "space-around" }}>
                  <Octicons name="search" style={{ color: "white", fontSize: 24, fontWeight: "bold", padding: 5 }} />
                  <Input placeholder="Find A Fact" placeholderTextColor="white" />
                </Item>
              </View>
              <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-around" }}>
                <Item style={{ backgroundColor: "transparent", justifyContent: "space-around" }}>
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
            {/* Bar Code Scanning Modal */}
            <View>
              <Modal isVisible={this.state.isModalVisible} onSwipe={() => this.setState(
                    { isModalVisible: false }
                  )} swipeDirection="up" animationIn="slideInUp" animationOut="slideOutDown" hideModalContentWhileAnimating={false} onBackdropPress={this._toggleModal} style={{ flex: 1 / 2, justifyContent: "flex-end", bottom: 0 }}>
                <View style={{ flex: 1, backgroundColor: "white" }}>
                  <Text>Hello!</Text>
                  <Button style={{ justifyContent: "center", alignItems: "center" }} onPress={this._toggleModal}>
                    <Text>Hide me!</Text>
                  </Button>
                </View>
              </Modal>
            </View>
            {/* Camera/Crop OCR Reading Modal */}
            <View>
              <Modal 
                isVisible={this.state.isCameraModalVisible} 
                onSwipe={() => this.setState(
                  { isCameraModalVisible: false }
                )}
                swipeDirection="up"
                animationIn="slideInUp"
                animationOut="slideOutDown"
                hideModalContentWhileAnimating={false}
                onBackdropPress={this._toggleModal}
                style={{ flex: 1 / 2, justifyContent: "flex-end", height:300 }}
              >
                <View style={{ flex: 1, backgroundColor: "white" }}>
                  <Text>
                    Theres gonna be an img above me. I'll say: Scanning
                    Photo{" "}
                  </Text>
                  <Button style={{ justifyContent: "center", alignItems: "center" }} onPress={this._toggleCameraModal}>
                    <Text>Hide me!</Text>
                  </Button>
                </View>
              </Modal>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, marginBottom: 15, alignItems: "flex-end" }}>
              <Octicons name="book" style={{ color: "white", fontSize: 28 }} />
              <View style={{ alignItems: "center" }}>
                <Octicons name="screen-full" style={{ color: "white", fontSize: 88 }} onPress={() => {
                    this._toggleCameraModal();
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
