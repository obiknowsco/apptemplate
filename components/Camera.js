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
// import Modal from "react-native-modal";
import Modal from "react-native-modalbox";



// Database

export default class CameraComponent extends React.Component {

  // initial camera state
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      whichCamera: Camera.Constants.Type.back,
      photosTaken: 0,
      lastScannedUrl: null,
      swipeToClose: true,
      isModalOpen: false,
      isCameraModalOpen: false,
      barCodeScanned: {
        type: null,
        data: null,
      }
    }

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
      
      // Set Barcode Data
      this.setState({ barCodeScanned: {
        type: result.type,
        data: result.data
      }});

      // Open the Bar Code Modal
      this.refs.barcodeModal.open();


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
    const {barCodeScanned} = this.state

    if (hasCameraPermissions === null) {
      return ( <View> </View> )
    } else if(hasCameraPermissions === false) {
      return ( <Text> No access to Camera</Text> )
    } else {
      // return the Camera
      return <View style={{ flex: 1 }}>
          <Camera onBarCodeRead={this.handleBarCodeRead} style={{ height: Dimensions.get("window").height, width: Dimensions.get("window").width, backgroundColor: "transparent", justifyContent: "space-between" }}>
            {/* Header */}
            <Header noShadow searchBar rounded style={{ position: "absolute", justifyContent: "center", alignItems: "center", backgroundColor: "transparent", left: 0, top: 0, right: 0, zIndex: 100 }}>
              <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-around" }}>
                <Item style={{ backgroundColor: "transparent" }}>
                  <Octicons name="beaker" style={{ color: "white", fontSize: 24, fontWeight: "bold" }} />
                </Item>
              </View>
              <View style={{ flexDirection: "row", flex: 6 }}>
                <Item style={{ justifyContent: "space-around" }}>
                  <Octicons name="search" style={{ color: "white", fontSize: 24, fontWeight: "bold", padding: 5 }} />
                  <Input placeholder="enter a product name" placeholderTextColor="black" />
                </Item>
              </View>
              <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-around" }}>
                <Item style={{ backgroundColor: "transparent", justifyContent: "space-around" }}>
                  <Octicons name="sync" style={{ color: "white", fontSize: 24, fontWeight: "bold" }} onPress={() => {
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
              <Modal ref={"barcodeModal"} position={"bottom"} swipeToClose={true} coverScreen={true} backdropPressToClose={true} style={[styles.modal, styles.barcodeModal]}>
                <Text style={styles.modalText}>
                  I am the Bar Code Modal
                  <Text>Type: {barCodeScanned.type}</Text>
                  <Text>UPC: {barCodeScanned.data}</Text>
                </Text>
              </Modal>
            </View>

            {/* Camera/Crop OCR Reading Modal */}
            <View>
              <Modal ref={"cameraModal"} position={"bottom"} swipeToClose={true} coverScreen={true} backdropPressToClose={true} style={[styles.modal, styles.cameraModal]}>
                <Text style={styles.modalText}>
                  I am the Camera Modal
                </Text>
              </Modal>
            </View>

            


            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, marginBottom: 15, alignItems: "flex-end" }}>
              <Octicons name="book" style={{ color: "white", fontSize: 28 }} />
              <View style={{ alignItems: "center" }}>
                <Octicons name="screen-full" style={{ color: "white", fontSize: 88 }} onPress={() => {
                    this.refs.cameraModal.open();
                    // this._toggleCameraModal();
                    // this.takePicture();
                  }} />
              </View>
              <Octicons name="broadcast" style={{ color: "white", fontSize: 28 }} />
            </View>
          </Camera>
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
  cameraView: {
    position: "absolute",
    backgroundColor: "transparent",
    left: 0,
    top: 0,
    right: 0,
    zIndex: 100
  },
  barCodeView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    zIndex: 200
  },
  wrapper: {
    paddingTop: 50,
    flex: 1
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    height: 350
  },
  modalText: {
    fontSize: 24
  },
  barcodeModal: {
  },
  cameraModal: {
  }
});
