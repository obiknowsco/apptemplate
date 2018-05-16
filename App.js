import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Container, Content } from "native-base";
import  Swiper  from "react-native-swiper";

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Swiper>
            <View>
              <Text>Chat</Text>
            </View>
            <View>
              <Text>Camera</Text>
            </View>
            <View>
              <Text>Stories</Text>
            </View>
          </Swiper>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
