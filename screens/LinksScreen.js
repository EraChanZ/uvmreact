import * as WebBrowser from "expo-web-browser";
import React from "react";
import {Dimensions } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from "react-native";

import { MonoText } from "../components/StyledText";
import { AsyncStorage } from "react-native";
import TextCard from "../components/TextCard";

class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: StyleSheet.create({
        container: {
          flex: 1,
          paddingTop: 15,
          backgroundColor: '#fff',
        },
        titl: {
          left: "5%",
          right: "0%",
          top: "0%",
          bottom: "0%",
          fontFamily: "New York Medium",
          fontSize: "38px",
          lineHeight: "45px",
          background: "#201F1E"
        },
      }),
       points:0
  }
}
  update(){
    AsyncStorage.getItem("points").then(value => {
      if (value == null){
        this.state.points = 0;
        AsyncStorage.setItem("points", "0");
        this.setState({state:this.state});
      }
      else{
        if (parseInt(value) != this.state.points){
          this.state.points = parseInt(value);
          this.setState({state:this.state});
        }
      }
    })
  }
  componentDidMount(){
    setInterval(() => this.update(), 5000);
    AsyncStorage.getItem("points").then(value => {
      if (value == null){
        this.state.points = 0;
        AsyncStorage.setItem("points", "0");
        this.setState({state:this.state});
      }
      else{
        if (parseInt(value) != this.state.points){
          this.state.points = parseInt(value);
          this.setState({state:this.state});
        }
      }
    })
  }
  debug(nav,str){
    nav(str);
  }
  render(){
    const { navigate } = this.props.navigation;
    const screenHeight = Math.round(Dimensions.get('window').height);

    return (

      <ScrollView style={{backgroundColor: "#f6f6f6"}}>
        <View style={{ flexDirection: "row", width:650}}>
          <View flex top left>
            <Text style={this.state.styles.titl}>Цитаты</Text>
          </View>
          <View flex top right>
            <TouchableOpacity onPress={() => {this.debug(navigate, "Pointsinfo")}}>
            <Text style={{ marginTop:17}}> {this.state.points}Б </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height:screenHeight/1.4}}>
        <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
          <Text style={{fontSize: 25,lineHeight: 30,textAlign: "center",marginBottom:5}}>Здесь пока ничего нет!</Text>
          <Text style={{paddingLeft:30,paddingRight:30,lineHeight: 20, fontSize:12}}>Выделите текст, и нажмите кнопку «В избранное», чтобы добавить цитату </Text>
        </View>
      </View>
      </ScrollView>
    );
  }

}
export default LinksScreen;
