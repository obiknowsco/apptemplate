import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Container, Content } from "native-base";
import  Swiper  from "react-native-swiper";

// components
import Camera from './components/Camera'
import PastScans from './components/PastScans'

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
    if(index !== 1){
      this.setState({outerScrollEnabled:false})
    } else {
      this.setState({outerScrollEnabled:true})
    }
  }

  render() {
    return <Container>
        <Content>
          <Swiper loop={false} showsPagination={false} index={1}>
            <View style={{ flex:1 }}>
              <PastScans />
            </View>

            <Swiper loop={false} horizontal={false} showsPagination={false} index={1} onIndexChanged={index => this.verticalScroll(index)}>
              <View style={styles.slideDefault}>
                <Text style={styles.text}>Profile & Settings</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Camera>
                  {/* Red Target HUD  */}
                  <View style={{ opacity: 0.3, backgroundColor: "red", height: 75, width: 150, justifyContent: "center", alignItems: "center" }} />
                </Camera>
              </View>
            </Swiper>

            <View style={styles.slideDefault}>
              <Text style={styles.text}>Stories & Trends</Text>
              <Text style={styles.subtext}>Kobo Earned</Text>
            </View>
          </Swiper>
        </Content>
      </Container>;
  }
}

