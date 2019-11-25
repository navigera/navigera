import React, { Component } from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Icon } from "@up-shared/components";
import SelfServeCarousel from "./SelfServeCarousel";

export default class SelfServePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const packages = this.props.screenProps.packages;
    console.log('SelfServePage packages: ', packages)

    return (
      <View style={styles.container}>
        <SelfServeCarousel
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
