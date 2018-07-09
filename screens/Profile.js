import React, { Component, View, Text, StyleSheet } from "react";
import {
  Container,
  Header,
  Body,
  Footer,
  FooterTab,
  Button,
  Title,
  Content
} from "native-base";

// Grid UI Lib
import { Col, Row, Grid } from "react-native-easy-grid";

export default class Profile extends Component {
  render() {
    return <Container>
        <Header>
          <Body>
            <Title >
              My Facts Profile
            </Title>
          </Body>
        </Header>

        <Grid>
          <Row style={{ backgroundColor: "green" }} size={4} />
          <Row style={{ backgroundColor: "#635DB7" }} size={2} />
          <Row style={{ backgroundColor: "#00CE9F" }} size={2} />
          <Row style={{ backgroundColor: "red" }} size={1} />
        </Grid>
      </Container>;
  }
}
