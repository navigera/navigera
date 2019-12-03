import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import SelfServeCarousel from "./SelfServeCarousel";
import SelfServeMap from "./SelfServeMap";

export default class SelfServePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { packages, setPickedCallback } = this.props.screenProps;
    console.log("SelfServePage packages: ", packages);

    return (
      <>
        <View style={styles.mapContainer}>
          <SelfServeMap style={styles.map} />
        </View>
        <View style={styles.container}>
          <SelfServeCarousel
            setPickedCallback={setPickedCallback}
            style={styles.carouselContainer}
            entries={packages}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#0058a3"
  },
  map: {
    width: "100%",
  },
  mapContainer: {
    flex: 3,
    width: "100%",
    backgroundColor: "#0058a3",
    justifyContent: "flex-end"
  },
  carouselContainer: {
    alignSelf: "flex-end"
  }
});
