import React, { Component, View, Text, StyleSheet } from "react";
import { Container, Header, Content } from "native-base";
// install this.. 
// import { Col, Row, Grid } from "react-native-easy-grid";


export default class LayoutExample extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
        <View>
          <Text>Trending things </Text>
        </View>
          {/* <Grid>
            <Col style={{ backgroundColor: "#635DB7", height: 200 }} />
            <Col style={{ backgroundColor: "#00CE9F", height: 200 }} />
          </Grid> */}
        </Content>
      </Container>
    );
  }
}
