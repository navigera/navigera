import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import SelfServeCarousel from "./SelfServeCarousel";
import SelfServeMap from "./SelfServeMap";
import { getAllCorners } from "../utilities";
const win = Dimensions.get("window");

export default class SelfServePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { packages, setPickedCallback } = this.props.screenProps;
    const packagePositions = getAllCorners();
    console.log("SelfServePage packages: ", packages);

    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <SelfServeMap
            packagePositions={packagePositions}
            style={styles.map}
          />
        </View>
        <View style={styles.carouselContainer}>
          <SelfServeCarousel
            setPickedCallback={setPickedCallback}
            style={styles.carouselContainer}
            entries={packages}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#0058a3",
  },
  mapContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  carouselContainer: {
    position: "absolute",
    bottom: 0,
  }
});
