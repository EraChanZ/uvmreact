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

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#f6f6f6"
        },

        titl: {
          left: "2%",
          right: "0%",
          top: "0%",
          bottom: "0%",
          fontFamily: "New York Medium",
          fontSize: "38px",
          lineHeight: "45px",
          background: "#201F1E"
        },
        time: {
          left: "0%",
          right: "0%",
          top: "0%",
          bottom: "8%",
          fontFamily: "SF Pro Text",
          fontSize: "35px",
          lineHeight: "35px",

          textAlign: "center",
          background: "#201F1E"
        },
        info: {
          top: "0%",
          fontFamily: "SF Pro Text",
          fontSize: "20px",
          lineHeight: "34px",
          textAlign: "center",
          background: "#201F1E"
        },
        starter: {
          left: "4.27%",
          right: "31.73%",
          top: "30.17%",
          bottom: "43.97%",
          fontFamily: "New York Medium",
          fontSize: "50px",
          lineHeight: "80%"
        },
        backgroundclr:{
          backgroundColor:"white"
        }

      }),
      ft: true,
      curdays: [],
      timeinfo: "00:00:00",
      missed:0,
      width:0,
      points:0,
      oppglavs:[]
    };
  }

  getday(numb) {
    return parseInt(numb / (60 * 60 * 24));
  }
  gethours(numb) {
    return parseInt(numb / (60 * 60));
  }
  getmins(numb) {
    return parseInt(numb / 60);
  }
  strmult(str, c) {
    if (str.length == 1) {
      return "0" + str;
    } else {
      return str;
    }
  }
  getcurdays() {

    var date = Math.round(new Date().getTime() / 1000);
    var lasting = date - 1584000000;
    let day = this.getday(lasting);
    let h = this.gethours(lasting);
    let m = this.getmins(lasting);
    let hours = 23 - (h - day * 24);
    let mins = 59 - (m - day * 24 * 60 - (h - day * 24) * 60);
    let seconds =
      59 -
      (lasting -
        day * 24 * 60 * 60 -
        (h - day * 24) * 60 * 60 -
        (m - day * 24 * 60 - (h - day * 24) * 60) * 60);
    this.state.timeinfo =
      this.strmult(hours.toString()) +
      ":" +
      this.strmult(mins.toString()) +
      ":" +
      this.strmult(seconds.toString());
    for (var i = day - 1; i <= day + 1; i += 1) {
      if (
        i >= 1 &&
        i <= 300 &&
        this.state.curdays.includes(i.toString()) == false
      ) {
        this.state.curdays.push(i.toString());
        if (this.state.curdays.length > 2) {
          this.state.curdays.shift();
        }
      }
    }
    this.setState(this.state);
  }
  update(){
    var date = Math.round(new Date().getTime() / 1000);
    var lasting = date - 1566988499;
    let day = this.getday(lasting);

    AsyncStorage.getItem("openedglavs").then(value => {
      if (value == null){
        AsyncStorage.setItem("openedglavs", JSON.stringify({"glavs":[]}));
      }
      else{
        data = JSON.parse(value)
        this.state.oppglavs = []
        for (var h = 0;h<data["glavs"].length;h++){
          if ((Math.round(new Date().getTime() / 1000) - data["glavs"][h][1]) < (24 * 60 * 60)){
            this.state.oppglavs.push(data["glavs"][h])
          }
        }
        this.setState({state:this.state})
        AsyncStorage.setItem("openedglavs", JSON.stringify({"glavs":this.state.oppglavs}));

      }
    })
    AsyncStorage.getItem("read").then(value => {
      var flag = false;
      if (value == null) {
        this.state.read = "0";
        AsyncStorage.setItem("read", JSON.stringify({"read":[]}));
        this.setState({state:this.state});
      } else {
        var nv = day - JSON.parse(value).read.length;
        var nv2 = JSON.parse(value).read.length.toString();
        if (nv != this.state.missed){
          this.state.missed = nv;
          flag = true;
        }
        if (nv2 != this.state.read){
          this.state.read = nv2;
          flag = true;
        }
        if (flag){
          this.setState({state:this.state});
        }
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
      AsyncStorage.getItem("lastdayopened").then(value => {
        var date = Math.round(new Date().getTime() / 1000);
        var lasting = date - 1569999999;
        let day = this.getday(lasting);
        if (value == null){
          this.state.points += 1
          AsyncStorage.setItem("points", this.state.points.toString());
          AsyncStorage.setItem("lastdayopened", day.toString());
          this.setState({state:this.state})
        }
        else{
          if (parseInt(value) < day){
            this.state.points += 1
            AsyncStorage.setItem("points", this.state.points.toString());
            AsyncStorage.setItem("lastdayopened", day.toString());
            this.setState({state:this.state})
          }
        }
      })
    })


  }
  alotofspaces() {
    return "\n".repeat(5);
  }
  createitems(navg) {
    var items = [];
    for (var i = this.state.curdays.length-1; i >= 0; i--) {
      items.push(<TextCard day={this.state.curdays[i]} navg={navg} />);
    }
    for (var i = 0; i < this.state.oppglavs.length; i++) {
      items.push(<TextCard day={this.state.oppglavs[i][0]} navg={navg} />);
    }
    return items;
  }

  debug(nav,str){
    nav(str);
  }

  componentDidMount() {

    AsyncStorage.getItem("openedglavs").then(value => {
      if (value == null){
        AsyncStorage.setItem("openedglavs", JSON.stringify({"glavs":[]}));
      }
      else{
        data = JSON.parse(value)
        this.state.oppglavs = []
        for (var h = 0;h<data["glavs"].length;h++){
          if ((Math.round(new Date().getTime() / 1000) - data["glavs"][h][1]) < (24 * 60 * 60)){
            this.state.oppglavs.push(data["glavs"][h])
          }
        }
        this.setState({state:this.state})
        AsyncStorage.setItem("openedglavs", JSON.stringify({"glavs":this.state.oppglavs}));

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
      AsyncStorage.getItem("lastdayopened").then(value => {
        var date = Math.round(new Date().getTime() / 1000);
        var lasting = date - 1569999999;
        let day = this.getday(lasting);
        if (value == null){
          this.state.points += 1
          AsyncStorage.setItem("points", this.state.points.toString());
          AsyncStorage.setItem("lastdayopened", day.toString());
          this.setState({state:this.state})
        }
        else{
          if (parseInt(value) < day){
            this.state.points += 1
            AsyncStorage.setItem("points", this.state.points.toString());
            AsyncStorage.setItem("lastdayopened", day.toString());
            this.setState({state:this.state})
          }
        }
      })
    })
    AsyncStorage.getItem("a").then(value => {
      if (value != null) {
        this.state.used = true;
        this.update();
        setInterval(() => this.getcurdays(), 1000);
        setInterval(() => this.update(), 5000);
      } else {
        this.state.used = false;
      }
    });
  }
  componentWillUnmount() {
    clearTimeout(this.state.timer);
  }
  render() {
    //var screenWidth = (Dimensions.get('window').width).toString();
    const { navigate } = this.props.navigation;
    var read;
    var missed;
    if ("read" in this.state) {
      read = this.state.read;
    } else {
      read = "loading";
    }

    var page = (
      <View>
        <View style={{ flexDirection: "row", width:650}}>
          <View flex top left>
            <Text style={this.state.styles.titl}> Главная </Text>
          </View>
          <View flex top right>
            <TouchableOpacity onPress={() => {this.debug(navigate, "Pointsinfo")}}>
            <Text style={{ marginTop:17,}}> {this.state.points}Б </Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.createitems(navigate)}
        <Button
        onPress={() => {
          this.debug(navigate,'Openglava')
        }}
        title="Открыть главу"
        type="solid"
        style={{backgroundColor:"yellow", marginLeft:20, marginRight:20,marginTop:50,marginBottom:20,borderRadius:4}}
        />
        <Text style={this.state.styles.time}>{this.state.timeinfo}</Text>
        <Text style={this.state.styles.info}>До новой главы</Text>
        <Text style={this.state.styles.time}>{read} из 365</Text>
        <Text style={this.state.styles.info}>Глав прочитано</Text>
        <Text style={this.state.styles.time}>{this.state.missed}</Text>
        <Text style={this.state.styles.info}>Глав пропущено</Text>
        <Text>{this.alotofspaces()}</Text>
      </View>
    );
    if ("used" in this.state) {
      if (this.state.used == true) {
        return (
          <ScrollView style={this.state.styles.container}>{page}</ScrollView>
        );
      } else {
        return (
          <ScrollView style={this.state.styles.container}>
            <TouchableOpacity
              onPress={() => {
                this.state.used = true;
                AsyncStorage.setItem("a", "true");
                this.setState({ state: this.state });
              }}
            >
              <Text style={this.state.styles.starter}>
                Утро{"\n"}Вечера{"\n"}Мудренее{"\n"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        );
      }
    } else {
      return <Text>Loading</Text>;
    }
  }
}
export default HomeScreen;
