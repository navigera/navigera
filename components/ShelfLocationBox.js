import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { formatSingleUnit,globalStyles} from "../utilities.js";

export default class ShelfLocationBox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const locationNumber = this.props.locationNumber;
    const locationText = this.props.locationText;
    return (
      <View style ={styles.descriptionBox}>
        <View style={styles.shelfBox}>
          <Text style={[styles.productIDText, globalStyles.bold]}>
            {formatSingleUnit(locationNumber)}
          </Text>
        </View>
        <Text>{locationText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  descriptionBox: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shelfBox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cc0008",
    width: 30,
    height: 30,
    marginRight:10
  },
  productIDText: {
    textAlign: "center",
    color: "white",
  },
});


