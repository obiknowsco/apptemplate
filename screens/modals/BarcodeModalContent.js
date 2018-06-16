import React from "react";
import {
  View, StyleSheet,
  ImageBackground, TouchableOpacity,
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



export default class BarcodeModalContent extends React.Component {
  
  // initial camera state
  constructor() {
    super();

    // this.state = {
    //   hasCameraPermissions: null,
    //   photosTaken: 0,
    //   lastScannedUrl: null,
    // };

  }

  // component Life cycle method
  componentDidUpdate(prevProps) {
    // on props Update, check the barcodeType & barcode
    console.log(typeof this.props.barcodeType);
    console.log(this.props.barcodeType);
  }


  render() {

    // Camera/Crop OCR Reading Modal Content
    return <View style={{ flex: 1 }}>
        {/* Modal Header */}
        <View style={{ margin: 5 }}>
          <Text style={styles.modalText}>I am the Bar Code Modal Title</Text>
          <Text style={styles.modalText}>{this.props.barcodeType}</Text>
          <Text style={styles.modalText}>{this.props.barcode}</Text>
        </View>

        {/*  */}
        {/* <TouchableOpacity style={{ marginBottom: 10 }} onPress={this._onPhotoTouch}>
          <ImageBackground style={{ height: 250 }} source={{ uri: img }}>
            <Text style={{ flex:1, color:'white', alignItems: 'center', justifyContent:'center' }}>Tap twice to crop </Text>
          </ImageBackground>
        </TouchableOpacity> */}

        {/* Control Buttons */}
        {/* <Button block danger onPress={this._onPhotoTouch} style={{ marginBottom: 5 }}>
          <Text>Crop</Text>
        </Button> */}
        <Button block success style={{ marginBottom: 5 }}>
          <Text>Search</Text>
        </Button>
        <Button block danger style={{ marginBottom: 5 }}>
          <Text>Retake</Text>
        </Button>
      </View>;
  }
  
  // checks the barcode format to search the appropriate API
  _checkBarcodeFormat (format) {
    console.log(typeof format);
    console.log(format);
    

    // if (format == ) {
      
    // } else {

    // }
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
BarcodeModalContent.propTypes = {
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
  barcodeModal: {
    justifyContent: "center",
    alignItems: "center"
  }
});
