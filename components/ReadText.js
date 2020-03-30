import React, { Component } from "react";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import Emoji from "react-native-emoji";
import { YellowBox } from "react-native";
import { TouchableOpacity } from "react-native";
import LinksStack from "../navigation/MainTabNavigator";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert
} from "react-native";
var maindata = require("./data.json")
import {AsyncStorage} from 'react-native';
// require the module
//var RNFS = require('react-native-fs');


// get a list of files and directories in the main bundle

class ReadText extends React.Component {
  constructor(props){
    super(props)

    this.state = {styles:StyleSheet.create({
      titl: {
        height: 46,
        left: 20,
        top: 40,
        fontFamily: "New York Medium",
        fontSize: 38,
        lineHeight: 45,
      },
      textstyle:{
        width: 344,
        left: 20,
        top: 100,
        lineHeight: 33,
      },
      backgroundclr:{
        backgroundColor:'white'
      }

    }),
    get_id: (arr,day)=>{return arr[parseInt(day) - 1]},
    selected:-1,
    fontcoloror:"black",
    fonsizevalue:17,
  }
}
  componentDidMount(){
    AsyncStorage.getItem("fontSize").then(value => {
      if (value == null){
        AsyncStorage.setItem("fontSize", "17");
        this.state.fonsizevalue = 17
        this.setState({state:this.state});
      }
      else{
        this.state.fonsizevalue = parseInt(value);
        this.setState({state:this.state});
      }
    })

    AsyncStorage.getItem("background").then(value => {
      if (value == null){

        this.state.styles.backgroundclr = {backgroundColor: "#f6f6f6"}
        AsyncStorage.setItem("background", "0");
        this.setState({state:this.state});
      }
      else{

        var clrs = ["white","#ECECEC","#DCCEA2","#2E2D2A"]
        if (parseInt(value) == 3){
          //Alert.alert("hihello")
          this.state.fontcoloror = "white"
        }
        else{
          this.state.fontcoloror = "black"
        }

        this.state.styles.backgroundclr = {backgroundColor: clrs[parseInt(value)]}
        this.setState({state:this.state});

      }
    })
    setInterval(() => this.reload(), 5000);
  }
  handleScroll (event: Object) {


  }
  alotofspaces(n){
    return "\n".repeat(n)
  }
  getbtn(num){
    var smiles = ["smile","thinking_face","smile","thinking_face"]
    if (num == this.state.selected){
      var clr = "blue"
    }
    else{
      var clr = "white"
    }
    return (
      <TouchableOpacity onPress={()=>{this.state.selected=num;this.setState({state:this.state})}}>
      <Card containerStyle={[{borderRadius: 10,backgroundColor:clr}, {paddingTop:3,marginRight:5,marginLeft:10,elevation:0,paddingBottom:3, paddingLeft:18, paddingRight:18,shadowColor: 'rgba(0,0,0, .2)',shadowOffset: { height: 0, width: 0 },shadowOpacity: 0, shadowRadius: 0}]}>
        <Emoji
          name={smiles[num]}
          style={{ fontSize: 30 }}
        />
      </Card>
    </TouchableOpacity>
    )
  }
  reload(){
    AsyncStorage.getItem("fontSize").then(value => {
      if (value == null){
        AsyncStorage.setItem("fontSize", "17");
        this.state.fonsizevalue = 17
        this.setState({state:this.state});
      }
      else{

          this.state.fonsizevalue = parseInt(value);
          this.setState({state:this.state});

      }
    })
    AsyncStorage.getItem("background").then(value => {
      if (value == null){

        this.state.styles.backgroundclr = {backgroundColor: "#f6f6f6"}
        AsyncStorage.setItem("background", "0");
        this.setState({state:this.state});
      }
      else{

        var clrs = ["white","#ECECEC","#DCCEA2","#2E2D2A"]
        if (parseInt(value) == 3){
          //Alert.alert("hihello")
          this.state.fontcoloror = "white"
        }
        else{
          this.state.fontcoloror = "black"
        }

        this.state.styles.backgroundclr = {backgroundColor: clrs[parseInt(value)]}
        this.setState({state:this.state});

      }
    })
  }
  genbtns(){
    var btns = []
    for (var i = 0;i<4;i++){
      btns.push(<View>{this.getbtn(i)}</View>);
    }
    return btns;
  }
  getfontsize(){
    return this.state.fonsizevalue
  }
  getfontcolor(){
    return this.state.fontcoloror
  }
  render(){
    const { navigation } = this.props;
    const day = navigation.getParam('day', 'NO-ID');
    this.state.day = day
    return (
        <ScrollView style={this.state.styles.backgroundclr} onScroll={(e) => {
          var paddingToBottom = 10;
          paddingToBottom += e.nativeEvent.layoutMeasurement.height;
          if (
            e.nativeEvent.contentOffset.y >=
            e.nativeEvent.contentSize.height - paddingToBottom
          ) {
            AsyncStorage.getItem("read").then(value => {
              var parsed = JSON.parse(value);
              if ((parsed.read.includes(String(day))) == false){
                parsed.read.push(day);
                AsyncStorage.setItem("read", JSON.stringify(parsed))
              }
            })
          }
        }}>
          <Text style={[this.state.styles.titl,{color:this.getfontcolor()}]}>День {day}</Text>
          <Text style={[{fontSize:this.getfontsize(),color:this.getfontcolor()},this.state.styles.textstyle]}  selectable={true}>{maindata.data[day-1].datatext}</Text>

          <Text>{this.alotofspaces(5)}</Text>

        </ScrollView>
    );
  }
}
//{this.state.get_id(this.state.data, day).text}
export default ReadText
