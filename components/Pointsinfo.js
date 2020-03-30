import React, { Component } from "react";
import { Button } from 'react-native-elements';

import { Card, ListItem, Icon } from "react-native-elements";
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

class Pointsinfo extends React.Component {
  constructor(props){
    super(props)

    this.state = {styles:StyleSheet.create({
      maintext: {
        marginTop:120,
        marginBottom:20,
        fontSize: 55,
        textAlign: 'center',
      },
      text:{
        marginLeft: 16,
        marginBottom:70,
        fontFamily: 'SF Pro Text',
        fontSize: 15,
        lineHeight: 24,
        color: 'rgba(0, 0, 0, 0.7)',
      },
      btn:{
        marginLeft:10,
        marginRight:10,
        marginBottom:5,
        borderRadius: 15,
      }
    }),
    points : 0
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
  navig(nav,str){
    nav(str)
  }
  componentDidMount(){
    this.update()
    setInterval(() => this.update(), 5000);
  }
  render(){
    const { navigate } = this.props.navigation;
    return (
        <ScrollView>
          <View>
            <Text style={this.state.styles.maintext}>{this.state.points} баллов</Text>
          </View>
          <Text style={{textAlign: 'center', marginBottom:75}}>Вы накопили</Text>
          <Text style={this.state.styles.text}>Краткий текст о том, на что можно будет тратить баллы и как их заработать. А сейчас я буду добивать количество знаков, чтобы это выглядело примерно так-же, как текст, который будет в итоге. Такие вот дела!</Text>
          <Button
            title="Отправить приглашение"
            type="solid"
            style={[this.state.styles.btn, {backgroundColor:"yellow"}]}
          />
            <Button
              onPress={()=>{this.navig(navigate,"Openglava")}}
            title="Открыть главу"
            type="solid"
            style={[this.state.styles.btn, {backgroundColor:"yellow"}]}
            />
        </ScrollView>
    );
  }
}
//{this.state.get_id(this.state.data, day).text}
export default Pointsinfo
