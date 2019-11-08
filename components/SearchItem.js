import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Icon } from "@up-shared/components";
import { TouchableHighlight } from "react-native";

export default class SearchItem extends Component {
  constructor(props){
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  capitalizeFirst(str) {
    return str[0].toUpperCase() + str.slice(1);
  }
  
  numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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
        <View style={styles.descriptionBox}>
          <Text style={styles.h1}>{product.product_info.family.toUpperCase()}</Text>
          <Text style={styles.h3}>{this.capitalizeFirst(product.product_info.category)}, {product.product_info.color}</Text>
          <Text style={styles.h2}>{this.numberWithSpaces(product.availability.price)} kr</Text>
        </View>

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
  h1: {
    fontSize: 18,
    fontWeight: "bold"
  },
  h2: {
    fontSize: 16,
    fontWeight: "bold"
  },
  h3: {
    fontSize: 14,
    color: "gray"
  },
});
