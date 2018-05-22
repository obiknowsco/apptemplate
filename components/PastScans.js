import React, { Component } from "react";
import { Image } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Body,
  Left,
  Right,
  Icon,
  Text
} from "native-base";

export default class PastScans extends Component {
  render() {
    return <Container>
        <Header>
          <Body>
            <Title>Past Scans</Title>
          </Body>
        </Header>
        <Content>
          <Text>This is Content Section</Text>

          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: "https://images.pexels.com/photos/753267/pexels-photo-753267.jpeg?auto=compress&cs=tinysrgb&h=350" }} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{ uri: "https://images.pexels.com/photos/753267/pexels-photo-753267.jpeg?auto=compress&cs=tinysrgb&h=350" }} style={{ height: 200, width: null, flex: 1 }} />
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>;
  }
}
