import React from "react";
import {
  View, StyleSheet,
  Image, TouchableOpacity,
  Alert, 
  // Linking,
  // Dimensions,
} from "react-native";

// Easy Grid UI Lib
import { Col, Row, Grid } from "react-native-easy-grid";

// For Prop Type Checking
import PropTypes from "prop-types";

import { Button, Text } from "native-base";
// import { Octicons } from "@expo/vector-icons";



export default class CameraModalContent extends React.Component {
  // initial camera state
  constructor() {
    super();
    // this.state = {
    //   hasCameraPermissions: null,
    //   photosTaken: 0,
    //   lastScannedUrl: null,
    // };
  }


  render() {
    const img = this.props.image;

    // Camera/Crop OCR Reading Modal Content
    return <View style={{ flex: 1 }}>
        {/* Modal Header */}

        <View style={{ margin: 5 }}>
          <Text style={styles.modalText}>I am the Camera Modal Title</Text>
        </View>

        <TouchableOpacity style={{ marginBottom: 10 }} onPress={this._onPhotoTouch}>
          <Image style={{ height: 250 }} source={{ uri: img }} />
        </TouchableOpacity>

        {/* Buttons */}
        <Button block danger onPress={this._onPhotoTouch} style={{ marginBottom: 5 }}>
          <Text>Crop</Text>
        </Button>
        <Button block success style={{ marginBottom: 5 }}>
          <Text>Send</Text>
        </Button>
      </View>;
  }
 
  _onPhotoTouch = () => {
    Alert.alert(
      "Crop/Edit Params",
      "We gon replace this w/ a crop edit screen",
      [
        {
          text: "Save",
          onPress: () => console.log("Save for later pressed")
        },
        { text: "Edit", onPress: () => this.refs.cameraModal.open() },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  }
}

//
CameraModalContent.propTypes = {
  image: PropTypes.string,
};

// Styles and UI
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
