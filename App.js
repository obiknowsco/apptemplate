/*
  The Facts App Entry Point
*/

// React Libs
import React from "react";
import { StyleSheet, Text, View } from "react-native";

// 3rd Party Libs
import { Container, Content } from "native-base";
import  Swiper  from "react-native-swiper";

// Utils
import './util/storage.js' // add storage backend

// screens
import Camera from './screens/Camera'
import FactRecords from './screens/FactRecords'
import Trending from './screens/Trending'
import Profile from './screens/Profile'

const styles = StyleSheet.create({
  slideDefault: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#9DD6EB'
  },
  text:{
    color:'white',
    fontSize:30,
    fontWeight:'bold',
  },
  subtext:{
    color:'green',
    fontSize:22,
    fontWeight:'bold',
  }
})

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      outerScrollEnabled: true
    }

    // test for global storage
    // global.storage.save({
    //   key: "test", 
    //   data: { 
    //     id: "1",  // Note: Do not use underscore("_") in key!
    //     codeType: "UPC", 
    //     code: "044000028541", 
    //     info: { name: "Oreo Double Stuff Chocolate Sandwich Cookie", url: "https://www.amazon.com/Oreo-Double-Chocolate-Sandwich-15-35-Ounce/dp/B005CV7W58", img: "https://images-na.ssl-images-amazon.com/images/I/512KxbIWvPL.SX500_SY384_CR,0,0,500,384_PIbundle-4,TopRight,0,0_SX500_SY384_CR,0,0,500,384_SH20_.jpg" } 
    //   }
    // });

  }

  verticalScroll = (index) => {
    if(index == 0){
      // then we're at top, set outerScroll to false
      // console.log('V. Index: ', index);
      this.setState({ outerScrollEnabled: false });
      // console.log('scroll is now OFF');
      // console.log(this.state);
    } else {
      // console.log('V. Index: ', index);
      this.setState({ outerScrollEnabled: true });
      // console.log('scroll is now ON');
      // console.log(this.state);
    }
  }

  render() {
    return <Container>
        <Content>
          <Swiper scrollEnabled={this.state.outerScrollEnabled} loop={false} showsPagination={false} index={1}>
            {/* Left Swipe to Profile/Stats  */}
            <View style={{ flex: 1 }}>
              <FactRecords />
            </View>

            {/* Up/Down Swipe (camera & how to use section) */}
            <Swiper loop={false} horizontal={false} showsPagination={false} index={1} onIndexChanged={index => this.verticalScroll(index)}>
              <View style={{ flex: 1 }}>
                <Profile />
                {/* <Text style={styles.text}>Profile & Settings</Text> */}
              </View>

              <View style={{ flex: 1 }}>
                <Camera>
                  {/* Red Target HUD  */}
                  <View style={{ opacity: 0.3, backgroundColor: "red", height: 75, width: 150, justifyContent: "center", alignItems: "center" }} />
                </Camera>
              </View>
            </Swiper>

            {/* Right Swipe to Social/Explore/Trending */} 
            <View style={{ flex: 1 }}>
              <Trending />
            </View>
          </Swiper>
        </Content>
      </Container>;
  }
}

