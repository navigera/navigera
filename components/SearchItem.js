import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Icon } from "@up-shared/components";
import { TouchableHighlight } from "react-native";
import DescriptionBox from "./DescriptionBox.js";

export default class SearchItem extends Component {
  constructor(props){
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

   handlePress() {
    const {handlePress} = this.props;
    handlePress(this.props.product);
  }

  render() {
    const {product} = this.props;   
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: (product.product_info.image_url) }} />
        <DescriptionBox product={product}></DescriptionBox>

        <View style={styles.buttonContainer}>
          <TouchableHighlight style={styles.iconContainer} onPress={this.handlePress} underlayColor={"white"}>
            <Icon name={"plus"} size={30} color="black" />
          </TouchableHighlight>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderStyle: "dotted",
    borderBottomColor: "gray",
    borderRadius: 5,
    margin:3,
  },
  descriptionBox: {
    flexDirection: "column"
  },
  image: {
    width: 70,
    height: 70
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "flex-end"
  },
  amountText: {
    fontSize: 14,
    width: "35%",
    color: "gray",
    textAlign: "left"
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignSelf: "flex-end"
  },
});
