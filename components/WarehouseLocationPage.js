import React, { Component } from "react";
import { TouchableHighlight, Text, StyleSheet, View } from "react-native";
import { globalStyles } from "../utilities.js";
import Geolocation from "@react-native-community/geolocation";
import { NearestCity } from "../Locations.js";

export default class WarehouseLocationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialPosition: "unknown",
      lastPosition: "unknown",
      latitude: 0,
      longitude: 0,
      closestWarehouse: ""
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

  handlePress() {
    this.props.navigation.navigate("Main");
  }

  getLandingView() {
    console.log(this.state.onStartUp);
      return (
        <View style={styles.container}>
          <Text style={[styles.text1, globalStyles.bold]}>
            Your closest warehouse is in
          </Text>
          <Text style={[styles.text2, globalStyles.bold]}>
            {this.state.closestWarehouse}
          </Text>

          <TouchableHighlight
            underlayColor={"#116fbf"}
            onPress={this.handlePress}
          >
            <View style={styles.btn}>
              <Text style={[styles.textBtn, globalStyles.bold]}>
                Use this location
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      );
  }
  render() {
    return <View style={styles.container}>
    {this.getLandingView()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0058a3",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  text1: {
    color: "white",
    textAlign: "center",
    fontSize: 24
  },
  text2: {
    color: "white",
    textAlign: "center",
    fontSize: 48
  },
  textBtn: {
    color: "white",
    textAlign: "center",
    fontSize: 24
  },
  btn: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,

    paddingLeft: 20,
    paddingRight: 20
  }
});
