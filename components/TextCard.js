import React, { Component } from "react";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import Emoji from "react-native-emoji";
import {YellowBox} from 'react-native';
import { TouchableOpacity } from "react-native";
import LinksStack from "../navigation/MainTabNavigator";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
var maindata = require("./data.json")

export default function TextCard(props) {
  return (
    <TouchableOpacity onPress={() => debug(props)}>
      <Card containerStyle={styles.cardst} pointerEvents="none">
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.cardtitle}>День {props.day}</Text>
          </View>
          <View style={{ left: "300%" }}>
            <Emoji
              name={maindata.data[props.day-1].smile}
              style={{ fontSize: 40 }}
            />
          </View>
        </View>
        <Text
          style={[
            styles.cardtext,
            { height: maindata.data[props.day-1].text.length }
          ]}
        >
          {maindata.data[props.day-1].text}
        </Text>
      </Card>
    </TouchableOpacity>
  );
}
function get_id(arr, ind) {
  return arr[parseInt(ind) - 1];
}



function debug(props){
  props.navg("ReadText", {day:props.day})
}

const styles = StyleSheet.create({
  cardst: {
    left: "0%",
    right: "0%",
    top: "0%",
    bottom: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(0, 0, 0, 0.07)",
    borderRadius: 10
  },
  cardtitle: {
    left: 4,
    right: 20,
    top: 5,
    fontFamily: "New York Medium",
    fontSize: 28,
    lineHeight: 33,

  },
  cardtext: {
    left: 1,
    right: 4,
    top: 15,
    bottom: 5,
    fontFamily: "SF Pro Text",
    fontSize: 17,
    lineHeight: 24,

  }
});
