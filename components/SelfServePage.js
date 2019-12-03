import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import SelfServeCarousel from "./SelfServeCarousel";

export default class SelfServePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { packages, setPickedCallback } = this.props.screenProps;
    console.log("SelfServePage packages: ", packages);

    return (
      <View style={styles.container}>
        <SelfServeCarousel
          setPickedCallback={setPickedCallback}
          style={styles.carouselContainer}
          entries={packages}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#0058a3"
  },
  carouselContainer: {
    alignSelf: "flex-end"
  }
});
