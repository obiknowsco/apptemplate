import React from "react";
import { 
  View, Text, StyleSheet,
  LayoutAnimation,
  Alert, Image,
  Linking,
  Dimensions,
  StatusBar, Vibration,
  TouchableOpacity,
} from "react-native";

import { FileSystem, Camera, BarCodeScanner, Permissions } from "expo";

import { Container, Content, Header, Left, Right, Body, Title, Item, Input, Button } from "native-base";
import { Octicons } from "@expo/vector-icons";

// UI Components
// import Modal from "react-native-modal";  /* old shit */
import Modal from "react-native-modalbox";

// Modals
import CameraModalContent from "./modals/CameraModalContent";
import BarcodeModalContent from "./modals/BarcodeModalContent";


export default class CameraComponent extends React.Component {

  // initial camera state
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      whichCamera: Camera.Constants.Type.back,
      photosTaken: 0,
      lastScannedUrl: null,
      lastTakenPhoto: null,
      barCodeScanned: {
        type: null,
        data: null,
      }
    }

  }

  // Ask for Camera Permission on component loading
  async componentWillMount(){
    // HOW TO ASK FOR PERMISSIONS!! //
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    // if user said yes, set the state
    this.setState({hasCameraPermissions: status === 'granted'})

  }
  
  // filesystem funcs
  handleBarCodeRead = result => {
    // on barcode read, check if this is the same barcode as before 
    if (result.data !== this.state.lastScannedUrl) {
      
      // Set Barcode Data
      this.setState({ barCodeScanned: {
        type: result.type,
        data: result.data
      }});

      // Open the Bar Code Modal
      this.refs.barcodeModal.open();

      // save the data 

      // LayoutAnimation.spring();
      this.setState({ lastScannedUrl: result.data });
    }
  };

  scanBarCode = async function() {
    if (this.camera) {
      // take the photo and trigger the 
      this.camera.takePictureAsync().then(data => {
        
        console.log('taking picture');
        console.log(`pic is saved at: ${data.uri}`)

        // Update photo, photo count, use this to monetize == guala biil$$$
        this.setState({ lastTakenPhoto: data.uri });
        this.setState({ photosTaken: this.state.photosTaken + 1 });

        FileSystem.getInfoAsync( data.uri, { 
          size: true, 
        }).then((result) => {
          console.log(`Result: ${result}`);
          
          Vibration.vibrate();

        }).then(() => {

          console.log(`...loading. Pic is still at: ${data.uri}`);

          // then open the camera modal
          this.refs.cameraModal.open();


          // replace this with a modal 
          // Alert.alert(
          //   "Camera Alert Title",
          //   "We gon replace this w/ a sexy ass custom modal",
          //   [
          //     {
          //       text: "Save",
          //       onPress: () => console.log("Save for later pressed")
          //     },
          //     { text: "Edit", onPress: () => this.refs.cameraModal.open() },
          //     {
          //       text: "Cancel",
          //       onPress: () => console.log("Cancel Pressed"),
          //       style: "cancel"
          //     },
          //   ],
          //   { cancelable: false }
          // );

        }).catch((error) => {
          // something happened
          console.log('There was an error taking a picture');
          console.log(`The Error: ${error}`);
          
        });
      });
    }
  };
  
  takePicture = async function() {
    if (this.camera) {
      // take the photo and trigger the 
      this.camera.takePictureAsync().then(data => {
        
        console.log('taking picture');
        console.log(`pic is saved at: ${data.uri}`)

        // Update photo, photo count, use this to monetize == guala biil$$$
        this.setState({ lastTakenPhoto: data.uri });
        this.setState({ photosTaken: this.state.photosTaken + 1 });

        FileSystem.getInfoAsync( data.uri, { 
          size: true, 
        }).then((result) => {
          console.log(`Result: ${result}`);
          
          Vibration.vibrate();

        }).then(() => {

          console.log(`...loading. Pic is still at: ${data.uri}`);

          // then open the camera modal
          this.refs.cameraModal.open();


          // replace this with a modal 
          // Alert.alert(
          //   "Camera Alert Title",
          //   "We gon replace this w/ a sexy ass custom modal",
          //   [
          //     {
          //       text: "Save",
          //       onPress: () => console.log("Save for later pressed")
          //     },
          //     { text: "Edit", onPress: () => this.refs.cameraModal.open() },
          //     {
          //       text: "Cancel",
          //       onPress: () => console.log("Cancel Pressed"),
          //       style: "cancel"
          //     },
          //   ],
          //   { cancelable: false }
          // );

        }).catch((error) => {
          // something happened
          console.log('There was an error taking a picture');
          console.log(`The Error: ${error}`);
          
        });
      });
    }
  };


  render() {

    // link  state vars as a constants
    const {hasCameraPermissions} = this.state
    const {whichCamera} = this.state
    const {barCodeScanned} = this.state

    if (hasCameraPermissions === null) {
      // if permissions no , show this 
      return ( <View> </View> )
    } else if(hasCameraPermissions === false) {
      // user didnt grant app permissions
      return ( <Text> No access to Camera</Text> )
    } else {
      // we got the OK! -> return the Camera
      return <View style={{ flex: 1, backgroundColor: "transparent" }}>
          <Camera ref={cam => {
              this.camera = cam;
            }} onBarCodeRead={this.handleBarCodeRead} style={styles.cameraView} type={whichCamera}>
            {/* Header */}
            <Header style={{ position: "absolute", justifyContent: "center", alignItems: "center", backgroundColor: "transparent", left: 0, top: 0, right: 0, borderBottomWidth: 0 }}>
              <Left>
                <Item style={{ justifyContent: "space-around" }}>
                  <Octicons name="search" style={{ color: "white", fontSize: 18, padding: 8, fontWeight: "bold", borderBottomWidth: 0 }} />
                  {/* <Input placeholder="enter a product name" placeholderTextColor="white" style={{ color: "white" }} /> */}
                </Item>
              </Left>
              <Body style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Image source={require("../assets/facts-logotype.png")} fadeDuration={0} style={{ height: 30, width: 110, backgroundColor: "white", padding: 10, borderRadius: 5 }} resizeMethod="resize" />
              </Body>
              <Right>
                <Item style={{ backgroundColor: "transparent", justifyContent: "space-around" }}>
                  <Octicons name="device-camera" style={{ color: "white", fontSize: 24, fontWeight: "bold" }} onPress={() => this._flipCamera()} />
                </Item>
              </Right>
            </Header>

            {/* Alt. Header */}
            {/* <Header noShadow searchBar rounded style={{ position: "absolute", justifyContent: "center", alignItems: "center", backgroundColor: "transparent", left: 0, top: 0, right: 0, zIndex: 100 }}> */}
            {/* Facts Bar Code Icon */}
            {/* <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-around" }}>
                <Item style={{ backgroundColor: "transparent" }}>
                  <Image source={require("../assets/barcode-icon.png")} fadeDuration={0} style={{ width: 28, height: 28 }} />
                </Item>
              </View> */}
            {/* Search Bar */}
            {/* <View style={{ flexDirection: "row", flex: 6 }}>
                <Item style={{ justifyContent: "space-around", backgroundColor: "#708090" }}>
                  <Octicons name="search" style={{ color: "white", fontSize: 18, padding: 8, fontWeight: "bold" }} />
                  <Input placeholder="enter a product name" placeholderTextColor="white" style={{ color: "white" }} />
                </Item>
              </View> */}
            {/* Flip Camera Button */}
            {/* <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-around" }}>
                <Item style={{ backgroundColor: "transparent", justifyContent: "space-around" }}>
                  <Octicons name="device-camera" style={{ color: "white", fontSize: 24, fontWeight: "bold" }} onPress={() => this._flipCamera()} />
                </Item>
              </View> */}
            {/* </Header> */}

            {/* Bar Code Scanning Modal */}
            <View>
              <Modal ref={"barcodeModal"} position={"bottom"} swipeToClose={true} coverScreen={true} backdropPressToClose={true} style={[styles.modal, styles.barcodeModal]}>
                <BarcodeModalContent barcode={this.state.barCodeScanned.data} barcodeType={this.state.barCodeScanned.type} />
              </Modal>
              {/* <Modal ref={"barcodeModal"} position={"bottom"} swipeToClose={true} coverScreen={true} backdropPressToClose={true} style={[styles.modal, styles.barcodeModal]}>
                <Text style={styles.modalText}>
                  I am the Bar Code Modal
                  <Text>Type: {barCodeScanned.type}</Text>
                  <Text>UPC: {barCodeScanned.data}</Text>
                </Text>
              </Modal> */}
            </View>

            {/* Camera/Edit Modal */}
            <View>
              <Modal ref={"cameraModal"} position={"bottom"} swipeToClose={true} coverScreen={true} backdropPressToClose={true} style={[styles.modal, styles.cameraModal]}>
                <CameraModalContent image={this.state.lastTakenPhoto} />
              </Modal>
            </View>

            {/* Bottom Bar Icons */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, marginBottom: 15, alignItems: "flex-end" }}>
              {/* Bottom Left Button */}
              <Octicons name="book" style={{ color: "white", fontSize: 28 }} />
              {/* Center Take Picture Button */}
              <View style={{ alignItems: "center" }}>
                <Octicons name="screen-full" style={{ color: "white", fontSize: 88 }} onPress={() => {
                    // this.refs.cameraModal.open();
                    this.takePicture();
                  }} />
              </View>
              {/* Bottom Right Button */}
              <Octicons name="broadcast" style={{ color: "white", fontSize: 28 }} />
            </View>
          </Camera>
        </View>;
    }

  }

  // UX functions
  _flipCamera = () => {
    this.setState({
      whichCamera:
        this.state.whichCamera === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cameraView: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "transparent",
    justifyContent: "space-between"
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
    height: 420,
  },
  modalText: {
    fontSize: 24
  },
  cameraModal: {},
  barcodeModal: {},
});
