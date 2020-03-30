import React, { Component } from "react";
import { Button } from 'react-native-elements';


import Emoji from "react-native-emoji";
import { TouchableOpacity } from "react-native";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert
} from "react-native";

import {AsyncStorage} from 'react-native';
// require the module
//var RNFS = require('react-native-fs');


// get a list of files and directories in the main bundle

class Openglava extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      openedglavv:[],
      points:0
    }
  }
  componentDidMount(){
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
    AsyncStorage.getItem("openedglavs").then(value => {
      if (value == null){
        AsyncStorage.setItem("openedglavs", JSON.stringify({"glavs":[]}));

      }
      else{
        data = JSON.parse(value)
        this.state.openedglavv = data["glavs"]
        this.setState({state:this.state});
      }
    })
  }
  getday(numb) {
    return parseInt(numb / (60 * 60 * 24));
  }
  alerthap(val){
    Alert.alert(
    'Открыть главу?',
    'Глава будет доступна для чтения в течении суток, после этого она будет снова недоступна.',
    [
      {text: 'Да', onPress: () =>  {
        AsyncStorage.getItem("points").then(value => {
          if (parseInt(value) >= 2){
            AsyncStorage.setItem("points",(parseInt(value)-2).toString())
            this.state.openedglavv.push([val,Math.round(new Date().getTime() / 1000)]);
            AsyncStorage.setItem("openedglavs", JSON.stringify({"glavs":this.state.openedglavv}));
            this.setState({state:this.state});
          }
          else{
            Alert.alert("Недостаточно баллов")
          }
        })
        }

      },

      {text: 'Нет'},
    ],
    {cancelable: false},
  );
  }
  createitem(d,typ){
    if (typ==1){
      return <View style={{marginRight:20,width:32,height:50}}><Text style={{lineHeight:30,fontSize: 18,color:"#F2E038"}}>{d}</Text></View>
    }
    else if (typ==2){
      return <View style={{marginRight:20,width:32,height:50}}><Text style={{lineHeight:30,fontSize: 18,color:"gray"}}>{d}</Text></View>
    }
    else{
      return <TouchableOpacity onPress={()=>this.alerthap(d)}><View style={{marginRight:20,width:32,height:50}}><Text style={{lineHeight:30,fontSize: 18}}>{d}</Text></View></TouchableOpacity>
    }
  }
  createitems(it, ld,mth,offset){
    rt = []
    for (var k = it;k<(it+7);k++){
      var flag = true;
      if (k <= ld){
        for (var l = 0;l<this.state.openedglavv.length;l++){
          if (this.state.openedglavv[l][0] == offset+k+1){
            rt.push(this.createitem(offset+k+1,1))
            flag = false;
            break
          }
        }

      if (flag){
          var date = Math.round(new Date().getTime() / 1000);
          var lasting = date - 1569999999;
          let day = this.getday(lasting);
          if (offset+k+1 >= day){
            rt.push(this.createitem(offset+k+1,2))
          }
          else{
            rt.push(this.createitem(offset+k+1,3))
          }
        }
      }
    }
    return rt
  }
  createcalendar(maxx, mth,offset){
    calendar = []
    for (var i = 0;i<5;i++){
      calendar.push(<View style={{ flexDirection: "row" }}>
        {this.createitems(i*7,maxx,mth,offset)}
      </View>)
    }

    return calendar
  }
  romanize (num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}
  createcalendars(){
    var maxxes = [29,27,30,29,30,29,30]
    toret = []
    summ = 0
    for (var i = 1;i<(maxxes.length+1);i++){
      toret.push(<Text style={{textAlign: 'center', fontSize:18,marginTop:20,marginBottom:25}}>{this.romanize(i)}</Text>)
      toret.push(<View style={{marginLeft:20}}>{this.createcalendar(maxxes[i-1], i, summ)}</View>)
      summ += maxxes[i-1]+1
    }
    return toret
  }
  render(){

    return (
        <ScrollView>
          
          <View style={{ flexDirection: "row", width:650}}>
            <View flex top left>
              <Text style={{fontSize: 38, marginTop:15,marginLeft:15}}>Открыть главу</Text>
            </View>
            <View flex top right>
              <Text style={{ marginTop:17,}}> {this.state.points}Б </Text>
            </View>
          </View>
          <Text style={{fontSize: 15,lineHeight: 24,marginTop:20,marginLeft:15}}>Описание, как работает эта фича. Нужно будет подумать, сколько баллов стоит одна глава и все такое. На самом деле, это не так важно, и я совершенно не уверен в таком виде этого раздела.</Text>

          {this.createcalendars()}
        </ScrollView>
    );
  }
}
//{this.state.get_id(this.state.data, day).text}
export default Openglava
