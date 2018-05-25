import React, { Component, View, Text, StyleSheet } from "react";
import { Container, Header, Body, Title, Content } from "native-base";

// Grid UI Lib
import { Col, Row, Grid } from "react-native-easy-grid";


export default class TrendingAndRecent extends Component {
  render() {
    return <Container>

        <Header >
          <Body>
            <Title style={{}}>Trending & Recent</Title>
          </Body>
        </Header>

        <Grid>
          <Col style={{ backgroundColor: "#635DB7", height: 400 }} />
          <Col style={{ backgroundColor: "#00CE9F", height: 200 }} />
        </Grid>

      </Container>;
  }
}
