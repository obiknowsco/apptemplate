import React from "react";
import {
  // FileSystem,
  View,
  Text,
  StyleSheet,
  // Image,
  // Linking,
  // Dimensions,
} from "react-native";


// import { Container, Content, Header, Item, Input, Button } from "native-base";
// import { Octicons } from "@expo/vector-icons";

// UI Components
// import Modal from "react-native-modal";
// import Modal from "react-native-modalbox";


export default class CameraModalContent extends React.Component {
  // initial camera state
  constructor() {
    super();
    // this.state = {
    //   hasCameraPermissions: null,
    //   whichCamera: Camera.Constants.Type.back,
    //   photosTaken: 0,
    //   lastScannedUrl: null,
    //   barCodeScanned: {
    //     type: null,
    //     data: null
    //   }
    // };
  }


  render() {

    return (// Camera/Crop OCR Reading Modal Content
      <View style={{ flex: 1, backgroundColor: "red" }}>
        {/* Modal Header */}

        <View style={{}}>
          <Text style={styles.modalText}>
            I am the Camera Modal Content
          </Text>
        </View>
      </View>
    )
  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    height: 350
  },
  modalText: {
    fontSize: 24
  },
  cameraModal: {}
});
