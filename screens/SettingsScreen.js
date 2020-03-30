import * as WebBrowser from "expo-web-browser";
import React from "react";
import {Dimensions, Slider } from "react-native";
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

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: StyleSheet.create({
        container: {
          flex: 1,
          paddingTop: 15,
          backgroundColor: '#fff',
        },
        backgroundclr: {
          backgroundColor: "#f6f6f6"
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
        circle: {
        width: 38,
        borderWidth: 0.3,
        borderColor: 'black',
        height: 38,
        borderRadius: 38/2,
        marginRight:7,

    },
    c0: {

    },
    c1: {

    },
    c2: {

    },
    c3: {

    },



      }),
       points:0
  }
}
  componentDidMount(){
    AsyncStorage.getItem("background").then(value => {
      if (value == null){
        this.state.styles.c0 = {
          borderWidth: 1.5,
          borderColor: '#007AFF',
        }
        AsyncStorage.setItem("background", "0");
        this.setState({state:this.state});
      }
      else{
        var clrs = ["white","#ECECEC","#DCCEA2","#2E2D2A"]
        this.state.styles["c"+value] = {
          borderWidth: 1.5,
          borderColor: '#007AFF',
        }
        this.setState({state:this.state});
      }
    })

    AsyncStorage.getItem("fontSize").then(value => {
      if (value == null){
        AsyncStorage.setItem("fontSize", "17");
        this.state.fonsizevalue = 7
        this.setState({state:this.state});
      }
      else{
        this.state.fonsizevalue = parseInt(value)-10;
        this.setState({state:this.state});
      }
    })
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
  changeclr(num){
    var clrs = ["white","#ECECEC","#DCCEA2","#2E2D2A"]
    AsyncStorage.setItem("background", num);
    for (var i = 0;i<4;i++){
      this.state.styles["c"+String(i)] = {

      }
    }
    this.state.styles["c"+num] = {
      borderWidth: 1.5,
      borderColor: '#007AFF',
    }
    this.state.styles.backgroundclr = {backgroundColor: clrs[parseInt(num)]}
    this.setState({state:this.state});
  }
  debug(nav,str){
    nav(str);
  }
  change(value) {
    AsyncStorage.setItem("fontSize", String(value+10));
  }
  render(){
    const { navigate } = this.props.navigation;
    const screenHeight = Math.round(Dimensions.get('window').height);
    const screenWidth = Math.round(Dimensions.get('window').width);
    return (
      <ScrollView style={{backgroundColor:"#ECECEC"}}>
        <View style={{ flexDirection: "row", width:650}}>
          <View flex top left>
            <Text style={this.state.styles.titl}>Настройки</Text>
          </View>
          <View flex top right>
            <TouchableOpacity onPress={() => {this.debug(navigate, "Pointsinfo")}}>
            <Text style={{ marginTop:17}}> {this.state.points}Б </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop:35}}>
          <View flex top left style={{position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',top: 10,
  marginLeft: 10}}>
            <Text style={{fontSize:15}}>A</Text>
          </View>
          <View >
            <Slider
              step={1}
              style={{width:screenWidth/1.25, marginLeft:screenWidth/12}}
              maximumValue={15}
              value={this.state.fonsizevalue}
              onValueChange={this.change.bind(this)}
            />
          </View>
          <View flex top right>
            <Text style={{position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10, fontSize:25}}>A</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop:35,marginBottom:20}}>
          <View style={{marginLeft:10}} flex top left>
            <Text style={{fontSize:18}}>Фон</Text>
          </View>
            <TouchableOpacity onPress={()=>{this.changeclr("0")}}>
              <View style={[this.state.styles.circle,this.state.styles.c0,{backgroundColor:"white"}]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.changeclr("1")}}>
              <View style={[this.state.styles.circle,this.state.styles.c1,{backgroundColor:"#ECECEC"}]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.changeclr("2")}}>
              <View style={[this.state.styles.circle,this.state.styles.c2,{backgroundColor:"#DCCEA2"}]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.changeclr("3")}}>
              <View style={[this.state.styles.circle,this.state.styles.c3,{backgroundColor:"#2E2D2A",marginRight:3}]} />
            </TouchableOpacity>
        </View>


      </ScrollView>
    );
  }

}
export default SettingsScreen;
