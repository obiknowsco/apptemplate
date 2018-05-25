import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Container, Content } from "native-base";
import  Swiper  from "react-native-swiper";

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
  }

  verticalScroll = (index) => {
    if(index != 1){
      this.setState({outerScrollEnabled:false})
    } else {
      this.setState({outerScrollEnabled:true})
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <Swiper loop={false} showsPagination={false} index={1}>
            <View style={{ flex: 1 }}>
              <FactRecords />
            </View>

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

            <View style={{ flex: 1 }}>
              <Trending />
              {/* <Text style={styles.text}>Trending & Nearby</Text>
              <Text style={styles.subtext}>Kobo Earned</Text> */}
            </View>
          </Swiper>
        </Content>
      </Container>)
  }
}

