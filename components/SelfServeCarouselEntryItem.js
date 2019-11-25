import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import DescriptionBox from "./DescriptionBox";
import { GetProduct } from "../utilities";

export default class SelfServeCarouselEntryItem extends Component {
  constructor() {
    super();
  }

  state = {
    id: null,
    data: null
  };

  componentDidUpdate() {
    console.log("updated");
    if (this.state.id && !this.state.data) {
      console.log("getting data for item with id " + this.state.id);
      GetProduct(this.state.id).then(result => {
        this.setState({
          data: result
        });
        console.log(
          "Updated SelfServeCarouselEntryItem with id " + this.state.id
        );
      });
    }
  }

  render() {
    const { item } = this.props;

    if (!this.state.id) {
      this.setState({
        id: item.id
      });
    }

    console.log("CAROUSEL ITEM", item);

    if (this.state.data) {
      return (
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri: this.state.data.product_info.image_url }}
          />

          <DescriptionBox product={this.state.data}></DescriptionBox>
          <View style={styles.amount}>
            <Text style={styles.amountText}>x {item.amount}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>{item.id}</Text>
          <Text>{item.amount}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
    borderRadius: 10,
    padding: 15
  },
  descriptionBox: {
    flexDirection: "column"
  },
  image: {
    width: 70,
    height: 70
  },
  amount: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "flex-end"
  },
  amountText: {
    fontSize: 14,
    width: "35%",
    color: "gray",
    textAlign: "left"
  }
});
