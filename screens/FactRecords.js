import React, { Component } from "react";
import { Image } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Body,
  Text,
  Tab,
  Tabs,
  ScrollableTab,
} from "native-base";

// Tab Screens
import Tab1 from './_factrecords/Tab1'  // Scan Stats Tab
import Tab2 from './_factrecords/Tab2'  // Past Scans Tab 
// import Tab3 from './_factrecords/Tab3'  // free.. for now

// Icons
import { Octicons } from "@expo/vector-icons";

export default class FactRecords extends Component {
  render() {
    return <Container>
        <Header hasTabs>
          <Body>
            <Title style={{}}>Tha' Facts Records</Title>
          </Body>
        </Header>

        {/* Tab Screens */}
        <Tabs initialPage={1} tabBarUnderlineStyle={{ backgroundColor: "#FAACAB" }} activeTextStyle={{ backgroundColor: "#FAACAB" }}>
          {/* Tab 1 */}
          <Tab heading={<ScrollableTab activeTabStyle={{ color: "#FAACAB" }}>
                <Octicons name="graph" style={{ color: "black", fontSize: 26, fontWeight: "bold", marginLeft: 10 }} />
                <Text>Scan Stats</Text>
              </ScrollableTab>}>
            <Tab1 />
          </Tab>
          {/*  Tab 2 */}
          <Tab heading={<ScrollableTab>
                <Octicons name="screen-normal" style={{ color: "black", fontSize: 26, fontWeight: "bold", marginLeft: 10 }} />
                <Text>Past Scans</Text>
              </ScrollableTab>}>
            <Tab2 />
          </Tab>

          {/* <Tab heading={<ScrollableTab>
                <Octicons name="screen-normal" />
              </ScrollableTab>}>
            <Tab3 />
          </Tab> */}
        </Tabs>
      </Container>;
  }
}
