import React, { Component } from "react";
import { TouchableHighlight, Text, StyleSheet, View } from "react-native";
import { globalStyles } from "../utilities.js";
import Geolocation from "@react-native-community/geolocation";
import { NearestCity } from "../assets/stores";
import { Icon } from "@up-shared/components";

export default class WarehouseLocationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialPosition: "unknown",
      lastPosition: "unknown",
      latitude: 0,
      longitude: 0,
      closestWarehouse: null
    };

    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      location => {
        console.log(location.coords);
        this.setState({
          longitude: location.coords.longitude,
          latitude: location.coords.latitude
        });

        this.setState({
          closestWarehouse: NearestCity(
            this.state.latitude,
            this.state.longitude
          )
        });
      },
      error => console.log("Error", JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  handlePress(changeLocation) {
    const { updateWarehouse } = this.props.screenProps;
    const closestWarehouse = this.state.closestWarehouse;
    console.log(
      "closest warehouse in location page: ",
      this.state.closestWarehouse
    );
    updateWarehouse(closestWarehouse);
    this.props.navigation.navigate(changeLocation ? "Main": "SettingWarehouse");
  }


 

  getLandingView() {
    console.log(this.state.onStartUp);
    return (
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={[styles.text, globalStyles.bold]}>NAVIGERA</Text>
          <Text style={[styles.text1, globalStyles.regular]}>
            Your closest warehouse is in
          </Text>
          <Text style={[styles.text2, globalStyles.bold]}>
            {this.state.closestWarehouse ? this.state.closestWarehouse.name : ""}
          </Text>

          <TouchableHighlight
            style={{ alignSelf: "center" }}
            underlayColor={"#116fbf"}
            onPress={this.handlePress}
          >
            <Icon name="arrow-right" size={50} color="white" />
          </TouchableHighlight>
        </View>
        <View styles={styles.bottomContainer}>
          <TouchableHighlight
            style={{ alignSelf: "center" }}
            underlayColor={"#116fbf"}
            onPress={()=>this.handlePress(false)}
          >
            <Text style={[styles.text3, globalStyles.bold]}>
              Not what you expected? Change location here
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  render() {
    return <View style={styles.container}>{this.getLandingView()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0058a3"
  },
  centerContainer: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 2
  },

  bottomContainer: {
    flex: 3,
    backgroundColor: "pink"
  },
  text: {
    color: "#ffdb00",
    textAlign: "center",
    fontSize: 48
  },
  text1: {
    color: "white",
    textAlign: "center",
    fontSize: 18
  },
  text2: {
    color: "white",
    textAlign: "center",
    fontSize: 32
  },
  text3: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    textDecorationLine: "underline"
  },
  textBtn: {
    color: "white",
    textAlign: "center",
    fontSize: 24
  },
  btn: {
    alignSelf: "center",
    borderColor: "white",
    borderWidth: 1,
    width: 250
  }
});
